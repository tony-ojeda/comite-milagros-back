const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    firstName: {
      type: String,
      lowercase: true,
      required: true
    },
    lastName: {
      type: String,
      lowercase: true,
    },
    haveUser: {
      type: Boolean,
      default: true,
      required: true
    },
    password: {
      type: String,
      trim: true
    },
    dateBirth: {
      type: String,
      trim: true
    },
    identityNumber: {
      type: String,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      trim: true
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['deleted', 'active', 'pending'],
      required: true
    },
    slug: {
      type: String,
      lowercase: true,
    },
    presentation: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
      lowercase: true,
    },
    avatar: {
      type: String,
      lowercase: true,
    },
    urlPhoto: {
      type: String,
      lowercase: true,
    },
    gender: {
      type: String,
      lowercase: true,
    },
    emailAlternative: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      lowercase: true,
    },
    role: {
      type: String,
      default: 'carrier',
      enum: ['admin', 'secretary', 'carrier'],
      required: true
    },
    verifyAccountToken: String,
    verifyAccountExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function(next) {
  const user = this
  console.log('user is', user)
  try {
    if (user.password && !user.isModified('password')) {
      console.log('hoil')
      return next()
    }
    if (user.haveUser) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(user.password, salt)
      user.password = hash
    }
    user.avatar = 'https://thumbs.dreamstime.com/b/hombre-de-negocios-profile-ico-109874231.jpg';

  } catch(error) {
    console.log('Error', error)
    next(error)
  }
  next()
})

UserSchema.methods.comparePassword = async function (password) {
  const user = this
  return await bcrypt.compare(password, user.password)
}

UserSchema.methods.changePassword = async function (password){
  const user = this;
  return await bcrypt.hash(password, 10);
}

UserSchema.virtual('profile').get(function() {
  const { firstName, lastName, email, _id } = this

  return { fullName: `${firstName} ${lastName}`, email, _id }
})

module.exports = mongoose.model('User', UserSchema)
