import express from 'express';
import { createNewUser } from './users.controller';
const router = express.Router();

router.post('/create-user', createNewUser);

export default router;
