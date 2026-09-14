import { NextRequest, NextResponse } from "next/server";

// Subdomains that serve a single existing page at their own root.
// eriksjoholm.com itself is untouched — only these exact hostnames are rewritten,
// and only their "/" request. Add a new subdomain here; no other code changes needed.
const SUBDOMAIN_ROUTES: Record<string, string> = {
  "sync.eriksjoholm.com": "/sync",
  "storyteller.eriksjoholm.com": "/storyteller",
};

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get("host") ?? "").split(":")[0];
  const target = SUBDOMAIN_ROUTES[hostname];

  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
