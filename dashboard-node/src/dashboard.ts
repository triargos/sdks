import { GeneratedDashboard } from './client';

type Environment = 'staging' | 'production' | 'development';

export const PRODUCTION_URL = 'https://dashboard.triargos.de/api';
export const STAGING_URL = 'https://staging.dashboard.triargos.de/api';
export const DEVELOPMENT_URL = 'http://localhost:3000/api';

export class Dashboard extends GeneratedDashboard {
  constructor({
    apiKey,
    environment = 'production',
  }: {
    apiKey: string;
    environment?: Environment;
  }) {
    super({
      BASE:
        environment === 'production'
          ? PRODUCTION_URL
          : environment === 'staging'
            ? STAGING_URL
            : DEVELOPMENT_URL,
      HEADERS: { 'Content-Type': 'application/json', 'X-Api-Key': apiKey },
    });
  }
}
