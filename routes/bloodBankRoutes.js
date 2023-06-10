import express from 'express';
import { allBloodBankController, createBloodBankController, deleteBloodBankController, detailsBloodBankController, updateBloodBankController } from '../controllers/bloodBankController.js';

const router = express.Router()

router.post('/', createBloodBankController)
router.get('/', allBloodBankController)
router.get('/:slug', detailsBloodBankController)
router.put('/:slug', updateBloodBankController)
router.delete('/:id', deleteBloodBankController)

export default router;