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
                
                <div className="header-center-section">
                    <div className="search-bar">
                        <input type="text" className="search-input" placeholder="차량명, 지역명 등으로 검색" />
                        <button className="search-button">🔍</button> 
                    </div>
                </div>
                
                <div className="header-right-section">
                    <nav className="nav-menu">
                        <ul>
                            <li><Link to="/news">뉴스</Link></li>
                            <li><Link to="/parking">주차장</Link></li>
                            <li><Link to="/membership">멤버십</Link></li>
                        </ul>
                    </nav>
                    <div className="auth-buttons">
                        <Link to="/login" className="auth-button login-button">로그인</Link>
                        <Link to="/signup" className="auth-button register-button">회원가입</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;