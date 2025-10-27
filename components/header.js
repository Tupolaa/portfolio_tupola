import React from 'react';
import Button from 'react-bootstrap/Button'; 
import FinData from '../public/Data/Fin.json'; 
import Link from 'next/link';


const Navbar = () => {
  const { links } = FinData.fi.Nav;
  return (
   <header>
   
      <nav className="container">
      <ul >
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link[link.Name.toLowerCase()]} target="_blank" rel="noopener noreferrer">
                {link.Name}
              </Link>
            </li>
          ))}
        </ul>
          <div className="lang-buttons">
            <button
             
            >
              FIN
            </button>
            <button
             
            >
              ENG
            </button>
          </div>
        </nav>
        
        {/* TODO kieli napit toimimaan kun sivu muuten valmis */}
      
      
    </header>
  );
};

export default Navbar;