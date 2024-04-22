import { Dashboard } from '../src';

type Environment = 'staging' | 'production' | 'development';

export function getDashboardInstance(environment: Environment = 'staging') {
  return new Dashboard({ apiKey: '1234', environment });
}

export const PRODUCTION_URL = 'https://dashboard.triargos.de/api/v1';
export const STAGING_URL = 'https://staging.dashboard.triargos.de/api/v1';
export const DEVELOPMENT_URL = 'http://localhost:3000/api/v1';
