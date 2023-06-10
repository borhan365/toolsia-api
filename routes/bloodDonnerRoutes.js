import express from 'express';
import { allBloodDonnerController, createBloodDonnerController, deleteBloodDonnerController, detailsBloodDonnerController, updateBloodDonnerController } from '../controllers/bloodDonnerController.js';

const router = express.Router()

router.post('/', createBloodDonnerController)
router.get('/', allBloodDonnerController)
router.get('/:enSlug', detailsBloodDonnerController)
router.put('/:enSlug', updateBloodDonnerController)
router.delete('/:id', deleteBloodDonnerController)

export default router;