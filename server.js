const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    calories: Number,
    protien: Number,
    carbs: Number,
    fat: Number
});
const app = express();

app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/test', (req, res) => {
    res.send('Server is running properly!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});