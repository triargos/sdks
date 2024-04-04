import { Dashboard } from '../src';

export function getDashboardInstance() {
  return new Dashboard({ apiKey: '1234', environment: 'staging' });
}

export const STAGING_URL = 'https://staging.dashboard.triargos.de/api';
