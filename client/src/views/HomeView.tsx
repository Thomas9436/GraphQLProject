import React from "react";
// import { FaSearch, FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";
import '../styles/Homeview.css';
const HomeView: React.FC = () => {
    return (
        <>
            <div className="menu">
                HOME
            </div>

            <h1 className="title">Touitteur n'attend plus que vous.</h1>

            <div className="mainBox">
                <div className="title">PAGE PRINCIPALE</div>
                <div className="loginInputs">
                    <input type="text" placeholder='Login' />
                    <input type="text" placeholder='Password' />
                </div>

                <div className="loginForgot">
                    <a href="/">Identifiants oubliés ?</a>
                </div>
            </div>

        </>
    );
};

export default HomeView;