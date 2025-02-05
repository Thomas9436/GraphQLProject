// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Accueil
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Connexion
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Inscription
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
