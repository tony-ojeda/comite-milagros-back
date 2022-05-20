require('dotenv').config();
const User = require('./user.model')
const Role = require('../role/role.model')
const { sendEmail } = require('../../utils/email')
const crypto = require("crypto")

async function getAllUsers(req, res) {
  const { status } = req.query;
  try {
    const users = await User.find({});
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
    return res.status(200).json(userSaved)
    
  } catch(err) {
    res.status(400).json({ error: err})
  } 
}

async function prepareUser({ name, firstName, lastName, email, password, roles, phone }) {
  let assingRols = [];

  if(roles){
    const foundRoles = await Role.find({name: {$in: roles}});
    assingRols = foundRoles.map(role => role._id);
  }else{
    const role = await Role.findOne({name: "user"});
    assingRols = [role._id];
  }

  const passwordResetToken = crypto
      .createHash('sha256')
      .update(email)
      .digest('hex');

  return new User({
    name, 
    firstName, 
    lastName, 
    email,
    phone,
    password, 
    roles: assingRols, 
    passwordResetToken,
    passwordResetExpires: Date.now() + 3600000 + 24,
  })
}

async function updateUser(req, res) {
  const { id } = req.params
  const info = req.body;
  const {roles} = req.body;
  try {

    if(roles){
      const foundRoles = await Role.find({name: {$in: roles}})
      info.roles = foundRoles
    }
    const user = await User.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(user)
  } catch(err) {
    res.status(400).json({ error: err})
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted succesfully", user });
  } catch (error) {
    res.status(500).json({ error });
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
