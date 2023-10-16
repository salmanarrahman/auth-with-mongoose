import express from 'express';
import { controllerAdmin } from './controller';
import validateRequest from '../../shared/validateRequest';
import { controllerAuth } from '../auth/controller';
import { AuthValidation } from '../auth/validation';

const router = express.Router()

router.post('/create-admin', controllerAdmin.createAdmin)
router.post('/login', validateRequest(AuthValidation.loginZodSchema), controllerAuth.loginAdmin)


export const adminRoute = {
    router
}