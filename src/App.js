import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ParkingPage from './pages/ParkingPage';
import NewsPage from './pages/NewsPage';
import MembershipPage from './pages/MembershipPage';
import './App.css';

const Header = () => {
    return (
        <header className="app-header">
            <nav>
                <div className="header-top">
                    <div className="logo-section">
                        <Link to="/">
                            <div className="logo-image">CarScope</div>
                        </Link>
                    </div>

                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="차량 모델명, 지역 주차장, 리뷰 검색..." 
                            className="search-input"
                        />
                    </div>

                    <div className="auth-buttons">
                        <Link to="/login" className="login-btn">로그인</Link>
                        <Link to="/join" className="join-btn">회원가입</Link>
                    </div>
                </div>

                <div className="nav-links">
                    <Link to="/">홈</Link>
                    <Link to="/reviews">리뷰</Link>
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
                <Link to="/policy">개인정보처리방침</Link> | 
                <Link to="/terms">이용약관</Link> | 
                <Link to="/contact">고객센터</Link>
            </div>
        </footer>
    );
};


function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/parking" element={<ParkingPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/reviews" element={<div>리뷰 페이지</div>} />
          <Route path="/community" element={<div>커뮤니티 페이지</div>} />
          <Route path="/join" element={<div>회원가입 페이지</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;