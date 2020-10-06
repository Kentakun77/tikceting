import {CustomError} from "./custom-error";

export class NotAuthorizedError extends  CustomError{
    statusCode = 401;
    constructor() {
        super('No estas autorizado');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{message: 'No estas autorizado'}];
    }
};