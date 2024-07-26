const fs = require("fs");
const path = require("path");

const addNewPosterToDb = async (poster) => {
  const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf8");
  const posters = JSON.parse(data());
  posters.push(poster);
  fs.writeFile(
    path.join(__dirname, "db.json"),
    JSON.stringify(posters),
    "utf8",
    (err) => {
      if (err) throw err;
    }
  );
  console.log("Data added!");
};

const getAllPosters = async () => {
  const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf8");
  const posters = JSON.parse(data());
  console.log("Working");
  return posters;
};

const getPosterById = async (id) => {
  const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf8");
  const posters = JSON.parse(data());
  const poster = posters.find((p) => p.id === id);
  return poster;
};

const editPosterById = async (id, editedPoster) => {
  const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf8");
  let posters = JSON.parse(data());
  const index = posters.findIndex(p => p.id === id)
  posters[index] = {
    id: posters[index].id,
    ...editedPoster
  }
  console.log("Data Edited...")
}

module.exports = {
  addNewPosterToDb,
  getAllPosters,
  getPosterById,
  editPosterById
};
