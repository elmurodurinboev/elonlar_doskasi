// Controllerda logic functionlar yoziladi!

const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
// @route   GET /auth/login
// @desc    Get login page
// @access  public
const getLoginPage = (req, res) => {
  res.render("auth/login", {
    title: "Login",
    loginError: req.flash("loginError"),
    url: process.env.URL,
  });
};

// @route   GET /auth/signup
// @desc    Get register page
// @access  public
const getRegisterPage = (req, res) => {
  res.render("auth/signup", {
    title: "Registratsiya",
    regError: req.flash("regError"),
    url: process.env.URL,
  });
};

const registerNewUser = async (req, res) => {
  try {
    const { email, username, phone, password, password2 } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userExist = await User.findOne({ email });
    if (userExist) {
      req.flash(
        "regError",
        "Bunday foydalanuvchi allaqachon ro'yhatdan o'tgan"
      );
      return res.redirect("/auth/signup");
    }
    if (password !== password2) {
      req.flash("regError", "Parollar mos emas!");
      return res.redirect("/auth/signup");
    }

    User.create({
      email,
      username,
      phone,
      password: hashedPassword,
    });

    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      const isMatchPassword = await bcrypt.compare(
        req.body.password,
        existUser.password
      );
      if (isMatchPassword) {
        req.session.user = existUser;
        req.session.isLogged = true;
        req.session.save();
        res.redirect("/profile/" + existUser.username);
      } else {
        req.flash("loginError", "Bunday ma'lumot topilmadi!");
        res.redirect("/auth/login");
      }
    } else {
      req.flash("loginError", "Bunday foydalanuvchi mavjud emas!");
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
  loginUser,
  logout,
};
