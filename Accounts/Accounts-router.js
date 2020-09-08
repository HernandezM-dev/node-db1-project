const express = require('express');

// database access using knex
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    // respond with a list of posts from the db
    // db('posts') //alternative
    db.select('*').from('accounts')
    .then(accounts =>{
        res.status(200).json({data: accounts})
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({message: "no"})
    })
});

router.get('/:id', (req, res) => {
    const accountId = req.params.id
    db('accounts')
    .where({id: accountId})
    .select()
    .then(account =>{
        res.status(200).json({data: account})
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({message: "no"})
    })
});

router.post('/', (req, res) => {
    const newAccount = req.body;
    // db('accounts').insert(account).returning('id')// do not exclude this line if you plan to support PostgreSQL
    db('accounts')
    .insert(newAccount)
    .then(ids =>{
        // .returning() is not supported by sqlite3 and will not have any effect.
        //can be safely ignored when using SQLite
        //it will go away when using PostgresSQL
        res.status(201).json({inserted: ids})
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({message: err})
    })
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    console.log(changes)
    const accountId = req.params.id;
    console.log(req.params.id)

    //where the id = id
    db('accounts')
    .where({id: accountId})
    // .where('id', '=', 'postId')// another way to write the where
    .update(changes)
    .then(count =>{
        count 
        ? res.status(200).json({message: "Updated Successfully"})
        : res.status(404).json({message: "not found"})
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({message: "no"})
    })
});

router.delete('/:id', (req, res) => {
    const accountId = req.params.id;

    //where the id = id
    db('accounts')
    .where({id: accountId})
    // .where('id', '=', 'postId')// another way to write the where
    .del() // delete instead of update
    .then(count =>{
        count 
        ? res.status(200).json({message: "Removed Successfully"})
        : res.status(404).json({message: "not found"})
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({message: "no"})
    })
});

module.exports = router;