// Request log: one JSON line per request in the platform's function logs.
// No personal data: the IP is truncated (IPv4 to /24, IPv6 to /48) and the query text is never logged, only its length.

export function truncateIp(ip: string): string {
  // IPv4-mapped IPv6 ("::ffff:203.0.113.77") is an IPv4 address: truncate it as IPv4, never as IPv6.
  const mapped = /^(?:::ffff:|0:0:0:0:0:ffff:)(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(ip);
  if (mapped) ip = mapped[1];
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) {
    const p = ip.split('.');
    return `${p[0]}.${p[1]}.${p[2]}.0/24`;
  }
  if (ip.includes(':')) {
    const g = ip.split(':').filter(Boolean).slice(0, 3);
    return g.length ? `${g.join(':')}::/48` : 'local';
  }
  return 'unknown';
}

export interface LogEntry {
  route: string;
  method: string;
  status: number;
  code?: string;
  ip: string;
  qLen?: number;
  count?: number;
  ms: number;
}

export function logRequest(e: LogEntry): void {
  const line = {
    t: new Date().toISOString(),
    ev: 'song_api',
    route: e.route,
    method: e.method,
    status: e.status,
    code: e.code ?? null,
    ip: truncateIp(e.ip),
    q_len: e.qLen ?? null,
    results: e.count ?? null,
    ms: e.ms,
  };
  console.log(JSON.stringify(line));
}
