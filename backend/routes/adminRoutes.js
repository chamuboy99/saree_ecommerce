import { login } from "../controllers/adminController.js";
import express from 'express';

const router = express.Router();

router.post('/login', login);

export default router;