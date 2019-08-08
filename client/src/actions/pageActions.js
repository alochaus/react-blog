export const setPage = (payload) => {
  if(typeof payload === 'number'){
    return{type:'SET_PAGE', payload};
  } else{
    return{type:'SET_PAGE', payload:0};
  }
};
