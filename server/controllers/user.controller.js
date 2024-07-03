const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
require('dotenv').config()
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not found. Please register!" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(400).json({ message: "Password didn't match!" });
    }

    const userToken = jwt.sign({
      id: user._id,
      isEmailVerified: user.isEmailVerified,
      balance: user.balance
    }, process.env.JWT_SECRET_KEY);

    return res.cookie("usertoken", userToken, {
      // httpOnly: true
    }).json({ message: "success", user });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



module.exports.register = (req, res) => {
  User.create(req.body)
    .then(user => {

      const userToken = jwt.sign({
        id: user._id,
        isEmailVerified: user.isEmailVerified,
        balance: user.balance
      }, process.env.JWT_SECRET_KEY);

      res.cookie("usertoken", userToken, {
        // httpOnly: true
      }).json({ message: "success", user: user });
    })
    .catch(err => res.json({ err }));
}


module.exports.logout = (req, res) => {
  res.clearCookie('usertoken');
  res.status(200).json({ message: "Loged out successfully" });
}

module.exports.getUser = (req, res) => {

  const id = req.body.id;
  User.findOne({_id:id})
  .then(user => res.json({user}))
  .catch(err => res.json({err}))
}