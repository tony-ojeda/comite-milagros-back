require('dotenv').config();
const User = require('./user.model')
const { sendEmail } = require('../../utils/email')
const crypto = require("crypto")

async function getAllUsers(req, res) {
  const { page, limit, search, slug, role, userData } = req.query;
  const skip = limit * ( page - 1);
  const query = {};
  // userData ? query["userData.user"] = JSON.parse(userData).user : '';
  role ? query["role"] = role : '';

  try {
    const searchValue = new RegExp(search, "gi") || undefined
    const users = await User.find({...query, $or: [{ name: searchValue }, { firstName: searchValue }] })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 'desc' });
    
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}

async function currentUserHandler(req, res) {
  const {user} = req;
  return res.status(200).json(user)
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}

async function createUser(req, res, next) {
  try {

    const user = await prepareUser(req.body)

    const userSaved = await User.create(user);
    console.log('user saved',userSaved)

    if(  user.haveUser) {
      const email = {
        to: userSaved.email,
        subject: "Activate your account",
        template_id: "d-165d013d46d940b8a62e69237da50921",
        dynamic_template_data: {
          name: user.firstName,
          url: `${process.env.APP_URL}/activate/${user.passwordResetToken}`
        }
      }
      sendEmail(email); 
    }

    return res.status(200).json(userSaved)
    
  } catch(err) {
    console.log('Error', err)
    res.status(400).json({ error: err})
  } 
}

async function prepareUser({ name, firstName, lastName, haveUser, password, 
  avatar, address, identityNumber, dateBirth, email, presentation, role, phone }) {
  let passwordResetToken = '';
  if (haveUser) {
    passwordResetToken = crypto
      .createHash('sha256')
      .update(email)
      .digest('hex');
  }

  return  haveUser ? 

    (new User({
    name, 
    firstName, 
    lastName, 
    email,
    password, 
    role, 
    presentation,
    avatar,
    passwordResetToken,
    passwordResetExpires: Date.now() + 3600000 + 24,
    })) : 

    (new User({
    firstName, 
    lastName, 
    email,
    phone,
    address,
    identityNumber,
    role, 
    dateBirth,
    haveUser
  }))
}

async function updateUser(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(user)
  } catch(err) {
    console.error(err);
    res.status(400).json({ error: err})
  }
}

async function deleteUser(req, res) {
  console.log('ingrese delete')
  const { id } = req.params;
  try {
    console.log('id is', id)
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted succesfully", user });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ err });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  currentUserHandler,
};
