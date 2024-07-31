
const Poster = require("../models/posterModel");

// @route   GET /posters
// @desc    Get all posters
// @access  public
const getPostersPage = async (req, res) => {
  try {
    const posters = await Poster.find().lean();
    res.render("poster/posters", {
      title: "Posters page",
      posters: posters.reverse(),
      url: process.env.URL,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAddPoster = (req, res) => {
  res.render("poster/add-poster", {
    title: "Add poster page",
    url: process.env.URL,
  });
};

const getOnePoster = async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id).lean();
    console.log(poster)
    res.render("poster/one", {
      title: poster.title,
      poster,
      url: process.env.URL,
    });
  } catch (error) {
    console.log(error);
  }
};

const getPosterEditPage = async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id).lean();
    res.render("poster/update", {
      title: "Update page",
      poster,
      url: process.env.URL,
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePosterById = async (req, res) => {
  try {
    const poster = {
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      image: req.body.image,
      description: req.body.description,
    };
    await Poster.findByIdAndUpdate(req.params.id, poster);
    res.redirect("/posters");
  } catch (error) { }
};

const addPoster = async (req, res) => {
  try {
    console.log(req.file.filename)
    const poster = {
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      image: "uploads/" + req.file.filename,
      description: req.body.description,
    };
    Poster.create(poster);
    res.redirect("/posters");
  } catch (error) {
    console.log(error);
  }
};

const deletePoster = async (req, res) => {
  try {
    await Poster.findByIdAndDelete(req.params.id);
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
