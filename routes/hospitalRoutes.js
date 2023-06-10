import express from 'express';
import { allHospitalController, createHospitalController, deleteAllHospitalController, deleteHospitalController, detailsHospitalController, updateHospitalController } from '../controllers/hospitalController.js';

const router = express.Router()

router.post('/', createHospitalController)
router.get('/', allHospitalController)
router.delete('/delete', deleteAllHospitalController)
router.get('/:enSlug', detailsHospitalController)
router.put('/:enSlug', updateHospitalController)
router.delete('/:id', deleteHospitalController)

export default router;