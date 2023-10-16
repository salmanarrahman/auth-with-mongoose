import catchAsync from "../../shared/catchAsync";
import { NextFunction, Request, Response } from 'express';
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { service } from "./service";
import { ILoginAdminResponse, IRefreshTokenResponse } from "./interface";
import config from "../../config";


const loginAdmin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { ...data } = req.body

        const result = await service.loginAdmin(data)
        const { refreshToken, ...others } = result

        const cookieOptions = {
            secure: config.env == 'production',
            httpOnly: true
        }

        res.cookie('refreshToken', refreshToken, cookieOptions)

        sendResponse<ILoginAdminResponse>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Login successfull",
            data: others
        })

        next()

    }
)
const signInUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { ...data } = req.body

        const result = await service.signInUser(data)
        const { refreshToken, ...others } = result

        const cookieOptions = {
            secure: config.env == 'production',
            httpOnly: true
        }

        res.cookie('refreshToken', refreshToken, cookieOptions)

        sendResponse<ILoginAdminResponse>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Login successfull",
            data: others
        })

        next()

    }
)

const refreshToken = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { refreshToken } = req.cookies


        const result = await service.refershToken(refreshToken)


        const cookieOptions = {
            secure: config.env == 'production',
            httpOnly: true
        }

        res.cookie('refreshToken', refreshToken, cookieOptions)

        sendResponse<IRefreshTokenResponse>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Refresh token generated successfully successfull",
            data: result
        })

        next()

    }
)

export const controllerAuth = {
    loginAdmin,
    refreshToken,
    signInUser
}