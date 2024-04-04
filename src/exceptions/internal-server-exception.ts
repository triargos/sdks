import {ApiException} from "./api-exception";

export class InternalServerException extends ApiException {
    constructor(message: string, status: number) {
        super(message, status);
        this.name = 'InternalServerException';
    }
}