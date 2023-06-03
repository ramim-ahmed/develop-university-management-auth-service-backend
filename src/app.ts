import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './app/modules/users/users.route';
const app: Application = express();
// middlware setup
app.use(cors()); // set origin policy
app.use(express.json()); // parser
app.use(express.urlencoded({ extended: true })); // any data parser

app.get('/', async (req: Request, res: Response) => {
  res.send('Server running.......');
});
// application routes
app.use('/api/v1/users', userRoutes);
export default app;
