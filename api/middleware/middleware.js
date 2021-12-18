const User = require("../users/users-model.js");

const checkUsernameExists = async (req, res, next) => {
  const [user] = await User.getBy({ username: req.body.username });
  if (!user) {
    next({ status: 401, message: "Invalid credentials" });
  } else {
    req.user = user;
    next();
  }
};

const checkUserInDB =  async (req,res,next) => {
    try{
        const row = await User.findBy({username: req.body.username})
        if(!row.length){
            next()
        }
        else {
            res.status(401).json("username taken")
    } 
    } catch(e) {
        res.status(500).json(`server error: ${e.message}`)

    }
}

const checkPayload = (req, res, next) => {
    if(!req.body.username || !req.body.password ){
        res.status(401).json({message: "username and password required"})
    }
    else{
        next()
    }
}

const checkPasswordLength = (req, res, next) => {
  if (!req.body.password || req.body.password.length > 3) {
    next();
  } else {
    next({ status: 422, message: "Password is too short!" });
  }
};

module.exports = {
  checkUsernameExists,
  checkPayload,
  checkUserInDB,
  checkPasswordLength
};