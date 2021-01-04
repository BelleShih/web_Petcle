import express from 'express'
import { create, login } from '../controllers/users.js'

const router = express.Router()

router.post('/', create)
router.post('/login', login)

export default router
