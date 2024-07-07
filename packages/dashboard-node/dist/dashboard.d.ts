import { GeneratedDashboard } from './client';
type Environment = 'staging' | 'production' | 'development';
export declare const PRODUCTION_URL = "https://dashboard.triargos.de/api";
export declare const STAGING_URL = "https://dashboard.staging.triargos.de/api";
export declare const DEVELOPMENT_URL = "http://localhost:3000/api";
export declare class Dashboard extends GeneratedDashboard {
    constructor({ apiKey, environment, }: {
        apiKey: string;
        environment?: Environment;
    });
}
export {};
