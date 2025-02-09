import {Hono} from "hono";
import {ROUTES} from "../utils/consts";
import {commonMiddlewares} from "./middleware";

const createServer = () => {
    const server = new Hono();

    server.use(...commonMiddlewares);

    ROUTES.forEach((route) => server.route('', route));

    return server;
};

export default createServer;
