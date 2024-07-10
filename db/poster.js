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

module.exports = {
  addNewPosterToDb,
  getAllPosters,
};
