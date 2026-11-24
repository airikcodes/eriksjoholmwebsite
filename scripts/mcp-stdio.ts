// Local test door: the same three tools over stdio, for Claude Desktop or the MCP Inspector on one machine.
// Run from the repo root:  npx tsx scripts/mcp-stdio.ts
// Not deployed, no network, no secrets. Needs `tsx` (npx fetches it) and the project's node_modules.
import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { registerSongTools } from '../lib/song-api/mcp-tools';

async function main() {
  const server = new McpServer({ name: 'song-concierge', version: '1.0.0' });
  registerSongTools(server, 'stdio');
  await server.connect(new StdioServerTransport());
}
main().catch((e) => {
  console.error('mcp-stdio failed:', e instanceof Error ? e.message : 'unknown');
  process.exit(1);
});
