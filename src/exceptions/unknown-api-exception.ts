import {ApiException} from "./api-exception";

export class UnknownApiException extends ApiException {
    constructor(message: string, status: number) {
        super(message, status);
        this.name = 'UnknownApiException';
    }
}