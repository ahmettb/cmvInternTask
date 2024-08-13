import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/AdminNavbar.css";

const NavBar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a className="navbar-brand" href="#">Admin Paneli</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/news-list">Haber Bilgileri</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/add-news">Haber Ekle</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/notice-list">Duyuru Bilgileri</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/add-notice">Duyuru Ekle</NavLink>
          </li>
        </ul>
        <div className="navbar-nav ml-auto">
          <button onClick={onLogout} className="btn btn-danger">Çıkış Yap</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
