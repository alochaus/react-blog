export const verifyToken = () => {
  return dispatch => {
    fetch('/api/user/isLogged', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({token: localStorage.getItem('token')})
    })
      .then((res) => res.json())
      .then((payload) => dispatch({type: 'VERIFY', payload}));
  }
}

export const signOut = () => {
  return{type:'SIGN_OUT'};
}
