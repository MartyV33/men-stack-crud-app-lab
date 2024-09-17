const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();
const Food = require('./models/food');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// The RESTful Routes for Food Items
/*
| HTTP Method | Route         | Action | Description                               |
|----------------------------------------------------------------------------------|
| GET         | /foods        | Idex   | Display a list of food items              |
| GET         | /foods/new    | New    | Shows a form to create a new food item    |
| POST        | /foods        | Create | Creates a new food item                   |
| GET         | /foods/:id    | Show   | Displays a specific food item by its ID   |
| GET         |/foods/:id/edit| Edit   | Shows a form to edit an existing food item|
| PUT         | /foods/:id    | Update | Updates a specific food item by its ID    |
| DELETE      | /foods/:id    | Destroy| Deletes a specific food item by its ID    |
*/

app.get('/test', (req, res) => {
    res.send('Server is running properly!');
});
app.get('/foods/new', (req, res) => {
    res.render('new');
});

app.get('/foods', async (rec, res) => {
    const foods = await Food.find({});
    res.render('index', { foods });
});

app.get('/foods/:id', async (req, res) => {
    const food = await Food.findById(req.params.id);
    res.render('show', {food });
});

app.get('/foods/:id/edit', async (req, res) => {
    const food = await Food.findById(req.params.id);
    res.render('edit', { food });
});

app.post('/foods', async (req, res) => {
    const newFood = new Food(req.body);
    await newFood.save();
    res.redirect('/foods');
});

app.put('/foods/:id', async (req, res) => {
    await Food.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/foods/${req.params.id}`);
});

app.delete('/foods/:id', async (req, res) => {
    await Food.findByIdAndDelete(req.params.id);
    res.redirect('/foods');
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


const PORT = 1500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.render('index');
});