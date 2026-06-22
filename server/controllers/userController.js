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
        console.log(error.response?.status);
        console.log(error.message);
        res.status(error.response?.status || 500).json({
            message : 'Failed to fetch the  the repo'
        });
    }
}
module.exports = { getUserProfile, getUserRepos, getLanguagesCount, getSingleRepo};