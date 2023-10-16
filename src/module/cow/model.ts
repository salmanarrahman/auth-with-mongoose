import mongoose, { Schema, model } from "mongoose";
import { category, cowBreed, label, location } from "./constants";
import { ICow } from "./interface";
import config from "../../config";

const cowSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: location
    },
    breed: {
        type: String,
        required: true,
        enum: cowBreed
    },
    weight: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: label
    },
    category: {
        type: String,
        required: true,
        enum: category
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);


export const Cow = model<ICow>(
    'cow',
    cowSchema
)