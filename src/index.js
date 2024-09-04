const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');


const app = express()

// use EJS for view engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Update views path


app.get('/login' ,(req , res) =>{
    res.render('login');
});

app.get('signup', (req ,res) =>{
    res.render('signup')
});


const port = 5000 ;
app.listen(port , ()=>{
    console.log(`Server running on Port ${port}`);
});