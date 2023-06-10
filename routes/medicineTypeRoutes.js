import express from 'express'
import { createMedicineType, deleteMedicineType, editMedicineType, getAllMedicineTypes, getSingleMedicineType } from '../controllers/medicineTypeController.js'
const router = express.Router()

router.post('/', createMedicineType)
router.get('/:id', getSingleMedicineType)
router.delete('/:id', deleteMedicineType)
router.get('/', getAllMedicineTypes)
router.put('/:id', editMedicineType)

export default router; 