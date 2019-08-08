const initialState = {
  username: "",
  email: "",
  isLogged: false
};

const userReducer = (state = initialState, {type, payload}) => {
  switch(type){
    case 'VERIFY':
      return{
        ...state,
        username: payload.username,
        email: payload.email,
        isLogged: payload.isLogged
      };
    case 'SIGN_OUT':
      return{
        ...initialState
      }
    default:
      return state;
  }
};

export default userReducer;
