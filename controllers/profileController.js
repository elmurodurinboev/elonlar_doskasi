
const User = require("../models/userModel")
// @route   GET /profile/:username
// @desc    Get Profile data
// @access  private

const getProfilePage = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).lean();
    res.render("profile/profile", {
      title: `${user.username}`,
      user,
      isAuth: req.session.isLogged,
      url: process.env.URL,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProfilePage
}