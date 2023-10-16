import { Model } from "mongoose";

export type IuserName = {
    firstName: string;
    lastName: string;
}

export type IUserrole = "buyer" | "seller"

export type IUser = {
    password?: string;
    role: string;
    name: IuserName;
    phoneNumber: string;
    address: string;
    budget: number;
    income: number;

}

export type userModel = {
    isExist(
        password: string
    ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'>>;
    isPasswordMatched(
        givenPassword: string,
        savedPassword: string,
    ): Promise<boolean>;
} & Model<IUser>


export default IUser;
