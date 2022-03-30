const express = require('express');
const morgan = require("morgan");
const path = require("path");
const notesRoutes = require('./routes/noteRoutes')
const viewRoutes = require('./routes/viewRoutes');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));


// ROUTES
app.use("/api/notes", notesRoutes)
app.use("/", viewRoutes)

module.exports = app;