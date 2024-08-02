import createClient, {Client} from "openapi-fetch";
import {paths} from "./lib/api";

export class Procurat {
    public readonly client: Client<paths, `${string}/${string}`>
    constructor({baseUrl, apiKey}: { baseUrl: string, apiKey: string }) {
        this.client = createClient<paths>({
            baseUrl, headers: {
                'X-API-KEY': apiKey
            }
        })
    }
}

