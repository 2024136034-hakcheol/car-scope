import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h3>CarScope</h3>
                    <p>자동차 생활의 모든 것을 한 곳에서. CarScope와 함께 스마트한 운전을 경험하세요.</p>
                    <p>&copy; 2025 CarScope. All rights reserved.</p>
                </div>

                <div className="footer-section links">
                    <h3>사이트맵</h3>
                    <ul>
                        <li><Link to="/about">회사소개</Link></li>
                        <li><Link to="/news">최신 뉴스</Link></li>
                        <li><Link to="/parking">주차장 찾기</Link></li>
                        <li><Link to="/membership">멤버십</Link></li>
                    </ul>
                </div>

                <div className="footer-section support">
                    <h3>고객 지원</h3>
                    <ul>
                        <li><Link to="/faq">자주 묻는 질문</Link></li>
                        <li><Link to="/contact">문의하기</Link></li>
                        <li><Link to="/privacy">개인정보 처리방침</Link></li>
                        <li><Link to="/terms">이용약관</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;