import express from 'express'
import { createDegree, deleteDegree, editDegree, getAllDegrees, getSingleDegree } from '../controllers/degreeController.js'
const router = express.Router()

router.post('/', createDegree)
router.get('/:id', getSingleDegree)
router.delete('/:id', deleteDegree)
router.get('/', getAllDegrees)
router.put('/:id', editDegree)

export default router; 