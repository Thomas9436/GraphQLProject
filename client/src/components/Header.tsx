import React from "react";
import { FaSearch, FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";
import '../styles/header.css';

const Header: React.FC = () => {
  return (
    <header className="header">

      {/* Logo ou Nom du site */}
      <div className="logo">Touitteur</div>

      {/* Barre de recherche */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Rechercher..." />
      </div>

      {/* Icônes à droite */}
      <div className="header-icons">
        <FaBell className="icon" />
        <FaEnvelope className="icon" />
        <FaUserCircle className="icon" />
      </div>
    </header>
  );
};

export default Header;