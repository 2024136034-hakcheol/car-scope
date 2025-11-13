import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left-section">
                    <Link to="/" className="logo">CarScope</Link>
                </div>
                <div className="header-right-section">
                    <div className="search-bar">
                        <input type="text" placeholder="검색어를 입력하세요..." className="search-input" />
                        <button className="search-button">🔍</button>
                    </div>
                    <nav className="nav-menu">
                        <ul>
                            <li><Link to="/news">뉴스</Link></li>
                            <li><Link to="/parking">주차장</Link></li>
                            <li><Link to="/membership">멤버십</Link></li>
                        </ul>
                    </nav>
                    <div className="auth-buttons">
                        <Link to="/login" className="auth-button login-button">로그인</Link>
                        <Link to="/register" className="auth-button register-button">회원가입</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;