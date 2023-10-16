import { Schema, model } from "mongoose";
import { userRole } from "./constant";
import IUser, { userModel } from "./interface";
import config from "../../config";
import bcrypt from 'bcrypt'


const userSchema = new Schema<IUser, userModel>({
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: userRole
  },
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  income: {
    type: Number,
    required: true
  }

},

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }


);

userSchema.statics.isExist = async function (phoneNumber: string):
  Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'> | null> {

  return await User.findOne({ phoneNumber }, {
    phoneNumber: 1, password: 1, role: 1
  })


}

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {

  return await bcrypt.compare(givenPassword, savedPassword)

}


userSchema.pre('save', async function (next) {

  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})


export const User = model<IUser, userModel>(
  'user',
  userSchema
)
