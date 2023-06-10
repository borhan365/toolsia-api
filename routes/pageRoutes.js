import express from 'express';
import { allPageController, createPageController, deletePageController, detailsPageController, updatePageController } from '../controllers/pageController.js';

const router = express.Router()

router.post('/', createPageController)
router.get('/', allPageController)
router.get('/:enSlug', detailsPageController)
router.put('/:enSlug', updatePageController)
router.delete('/:id', deletePageController)

export default router;