const express = require('express');
const router = express.Router();
const { getUserProfile, getUserRepos, getLanguagesCount } = require('../controllers/userController');

router.get('/:username', getUserProfile);
router.get('/:username/repos', getUserRepos)
router.get('/:username/languages', getLanguagesCount);

module.exports = router;