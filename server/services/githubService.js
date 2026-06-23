const axios = require('axios');

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

const getUser = async (username) => {
  const response = await githubAPI.get(`/users/${username}`);
  const data = response.data;
  return {
    username: data.login,
    name: data.name,
    avatar: data.avatar_url,
    bio: data.bio,
    location: data.location,
    publicRepos: data.public_repos,
    followers: data.followers,
    following: data.following,
    profileUrl: data.html_url,
    joinedAt: data.created_at,
  };
};

const getUserRepos = async (username) => {
  const response = await githubAPI.get(`/users/${username}/repos`);
  return response.data.map(repo => ({
    name: repo.name,
    description: repo.description,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    url: repo.html_url,
    updatedAt: repo.updated_at,
  }));
};

const getLanguagesCount = async (username) => {
  const response = await githubAPI.get(`/users/${username}/repos`);
  const languages = {};
  response.data.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });
  return languages;
};

const getSingleRepo = async (owner, repo) => {
  const response = await githubAPI.get(`/repos/${owner}/${repo}`);
  const data = response.data;
  return {
    name: data.name,
    description: data.description,
    stars: data.stargazers_count,
    forks: data.forks_count,
    language: data.language,
    url: data.html_url,
    openIssues: data.open_issues_count,
    watchers: data.watchers_count,
    updatedAt: data.updated_at,
  };
};

const compareUsers = async (user1, user2) => {
  const [firstUser, secondUser] = await Promise.all([
    getUser(user1),
    getUser(user2)
  ]);
  return { user1: firstUser, user2: secondUser };
};

const compareRepos = async (repo1, repo2) => {
  const [owner1, repoName1] = repo1.split('/');
  const [owner2, repoName2] = repo2.split('/');
  const [firstRepo, secondRepo] = await Promise.all([
    getSingleRepo(owner1, repoName1),
    getSingleRepo(owner2, repoName2)
  ]);
  return { repo1: firstRepo, repo2: secondRepo };
};

module.exports = { getUser, getUserRepos, getLanguagesCount, getSingleRepo, compareUsers, compareRepos };