const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    calories: Number,
    protien: Number,
    carbs: Number,
    fat: Number
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;