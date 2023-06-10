import express from 'express'
import { createLogo, editLogo, getLogos, logoList } from '../controllers/LogoController.js'
const router = express.Router()


router.post('/', createLogo)
router.get('/:id', getLogos)
router.get('/', logoList)
router.put('/:id', editLogo)


export default router