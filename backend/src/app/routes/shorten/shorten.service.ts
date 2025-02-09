import {prismaConnect} from "../../../utils/connect";
import {generateAlias} from "../../../utils/func";


const shortenService = {
    checkDateRedirect: (expiresAt: number) => {
        const date = new Date(expiresAt).getTime()
        const dateNow = new Date().getTime()

        if (dateNow > date) return false

        return true
    },
    updateAndGetShortenUrl: async (url: string) => {
        return prismaConnect.shortenUrl.update({
            where: {
                from: url,
            },
            data: {
                clickCount: {
                    increment: 1
                }
            },
        })
    },
    checkDateCreate: (expiresAt: number) => {
        const date = new Date(expiresAt)

        if (isNaN(date.getTime())) return false

        return true
    },
    createShortenUrl: async (originalUrl: string, alias?: string, expiresAt?: number) => {
        return prismaConnect.shortenUrl.create({
            data: {
                from: alias ? alias : generateAlias(),
                to: originalUrl,
                expiresAt: expiresAt ? String(expiresAt) : null
            },
            select: {
                from: true,
                to: true,
                expiresAt: true
            },
        })
    },
    getShortUrl: async (url: string) => {
        return prismaConnect.shortenUrl.findUnique({
            where: {
                from: url
            },
            select: {
                from: true,
                to: true,
                expiresAt: true,
                clickCount: true,
                createdAt: true,
            }
        })
    },
    deleteShortUrl: async (url: string) => {
        return prismaConnect.shortenUrl.delete({
            where: {
                from: url
            }
        })
    },
}

export default shortenService