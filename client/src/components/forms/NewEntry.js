import React, {useState} from 'react';

export default function SignIn(){
  const [data, setData] = useState({
    header:"",
    subheader:"",
    category:"",
    content:"",
    msg:"",
  });

  const onChange = (event) => {
    setData({...data, [event.target.name]: event.target.value});
  };
  
  const onSubmit = async (event) => {
    event.preventDefault();
    const {header, subheader, category, content} = data;
    let res = await fetch('/api/entries/new', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({token:localStorage.getItem('token'), header, subheader, category, content})});
    res = await res.json();
    setData({...data, msg:res.msg, header:"", subheader:"", category:"", content:""});
  }

  const result = (data.msg) ? (<p>{data.msg}</p>) : null;

  return(
    <div className="form">
      <h1>New Entry</h1>
      <form className="newEntry" onSubmit={onSubmit}>
        <input type="text" name="header" value={data.header} onChange={onChange} placeholder="Header" required />
        <br />
        <input type="text" name="subheader" value={data.subheader} onChange={onChange} placeholder="Subheader" required />
        <br />
        <input type="text" name="category" value={data.category} onChange={onChange} placeholder="Category" required />
        <br />
        <textarea name="content" value={data.content} onChange={onChange} placeholder="Content" required />
        <br />
        <input className="page-btn" type="submit" value="Submit" />
        {result}
      </form>
    </div>
  );
}
