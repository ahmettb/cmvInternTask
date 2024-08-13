import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // CSS dosyasını import edin
import "../styles/AnaSayfaNavbar.css"
const AnaSayfaNavbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/duyurular">Duyurular</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/haberler">Haberler</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AnaSayfaNavbar;
