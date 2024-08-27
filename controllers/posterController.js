
const Poster = require("../models/posterModel");
const User = require("../models/userModel")

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
      user: req.session.user,
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
    const newPoster = new Poster({
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      image: "uploads/" + req.file.filename,
      description: req.body.description
    })
    // Bu yerda poster qo'shayotgan userning posters yacheykasiga yangi qo'shilgan posterning idsini push qilish logikasi yozilgan
    // new: true - degani yangidan yarat degani
    // upsert: true - agar posters yacheykasi yoq bo'lya uni yarat  degani 
    await User.findByIdAndUpdate(req.session.user._id, { $push: { posters: newPoster._id } }, { new: true, upsert: true })

    // endi esa bu yaratilgan posterni saqlashimiz kerak bo'ladi
    // Save the new poster and redirect to the poster's page
    const savedPoster = await newPoster.save();
    res.redirect("/posters/" + savedPoster._id);

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
