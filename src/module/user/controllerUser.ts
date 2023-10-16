import catchAsync from "../../shared/catchAsync";
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sendResponse from "../../shared/sendResponse";
import { serviceUser } from './serviceUser'
import IUser from "./interface";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { ...userData } = req.body;


  const result = await serviceUser.createUser(
    userData
  );

  const {role,name,phoneNumber,address,budget,income} = result

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: {
      role,
      name,
      phoneNumber,
      address,
      budget,
      income
    },
  });
  next()
});

const showAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await serviceUser.showAllUser()


    sendResponse<IUser[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User Retrieved Successfully',
      data: result,
    });

  }
)

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id
    const result = await serviceUser.getSingleUser(userId)

    if (result == null) {
      sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'No user found',
        data: result,
      });
      next()
    } else {
      sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User Retrieved Successfully',
        data: result,
      });
      next()
    }




  }
)

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id
    const payload = req.body
    const result = await serviceUser.updateUser(userId, payload)


    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User Retrieved Successfully',
      data: result,
    });
    next()

  }
)

const deleteSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const userId: string = req.params.id
    const result = await serviceUser.deleteSingleUser(userId)


    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User deleted Successfully',
      data: result,
    });
    next()

  }
)

export const controllerUser = {
  createUser,
  showAllUser,
  getSingleUser,
  updateUser,
  deleteSingleUser,
}