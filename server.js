const express = require('express');
const methodOverride = require('method-override');
const db = require('./models')
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));


// WRITE YOUR ROUTES HERE /////////////////////

app.get('/', (req, res) => {
  db.widget.findAll()
  .then(widget => {
    res.render('index.ejs', { widget })
  })
})

app.post('/', (req, res) => {
  db.widget.create({
    description: req.body.description,
    quantity: req.body.quantity
  })
  .then(widget => {
    res.redirect('/')
  })
})

app.delete('/delete/:id', (req, res) => {
  db.widget.destroy({
    where: { id: req.body.id}
  })
  .then(remainder => {
    res.redirect('/')
  })
})


// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
