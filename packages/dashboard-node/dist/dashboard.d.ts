import { Client } from "openapi-fetch";
import { paths } from "./lib/api";
type Environment = 'staging' | 'production' | 'development';
export declare const PRODUCTION_URL = "https://elternportal.triargos.de/api";
export declare const STAGING_URL = "https://dashboard.staging.triargos.de/api";
export declare const DEVELOPMENT_URL = "http://localhost:3000/api";
export declare class Dashboard {
    readonly client: Client<paths, `${string}/${string}`>;
    constructor({ apiKey, environment, }: {
        apiKey: string;
        environment?: Environment;
    });
    private getBaseUrl;
}
export {};
