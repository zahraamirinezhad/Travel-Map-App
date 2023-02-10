const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//REGISTER
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY,
    ).toString(),
  })

  try {
    const user = await newUser.save()
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    !user && res.status(401).json('Wrong Password or Username !!!')

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

    originalPassword !== req.body.password &&
      res.status(401).json('Wrong Password or Username !!!')

    const { password, ...info } = user._doc

    res.status(200).json({ ...info })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
