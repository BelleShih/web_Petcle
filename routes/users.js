import express from 'express'
import { create, login, logout, delUser, editUser, getUser, getUsers, heartbeat } from '../controllers/users.js'

const router = express.Router()

// 建立使用者
router.post('/', create)
// 登入
router.post('/login', login)
// 登出
router.delete('/logout', logout)
// 刪除使用者
router.delete('/:id', delUser)
// 編輯使用者資料
router.patch('/:id', editUser)
// 查詢使用者
router.get('/:id', getUser)
// 抓全部使用者
router.get('/', getUsers)

router.get('/heartbeat', heartbeat)

export default router
