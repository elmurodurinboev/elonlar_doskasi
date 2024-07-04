// @route   GET /posters
// @desc    Get all posters
// @access  public
const getPostersPage = (req, res) => {
  res.render('posters', {
    title: "Posters page"
  })
}

module.exports = {
  getPostersPage
}