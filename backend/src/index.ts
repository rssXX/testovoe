import createServer from "./app/server";

const port = parseInt(process.env.SERVER_PORT!) || 3000
const host = process.env.SERVER_HOST || 'localhost';

const app = createServer()

console.log(`Server start http://${host}:${port}`)

export const server = Bun.serve({
  port,
  hostname: host,
  fetch: app.fetch,
  idleTimeout: 60
})