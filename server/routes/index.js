const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/all', async (req, res, next) => {
    try {
        let results = await db.all();
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        let results = await db.search(req.query.search);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});



module.exports = router;