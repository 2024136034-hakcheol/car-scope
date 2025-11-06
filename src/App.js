import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MembershipPage from './pages/MembershipPage';
import NewsPage from './pages/NewsPage';
import ParkingPage from './pages/ParkingPage';
import './App.css';

const Header = () => {
    return (
        <header className="app-header">
            <nav>
                <div className="header-top">
                    <div className="logo-section">
                        <Link to="/" className="logo-image">CarScope</Link>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="차량 모델명, 지역 주차장, 리뷰 검색..." className="search-input" />
                    </div>
                    <div className="auth-buttons">
                        <Link to="/login">로그인</Link>
                        <Link to="/join" className="join-btn">회원가입</Link>
                    </div>
                </div>
                <div className="nav-links">
                    <Link to="/parking">주차</Link>
                    <Link to="/community">커뮤니티</Link>
                    <Link to="/news">뉴스</Link>
                    <Link to="/membership" className="membership-link">멤버십</Link>
                </div>
            </nav>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="app-footer">
            <p>&copy; 2024 CarScope. All rights reserved.</p>
            <div>
                <a href="#">이용약관</a> | 
                <a href="#">개인정보처리방침</a> | 
                <a href="#">고객센터</a>
            </div>
        </footer>
    );
};

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/join" element={<LoginPage />} />
                    <Route path="/membership" element={<MembershipPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/parking" element={<ParkingPage />} />
                    
                    <Route path="/community" element={<div><h1>커뮤니티 페이지</h1><p>내용 준비 중입니다.</p></div>} />
                    <Route path="/review" element={<div><h1>리뷰 페이지</h1><p>내용 준비 중입니다.</p></div>} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;