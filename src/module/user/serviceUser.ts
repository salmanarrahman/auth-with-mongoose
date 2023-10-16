import httpStatus from "http-status";
import { userRole } from "./constant";
import IUser from "./interface";
import { User } from "./model";
import ApiError from "../../errors/ApiError";
import { ErrorDescription, MongoServerError, ObjectId } from "mongodb";
import handleDuplicateError from "../../errors/handleDuplicateError";
import { Error } from "mongoose";

const createUser = async (payload: IUser): Promise<IUser> => {

    const { phoneNumber } = payload

    if (!userRole.includes(payload.role)) {

        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Role');
    }

    const find = await User.findOne({ phoneNumber })
    const er: ErrorDescription = {
        code: 'E11000',
        message: 'Duplicate Entry',
        details: 'Phone Number exist',
    };
    if (find) {
        throw new MongoServerError(er)

    }

    const result = await User.create(payload)

    return result;

}

const showAllUser = async (): Promise<IUser[]> => {
    const result = await User.find({})
    return result;
}

const getSingleUser = async (payload: string): Promise<IUser | null> => {
    const result = await User.findById({ _id: new ObjectId(payload) })
    return result;
}

const updateUser = async (id: string | undefined, payload: Partial<IUser | undefined>): Promise<IUser | null> => {
    if (payload?.role && payload.role !== undefined) {
        const role: string = String(payload?.role)
        if (!userRole.includes(role)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Role');
        }
    }
    const result = await User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

const deleteSingleUser = async (payload: string): Promise<IUser | null> => {
    const result = await User.findByIdAndDelete({ _id: new ObjectId(payload) })
    return result;
}

export const serviceUser = {
    createUser,
    showAllUser,
    getSingleUser,
    updateUser,
    deleteSingleUser
}

