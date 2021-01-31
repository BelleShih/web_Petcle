import multer from 'multer'
import FTPStorage from 'multer-ftp'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

import contacts from '../models/contacts.js'

// 新增信件
export const create = async(req, res) => {
  try {
    const result = await contacts.create({
      sender: req.body.sender,
      mail: req.body.mail,
      title: req.body.title,
      description: req.body.description,
      date: Date.now()
    })
    res.status(200).send({ success: true, message: '', result})
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

// 刪除信件
export const delContact = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    let result = await contacts.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await contacts.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result})
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

// 查詢全部信件
export const getContacts = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  const result = await contacts.find().then(result => {
    res.status(200).send({ success: true, message: '', result })
  }).catch(error => {
    console.log(error)
  })
}
