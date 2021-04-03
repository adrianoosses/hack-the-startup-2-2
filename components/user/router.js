const express = require('express');
const { users } = require('./index.js');
const usersHandlers = users();
const router = express.Router();


/**
 * User routes
 */

router.post('/', usersHandlers.signUp);
router.post('/login', usersHandlers.login);
router.get('/', usersHandlers.findAll);


exports.routes = router;
