import express from 'express';
import { addSaree, getAllSarees, getSareeById, updateSaree, deleteSaree } from '../controllers/sareeController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import upload from "../middleware/upload.js";

const router = express.Router();

router.post('/', upload.single("image"), protectAdmin, addSaree);
router.get('/', getAllSarees);
router.get('/:id', getSareeById);
router.put('/:id', protectAdmin, updateSaree);
router.delete('/:id', protectAdmin, deleteSaree);

export default router;