/*
 * GET home page.
 */

//import * as express from "express";
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

//export default router;
module.exports = router;