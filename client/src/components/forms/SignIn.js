import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {verifyToken} from '../../actions/userActions.js';

export default function SignIn(props){
  const [data, setData] = useState({
    email:"",
    password:"",
    msg:""
  });
  const dispatch = useDispatch();
  const onChange = (event) => {
    setData({...data, [event.target.name]: event.target.value});
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const {email, password} = data;
    let res = await fetch('/api/user/signin', {method:'POST', headers:{'Content-type':'application/json'}, body:JSON.stringify({email, password})})
    res = await res.json();
    if(res.msg){
      setData({email:"", password:"", msg:res.msg});
    } else{
      localStorage.setItem('token', res.token);
      dispatch(verifyToken());
      props.history.push('/');
    }
  }
    /*
      .then((res) => res.json(res)).then((res) => {
      if(Object.keys(res).includes('msg')){
        setData({email:"", password:"", msg: res.msg});
      } else{
        localStorage.setItem('token', res.token);
        dispatch(verifyToken());
        props.history.push('/');
      }
    });
    */
  const result = (data.msg) ? (<p>{data.msg}</p>) : null;

  return(
    <div className="mfooter form">
      <h1>Sign in</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" value={data.email} onChange={onChange} placeholder="Email" required />
        <br />
        <input type="password" name="password" value={data.password} onChange={onChange} placeholder="Password" required />
        <br />
        <input className="page-btn" type="submit" value="Sign in" />
        {result}
      </form>
    </div>
  );
}
