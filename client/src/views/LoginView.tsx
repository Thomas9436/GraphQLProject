import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/loginview.css";

const LoginView: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // vérification basique (à remplacer par un appel API)
    if (login === "admin" && password === "1234") {
      console.log("Connexion réussie !");
      navigate("/home"); // Redirection après connexion
    } else {
      alert("Identifiants incorrects !");
    }
  };

  return (
    <>
      <div className="menu">HOME</div>

      <h1 className="title">Touitteur n'attend plus que vous.</h1>

      <div className="mainBox">
        <div className="title">CONNEXION</div>
        
        <form onSubmit={handleSubmit}>
          <div className="loginInputs">
            <input 
              type="text" 
              placeholder="Login" 
              value={login} 
              onChange={(e) => setLogin(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn-login">Se connecter</button>

          <div className="loginFooter">
            <Link to="/register" className="loginToRegister">
              Pas encore de compte ?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginView;