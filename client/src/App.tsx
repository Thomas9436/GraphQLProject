import './App.css'
import { Routes, Route } from "react-router-dom";
// import SideBar from './components/SideBar.tsx';
// import Header from './components/Header.tsx';
import LoginView from './views/LoginView.tsx';
import RegisterView from './views/RegisterView.tsx';
import HomeView from './views/HomeView.tsx';

// import MainBox from './components/MainBox.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={< HomeView/>}/>
      <Route path="/home" element={< HomeView/>}/>
      <Route path="/login" element={<LoginView />}/>
      <Route path="/register" element={<RegisterView />}/>
    </Routes>
  )
}

export default App
