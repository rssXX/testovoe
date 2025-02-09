import { cors } from 'hono/cors'

const corsMiddleware = cors({
    origin: '*',
    allowMethods: ["POST", "GET", "DELETE"],
});

export default corsMiddleware