import cors from 'cors';

import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { routerUser } from './module/user/routerUser';
import { routerCow } from './module/cow/routeCow';
import { orderRoute } from './module/transaction/orderRoute';
import { adminRoute } from './module/admin/route';
import { authRoute } from './module/auth/route';
import httpStatus from 'http-status';

import cookieParser from 'cookie-parser';
import { routerUserLogin } from './module/user/routerUserLogin';

const app: Application = express();

app.use(cors());

app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', routerUser.router)
app.use('/api/v1/auth', routerUserLogin.router)
app.use('/api/v1/cows', routerCow.router)
app.use('/api/v1/orders', orderRoute.router)
app.use('/api/v1/admins', adminRoute.router)
//app.use('/api/v1/auth', authRoute.router)



//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

app.use(globalErrorHandler);

export default app; 