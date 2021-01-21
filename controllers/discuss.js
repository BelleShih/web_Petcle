import multer from 'multer'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import util from 'util'

import discuss from '../models/discuss.js'

dotenv.config()

// 新增問題
export const create = async(req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    if (req.body.title === null) {
      res.status(400).send({ success: false, message: '請輸入標題' })
    } else if (req.body.description === null) {
      res.status(400).send({ success: false, message: '請輸入內容' })
    } else if (req.body.questiontype === null) {
      res.status(400).send({ success: false, message: '請選擇問題種類' })
    }
    const result = await discuss.create({
      user:req.session.user.name,
      title: req.body.title,
      description:req.body.description,
      questiontype:req.body.questiontype,
      date: Date.now(),
      feedback: []
    })
      res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 編輯問題
export const editDiscuss = async(req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    let result = await discuss.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料'})
    } else {
      result = await discuss.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 刪除問題
export const delDiscuss = async(req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    let result = await discuss.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await discuss.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 查詢全部問題
export const getDiscuss = async(req, res) => {
  discuss.find().then(result => {
    res.status(200).send({ success: true, message: '', result })
    // console.log(util.inspect(result, {showHidden: true, depth: null}))
  }).catch(error => {
    console.log(error)
  })
}

// 網友回覆放進 feedback 陣列裡
export const addFeedback = async(req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    discuss.findByIdAndUpdate(req.params.id,
      {
        $push: {
          feedback: {
            uid: req.session.user._id,
            user:req.session.user.name,
            userphoto:req.session.user.userphoto,
            description: req.body.description,
            date: Date.now()
          }
        }
      },
      {new: true}
    ).then(result => {
      res.status(200).send({ success: true, message: '', result })
    }).catch(error => {
      console.log(error)
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}