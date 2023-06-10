import express from 'express'
import { createService, deleteService, editService, getAllServices, getSingleService } from '../controllers/servicesController.js'
const router = express.Router()

router.post('/', createService)
router.get('/:id', getSingleService)
router.delete('/:id', deleteService)
router.get('/', getAllServices)
router.put('/:id', editService)

export default router; 