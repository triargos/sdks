"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = exports.DEVELOPMENT_URL = exports.PRODUCTION_URL = void 0;
const openapi_fetch_1 = __importDefault(require("openapi-fetch"));
exports.PRODUCTION_URL = 'https://elternportal.triargos.de';
exports.DEVELOPMENT_URL = 'http://localhost:5173';
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
        switch (environment) {
            case 'production':
                return exports.PRODUCTION_URL;
            case 'development':
                return exports.DEVELOPMENT_URL;
            default:
                throw new Error(`Unknown environment: ${environment}`);
        }
    }
}
exports.Dashboard = Dashboard;
