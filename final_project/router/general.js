const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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

    for (let i = 1; i < arrayBooks.length; i++) {
        const valuesBook = Object.values(books[i]);
        
        let stringObjAuthor = valuesBook[0].split(" ").join("");
        let stringReqAuthor = req.params.author;

        if (stringObjAuthor.toLowerCase() == stringReqAuthor.toLowerCase()) {
            res.send(books[i]);
        }
    }

    // res.send(outputObject);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
