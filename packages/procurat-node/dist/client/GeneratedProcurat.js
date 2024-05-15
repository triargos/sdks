"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratedProcurat = void 0;
const OpenAPI_1 = require("./core/OpenAPI");
const AxiosHttpRequest_1 = require("./core/AxiosHttpRequest");
const services_gen_1 = require("./services.gen");
class GeneratedProcurat {
    constructor(config, HttpRequest = AxiosHttpRequest_1.AxiosHttpRequest) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.request = new HttpRequest({
            BASE: (_a = config === null || config === void 0 ? void 0 : config.BASE) !== null && _a !== void 0 ? _a : "http://localhost:8080/procurat_server_war_exploded/spring",
            VERSION: (_b = config === null || config === void 0 ? void 0 : config.VERSION) !== null && _b !== void 0 ? _b : "0",
            WITH_CREDENTIALS: (_c = config === null || config === void 0 ? void 0 : config.WITH_CREDENTIALS) !== null && _c !== void 0 ? _c : false,
            CREDENTIALS: (_d = config === null || config === void 0 ? void 0 : config.CREDENTIALS) !== null && _d !== void 0 ? _d : "include",
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
        this.address = new services_gen_1.AddressService(this.request);
        this.countries = new services_gen_1.CountriesService(this.request);
        this.districts = new services_gen_1.DistrictsService(this.request);
        this.groups = new services_gen_1.GroupsService(this.request);
        this.person = new services_gen_1.PersonService(this.request);
        this.relationships = new services_gen_1.RelationshipsService(this.request);
        this.religions = new services_gen_1.ReligionsService(this.request);
    }
}
exports.GeneratedProcurat = GeneratedProcurat;
