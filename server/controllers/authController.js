const authService = require('../services/authService');

const registerUser = async(req, res)=>{
    const {email,username,password} = req.body;

    try{
        const user = await authService.registerUser(email,username,password);
        res.json(user);
    }
    catch(error){
        res.status(400).json({ message: error.message });

    }
};

const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await authService.loginUser(email,password);
        res.json(user);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
}
module.exports = { registerUser, loginUser };