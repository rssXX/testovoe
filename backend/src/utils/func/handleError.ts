import {z} from 'zod'
import { Context } from "hono";
import { Prisma } from "@prisma/client";

const handleError = (error: unknown, c: Context) => {
    // console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                return c.json({ error: "Такие данные уже существуют" }, 400);
            case "P2003":
                return c.json({ error: "Есть связанные данные" }, 400);
            case "P2025":
                return c.status(404);
            default:
                return c.json({ error: "Ошибка базы данных" }, 500);
        }
    }

    if (error instanceof z.ZodError) {
        return c.json({ error: error.errors }, 400);
    }

    console.error("Неизвестная ошибка:", error);
    return c.json({ error: "Что-то пошло не так!" }, 500);
}

export default handleError
