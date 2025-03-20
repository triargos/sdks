"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = exports.DEVELOPMENT_URL = exports.STAGING_URL = exports.PRODUCTION_URL = void 0;
const openapi_fetch_1 = __importDefault(require("openapi-fetch"));
exports.PRODUCTION_URL = 'https://elternportal.triargos.de';
exports.STAGING_URL = 'https://dashboard.staging.triargos.de';
exports.DEVELOPMENT_URL = 'http://localhost:3000';
class Dashboard {
    constructor({ apiKey, environment = 'production', }) {
        this.client = (0, openapi_fetch_1.default)({
            baseUrl: this.getBaseUrl(environment),
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        });
    }
    getBaseUrl(environment) {
        return environment === 'production'
            ? exports.PRODUCTION_URL
            : environment === 'staging'
                ? exports.STAGING_URL
                : exports.DEVELOPMENT_URL;
    }
}
exports.Dashboard = Dashboard;
