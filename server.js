const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Home Routes
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, './public/stats.html'))
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});


app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, './public/exercise.html'))
}); 

//API Routes
app.get('/api/workouts', (req, res) => {

  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      }
    }
  ]).then(dbWorkouts => {
    res.json(dbWorkouts)
  })
});

app.get('/api/workouts/range', (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      }
    }
  ]).then(dbWorkouts => {
    res.json(dbWorkouts)
  })
});

app.put('/api/workouts/:id', ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true })
    .then(dbWorkouts => {
      res.json(dbWorkouts)
    })
});

app.post('/api/workouts', (req, res) => {
  db.Workout.create({})
    .then(dbWorkouts => {
      res.json(dbWorkouts)
    })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
