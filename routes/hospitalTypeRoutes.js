import express from 'express'
import { createHospitalType, deleteHospitalType, editHospitalType, getAllHospitalTypes, getSingleHospitalType } from '../controllers/hospitalTypeController.js'
const router = express.Router()

router.post('/', createHospitalType)
router.get('/:id', getSingleHospitalType)
router.delete('/:id', deleteHospitalType)
router.get('/', getAllHospitalTypes)
router.put('/:id', editHospitalType)

export default router; 