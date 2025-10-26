import React from 'react';
import Button from 'react-bootstrap/Button'; 
import FinData from '../public/Data/Fin.json'; 
import Link from 'next/link';


const Navbar = () => {
  const { links } = FinData.fi.Nav;
  return (
   <header>
      <nav className="container">
      <ul>
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link[link.Name.toLowerCase()]}target="_blank" rel="noopener noreferrer">
                {link.Name}
              </Link>
            </li>
          ))}
        </ul>
        </nav>
        {/* TODO kieli napit toimimaan kun sivu muuten valmis */}
        <div className="header-actions">
          <Button className="lang-btn" onClick={() => window.location.href="/contact"} variant="primary">Fin</Button>
          <Button className="lang-btn" onClick={() => window.location.href="/contact"} variant="primary">Eng</Button>
        </div>
      
    </header>
  );
};

export default Navbar;