import express from 'express';
import { addSaree, getAllSarees } from '../controllers/sareeController.js';

const router = express.Router();

router.post('/', addSaree);
router.get('/', getAllSarees);

export default router;