// @route   GET /
// @desc    Get home page
// @access  public
const getHomePage = (req, res) => {
  res.render("home", {
    title: "Home page",
    url: process.env.URL,
  });
};

module.exports = {
  getHomePage,
};
