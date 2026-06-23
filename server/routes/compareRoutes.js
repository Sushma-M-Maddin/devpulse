const express = require('express');
const router = express.Router();
const { compareUsers, compareRepos } = require('../controllers/userController');

router.get('/users', compareUsers);
router.get('/repos',compareRepos);


module.exports = router;