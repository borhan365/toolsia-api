import express from 'express';
import { allOxygenController, createOxygenController, deleteOxygenController, detailsOxygenController, updateOxygenController } from '../controllers/oxygenController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createOxygenController)
router.get('/', allOxygenController)
router.get('/:slug', detailsOxygenController)
router.put('/:slug', updateOxygenController)
router.delete('/:id', deleteOxygenController)

export default router;