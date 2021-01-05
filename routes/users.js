import express from 'express'
import { create, login, logout, heartbeat } from '../controllers/users.js'

const router = express.Router()

router.post('/', create)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/heartbeat', heartbeat)

export default router
