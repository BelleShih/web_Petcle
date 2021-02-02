import express from 'express'
import { create, login, logout, delUser, editUser, getUser, getUsers, likePhoto, heartbeat } from '../controllers/users.js'

const router = express.Router()

router.get('/heartbeat', heartbeat)
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
// 查詢指定使用者
router.get('/:id', getUser)
// 查詢全部使用者
router.get('/', getUsers)
// 把喜歡的圖丟到相簿裡
router.patch('/album/:id', likePhoto)

export default router
