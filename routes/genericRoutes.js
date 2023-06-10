import express from 'express'
import { createGeneric, deleteGeneric, editGeneric, getAllGenerics, getSingleGeneric } from '../controllers/genericController.js'
const router = express.Router()

router.post('/', createGeneric)
router.get('/:id', getSingleGeneric)
router.delete('/:id', deleteGeneric)
router.get('/', getAllGenerics)
router.put('/:id', editGeneric)

export default router; 