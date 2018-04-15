/*
 * GET users listing.
 */
//import * as express from "express";
//import * as validator from "express-validator";
//import { UserManager } from "../logic/UserManagement/UserManager";

var express = require('express');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var router = express.Router();
import { UserManager } from '../logic/UserManagement/UserManager';

var userMgr = new UserManager();


router.get('/', (req, res) => {
    res.send("Anton test");
});

router.get('/register', (req, res) => {
    res.render('UserManagement/register', { title: 'Register', error1: 'test'});
});

router.post('/register', [
    check('email')
    // Every validator method in the validator lib is available as a
    // method in the check() APIs.
    // You can customize per validator messages with .withMessage()
    .isEmail().withMessage('must be an email')
        
    // Every sanitizer method in the validator lib is available as well!
    .trim()
    .normalizeEmail(),

  // General error messages can be given as a 2nd argument in the check APIs
  check('password', 'passwords must be at least 5 chars long and contain one number and has to mach the other pw')
    .isLength({ min: 5 })
        .matches(/\d/)
      .equals('confirmPassword')
            
    

], (req, res, next) => {
  // Get the validation result whenever you want; see the Validation Result API for all options!
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //return res.status(422).json({ errors: errors.mapped() });
      res.status(422);
      res.render('UserManagement/register', { title: 'Register' });
  }

  // matchedData returns only the subset of data validated by the middleware
    const user = matchedData(req);
    userMgr.Create(user).then(user => res.json(user));
});

module.exports = router;