import { Hono } from "hono";
import {
    postShortUrlRoute,
    validateShortenCreateBody,
} from './shorten.openapi'
import shortenService from './shorten.service'
import {handleError} from "../../../utils/func";

const shorten = new Hono();

shorten
    .get(
        '/:url',
        async (c) => {
            try {
                const url = c.req.param('url')

                const {to, expiresAt} = await shortenService.updateAndGetShortenUrl(url)

                if (expiresAt){
                    const checkDate = shortenService.checkDateRedirect(Number(expiresAt))

                    if(!checkDate) return c.json({error: 'Срок действия ссылки истек'}, 400)
                }

                return c.redirect(to, 301);
            }catch (error) {
                return handleError(error, c)
            }
        }
    )
    .post(
        '/shorten',
        postShortUrlRoute,
        validateShortenCreateBody,
        async (c) => {
            try {
                const { originalUrl, expiresAt, alias } = await c.req.json();

                if (expiresAt){
                    if (!shortenService.checkDateCreate(expiresAt)){
                        return c.json({error: 'Неверная дата'}, 400)
                    }
                }

                const shortenUrl = await shortenService.createShortenUrl(originalUrl, alias, expiresAt)

                return c.json(shortenUrl, 200);
            }catch (error) {
                return handleError(error, c)
            }
        }
    )
    .get(
        '/info/:url',
        async (c) => {
            try {
                const url = c.req.param('url')

                const shortenUrl = await shortenService.getShortUrl(url)

                if (shortenUrl === null) return c.json({error: 'Ссылка не найдена'}, 404)

                return c.json({
                    originalUrl: shortenUrl.to,
                    createdAt: shortenUrl.createdAt,
                    clickCount: shortenUrl.clickCount,
                }, 200)
            }catch (error) {
                return handleError(error, c)
            }
        }
    )
    .delete(
        '/delete/:url',
        async (c) => {
            try {
                const url = c.req.param('url')

                const shortenUrl = await shortenService.deleteShortUrl(url)

                return c.json({message: `Ссылка ${shortenUrl.from} удалена`}, 200)
            }catch (error) {
                return handleError(error, c)
            }
        }
    )

export default shorten
