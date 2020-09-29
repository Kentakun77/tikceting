import { CustomError } from './custom-error';
export class DatabaseConnectionError extends CustomError{
    statusCode = 500;
    reason = 'Error al conectar a la BD'
    constructor() {
        super('Error al conectar a la BD');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
    serializeErrors(){
        return[
            { message: this.reason}
        ]
    }
}