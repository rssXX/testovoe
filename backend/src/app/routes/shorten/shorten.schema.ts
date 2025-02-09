import { z } from "zod";
import "zod-openapi/extend";

export const bodyPostShorten = z.object({
    originalUrl: z.string().url().openapi({ example: "https://example.com" }),
    expiresAt: z.number().optional().openapi({ example: 1234567890 }),
    alias: z.string().max(20).optional().openapi({ example: "example" }),
});
