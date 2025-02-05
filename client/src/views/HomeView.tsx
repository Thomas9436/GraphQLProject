import React from "react";
// import { FaSearch, FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";
// import '../styles/Homeview.css';
import MainComponent from '../components/MainComponent';
import SideBar from '../layout/SideBar';

const HomeView: React.FC = () => {
    return (
        <>
            <div className='app'>
                <SideBar />
                <MainComponent />
            </div>

        </>
    );
};

export default HomeView;