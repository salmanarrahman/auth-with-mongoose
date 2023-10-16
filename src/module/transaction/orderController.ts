import catchAsync from "../../shared/catchAsync";
import { NextFunction, Request, Response } from 'express';
import { serviceOrder } from "./orderService";
import sendResponse from "../../shared/sendResponse";
import { IOrder } from "./interface";
import httpStatus from 'http-status';



const createOrder = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { ...order } = req.body;
        const result = await serviceOrder.createOrder(order)

        sendResponse<IOrder>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Order Created Successfully',
            data: result
        })

        next()

    }
)

export const orderController = {
    createOrder
}