
const User = require("../models/userModel")
// @route   GET /profile/:username
// @desc    Get Profile data
// @access  private

const getProfilePage = async (req, res) => {
  try {
    const profileUser = await User
      .findOne({ username: req.params.username })
      .populate("posters")
      .lean();

    const isMe = profileUser._id == req.session.user._id.toString()

    res.render("profile/profile", {
      title: `${profileUser.username}`,
      profileUser,
      isMe,
      user: req.session.user,
      posters: profileUser.posters,
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