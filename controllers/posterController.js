// @route   GET /posters
// @desc    Get all posters
// @access  public
const getPostersPage = (req, res) => {
  res.render("poster/posters", {
    title: "Posters page",
    url: process.env.URL,
  });
};

const getAddPoster = (req, res) => {
  res.render("poster/add-poster", {
    title: "Add poster page",
    url: process.env.URL,
  });
};

const addPoster = (req, res) => {
  console.log(req.body);
};

module.exports = {
  getPostersPage,
  getAddPoster,
  addPoster,
};
