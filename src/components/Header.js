import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="app-header">
            <nav>
                <div className="header-top">
                    <div className="logo-section">
                        <Link to="/" className="logo-image">CarScope</Link>
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="차량 모델명, 지역 주차장, 리뷰 검색..."
                            className="search-input"
                        />
                    </div>
                    <div className="auth-buttons">
                        <Link to="/login">로그인</Link>
                        <Link to="/join" className="join-btn">회원가입</Link>
                    </div>
                </div>
                <div className="nav-links">
                    <Link to="/parking">주차장</Link>
                    <Link to="/community">커뮤니티</Link>
                    <Link to="/news">뉴스</Link>
                    <Link to="/membership">멤버십</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;