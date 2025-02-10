export interface ShortenInterface{
    originalUrl: string,
    alies: string,
    createdAt?: string | null,
    clickCount: number,
}

export type ShortenResponse = Omit<ShortenInterface, "originalUrl" | "alies" | "clickCount" | "createdAt"> & {
    from: string;
    to: string;
    expiresAt: string | null;
};
