"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = exports.DEVELOPMENT_URL = exports.STAGING_URL = exports.PRODUCTION_URL = void 0;
const client_1 = require("./client");
exports.PRODUCTION_URL = 'https://dashboard.triargos.de/api';
exports.STAGING_URL = 'https://staging.dashboard.triargos.de/api';
exports.DEVELOPMENT_URL = 'http://localhost:3000/api';
class Dashboard extends client_1.GeneratedDashboard {
    constructor({ apiKey, environment = 'production', }) {
        super({
            BASE: environment === 'production'
                ? exports.PRODUCTION_URL
                : environment === 'staging'
                    ? exports.STAGING_URL
                    : exports.DEVELOPMENT_URL,
            HEADERS: { 'Content-Type': 'application/json', 'X-Api-Key': apiKey },
        });
    }
}
exports.Dashboard = Dashboard;
