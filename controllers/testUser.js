import asyncHandler from 'express-async-handler'
import User from '../models/userModel'

const createUser = asyncHandler(async(req, res) => {
  try {
    const {name, email, password, image} = req.body
    const existUser = User.findById(req.params.id)
    if(existUser) {
      res.status(400)
      throw new Error("User already exist")
    }
    const createUser = await User.create({
      name, email, password, image,
    })
    res.status(201).json({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      password: createUser.password,
      image: createUser.image,
    })
  } catch (error) {
    res.status(500)
    throw new Error("Server side error")
  }
})

const updateUser = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id)
  if(user) {
    const newUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true})
    res.status(200).json(newUser)
  } else {
    res.status(400)
    throw new Error("you can update only your posts")
  }
})