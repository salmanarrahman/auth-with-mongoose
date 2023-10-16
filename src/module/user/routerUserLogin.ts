import express from 'express';
import { controllerUser } from './controllerUser';
import auth from '../../middlewares/auth';
import { ROLES } from '../../enum/roles';
import { controllerAuth } from '../auth/controller';

const router = express.Router()

router.post(
    '/signup',
    controllerUser.createUser
)
router.post(
    '/login',
    controllerAuth.signInUser
)
router.post('/refresh-token', controllerAuth.refreshToken)

export const routerUserLogin = {
    router
}