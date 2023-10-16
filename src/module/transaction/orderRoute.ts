import express from 'express';
import { orderController } from './orderController';


const router = express.Router()

router.post(
    '/create-order',
    orderController.createOrder
)


export const orderRoute = {
    router
} 