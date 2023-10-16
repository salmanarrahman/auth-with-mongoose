import catchAsync from "../../shared/catchAsync";
import { NextFunction, Request, Response } from 'express';
import { service } from "./service";
import sendResponse from "../../shared/sendResponse";
import { Iadmin } from "./interface";
import httpStatus from "http-status";


const createAdmin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { ...data } = req.body
        const result = await service.createAdmin(data)

        const {name,role,phoneNumber,address} = result

        sendResponse<Iadmin>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Admin created successfully",
            data: {
                name:name,
                role:role,
                phoneNumber:phoneNumber,
                address
            }
        })
        next()

    }
)


export const controllerAdmin = {
    createAdmin,
}