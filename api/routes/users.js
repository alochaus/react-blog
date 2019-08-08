const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../psql-con.js');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken.js');
const {validUser, emailExists, usernameExists} = require('./userFunctions.js');

router.post('/signup', async (req, res) => {
  const {email, username, password, c_password} = req.body;
  var err = [];
  if(validUser(email, username, password)){
    const emailResponse = await emailExists(email);
    err = emailResponse ? [...err, "This email is already in use."] : [...err];

    const usernameResponse = await usernameExists(username)
    err = usernameResponse ? [...err, "This username is already in use."] : [...err];

    if(Object.keys(err).length === 0){
      const hash = bcrypt.hashSync(password, 10);
      await db.query('INSERT INTO users VALUES($1, $2, $3)', [email, username, hash]);
      res.status(201).send(["User successfully registered!"])
    } else{
      res.status(400).send(err);
    }
  } else{
      res.status(400).send(["Inputted data does not meet the requirements."]);
  }
});

router.post('/signin', async (req, res) => {
  const {email, password} = req.body;
  const emailResponse = await emailExists(email);
  if(!emailResponse){
    res.status(401).send({msg:"Email or password is incorrect."});
  } else{
    const {rows} = await db.query('SELECT username, email, hash FROM users WHERE email = $1', [email]);
    const hash = rows[0].hash;
    if(bcrypt.compareSync(password, hash)){
      const {email, username} = rows[0];
      const token = jwt.sign({username, email}, process.env.JWTSECRETKEY, {expiresIn:"1h"});
      res.status(200).send({"token":token, user:{username, email}});
    } else{
      res.status(401).send({msg:"Email or password is incorrect."});
    }
  }
});

router.post('/isLogged', verify, async (req, res) => {
  res.status(200).send({isLogged:true, email: req.user.email, username: req.user.username});
});

module.exports = router;
