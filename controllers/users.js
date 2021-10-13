const User = require('../models/users')
const bcrypt = require('bcrypt')

const createUser = (req,res) =>{
  const { email, password } = req.body

  const newUser = new User({
    email,
    password 
  })
  
  const salt = bcrypt.genSaltSync();
  newUser.password = bcrypt.hashSync(password, salt)


  newUser.save()
  res.json(`User ${newUser} created`) 
}

const getUsers = async (req,res) => {
  const users = await User.find({})
  res.json(users)
}

module.exports = { createUser, getUsers }