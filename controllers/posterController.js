
const Poster = require("../models/posterModel");
const User = require("../models/userModel")
const filtering = require("../utils/filtering")

// @route   GET /posters
// @desc    Get all posters
// @access  public
const getPostersPage = async (req, res) => {
  try {
    if (req.query.search && req.query.search.trim() !== '') {
      const { search } = req.query

      const posters = await Poster.searchPartial(search).lean()
      console.log(posters);


      return res.status(200).render("poster/search-results", {
        title: "Search results",
        posters: posters.reverse(),
        searchQuery: search,
        user: req.session.user,
        url: process.env.URL,
      })
    }

    if (Object.keys(req.query).length > 0) {
      const { category, from, to, region } = req.query
      // $gte $lte $gt $lt
      const filterings = filtering(category, from, to, region)
      const posters = await Poster.find(filterings).lean()

      return res.render('poster/search-results', {
        title: 'Filter results',
        posters: posters.reverse(),
        user: req.session.user,
        querySearch: req.query.search,
        url: process.env.URL
      })
    }

    const posters = await Poster.find().lean();
    res.render("poster/posters", {
      title: "Posters page",
      posters: posters.reverse(),
      user: req.session.user,
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
    user: req.session.user,
  });
};

const getOnePoster = async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id)
      .populate("author")
      .lean();

    console.log(poster.author)
    console.log(poster)
    res.render("poster/one", {
      title: poster.title,
      poster,
      user: req.session.user,
      author: poster.author,
      url: process.env.URL,
    });
  } catch (error) {
    console.log(error);
  }
};

const getPosterEditPage = async (req, res) => {
  if (req.session.isLogged) {
    try {
      const poster = await Poster.findById(req.params.id).lean();
      res.render("poster/update", {
        title: "Update page",
        poster,
        url: process.env.URL,
        user: req.session.user,
      });
    } catch (error) {
      console.log(error);
    }
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
      description: req.body.description,
      author: req.session.user._id
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
