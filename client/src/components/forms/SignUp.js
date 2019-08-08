import React, {useState} from 'react';

export default function SignUn(){
  const [data, setData] = useState({
    email:"",
    username:"",
    password:"",
    c_password:"",
    msg:[]
  });

  const onChange = (event) => {
    setData({...data, [event.target.name]: event.target.value});
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const {email, username, password, c_password} = data;
    if(password === c_password){
      let res = await fetch('/api/user/signup', {method:'POST', headers:{'Content-type':'application/json'}, body:JSON.stringify({email, username, password, c_password})});
      res = await res.json();

      setData({
        email:"",
        username:"",
        password:"",
        c_password:"",
        msg:[...res]
      });
    } else{
      setData({
        ...data,
        password:"",
        c_password:"",
        msg:["Passwords don't match."]
      });
    }
  };

  const result = (data.msg) ? data.msg.map((msg) => <p>{msg}</p>) : null;
  return(
    <div className="mfooter form">
      <div className="requirements">
        <h2>Requirements:</h2>
        <ul>
          <li>Username: minimum 3 characters.</li>
          <li>Password: at least 8 characters, one uppercase letter, one lowercase letter and one number.</li>
        </ul>
      </div>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" value={data.email} onChange={onChange} placeholder="Email" required />
        <br />
        <input type="text" name="username" value={data.username} onChange={onChange} placeholder="Username" required />
        <br />
        <input type="password" name="password" value={data.password} onChange={onChange} placeholder="Password" required />
        <br />
        <input type="password" name="c_password" value={data.c_password} onChange={onChange} placeholder="Confirm your password" required />
        <br />
        <input className="page-btn" type="submit" value="Submit" />
      </form>
      {result}
    </div>
  );
}
