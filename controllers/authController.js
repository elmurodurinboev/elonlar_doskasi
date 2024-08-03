
// @route   GET /login
// @desc    Get login page
// @access  public
const getLoginPage = async (req, res) => {
  res.render("auth/login", {
    title: "Login",
    url: process.env.URL
  })
};

// @route   GET /signup
// @desc    Get register page
// @access  public
const getRegisterPage = async (req, res) => {
  res.render("auth/signup", {
    title: "Registratsiya",
    url: process.env.URL
  })
};

module.exports = {
  getLoginPage, getRegisterPage
}
