const movies = require("../db.json");
let id = 11;

module.exports = {
  getMovies: (req, res) => {
    res.status(200).json(movies);
  },
  createMovie: (req, res) => {
    const { rating } = req.body;
    const newMovie = { ...req.body, id, rating: +rating };
    movies.push(newMovie);
    id += 1;
    res.status(200).json(movies);
  },
  deleteMovie: (req, res) => {
    const { identification } = req.params;
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id === +identification) {
        movies.splice(i, 1);
        res.status(200).json(movies);
      }
    }
  },
  editMovie: (req, res) => {
    const { identification } = req.params;
    const { type } = req.body;
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id === +identification) {
        if (type === "plus" && movies[i].rating < 5) {
          const newRating = movies[i].rating + 1;
          movies[i].rating = newRating;
          res.status(200).json(movies);
          return;
        }

        if (type === "minus" && movies[i].rating > 1) {
          const newRating = movies[i].rating - 1;
          movies[i].rating = newRating;
          res.status(200).json(movies);
          return;
        }
      }
    }
  },
  // getRandomHike: (req, res) => {
  //     const hikes = ["Stewart Falls", "Scout Falls", "Timp Falls", "BattleCreek Falls"];
  //     let randomIndex = Math.floor(Math.random() * hikes.length);

  //     res.status(200).send([hikes[randomIndex]]); 
  // },
  // getAllHikes: (req, res) => {


  // }
};
