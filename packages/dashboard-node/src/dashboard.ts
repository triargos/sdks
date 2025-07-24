import createClient, {Client} from "openapi-fetch";
import {paths} from "./lib/api";


type Environment = 'production' | 'development';

export const PRODUCTION_URL = 'https://elternportal.triargos.de';
export const DEVELOPMENT_URL = 'http://localhost:5173';


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
        switch (environment) {
            case 'production':
                return PRODUCTION_URL;
            case 'development':
                return DEVELOPMENT_URL;
            default:
                throw new Error(`Unknown environment: ${environment}`);
        }
    }
}


