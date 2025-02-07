import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello 22!')
})

export default app
