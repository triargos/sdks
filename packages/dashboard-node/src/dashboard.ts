import createClient, {Client} from "openapi-fetch";
import {paths} from "./lib/api";


type Environment = 'staging' | 'production' | 'development';

export const PRODUCTION_URL = 'https://elternportal.triargos.de';
export const STAGING_URL = 'https://dashboard.staging.triargos.de';
export const DEVELOPMENT_URL = 'http://localhost:3000';


export class Dashboard {
    public readonly client: Client<paths, `${string}/${string}`>

    constructor({
                    apiKey,
                    environment = 'production',
                }: {
        apiKey: string;
        environment?: Environment;
    }) {
        this.client = createClient<paths>({
            baseUrl: this.getBaseUrl(environment),
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        })
    }

    private getBaseUrl(environment: Environment) {
        return environment === 'production'
            ? PRODUCTION_URL
            : environment === 'staging'
                ? STAGING_URL
                : DEVELOPMENT_URL;
    }
}
