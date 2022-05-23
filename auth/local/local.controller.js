const { signToken } = require('../auth.services')
const { findUser } = require('../../api/user/user.service')
const User = require('../../api/user/user.model')

async function loginUserHandler(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(500).json({ message: "Wrong password"})
    }
    // const useRole = user.role;
    // const rolesArray = useRole.map((item) => {
    //     return item.name;
    // });


    const token = signToken(user.profile)
    
    return res.status(200).json({ message: "correct login", token, user: user.profile, role: user.role })


  } catch(error) {
    return res.status(500).json({ error })
  }
}

async function changePasswordHandler(req, res){
  const {email, password} = req.body;
  try{
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      const newPassword = await user.changePassword(password);
      const updatedInfo = {
        password: newPassword
      }
      const userUpdated = await User.findByIdAndUpdate(user.id, updatedInfo, { new:true })
      return res.status(200).json(userUpdated)
    }else{
      return res.status(500).json({ message: "Cannot use the same password"})
    }

  }  catch(error) {
    return res.status(500).json({ error })
  }
}

async function verifyAccount(req, res) {
  const { hash } = req.params
  try {
    const user = await findUser({ verifyAccountToken: hash, status: 'pending' })

    if (!user) return res.status(404).json({message: "Token not found"});

    if (Date.now() > user.passwordResetExpires) return res.status(404).json({message: "Token expired"});

    user.status = "active"
    user.verifyAccountExpires = null
    user.verifyAccountToken = null

    await user.save()

    const token = signToken(user.profile)

    res.status(200).json({token})

  } catch(err) {
    console.error("Error: ",err)
  }
}

module.exports = {
  verifyAccount,
  loginUserHandler,
  changePasswordHandler,
}
