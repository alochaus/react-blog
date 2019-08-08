import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {signOut} from '../actions/userActions.js';

import {setPage} from '../actions/pageActions.js';

function Nav(){
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.userReducer.isLogged);
  const hamburger = () => {
    setActive(!active);
  };
  const removeToken = async () => {
    await setActive(false);
    localStorage.removeItem('token');
    dispatch(signOut());
  }

  const links = (!isLogged) ? (
    <>
    <li><Link to="/signin" onClick={() => setActive(false)}>Sign in</Link></li>
    <li><Link to="/signup" onClick={() => setActive(false)}>Sign up</Link></li></>
  ) : (
    <>
    <li><Link to="/new" onClick={() => setActive(false)}>New Entry</Link></li>
    <li><Link to="/" onClick={removeToken}>Sign out</Link></li></>
  );
  
  const isActive = (active) ? (" active") : ("");
  
  return(
    <div className="Nav">
      <nav>
        <div className="navbar">
          <div className="togglebtn" onClick={hamburger}>
            <i className="fa fa-bars"></i>
          </div>
          <div className="title"><h1><Link to="/" onClick={() => dispatch(setPage(1))}>&lambda;loc</Link></h1></div>
          <div className={`links${isActive}`}>
            <ul>
              <li><Link to="/" onClick={() => {
                setActive(false);
                dispatch(setPage(1));
              }}>Home</Link></li>
              {links}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
