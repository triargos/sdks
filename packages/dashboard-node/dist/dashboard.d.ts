import { Client } from "openapi-fetch";
import { paths } from "./lib/api";
type Environment = 'production' | 'development';
export declare const PRODUCTION_URL = "https://elternportal.triargos.de";
export declare const DEVELOPMENT_URL = "http://localhost:5173";
export declare class Dashboard {
    readonly client: Client<paths, `${string}/${string}`>;
    constructor({ apiKey, environment, }: {
        apiKey: string;
        environment?: Environment;
    });
    private getBaseUrl;
}
export {};
