import { test, expect } from "bun:test";

test("Create shortenURL and check redirect", async () => {
    const originalUrl = "https://hono.dev";

    const resCreate = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
    });
    expect(resCreate.status).toBe(200);
    const data = await resCreate.json();

    const resGet = await fetch(`http://localhost:3000/${data.from}`, {
        method: "GET",
        redirect: "manual",
    });
    expect(resGet.status).toBe(301);
    expect(resGet.headers.get("Location")).toBe(originalUrl);
});
