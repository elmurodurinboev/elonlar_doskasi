const {
  addNewPosterToDb,
  getAllPosters,
  getPosterById,
  editPosterById,
  deleteById,
} = require("../db/poster");
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

const getOnePoster = async (req, res) => {
  const poster = await getPosterById(req.params.id);
  res.render("poster/one", {
    title: poster.title,
    poster,
    url: process.env.URL,
  });
};

const getPosterEditPage = async (req, res) => {
  const poster = await getPosterById(req.params.id);
  res.render("poster/update", {
    title: "Update page",
    poster,
    url: process.env.URL,
  });
};

const updatePosterById = async (req, res) => {
  const poster = {
    title: req.body.title,
    amount: req.body.amount,
    region: req.body.region,
    image: req.body.image,
    description: req.body.description,
  };
  await editPosterById(req.params.id, poster);
  res.redirect("/posters");
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

const deletePoster = async (req, res) => {
  try {
    await deleteById(req.params.id);
    res.redirect("/posters");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPostersPage,
  getAddPoster,
  addPoster,
  getOnePoster,
  getPosterEditPage,
  updatePosterById,
  deletePoster,
};
