import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ParkingPage from './pages/ParkingPage';
import MembershipPage from './pages/MembershipPage';
import NewsPage from './pages/NewsPage';

function App() {
    return (
        <Router>
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
                            <Link to="/login" className="login-btn">로그인</Link>
                            <Link to="/join" className="join-btn">회원가입</Link>
                        </div>
                    </div>
                    <div className="nav-links">
                        <Link to="/">홈</Link>
                        <Link to="/review">리뷰</Link>
                        <Link to="/parking">주차장</Link>
                        <Link to="/community">커뮤니티</Link>
                        <Link to="/news">뉴스</Link>
                        <Link to="/membership" className="membership-link">멤버십</Link>
                    </div>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/parking" element={<ParkingPage />} />
                    <Route path="/membership" element={<MembershipPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    
                    <Route path="/review" element={<div>리뷰 페이지 내용</div>} />
                    <Route path="/join" element={<div>회원가입 페이지 내용</div>} />
                    <Route path="/community" element={<div>커뮤니티 페이지 내용</div>} />
                </Routes>
            </main>

            <footer className="app-footer">
                <p>&copy; 2024 CarScope. All rights reserved.</p>
                <div>
                    <a href="/privacy">개인정보처리방침</a> | <a href="/terms">이용약관</a> | <a href="/support">고객센터</a>
                </div>
            </footer>
        </Router>
    );
}

export default App;