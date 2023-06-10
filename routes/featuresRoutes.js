import express from 'express'
import { createFeature, deleteFeature, editFeature, getAllFeatures, getSingleFeature } from '../controllers/featuresController.js'
const router = express.Router()

router.post('/', createFeature)
router.get('/:id', getSingleFeature)
router.delete('/:id', deleteFeature)
router.get('/', getAllFeatures)
router.put('/:id', editFeature)

export default router; 