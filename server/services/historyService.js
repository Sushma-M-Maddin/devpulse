const prisma = require('../config/db');

const saveSearch = async (userId, query, type) => {
  const search = await prisma.searchHistory.create({
    data: {
      userId,
      query,
      type
    }
  });
  return search;
};

const getSearchHistory = async (userId) => {
  const history = await prisma.searchHistory.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
  return history;
};

module.exports = { saveSearch, getSearchHistory };