const Posters = require("../models/posterModel")
// @route   GET /
// @desc    Get home page
// @access  public
const getHomePage = async (req, res) => {
  const posters = await Posters.find().lean()
  res.render("home", {
    title: "Home page",
    posters,
    user: req.session.user,
    url: process.env.URL,
  });
};

module.exports = {
  getHomePage,
};
