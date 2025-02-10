export interface shortenInterface{
    originalUrl: string,
    alies: string,
    createdAt?: string | null,
    clickCount: number,
}

export type ShortenResponse = Omit<shortenInterface, "originalUrl" | "alies" | "clickCount" | "createdAt"> & {
    from: string;
    to: string;
    expiresAt: string | null;
};
