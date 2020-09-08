const express = require("express");

const db = require("../data/dbConfig.js");
const accountsRouter = require('../Accounts/Accounts-router')
const server = express();
server.use(express.json());
server.use('/api/accounts', accountsRouter)
server.get('/', (req, res) =>{
    res.status(200).json({message: "It works"})
} )



module.exports = server;
