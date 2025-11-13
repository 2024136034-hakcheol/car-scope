import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>CarScope</h4>
                    <p>대표: 김철수 | 개인정보보호 책임자: 박영희</p>
                    <p>사업자등록번호: 123-45-67890</p>
                    <p>주소: 서울특별시 강남구 테헤란로 123</p>
                    <p>고객센터: 1588-XXXX</p>
                </div>
                <div className="footer-section">
                    <h4>서비스</h4>
                    <ul>
                        <li><Link to="/">홈</Link></li>
                        <li><Link to="/news">최신 뉴스</Link></li>
                        <li><Link to="/parking">주차 예약</Link></li>
                        <li><Link to="/membership">프리미엄 멤버십</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>지원</h4>
                    <ul>
                        <li><Link to="/faq">자주 묻는 질문</Link></li>
                        <li><Link to="/contact">문의하기</Link></li>
                        <li><Link to="/privacy-policy">개인정보 처리방침</Link></li>
                        <li><Link to="/terms">이용약관</Link></li>
                        <li><Link to="/emergency-service">긴급출동서비스</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} CarScope. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;