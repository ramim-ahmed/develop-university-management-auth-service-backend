import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/users/user.route';
const app: Application = express();
// middlware setup
app.use(cors()); // set origin policy
app.use(express.json()); // parser
app.use(express.urlencoded({ extended: true })); // any data parser

// // application routes
// app.get('/', (req, res, next) => {
//   throw new Error('testing looger');
// });
app.use('/api/v1/users', UserRoutes);

// global error handler
app.use(globalErrorHandler);
export default app;
