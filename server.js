const express = require("express");
const cors = require("cors");

const server = express();

// register the ejs view engine
server.set('view engine', 'ejs');

//without this middleware, we cannot use data submitted by forms
server.use(express.urlencoded({ extended: true }));

server.use(express.json());
server.use(cors());
server.use(express.static('Public'));

server.listen(3000, () => {
    console.log("Server is listening...")
    console.log("open browser at: localhost:3000")
});

module.exports = server;