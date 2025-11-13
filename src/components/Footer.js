import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links-only">
                <ul>
                    <li><Link to="/faq">자주 묻는 질문</Link></li>
                    <li><Link to="/contact">문의하기</Link></li>
                    <li><Link to="/privacy">개인정보 처리방침</Link></li>
                    <li><Link to="/terms">이용약관</Link></li>
                    <li><Link to="/emergency">긴급출동서비스</Link></li>
                </ul>
            </div>
            <div className="copyright">
                &copy; 2025 CarScope. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;