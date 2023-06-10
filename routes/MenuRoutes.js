import express from 'express'
import { createMenu, menuList } from '../controllers/menuController.js'
const router = express.Router()


router.post('/', createMenu)
router.get('/', menuList)


export default router