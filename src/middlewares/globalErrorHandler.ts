import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { IGenericErrorMessage } from '../interface/error';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import { MongoServerError } from 'mongodb';
import handleDuplicateError from '../errors/handleDuplicateError';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';



const globalErrorHandler : ErrorRequestHandler = 
(
    error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
let statusCode = 500;
let message = 'something Wrong'
let errorMessages : IGenericErrorMessage[] = []


if(error?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
}else if(error instanceof ApiError){
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
}else if (error instanceof MongoServerError &&  error.code === 'E11000'){
    const simplifiedError = handleDuplicateError(error)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
}
else if (error instanceof Error){
    message = error?.message
    errorMessages = error?.message?
    [{
        path:'',
        message: error?.message
    }]:[]
}

res.status(statusCode).json({
    success:false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error.stack : undefined
})


}

export default globalErrorHandler;