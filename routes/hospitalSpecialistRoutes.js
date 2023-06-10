import express from 'express'
import { createHospitalSpecialist, deleteHospitalSpecialist, editHospitalSpecialist, getAllHospitalSpecialists, getSingleHospitalSpecialist } from '../controllers/hospitalSpecialistController.js'
const router = express.Router()

router.post('/', createHospitalSpecialist)
router.get('/:id', getSingleHospitalSpecialist)
router.delete('/:id', deleteHospitalSpecialist)
router.get('/', getAllHospitalSpecialists)
router.put('/:id', editHospitalSpecialist)

export default router; 