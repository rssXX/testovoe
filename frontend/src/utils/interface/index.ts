export interface ShortenInterface{
    originalUrl: string,
    alias: string,
    createdAt?: string | null,
    clickCount: number,
}

export type ShortenResponse = Omit<ShortenInterface, "originalUrl" | "alias" | "clickCount" | "createdAt"> & {
    from: string;
    to: string;
    expiresAt: string | null;
};
