"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Procurat = void 0;
const openapi_fetch_1 = __importDefault(require("openapi-fetch"));
class Procurat {
    constructor({ baseUrl, apiKey }) {
        this.client = (0, openapi_fetch_1.default)({
            baseUrl, headers: {
                'X-API-KEY': apiKey
            }
        });
    }
}
exports.Procurat = Procurat;
