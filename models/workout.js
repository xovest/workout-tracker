const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            name: {
                type: String,
                trim: true,
                required: "Enter the name of the exercise"
            },
            type: {
                type: String,
                trim: true,
                required: "Enter the name of type of exercise (either cardio or strength)"
            },
            weight: {
                type: Number,
                required: "Enter the weight of the iron you pumped"
            },
            sets: {
                type: Number,
                required: "Enter how many sets you did to look like Hulk"
            },
            reps: {
                type: Number,
                required: "Enter the number of reps you did"
            },
            duration: {
                type: Number,
                required: "Enter the duration of your workout"
            },
            distance: {
                type: Number,
                required: "Enter the distance.  It could be feet, meters, miles, or kilometers we don't judge"
            },
        }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;