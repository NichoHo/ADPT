var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var session = require('express-session');

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Set views directory to 'views/pages'
app.set('views', path.join(__dirname, 'views', 'pages'));

app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database Connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'adpt_project'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// Session Setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use 'true' if using HTTPS
}));

// Middleware to check if the user is logged in
function checkAuth(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Home Page
app.get('/', function(req, res) {
    res.render('home');
});

// Dashboard Page (protected route)
app.get('/dashboard', checkAuth, function(req, res) {
    res.render('dashboard');
});

// Login Page
app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    // Log the input email to check what is being submitted
    console.log("Email submitted:", email);

    db.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
        if (error) throw error;

        // Log the results to check what is retrieved from the database
        console.log("Query results:", results);

        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, function(err, result) {
                if (result) {
                    req.session.userId = results[0].user_id; // Store user ID in session
                    res.redirect('/dashboard');
                } else {
                    res.send('Incorrect email and/or password!');
                }
            });
        } else {
            res.send('Email not found!');
        }
    });
});

// Membership Page
app.get('/membership', function(req, res) {
    res.render('membership');
});

app.post('/membership', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var age = req.body.age;
    var gender = req.body.gender;
    var weight = req.body.weight;
    var height = req.body.height;
    var goal = req.body.goal;
    var target_weight = req.body.target_weight;
    var phone_number = req.body.phone_number;

    db.query('SELECT email FROM users WHERE email = ?', [email], function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.send('Email is already registered!');
        } else {
            bcrypt.hash(password, 10, function(err, hash) {
                if (err) throw err;
                db.query(
                    'INSERT INTO users (name, email, password, age, gender, weight, height, goal, target_weight, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [name, email, hash, age, gender, weight, height, goal, target_weight, phone_number],
                    function(error, results, fields) {
                        if (error) throw error;
                        res.redirect('/dashboard');
                    }
                );
            });
        }
    });
});

// Logout Route
app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
            res.send('Error logging out');
        } else {
            res.redirect('/login');
        }
    });
});

// Start the server
app.listen(4500, function() {
    console.log('Server is running on port 4500');
});