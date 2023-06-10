import express from 'express';
import { allPharmacyController, createPharmacyController, deletePharmacyController, detailsPharmacyController, updatePharmacyController } from '../controllers/pharmacyController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createPharmacyController)
router.get('/', allPharmacyController)
router.get('/:slug', detailsPharmacyController)
router.put('/:slug', updatePharmacyController)
router.delete('/:id', deletePharmacyController)

export default router;