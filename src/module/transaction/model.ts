import mongoose, { Schema, model } from "mongoose";
import { IOrder } from "./interface";

const orderSchema = new mongoose.Schema({

    cow: {
        type: Schema.Types.ObjectId,
        ref: 'cow',
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}
);

export const Order = model<IOrder>(
    'order',
    orderSchema
)