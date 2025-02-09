import corsMiddleware from './cors';
import { logger } from 'hono/logger'

const commonMiddlewares = [
    logger(),
    corsMiddleware,
];

export default commonMiddlewares
