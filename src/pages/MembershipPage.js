import React from 'react';
import { Link } from 'react-router-dom';

const MembershipPage = () => {
    return (
        <div className="membership-page-container">
            <div className="membership-box">
                <h1>✨ CarScope 프리미엄 멤버십</h1>
                <p className="description">
                    프리미엄 멤버십에 가입하고 CarScope의 모든 독점 정보를 경험하세요.
                </p>

                <div className="feature-list">
                    <h2>멤버십 혜택</h2>
                    <ul>
                        <li>📌 **프리미엄 주차장 할인:** 전국 제휴 주차장 최대 50% 할인</li>
                        <li>📈 **심층 분석 리포트:** 신차 및 중고차 시장 심층 분석 리포트 매월 제공</li>
                        <li>🚫 **광고 제거:** 깨끗하고 빠른 웹사이트 이용 환경</li>
                        <li>💬 **전문가 Q&A:** 자동차 전문가와의 1:1 상담 서비스</li>
                    </ul>
                </div>

                <div className="pricing-info">
                    <p className="price-tag">월 **9,900원** (첫 달 무료 체험 가능)</p>
                </div>
                
                <Link to="/join" className="cta-button">
                    프리미엄 멤버십 시작하기
                </Link>

                <p className="contact-info">
                    *이미 가입하셨다면 <Link to="/login">로그인</Link> 후 이용해 주세요.
                </p>
            </div>
        </div>
    );
};

export default MembershipPage;