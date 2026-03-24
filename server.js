const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/Item');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/labDB');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// --- ROUTES ---

// 1. READ (Home Page with Table - Figure 34)
app.get('/', async (req, res) => {
    const items = await Item.find();
    res.render('index', { items }); 
});

// 2. CREATE (Show Form - Figure 35)
app.get('/create', (req, res) => {
    res.render('create');
});

// 3. POST (Handle Form Submission)
app.post('/create', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.redirect('/');
});

// EDIT (Show Edit Form)
app.get('/edit/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('edit', { item });
});

// POST (Handle Edit Form Submission)
app.post('/edit/:id', async (req, res) => {
    await Item.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

// 4. DELETE (Slide 66 logic)
app.post('/delete/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000, () => console.log('Server started at http://localhost:3000'));