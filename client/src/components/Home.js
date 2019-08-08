import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {setPage} from '../actions/pageActions.js';

export default function Home(props){
  const [entries, setEntries] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector(state => state.pageReducer);

  useEffect(() => {
    const fetchEntries = async () => {
      let res = await fetch(`/api/entries/page/${page}`);
      res = await res.json();
      setEntries([...res]);
    };

    fetchEntries();
  }, [page]);

  const lastEntry = entries[entries.length - 1];

  const displayEntries = entries.map((entries) => 
    <div className="entry" key={entries.row_number}>
      <Link to={"/entry/" + entries.link}><p className="header">{entries.header}</p></Link>
      <p className="subheader">{entries.subheader}</p>
      <p className="category">{entries.category}</p>
      <p className="author">Written by: {entries.author}</p>
      <p className="date">{entries.date}</p>
    </div>
  );

  const displayPrevBtn = (lastEntry === undefined || page === 1) ?
    null : <Link to={`/page/${page - 1}`} onClick={() => dispatch(setPage(page - 1))}><button className="page-btn">Prev</button></Link>;

  const displayNextBtn = (lastEntry === undefined || lastEntry.row_number === '1') ? 
    null : <Link to={`/page/${page + 1}`} onClick={() => dispatch(setPage(page + 1))}><button className="page-btn">Next</button></Link>;

  return(
    <>
    {displayEntries}
    <br />
    <div className="mfooter">
    {displayPrevBtn}{displayNextBtn}
    </div>
    </>
  );
}
