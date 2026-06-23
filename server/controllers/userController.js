const githubService = require('../services/githubService');

const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await githubService.getUser(username);
    res.json(user);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: 'Failed to fetch user from GitHub',
    });
  }
};

const getUserRepos = async (req, res)=>{
    const {username} = req.params;

    try{
        const repos = await githubService.getUserRepos(username);
        res.json(repos);
    }
    catch(error){
        console.log(error.response?.status);
        console.log(error.message);
        res.status(error.response?.status || 500).json({
            message: 'Failed to fetch the repos from the github',
        });
    }
};

const getLanguagesCount = async (req, res)=>{
    const {username} = req.params;

    try{
        const languages = await githubService.getLanguagesCount(username);
        res.json(languages);
    }
    catch(error){
        console.log(error.response?.status);
        console.log(error.message);
        res.status(error.response?.status || 500).json({
            message : 'Failed to fetch the languages from the repo'
        });
    }
};

const getSingleRepo = async(req, res)=>{
    const {owner, repo} = req.params;

     try{
        const single = await githubService.getSingleRepo(owner,repo);
        res.json(single);
    }
    catch(error){
        res.status(error.response?.status || 500).json({
            message : 'Failed to fetch the  the repo'
        });
    }
}

const compareUsers = async(req,res)=>{
    const {user1, user2} =req.query;

    try{
        const compUser = await githubService.compareUsers(user1,user2);
        res.json(compUser);
    }
    catch(error){
        res.status(error.response?.status || 500).json({
            message : 'Failed to compare the users'
        });

    }
}

const compareRepos = async(req,res)=>{
    const {repo1, repo2} = req.query;

    try{
        const compRepo = await githubService.compareRepos(repo1,repo2);
        res.json(compRepo);
    }
    catch(error){
        res.status(error.response?.status || 500).json({
            message : 'Failed to compare the repos'
        });
    }

}
module.exports = { getUserProfile, getUserRepos, getLanguagesCount, getSingleRepo, compareUsers, compareRepos};