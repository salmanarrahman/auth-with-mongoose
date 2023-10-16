import catchAsync from "../../shared/catchAsync";
import { NextFunction, Request, Response } from 'express';
import { serviceCow } from "./cowService";
import httpStatus from 'http-status';
import sendResponse from "../../shared/sendResponse";
import { ICow } from "./interface";
import { cowSearchableFields } from "./constants";
import pick from "../../shared/pick"
import { paginationFields } from "../../shared/pagination";


const createCow = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { ...cowData } = req.body
        const result = await serviceCow.createCow(
            cowData
        )

        sendResponse<ICow>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Cow created successfully",
            data: result
        })

        next()

    }
)

const showAllCow = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const filters = pick(req.query, cowSearchableFields);
        const paginationOptions = pick(req.query, paginationFields);



        const result = await serviceCow.showAllCow(paginationOptions, filters)

        sendResponse<ICow[]>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Cow retrieved successfully",
            meta: result.meta,
            data: result.data
        })

        next()

    }
)

const showsingleCow = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const id: string = req.params.id

        const result = await serviceCow.getSingleCow(id)

        sendResponse<ICow>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Cow retrieved successfully",
            data: result
        })

        next()

    }
)

const updateCow = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const cowId: string = req.params.id
        const payload = req.body
        const result = await serviceCow.updateCow(cowId, payload)


        sendResponse<ICow>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Cow updated Successfully',
            data: result,
        });
        next()

    }
)

const deleteSingleCow = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const userId: string = req.params.id
        const result = await serviceCow.deleteSingleCow(userId)


        sendResponse<ICow>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Cow deleted Successfully',
            data: result,
        });
        next()

    }
)

export const controllerCow = {
    createCow,
    showAllCow,
    showsingleCow,
    updateCow,
    deleteSingleCow
}