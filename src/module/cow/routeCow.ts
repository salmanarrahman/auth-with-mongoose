import express from 'express';
import { controllerCow } from './controllerCow';
import auth from '../../middlewares/auth';
import { ROLES } from '../../enum/roles';

const router = express.Router()

router.post(
    '/create-cow',
    auth(ROLES.SELLER),
    controllerCow.createCow
)
router.get(
    '/',
    auth(ROLES.SELLER, ROLES.BUYER, ROLES.ADMIN),
    controllerCow.showAllCow
)
router.get(
    '/:id',
    auth(ROLES.SELLER, ROLES.BUYER, ROLES.ADMIN),

    controllerCow.showsingleCow
)

router.patch(
    '/:id',
    auth(ROLES.SELLER),

    controllerCow.updateCow
)

router.delete(
    '/:id',
    auth(ROLES.SELLER),
    controllerCow.deleteSingleCow
)


export const routerCow = {
    router
}