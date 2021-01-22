import md5 from 'md5'
import multer from 'multer'
import FTPStorage from 'multer-ftp'
import axios from 'axios'
import path from 'path'
import fs from 'fs'

import users from '../models/users.js'

export const create = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    if (req.body.password1.length < 4) {
      res.status(400).send({ success: false, message: '密碼必須四個字以上' })
    } else if (req.body.password1.length > 20) {
      res.status(400).send({ success: false, message: '密碼必須二十個字以下' })
    } else if ((req.body.email.includes('@')) === false) {
      res.status(400).send({ success: false, message: '電子信箱格式錯誤' })
    } else {
      await users.create({
        name: req.body.name,
        account: req.body.account,
        password: md5(req.body.password1),
        email: req.body.email,
        pet: req.body.pet,
        userophoto: ''
      })
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已使用' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const login = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    const result = await users.findOne({
      account: req.body.account,
      password: md5(req.body.password)
    }, '-password')

    if (result === null) {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    } else {
      req.session.user = result
      res.status(200).send({ success: true, message: '', result })
    }
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

export const logout = async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      res.clearCookie()
      res.status(200).send({ success: true, message: '' })
    }
  })
}

export const heartbeat = async (req, res) => {
  let isLogin = false
  if (req.session.user !== undefined) {
    isLogin = true
  }
  res.status(200).send(isLogin)
}

export const delUser = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }

  try {
    let result = await users.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await users.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const editUser = async (req, res) => {
}

export const getUser = async (req, res) => {
}
// export const userphoto = async (req, res) => {
//   if (req.session.user === undefined) {
//     res.status(401).send({ success: false, message: '未登入' })
//     return
//   }
// }
// export const editphoto = async (req, res) => {
// }
// export const findphoto = async (req, res) => {
// }
// export const delphoto = async (req, res) => {
// }