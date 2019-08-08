const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const {token} = req.body;
  const tokenRegEx = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  if(!token) return res.status(401);
  if(tokenRegEx.test(token)){
  try{
    const verified = jwt.verify(token, process.env.JWTSECRETKEY);
    req.user = verified;
    next();
  } catch(err){
    res.status(401).send({isLogged:false, email:'', username:''});
  }
  } else{
    res.status(401).send({isLogged:false, email:'', username:''});
  }
};
