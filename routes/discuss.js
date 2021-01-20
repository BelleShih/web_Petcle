import express from 'express'
import { create, getDiscuss, delDiscuss, editDiscuss, addFeedback } from '../controllers/discuss.js'

const router = express.Router()

// 新增問題
router.post('/', create)
// 編輯問題
router.patch('/:id', editDiscuss)
// 刪除問題
router.delete('/:id', delDiscuss)
// 查詢全部問題
router.get('/', getDiscuss)
// 網友回復
router.patch('/fb/:id', addFeedback)

export default router