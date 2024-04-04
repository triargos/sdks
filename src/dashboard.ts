import axios, {AxiosError, AxiosInstance} from "axios";
import {Organizations} from "./organizations/organizations";
import {MissingAuthenticationException} from "./exceptions/missing-authentication-exception";
import {ResourceForbiddenException} from "./exceptions/resource-forbidden-exception";
import {ResourceNotFoundException} from "./exceptions/resource-not-found-exception";
import {InternalServerException} from "./exceptions/internal-server-exception";
import {UnknownApiException} from "./exceptions/unknown-api-exception";
import {UnknownException} from "./exceptions/unknown-exception";
import {ZodError} from "zod";
import {SchemaValidationException} from "./exceptions/schema-validation-exception";

type Environment = "staging" | "production" | "development";

export const PRODUCTION_URL = "https://dashboard.triargos.de/api";
export const STAGING_URL = "https://staging.dashboard.triargos.de/api";
export const DEVELOPMENT_URL = "http://localhost:3000/api"

export class Dashboard {
    readonly environment: Environment;
    private readonly apiKey: string;
    private client: AxiosInstance
    readonly organizations: Organizations;

    constructor({apiKey, environment = "production"}: { apiKey: string, environment?: Environment }) {
        this.apiKey = apiKey;
        this.environment = environment;
        this.client = axios.create({
            baseURL: this.getBaseUrl(),
            headers: {
                "X-Api-Key": this.apiKey
            }
        })
        this.organizations = new Organizations(this);
    }

    private getBaseUrl() {
        switch (this.environment) {
            case "production":
                return PRODUCTION_URL;
            case "staging":
                return STAGING_URL;
            case "development":
                return DEVELOPMENT_URL
        }
    }

    async get<T>(path: string) {
        try {
            const response = await this.client.get<T>(path);
            return response.data;
        } catch (e) {
            this.handleErrors(e);
        }
    }

    async post<T>(path: string, data: unknown) {
        try {
            const response = await this.client.post<T>(path, data);
            return response.data;
        } catch (e) {
            this.handleErrors(e)
        }
    }

    async put<T>(path: string, data: unknown) {
        try {
            const response = await this.client.put<T>(path, data);
            return response.data;
        } catch (e) {
            this.handleErrors(e);
        }
    }

    private handleErrors(e: any) {
        if (e instanceof AxiosError) {
            const status = e.response?.status
            if (status === undefined) {
                throw new UnknownException(e.message)
            }
            switch (status) {
                case 401: {
                    throw new MissingAuthenticationException(e.message, status)
                }
                case 403: {
                    throw new ResourceForbiddenException(e.message, status)
                }
                case 404: {
                    throw new ResourceNotFoundException(e.message, status)
                }
                case 500: {
                    throw new InternalServerException(e.message, status)
                }
                default: {
                    throw new UnknownApiException(e.message, status)
                }
            }
        }
        if (e instanceof ZodError) {
            throw new SchemaValidationException(e.message)
        }
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        throw new UnknownException(errorMessage)
    }


}