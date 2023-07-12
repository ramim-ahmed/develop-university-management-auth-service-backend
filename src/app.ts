import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import applicationRoutes from './routes';
import httpStatus from 'http-status';
const app: Application = express();
// middlware setup
app.use(cors()); // set origin policy
app.use(express.json()); // parser
app.use(express.urlencoded({ extended: true })); // any data parser

// // application routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server running on port: 5000',
  });
});
app.use('/api/v1', applicationRoutes);
// global error handler
app.use(globalErrorHandler);

// handle not found routes
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found!!',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found!!',
      },
    ],
  });
  next();
});
export default app;
