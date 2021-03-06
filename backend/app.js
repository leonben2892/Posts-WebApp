const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();
mongoose.connect("mongodb+srv://leon:" + process.env.MONGO_ATLAS_PW + "@cluster0-qtm06.mongodb.net/node-angular?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images"))); // Any request targeting /images will allow to continue

// This is used to avoid cors (Cross-Origin Resource Sharing) error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
