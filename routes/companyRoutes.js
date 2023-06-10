import express from 'express';
import { allCompanyController, createCompanyController, deleteCompanyController, detailsCompanyController, updateCompanyController } from '../controllers/companyController.js';

const router = express.Router()

router.post('/', createCompanyController)
router.get('/:enSlug', detailsCompanyController)
router.get('/', allCompanyController)
router.put('/:enSlug', updateCompanyController)
router.delete('/:id', deleteCompanyController)

export default router;