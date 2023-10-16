import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../shared/jwtHelper";
import { Admins } from "../admin/model";
import { ILogin, ILoginAdminResponse, IRefreshTokenResponse } from "./interface"
import httpStatus from 'http-status';
import { User } from "../user/model";


const loginAdmin = async (payload: ILogin): Promise<ILoginAdminResponse> => {

    const { phoneNumber, password } = payload;

    const isAdminExist = await Admins.isExist(phoneNumber)
    const role = isAdminExist.role;
    if (!isAdminExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
    }

    if (isAdminExist.password &&
        !(await Admins.isPasswordMatched(password, isAdminExist.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');

    }

    const accessToken = jwtHelpers.createToken(
        { phoneNumber, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    )
    const refreshToken = jwtHelpers.createToken({
        phoneNumber,  role
    },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    )




    return {
        accessToken,
        refreshToken
    }



}

const signInUser = async (payload: ILogin): Promise<ILoginAdminResponse> => {

    const { phoneNumber, password } = payload;

    const isUserExist = await User.isExist(phoneNumber)
    const role = isUserExist.role;
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    if (isUserExist.password &&
        !(await Admins.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');

    }

    const accessToken = jwtHelpers.createToken(
        { phoneNumber, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    )
    const refreshToken = jwtHelpers.createToken({
        phoneNumber,  role
    },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    )




    return {
        accessToken,
        refreshToken
    }



}

const refershToken = async (token: string): Promise<IRefreshTokenResponse> => {

    let verifiedToken: JwtPayload;

    try {
        verifiedToken = jwtHelpers.verifyToken(
            token,
            config.jwt.refresh_secret as Secret
        )
    } catch (error) {

        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');

    }

    const { phoneNumber, role } = verifiedToken

    let isExitst: any = null


    if (role === 'admin') {
        isExitst = await Admins.isExist(phoneNumber)
        if (!isExitst) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');

        }
    } else if (role === 'seller' || 'buyer') {
        isExitst = await User.isExist(phoneNumber)
        if (!isExitst) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');

        }
    }

    const newAccessToken = jwtHelpers.createToken(
        {
            phoneNumber: isExitst.phoneNumber,
            role: isExitst.role
        },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    )

    return {
        accessToken: newAccessToken
    }


}

export const service = {
    loginAdmin,
    signInUser,
    refershToken
}