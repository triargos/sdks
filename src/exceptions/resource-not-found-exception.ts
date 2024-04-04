import {ApiException} from "./api-exception";

export class ResourceNotFoundException extends ApiException {
    constructor(message: string, status: number) {
        super(message, status);
        this.name = 'ResourceNotFoundException';
    }
}