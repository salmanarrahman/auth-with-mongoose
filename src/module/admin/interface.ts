import { Model } from "mongoose";

export type role = 'admin'

export type Iadmin = {
    password?: string;
    role: role;
    name: {
        firstName: string;
        lastName: string;
    };
    phoneNumber: string;
    address: string;
}

export type adminModel = {
    isExist(
        password: string
    ): Promise<Pick<Iadmin, 'phoneNumber' | 'password' | 'role'>>;
    isPasswordMatched(
        givenPassword: string,
        savedPassword: string,
    ): Promise<boolean>;
} & Model<Iadmin>
