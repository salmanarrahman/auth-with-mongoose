import { IOrder } from "./interface";
import { Order } from "./model";

const createOrder = async (payload: IOrder): Promise<IOrder> => {

    const { cow, buyer } = payload

    const result = await Order.create(payload)

    return result;

}

export const serviceOrder = {
    createOrder
}