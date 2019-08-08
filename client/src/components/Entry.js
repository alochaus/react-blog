import React, {useState, useEffect} from 'react';

export default function(props){
  const [entry, setEntry] = useState({});

  useEffect(() => {
    const fetchEntry = async () => {
      let res = await fetch(`/api/entries/${props.match.params.id}`);
      res = await res.json();
      setEntry({...res[0]});
    }
    fetchEntry();
  }, [props.match.params.id]);

  const displayEntry = 
    <div className="mfooter entry">
      <p className="header">{entry.header}</p>
      <p className="subheader">{entry.subheader}</p>
      <p className="category">{entry.category}</p>
      <div className="content" dangerouslySetInnerHTML={{__html:entry.content}}></div>
      <p className="author">Written by: {entry.author}</p>
      <p className="date">{entry.date}</p>
    </div>

  return(
    <>
    {displayEntry}
    </>
  );
}
