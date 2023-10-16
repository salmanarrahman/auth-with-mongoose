import express from 'express';
import { controllerUser } from './controllerUser';
import auth from '../../middlewares/auth';
import { ROLES } from '../../enum/roles';
import { controllerAuth } from '../auth/controller';

const router = express.Router()

// router.post(
//     '/signup',
//     controllerUser.createUser
// )
// router.post(
//     '/signin',
//     controllerAuth.signInUser
// )
router.get(
    '/',
    auth(ROLES.ADMIN),
    controllerUser.showAllUser
)
router.get(
    '/:id',
    auth(ROLES.ADMIN),
    controllerUser.getSingleUser
)

router.patch(
    '/:id',
    auth(ROLES.ADMIN),
    controllerUser.updateUser
)

router.delete(
    '/:id',
    auth(ROLES.ADMIN),
    controllerUser.deleteSingleUser
)


export const routerUser = {
    router
}