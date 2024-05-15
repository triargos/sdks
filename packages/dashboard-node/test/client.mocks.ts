import {Dashboard} from '../src';
import {HttpResponse} from "msw";

type Environment = 'staging' | 'production' | 'development';

export function getDashboardInstance(environment: Environment = 'staging') {
    return new Dashboard({apiKey: '1234', environment});
}

export function requireAuthentication(request: Request) {
    const header = request.headers.get('X-Api-Key');
    if (!header) throw new Error('Authentication required');
    if (header !== '1234') throw new HttpResponse(null, {status: 401, statusText: 'Unauthorized'});
}


export const PRODUCTION_URL = 'https://dashboard.triargos.de/api/v1';
export const STAGING_URL = 'https://staging.dashboard.triargos.de/api/v1';
export const DEVELOPMENT_URL = 'http://localhost:3000/api/v1';
