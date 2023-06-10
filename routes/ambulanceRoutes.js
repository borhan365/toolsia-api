import express from 'express';
import { allAmbulanceController, createAmbulanceController, deleteAmbulanceController, detailsAmbulanceController, updateAmbulanceController } from '../controllers/ambulanceController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createAmbulanceController)
router.get('/', allAmbulanceController)
router.get('/:slug', detailsAmbulanceController)
router.put('/:slug', updateAmbulanceController)
router.delete('/:id', deleteAmbulanceController)

export default router;