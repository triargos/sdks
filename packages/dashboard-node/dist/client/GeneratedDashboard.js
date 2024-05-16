"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratedDashboard = void 0;
const OpenAPI_1 = require("./core/OpenAPI");
const AxiosHttpRequest_1 = require("./core/AxiosHttpRequest");
const services_gen_1 = require("./services.gen");
const services_gen_2 = require("./services.gen");
const services_gen_3 = require("./services.gen");
class GeneratedDashboard {
    constructor(config, HttpRequest = AxiosHttpRequest_1.AxiosHttpRequest) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.request = new HttpRequest({
            BASE: (_a = config === null || config === void 0 ? void 0 : config.BASE) !== null && _a !== void 0 ? _a : 'https://dashboard.triargos.de/api',
            VERSION: (_b = config === null || config === void 0 ? void 0 : config.VERSION) !== null && _b !== void 0 ? _b : '0.0.1',
            WITH_CREDENTIALS: (_c = config === null || config === void 0 ? void 0 : config.WITH_CREDENTIALS) !== null && _c !== void 0 ? _c : false,
            CREDENTIALS: (_d = config === null || config === void 0 ? void 0 : config.CREDENTIALS) !== null && _d !== void 0 ? _d : 'include',
            TOKEN: config === null || config === void 0 ? void 0 : config.TOKEN,
            USERNAME: config === null || config === void 0 ? void 0 : config.USERNAME,
            PASSWORD: config === null || config === void 0 ? void 0 : config.PASSWORD,
            HEADERS: config === null || config === void 0 ? void 0 : config.HEADERS,
            ENCODE_PATH: config === null || config === void 0 ? void 0 : config.ENCODE_PATH,
            interceptors: {
                request: (_f = (_e = config === null || config === void 0 ? void 0 : config.interceptors) === null || _e === void 0 ? void 0 : _e.request) !== null && _f !== void 0 ? _f : new OpenAPI_1.Interceptors(),
                response: (_h = (_g = config === null || config === void 0 ? void 0 : config.interceptors) === null || _g === void 0 ? void 0 : _g.response) !== null && _h !== void 0 ? _h : new OpenAPI_1.Interceptors(),
            },
        });
        this.groups = new services_gen_1.GroupsService(this.request);
        this.organizations = new services_gen_2.OrganizationsService(this.request);
        this.persons = new services_gen_3.PersonsService(this.request);
    }
}
exports.GeneratedDashboard = GeneratedDashboard;
