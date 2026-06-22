const express = require('express');
const router = express.Router();
const { getSingleRepo } = require('../controllers/userController');

router.get('/:owner/:repo', getSingleRepo);


module.exports = router;