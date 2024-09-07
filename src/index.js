const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();

// use EJS for view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Update views path
app.use(express.static('public'));  // linking styles file to the login form

// Convert data into JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

// Register User
app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.username,
            password: req.body.password
        };

        // Check if user already exists
        const existingUser = await collection.findOne({ name: data.name });
        if (existingUser) {
            res.send("User Already exists. Please choose a different username");
        } else {
            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword; // Replace the original password with the hashed password
            const userData = await collection.insertMany(data);
            console.log(userData);
            res.send("Registration Successful");
        }
    } catch (error) {
        res.send("Error during signup");
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.username });
        if (!user) {
            res.send("User cannot be found");
            return;
        }

        // Compare the hashed password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordMatch) {
            res.render("home");
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        res.send("Error during login");
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});
