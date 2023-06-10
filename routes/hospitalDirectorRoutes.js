import express from 'express'
import { createHospitalDirector, deleteHospitalDirector, editHospitalDirector, getAllHospitalDirectors, getSingleHospitalDirector } from '../controllers/hospitalDirectorController.js'
const router = express.Router()

router.post('/', createHospitalDirector)
router.get('/:slug', getSingleHospitalDirector)
router.delete('/:id', deleteHospitalDirector)
router.get('/', getAllHospitalDirectors)
router.put('/:slug', editHospitalDirector)

export default router; 