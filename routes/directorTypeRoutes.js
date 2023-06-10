import express from 'express'
import { createDirectorType, deleteDirectorType, editDirectorType, getAllDirectorTypes, getSingleDirectorType } from '../controllers/directorTypeController.js'
const router = express.Router()

router.post('/', createDirectorType)
router.get('/:id', getSingleDirectorType)
router.delete('/:id', deleteDirectorType)
router.get('/', getAllDirectorTypes)
router.put('/:id', editDirectorType)

export default router; 