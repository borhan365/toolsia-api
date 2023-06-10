import express from 'express';
import { allSoftwareController, createSoftwareController, deleteAllSoftwareController, deleteSoftwareController, detailsSoftwareController, updateSoftwareController } from '../controllers/softwareController.js';

const router = express.Router()

router.post('/', createSoftwareController)
router.get('/:slug', detailsSoftwareController)
router.get('/', allSoftwareController)
router.put('/:slug', updateSoftwareController)
router.delete('/:id', deleteSoftwareController)
router.delete('/', deleteAllSoftwareController)

export default router;