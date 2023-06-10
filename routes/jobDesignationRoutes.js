import express from 'express'
import { createJobDesignation, deleteJobDesignation, editJobDesignation, getAllJobDesignations, getSingleJobDesignation } from '../controllers/jobDesignationController.js'
const router = express.Router()

router.post('/', createJobDesignation)
router.get('/:id', getSingleJobDesignation)
router.delete('/:id', deleteJobDesignation)
router.get('/', getAllJobDesignations)
router.put('/:id', editJobDesignation)

export default router; 