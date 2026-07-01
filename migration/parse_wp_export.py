#!/usr/bin/env python3
"""
WordPress WXR export parser for eriksjoholm.com migration.
Reads the XML file on disk — never prints the raw XML to stdout.
Output: categorized content extracts + next.config.ts redirect array.
"""

import xml.etree.ElementTree as ET
import re
import sys
import json
from html.parser import HTMLParser

XML_PATH = "/Users/eriksjoholm/Downloads/WordPress.2026-06-30.xml"

# ── Namespaces in WXR ────────────────────────────────────────────────────────
NS = {
    "wp":      "http://wordpress.org/export/1.2/",
    "content": "http://purl.org/rss/1.0/modules/content/",
    "dc":      "http://purl.org/dc/elements/1.1/",
    "excerpt": "http://wordpress.org/export/1.2/excerpt/",
}

# ── Post types / statuses to SKIP ───────────────────────────────────────────
SKIP_TYPES = {
    "attachment", "product", "product_variation", "nav_menu_item",
    "elementor_library", "shop_order", "wp_navigation", "custom_css",
    "oembed_cache", "user_request", "wp_global_styles", "revision",
}
SKIP_STATUSES = {"draft", "inherit", "auto-draft", "trash", "private",
                  "wc-on-hold", "wc-pending", "wc-completed", "wc-refunded"}

# ── New site URL map ─────────────────────────────────────────────────────────
NEW_BASE = "https://eriksjoholm.com"

CATEGORY_MAP = {
    "about":       "/about",
    "storyteller": "/storyteller",
    "songs":       "/songs",
    "notes":       "/notes",         # beehiiv newsletter / blog posts
    "shows":       "/live",
    "contact":     "/contact",
    "sync":        "/sync",
    "home":        "/",
}

# ── Strip HTML ───────────────────────────────────────────────────────────────
class HTMLStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reset()
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return " ".join(self.fed)

def strip_html(html: str) -> str:
    if not html:
        return ""
    # Remove Elementor / shortcode blocks before HTML parsing
    html = re.sub(r'\[/?[a-zA-Z_-]+[^\]]*\]', ' ', html)
    # Remove HTML comments
    html = re.sub(r'<!--.*?-->', ' ', html, flags=re.DOTALL)
    s = HTMLStripper()
    s.feed(html)
    text = s.get_data()
    # Collapse whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# ── Guess destination category ───────────────────────────────────────────────
SLUG_HINTS = {
    "about": "about",
    "bio": "about",
    "artist": "about",
    "storyteller": "storyteller",
    "glenn": "storyteller",
    "show": "storyteller",
    "show-info": "storyteller",
    "song": "songs",
    "music": "songs",
    "discography": "songs",
    "sync": "sync",
    "licensing": "sync",
    "film": "sync",
    "tv": "sync",
    "live": "shows",
    "shows": "shows",
    "tour": "shows",
    "concert": "shows",
    "contact": "contact",
    "booking": "contact",
    "press": "contact",
    "note": "notes",
    "blog": "notes",
    "news": "notes",
    "journal": "notes",
    "newsletter": "notes",
    "home": "home",
    "start": "home",
    "welcome": "home",
    "frontpage": "home",
}

def guess_category(slug: str, title: str, post_type: str) -> str:
    combined = (slug + " " + title).lower()
    # posts go to notes unless slug matches something else
    if post_type == "post":
        for hint, cat in SLUG_HINTS.items():
            if hint in combined:
                return cat
        return "notes"
    for hint, cat in SLUG_HINTS.items():
        if hint in combined:
            return cat
    return "AMBIGUOUS"

# ── Main ─────────────────────────────────────────────────────────────────────
def main():
    print(f"Parsing {XML_PATH} …\n")
    tree = ET.parse(XML_PATH)
    root = tree.getroot()

    channel = root.find("channel")
    site_url = channel.findtext("link", "https://eriksjoholm.com")
    print(f"Site URL from export: {site_url}\n")

    items = channel.findall("item")
    print(f"Total items in export: {len(items)}\n")

    published = []
    skipped_type = 0
    skipped_status = 0

    for item in items:
        post_type   = item.findtext("wp:post_type",   default="", **{"namespaces": NS})
        status      = item.findtext("wp:status",      default="", **{"namespaces": NS})
        title       = item.findtext("title",          default="").strip()
        link        = item.findtext("link",           default="").strip()
        slug        = item.findtext("wp:post_name",   default="", **{"namespaces": NS}).strip()
        content_raw = item.findtext("content:encoded", default="", **{"namespaces": NS})
        excerpt_raw = item.findtext("excerpt:encoded", default="", **{"namespaces": NS})
        post_id     = item.findtext("wp:post_id",     default="", **{"namespaces": NS})

        if post_type in SKIP_TYPES:
            skipped_type += 1
            continue
        if status in SKIP_STATUSES:
            skipped_status += 1
            continue
        if status != "publish":
            skipped_status += 1
            continue

        content_text  = strip_html(content_raw)
        excerpt_text  = strip_html(excerpt_raw)
        char_count    = len(content_text)
        is_boilerplate = char_count < 50

        # Old relative path (strip site_url prefix)
        old_path = link.replace(site_url, "").rstrip("/") or "/"
        if not old_path.startswith("/"):
            old_path = "/" + old_path

        category = guess_category(slug, title, post_type)

        published.append({
            "id":            post_id,
            "type":          post_type,
            "status":        status,
            "title":         title,
            "slug":          slug,
            "old_path":      old_path,
            "category":      category,
            "char_count":    char_count,
            "is_boilerplate": is_boilerplate,
            "excerpt":       excerpt_text[:300] if excerpt_text else "",
            "content":       content_text[:800] if content_text else "",
        })

    print(f"Skipped (type):   {skipped_type}")
    print(f"Skipped (status): {skipped_status}")
    print(f"Published items:  {len(published)}\n")

    # ── Group by category ────────────────────────────────────────────────────
    categories: dict[str, list] = {}
    for p in published:
        cat = p["category"]
        categories.setdefault(cat, []).append(p)

    print("=" * 64)
    print("CATEGORIZED CONTENT")
    print("=" * 64)
    for cat, entries in sorted(categories.items()):
        dest = CATEGORY_MAP.get(cat, f"/{cat}")
        print(f"\n── {cat.upper()} → {dest} ({len(entries)} items) ──")
        for e in entries:
            flag = "  ⚠ BOILERPLATE?" if e["is_boilerplate"] else ""
            print(f"  [{e['type']}] {e['title'] or '(no title)'}{flag}")
            print(f"    old:  {e['old_path']}")
            print(f"    chars: {e['char_count']}")
            if e["excerpt"]:
                print(f"    excerpt: {e['excerpt'][:200]}")
            elif e["content"]:
                print(f"    content: {e['content'][:200]}")

    # ── Redirect array ───────────────────────────────────────────────────────
    print("\n\n" + "=" * 64)
    print("NEXT.CONFIG.TS REDIRECTS ARRAY")
    print("=" * 64)
    print("// Paste inside the redirects() async function in next.config.ts")
    print("const wpRedirects = [")

    redirect_entries = []
    ambiguous = []
    seen_sources = set()

    for p in published:
        old = p["old_path"]
        cat = p["category"]

        if old in seen_sources:
            continue
        seen_sources.add(old)

        if cat == "AMBIGUOUS":
            ambiguous.append(p)
            dest_path = f"/* TODO: manually map '{p['slug']}' */"
            print(f"  // AMBIGUOUS: {old} → ???  title: {p['title']}")
            continue

        dest_path = CATEGORY_MAP.get(cat, f"/{cat}")

        # If this old path is already the destination, skip (no redirect needed)
        if old == dest_path:
            print(f"  // SAME PATH (no redirect): {old}")
            continue

        entry = {
            "source": old,
            "destination": dest_path,
            "permanent": True,
        }
        redirect_entries.append(entry)

        print(f"  {{ source: '{old}', destination: '{dest_path}', permanent: true }},")

    print("];\n")

    # ── Ambiguous list ───────────────────────────────────────────────────────
    if ambiguous:
        print("\n" + "=" * 64)
        print("AMBIGUOUS ITEMS — need manual judgment")
        print("=" * 64)
        for p in ambiguous:
            print(f"\n  title:    {p['title']}")
            print(f"  slug:     {p['slug']}")
            print(f"  old path: {p['old_path']}")
            print(f"  type:     {p['type']}")
            if p["content"]:
                print(f"  content:  {p['content'][:300]}")

    # ── Save JSON for reference ──────────────────────────────────────────────
    out_path = "/Users/eriksjoholm/eriksjoholmwebsite/migration/wp_export_analysis.json"
    with open(out_path, "w") as f:
        json.dump({
            "published": published,
            "redirects": redirect_entries,
            "ambiguous": ambiguous,
        }, f, indent=2)
    print(f"\n\nFull JSON saved to: {out_path}")

if __name__ == "__main__":
    main()
