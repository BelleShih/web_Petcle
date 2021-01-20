import express from 'express'
import { create, login, logout, heartbeat } from '../controllers/users.js'

const router = express.Router()

router.post('/', create)
router.post('/login', login)
router.delete('/logout', logout)
// // 上傳使用者照片
// router.patch('/:id', userphoto)
// // 編輯使用者照片
// router.patch('/file/:id', editphoto)
// // 刪除使用者照片
// router.delete('/file/:id', delphoto)
router.get('/heartbeat', heartbeat)

export default router
