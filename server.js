const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const homeRoute = require("./routes/homeRoute");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const posterRoute = require("./routes/posterRoute");
const { connectToDb } = require("./config/db");
dotenv.config();

connectToDb();

const app = express();
app.use(express.static(path.join(__dirname, "public")));
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "session",
});

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initalaize store
app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    store,
    resave: false,
    saveUninitialized: false,
  })
);

app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use("/", homeRoute);
app.use("/posters", posterRoute);
app.use("/auth", require("./routes/authRoutes"));
app.use("/profile", require("./routes/profileRoutes"))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
