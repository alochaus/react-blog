const initialState = 1;

const pageReducer = (state = initialState, {type, payload}) => {
  switch(type){
    case 'SET_PAGE':
      return payload;
    default:
      return state;
  }
};

export default pageReducer;
