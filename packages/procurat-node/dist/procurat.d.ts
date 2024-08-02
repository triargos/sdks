import { Client } from "openapi-fetch";
import { paths } from "./lib/api";
export declare class Procurat {
    readonly client: Client<paths, `${string}/${string}`>;
    constructor({ baseUrl, apiKey }: {
        baseUrl: string;
        apiKey: string;
    });
}
