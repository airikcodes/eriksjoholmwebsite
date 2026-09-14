// Subdomains that serve a single existing page at their own root, always in the
// default locale. eriksjoholm.com itself is untouched — only these exact
// hostnames are rewritten, and only their "/" request.
//
// Shared between proxy.ts (does the rewrite) and PersistentBackground.tsx
// (needs to know these hosts are never the actual homepage, even though the
// rewrite makes the browser's visible pathname "/" — see that file for why).
//
// Add a new subdomain here; no other code changes needed for the rewrite itself.
export const SUBDOMAIN_ROUTES: Record<string, string> = {
  "sync.eriksjoholm.com": "/sync",
  // storyteller.eriksjoholm.com moved to The Crater (sjoholm-productions-test
  // Vercel project) — Vercel routes that hostname to a different project
  // entirely now, so this app never sees it. eriksjoholm.com/storyteller
  // still 301s there via next.config.ts.
};

export const SUBDOMAIN_HOSTS = new Set(Object.keys(SUBDOMAIN_ROUTES));
