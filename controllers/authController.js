const User = require("../models/userModel");
// @route   GET /auth/login
// @desc    Get login page
// @access  public
const getLoginPage = (req, res) => {
  res.render("auth/login", {
    title: "Login",
    url: process.env.URL,
  });
};

// @route   GET /auth/signup
// @desc    Get register page
// @access  public
const getRegisterPage = (req, res) => {
  res.render("auth/signup", {
    title: "Registratsiya",
    url: process.env.URL,
  });
};

const registerNewUser = async (req, res) => {
  try {
    const { email, username, phone, password, password2 } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.redirect("/auth/signup");
    }
    if (password !== password2) {
      return res.redirect("/auth/signup");
    }

    User.create({
      email,
      username,
      phone,
      password,
    });

    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
};
