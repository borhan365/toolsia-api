import bcrypt from 'bcryptjs'
import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    isAdmin: {
      type: Boolean,
      // required: true,
      default: false,
    },
    doctors: [{
      type: mongoose.Types.ObjectId,
      ref: "Doctor"
    }],
    medicines: [{
      type: mongoose.Types.ObjectId,
      ref: "Medicine"
    }],
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User

