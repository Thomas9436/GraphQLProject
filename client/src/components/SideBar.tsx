import React from "react";
import { FaHome, FaUser, FaEnvelope, FaCog, FaLock, FaQuestionCircle } from "react-icons/fa"; // Icônes
import '../styles/sidebar.css';
const menuItems = [
  { label: "Tendances", icon: <FaHome /> },
  { label: "Profil", icon: <FaUser /> },
  { label: "Messages", icon: <FaEnvelope /> },
  { label: "Paramètres", icon: <FaCog /> },
  { label: "Confidentialité", icon: <FaLock /> },
  { label: "Aide", icon: <FaQuestionCircle /> },
];

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <h2 className="menu-title">Menu</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;