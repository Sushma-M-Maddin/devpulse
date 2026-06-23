const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

//To get the user profile
const getUser = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });

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

//To get all the reops of user
const getUserRepos = async(username)=>{
  const response = await axios.get(`https://api.github.com/users/${username}/repos`,{
    headers:{
      Authorization:`Bearer ${GITHUB_TOKEN}`,
    },
  });
   
//When an arrow function returns an object directly (without a return keyword), you must wrap the {} in () — otherwise JavaScript thinks the {} is a function body, not an object. The () tells it "this is an object, not a block of code."
return response.data.map(repo=>({
    name: repo.name,
    description: repo.description,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    url: repo.html_url,
    updatedAt: repo.updated_at,
}));

}

//To get the Language count used by user
const getLanguagesCount = async(username)=>{
const response = await axios.get(`https://api.github.com/users/${username}/repos`,{
    headers:{
      Authorization:`Bearer ${GITHUB_TOKEN}`,
    },
});

const languages = {};

response.data.forEach(repo=>{
  if(repo.language){
    languages[repo.language] = (languages[repo.language] || 0) + 1;
  }
})

return languages;
};

const getSingleRepo = async(owner, repo)=>{
  const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`,{
    headers:{
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });

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
}

const compareUsers = async (user1, user2)=>{
  const [firstUser, secondUser] = await Promise.all([
    getUser(user1),
    getUser(user2)
  ]);

  return {
          user1: firstUser,
          user2: secondUser
        };
}

const compareRepos = async (repo1, repo2)=>{

  const [owner1, repoName1] = repo1.split('/');
  const [owner2, repoName2] = repo2.split('/');

  const [firstRepo, secondRepo] = await Promise.all([
    getSingleRepo(owner1, repoName1),
    getSingleRepo(owner2, repoName2)
  ]);

  return {
    repo1: firstRepo,
    repo2: secondRepo
  };
}

module.exports = { getUser, getUserRepos, getLanguagesCount, getSingleRepo, compareUsers, compareRepos };

