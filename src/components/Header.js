import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const getLinkClass = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('검색어:', searchTerm);
    };

    return (
        <header className="header-container">
            <div className="logo">
                <Link to="/">CarScope</Link>
            </div>
            <div className="header-right-section">
                <form className="search-bar" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        <svg className="search-icon" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </button>
                </form>
                <nav>
                    <ul className="nav-menu">
                        <li><Link to="/" className={getLinkClass('/')}>홈</Link></li>
                        <li><Link to="/news" className={getLinkClass('/news')}>뉴스</Link></li>
                        <li><Link to="/parking" className={getLinkClass('/parking')}>주차</Link></li>
                        <li><Link to="/membership" className={getLinkClass('/membership')}>멤버십</Link></li>
                        <li><Link to="/login" className={`login-button ${getLinkClass('/login')}`}>로그인</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;