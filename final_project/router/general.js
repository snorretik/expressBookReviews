const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    username = req.body.username;
    password = req.body.password;
    if ((username && password) && isValid(username)) {
        let boolNew = true;

        for (let i = 0; i < users.length; i++) {
            if (username == users[i].username) {
                res.send("This username already exists");
                boolNew = false;
            } 
        }
        if (boolNew) {
            let objectToPush = { "username": username, "password": password }
            users.push(objectToPush);
            res.send("Username and password combo succesfully registered!");
        }
    } else {
        res.send("Registration failed, please try again")
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  res.send(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const arrayBooks = Object.keys(books);
    let returnObject = {};

    for (let i = 1; i <= arrayBooks.length; i++) {
        const valuesBook = Object.values(books[i]);
        
        let stringObjAuthor = valuesBook[0].split(" ").join("");
        let stringReqAuthor = req.params.author;

        if (stringObjAuthor.toLowerCase() == stringReqAuthor.toLowerCase()) {
            returnObject = books[i];
        }
    }

    res.send(returnObject);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const arrayBooks = Object.keys(books);
    let returnObject = {};

    for (let i = 1; i <= arrayBooks.length; i++) {
        const valuesBook = Object.values(books[i]);
        
        let stringObjAuthor = valuesBook[1].split(" ").join("");
        let stringReqAuthor = req.params.title;

        if (stringObjAuthor.toLowerCase() == stringReqAuthor.toLowerCase()) {
            returnObject = books[i];
        }
    }

    res.send(returnObject);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  res.send(books[req.params.isbn].reviews)
});

module.exports.general = public_users;
