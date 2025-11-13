import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const supportLinks = [
    { name: '자주 묻는 질문', link: '/faq' },
    { name: '문의하기', link: '/contact' },
    { name: '개인정보 처리방침', link: '/privacy' },
    { name: '이용약관', link: '/terms' },
    { name: '긴급출동서비스', link: '/emergency' },
];

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-content">
                    <ul className="support-links-only">
                        {supportLinks.map((linkItem, index) => (
                            <li key={index}>
                                <Link to={linkItem.link}>{linkItem.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 CarScope. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;