const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const homeRoute = require("./routes/homeRoute");
const posterRoute = require("./routes/posterRoute");
const { connectToDb } = require("./config/db");
dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use("/", homeRoute);
app.use("/posters", posterRoute);

connectToDb();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
