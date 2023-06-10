import express from 'express'
import { createSpecialist, deleteSpecialist, editSpecialist, getAllSpecialists, getSingleSpecialist } from '../controllers/specialistController.js'
const router = express.Router()

router.post('/', createSpecialist)
router.get('/:enSlug', getSingleSpecialist)
router.delete('/:id', deleteSpecialist)
router.get('/', getAllSpecialists)
router.put('/:enSlug', editSpecialist)

export default router; 