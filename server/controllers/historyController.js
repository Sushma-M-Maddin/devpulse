const historyService = require('../services/historyService');

const saveSearch = async (req, res) => {
  const { query, type } = req.body;
  const userId = req.user.id;

  try {
    const search = await historyService.saveSearch(userId, query, type);
    res.json(search);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSearchHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await historyService.getSearchHistory(userId);
    res.json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { saveSearch, getSearchHistory };