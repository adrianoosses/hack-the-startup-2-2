const express = require('express');
const {
	loadData, findAll,
} = require('./service');

const router = express.Router();


router.post('/', loadData);
router.get('/', findAll);


exports.routes = router;