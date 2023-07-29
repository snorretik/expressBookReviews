const express = require('express');
//const axios = require('axios').default;
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
// public_users.get('/',function (req, res) {
    // synchronous:
    // res.send(JSON.stringify(books, null, 4));
// });

let getAllBooks = new Promise((resolve,reject) => {
    public_users.get('/',function (req, res) {
        resolve(res);  
    })
})
getAllBooks.then((res) => {
    res.send(JSON.stringify(books, null, 4));
})

// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
    // synchronous:
    // res.send(books[req.params.isbn]);
// });
  
let getBooksOnISBN = new Promise((resolve,reject) => {
    public_users.get('/isbn/:isbn',function (req, res) {
        const lineToExc = res.send(books[req.params.isbn]);
        resolve(lineToExc);
    })
})
getBooksOnISBN.then((lineToExc) => {
    lineToExc;
})

// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
    // synchronous:
    // const arrayBooks = Object.keys(books);
    // let returnObject = {};

    // for (let i = 0; i < arrayBooks.length; i++) {
        // const valuesBook = Object.values(books[i + 1]);
        
        // let stringObjAuthor = valuesBook[0].split(" ").join("");
        // let stringReqAuthor = req.params.author;

        // if (stringObjAuthor.toLowerCase() == stringReqAuthor.toLowerCase()) {
            // returnObject = books[i + 1];
        // }
    // }

    // res.send(returnObject);
// });

let getBooksByAuthor = new Promise((resolve,reject) => {
    public_users.get('/author/:author',function (req, res) {
        const arrayBooks = Object.keys(books);
        let returnObject = {};
    
        for (let i = 0; i < arrayBooks.length; i++) {
            const valuesBook = Object.values(books[i + 1]);
            
            let stringObjAuthor = valuesBook[0].split(" ").join("");
            let stringReqAuthor = req.params.author;
    
            if (stringObjAuthor.toLowerCase() == stringReqAuthor.toLowerCase()) {
                returnObject = books[i + 1];
            }
        }

        const lineToExc = res.send(returnObject)
        resolve(lineToExc);
    });
})
getBooksByAuthor.then((lineToExc) => {
    lineToExc;
})

// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
    // synchronous:
    // const arrayBooks = Object.keys(books);
    // let returnObject = {};

    // for (let i = 0; i < arrayBooks.length; i++) {
        // const valuesBook = Object.values(books[i + 1]);
        
        // let stringObjTitle = valuesBook[1].split(" ").join("");
        // let stringReqTitle = req.params.title;

        // if (stringObjTitle.toLowerCase() == stringReqTitle.toLowerCase()) {
            // returnObject = books[i + 1];
        // }
    // }

    // res.send(returnObject);
    // ----------------------------------------
// });

let getBooksByTitle = new Promise((resolve,reject) => {
    public_users.get('/title/:title',function (req, res) {
        const arrayBooks = Object.keys(books);
        let returnObject = {};
    
        for (let i = 0; i < arrayBooks.length; i++) {
            const valuesBook = Object.values(books[i + 1]);
            
            let stringObjTitle = valuesBook[1].split(" ").join("");
            let stringReqTitle = req.params.title;
    
            if (stringObjTitle.toLowerCase() == stringReqTitle.toLowerCase()) {
                returnObject = books[i + 1];
            }
        }

        const lineToExc = res.send(returnObject)
        resolve(lineToExc);
    });
})
getBooksByTitle.then((lineToExc) => {
    lineToExc;
})

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    res.send(books[req.params.isbn].reviews)
});


module.exports.general = public_users;
