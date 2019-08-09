import React from 'react';
import GitHub from '../images/GitHub.png';
import Envelope from '../images/Envelope.png';

export default function Footer(){
  return(
    <div className="footer">
      <a href="https://github.com/alochaus"><img src={GitHub} alt="GitHub"/></a>
      <a href="mailto:aloc@techie.com"><img className="envelope" src={Envelope} alt="Envelope"/></a>
    </div> 
  );
}

