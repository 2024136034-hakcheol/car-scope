import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ParkingPage from './pages/ParkingPage';
import NewsPage from './pages/NewsPage';
import LoginPage from './pages/LoginPage';
import './App.css'; 
import logo from './logo.svg';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="App-logo">
            <Link to="/">
              <img src={logo} className="App-logo-img" alt="CarScope logo" />
            </Link>
          </div>
          <div className="App-center-nav">
            <nav>
              <Link to="/parking">주차장</Link>
              <Link to="/community">커뮤니티</Link>
              <Link to="/news">뉴스</Link>
              <Link to="/membership">멤버십</Link>
            </nav>
          </div>
          <div className="App-right-functions">
            <input type="text" placeholder="검색" className="search-input" />
            <Link to="/login" className="login-button">로그인</Link>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/parking" element={<ParkingPage />} />
            <Route path="/community" element={<h2 style={{ textAlign: 'center' }}>커뮤니티 페이지 (준비 중)</h2>} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/membership" element={<h2 style={{ textAlign: 'center' }}>멤버십 페이지 (준비 중)</h2>} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;