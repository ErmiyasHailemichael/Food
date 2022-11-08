// DEPENDENCIES
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const recipesController = require('./controllers/recipe')

require("dotenv").config();

const PORT = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// DATABASE connection
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use('/recipes', recipesController)

app.listen(PORT, () => console.log(`Server is live on port :${PORT}`));
