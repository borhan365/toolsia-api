import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
import generateToken from '../middleware/genarateToken.js'
import User from '../models/userModel.js'

// LOGIN
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// REGISTATION
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, image, password, isAdmin } = req.body

  const slug = slugify(name).toLowerCase();

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    slug,
    email,
    password,
    image,
    isAdmin,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      slug: user.slug,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// EDIT USER BY ID
const editUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (user) {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updateUser)
    } else {
      res.status(401)
      throw new Error('You can update only your post')
    }
  } catch (error) {
    res.status(404)
      throw new Error('User not found')
  }
})


// SINGLE USER DETAILS
const userDetails = asyncHandler(async(req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if(user) {
      res.status(200).json(user)
    } 
  } catch (error) {
    res.status(500).json(error)
  }
})

// GET ALL USER LIST
const getUsers = asyncHandler(async(req, res) => {
  const user = await User.find({})
  if(user) {
    res.status(200).json(user)
  } else {
    res.status(404).json("user not found")
  }
})

// DELETE USER
const deleteUser = asyncHandler(async(req, res) => {
  const user = User.findById(req.params.id)
  if(!user) {
    return res.status(404).json("User not found!")
  } else {
    const deleteUser = await user.remove()
    if(deleteUser) {
      res.status(200).json({message: "User deleted!"})
    } else {
      res.status(500)
      throw new Error("Server side error!")
    }
  }
  
})

export {
  registerUser,
  getUsers,
  loginUser,
  deleteUser,
  editUser,
  userDetails,
}
