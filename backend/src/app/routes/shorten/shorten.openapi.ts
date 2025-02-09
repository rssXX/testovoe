import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { validator as zValidator } from 'hono-openapi/zod';
import { bodyPostShorten } from './shorten.schema';

export const postShortUrlRoute = describeRoute({
    description: "Получение пользователей",
    tags: ['Short Url'],
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: resolver(bodyPostShorten),
                },
            },
        },
    },
});

export const validateShortenCreateBody = zValidator("json", bodyPostShorten);