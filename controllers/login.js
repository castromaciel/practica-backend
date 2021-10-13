require('dotenv').config()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async(req,res) =>{
  const { email, password } = req.body

  const searchEmail = await User.find({email: email});
  const match = bcrypt.compareSync(password, searchEmail[0].password)

  if(match){
    const payload = {
      check: true
    }

    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: 1440})

    res.status(200).json({msg:'Usuario Logueado con éxito', token: token})
  } else{
    res.status(401).json({'msg':'Usuario o Contraseña Incorrecto'})
  }
}

module.exports = { loginUser }