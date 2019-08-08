const db = require('../psql-con.js');

module.exports = {
  // returns true if the input inserted by the user meets the requirements in the form.
  validUser: (email, username, password) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailRegEx.test(email);

    const validUsername = typeof username == 'string' && username.trim().length > 2;

    // minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const validPassword = passwordRegEx.test(password);
    return validEmail && validUsername && validPassword;
  },

  // returns true if email exists
  emailExists: async (email) => {
    const {rows} = await db.query('SELECT email FROM users WHERE email = $1', [email]);  
    if(rows.length === 0){
      return false;
    }
    return true;
  },

  // returns true if username exists
  usernameExists: async (username) => {
  const {rows} = await db.query('SELECT username FROM users WHERE username = $1', [username]);  
  if(rows.length === 0){
    return false;
  }
  return true;
  }
}
