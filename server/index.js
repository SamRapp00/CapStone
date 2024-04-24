const express = require("express");
const cors = require("cors");
const moviesController = require("./controller/moviesController");
const hikeController = require("./controller/hikeController");
const { getMovies, createMovie, deleteMovie, editMovie } = moviesController;
const {  getAllHikes, getRandomHike, createHike, deleteHike, editHike  } = hikeController;


const app = express();
const PORT = 4004;
const baseURL = `/api/movies`;
const baseHikeURL = `/api/hike`

app.use(express.json());
app.use(cors());

// app.get(baseURL, getMovies);
app.post(baseURL, createMovie);
app.delete(`${baseURL}/:identification`, deleteMovie);
app.put(`${baseURL}/:identification`, editMovie);

app.get(baseHikeURL, getAllHikes);
app.get(`${baseHikeURL}/random`, getRandomHike);
app.post(baseHikeURL, createHike)
app.delete(`${baseHikeURL}/:id`, deleteHike);
app.put(`${baseHikeURL}/:id`, editHike);

app.listen(PORT, () =>
  console.log(`The express server is running on port ${PORT}`)
);
