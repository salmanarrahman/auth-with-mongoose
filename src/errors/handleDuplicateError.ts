import { MongoServerError } from "mongodb";
import { IGenericErrorMessage, IGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (error: MongoServerError): IGenericErrorResponse => {


    const errors: IGenericErrorMessage[] = [
        {
            path: error.path,
            message: 'Duplicate Error. Phone Number exist'
        }
    ]

    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages: errors
    }


}

export default handleDuplicateError;