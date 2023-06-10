import express from 'express';
import { botController } from '../controllers/botController.js';

const router = express.Router()

router.get('/', botController)

export default router;