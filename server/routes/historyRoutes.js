const express = require('express');
const router = express.Router();
const { saveSearch, getSearchHistory } = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, saveSearch);
router.get('/', protect, getSearchHistory);

module.exports = router;