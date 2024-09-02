
const User = require("../models/userModel")
// @route   GET /profile/:username
// @desc    Get Profile data
// @access  private

const getProfilePage = async (req, res) => {
  try {
    const user = await User
      .findOne({ username: req.params.username })
      .populate("posters")
      .lean();

    const isMe = user._id == req.session.user._id.toString()

    res.render("profile/profile", {
      title: `${user.username}`,
      user,
      isMe,
      myPoster: req.session.user.username,
      posters: user.posters,
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