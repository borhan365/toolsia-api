import express from 'express'
import { createDoctorType, deleteDoctorType, editDoctorType, getAllDoctorTypes, getSingleDoctorType } from '../controllers/doctorTypeController.js'
const router = express.Router()

router.post('/', createDoctorType)
router.get('/:slug', getSingleDoctorType)
router.delete('/:slug', deleteDoctorType)
router.get('/', getAllDoctorTypes)
router.put('/:slug', editDoctorType)

export default router; 