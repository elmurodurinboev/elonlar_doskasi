const { addNewPosterToDb, getAllPosters } = require("../db/poster");
const { v4 } = require("uuid");

// @route   GET /posters
// @desc    Get all posters
// @access  public
const getPostersPage = async (req, res) => {
  const posters = await getAllPosters();
  res.render("poster/posters", {
    title: "Posters page",
    posters,
    url: process.env.URL,
  });
};

const getAddPoster = (req, res) => {
  res.render("poster/add-poster", {
    title: "Add poster page",
    url: process.env.URL,
  });
};

const addPoster = async (req, res) => {
  const poster = {
    id: v4(),
    title: req.body.title,
    amount: req.body.amount,
    region: req.body.region,
    image: req.body.image,
    description: req.body.description,
  };
  await addNewPosterToDb(poster);
  res.redirect("/");
};

module.exports = {
  getPostersPage,
  getAddPoster,
  addPoster,
};
