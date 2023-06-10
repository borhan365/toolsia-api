import express from 'express';
import { scrapeWebsite } from '../controllers/medexController.js'

const router = express.Router()

router.get('/', scrapeWebsite)

export default router;