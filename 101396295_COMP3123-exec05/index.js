const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Middleware to parse JSON body
app.use(bodyParser.json());

/*
- Create new html file named home.html 
- Add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));  // Serve home.html file
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Server Error' });
      return;
    }
    res.json(JSON.parse(data));  // Send user data as JSON
  });
});

/*
- Modify /login router to accept username and password as JSON body parameters
- Read data from user.json file
- If username and password is valid, send the response:
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid, send the response:
    {
        status: false,
        message: "User Name is invalid"
    }
- If password is invalid, send the response:
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Server Error' });
      return;
    }

    const user = JSON.parse(data);
    
    // Validate username and password
    if (username !== user.username) {
      return res.json({ status: false, message: "User Name is invalid" });
    }
    if (password !== user.password) {
      return res.json({ status: false, message: "Password is invalid" });
    }

    res.json({ status: true, message: "User Is valid" });
  });
});

/*
- Modify /logout route to accept username as a query parameter and display message
    in HTML format like <b>${username} successfully logged out.<b>
*/
router.get('/logout', (req, res) => {
  const username = req.query.username;  // Accept username from query parameter
  res.send(`<b>${username} successfully logged out.</b>`);  // HTML formatted message
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err, req, res, next) => {
  res.status(500).send('Server Error');  // Return 500 error page
});

app.use('/', router);

// Start the server on dynamic port or default port 8081
app.listen(process.env.PORT || 8081, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});