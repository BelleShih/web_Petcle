import express from 'express'
import { create, getContacts, delContact } from '../controllers/contacts.js'

const router = express.Router()

// 新增信件
router.post('/', create)
// 查詢全部消息
router.get('/', getContacts)
// 刪除指定消息
router.delete('/:id', delContact)

export default router