import mongoose, { Schema, model } from 'mongoose';
import { AdminRole } from './constant';
import { Iadmin, adminModel } from './interface';
import { NextFunction } from 'express';
import bcrypt from 'bcrypt'
import config from '../../config';

const adminSchema = new Schema<Iadmin, adminModel>({
    password: {
        type: String,
        required: true,
        select: 0
    },
    role: {
        type: String,
        required: true,
        enum: AdminRole
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,

    },
    address: {
        type: String,
        required: true,
    },
});


adminSchema.statics.isExist = async function (phoneNumber: string):
    Promise<Pick<Iadmin, 'phoneNumber' | 'password' | 'role'> | null> {

    return await Admins.findOne({ phoneNumber }, {
        phoneNumber: 1, password: 1, role: 1
    })


}

adminSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {

    return await bcrypt.compare(givenPassword, savedPassword)

}

adminSchema.pre('save', async function (next) {

    const admin = this;
    admin.password = await bcrypt.hash(
        admin.password,
        Number(config.bcrypt_salt_rounds)
    )
    next()
})



export const Admins = model<Iadmin, adminModel>(
    'admin',
    adminSchema
)