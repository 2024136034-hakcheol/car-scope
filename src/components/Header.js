import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    const getLinkClass = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <header className="header-container">
            <div className="logo">
                <Link to="/">CarScope</Link>
            </div>
            <nav>
                <ul className="nav-menu">
                    <li><Link to="/" className={getLinkClass('/')}>홈</Link></li>
                    <li><Link to="/news" className={getLinkClass('/news')}>뉴스</Link></li>
                    <li><Link to="/parking" className={getLinkClass('/parking')}>주차</Link></li>
                    <li><Link to="/membership" className={getLinkClass('/membership')}>멤버십</Link></li>
                    <li><Link to="/login" className={getLinkClass('/login')}>로그인</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;