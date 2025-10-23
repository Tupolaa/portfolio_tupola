import React from 'react';
import Button from 'react-bootstrap/Button'; // <- imported

import Link from 'next/link';


const Navbar = () => {
  return (
   <header>
      <nav className="container">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        </nav>
        <div className="header-actions">
          <Button className="lang-btn" onClick={() => window.location.href="/contact"} variant="primary">Fin</Button>
          <Button className="lang-btn" onClick={() => window.location.href="/contact"} variant="primary">Eng</Button>
        </div>
      
    </header>
  );
};

export default Navbar;