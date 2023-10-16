import express from 'express';
import { controllerAuth } from './controller';
import { AuthValidation } from './validation';
import validateRequest from '../../shared/validateRequest';

const router = express.Router()

router.post('/login', validateRequest(AuthValidation.loginZodSchema), controllerAuth.loginAdmin)
router.post('/refresh-token', controllerAuth.refreshToken)

export const authRoute = {
    router
}