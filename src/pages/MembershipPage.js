import React from 'react';
import { Link } from 'react-router-dom';

const MembershipPage = () => {
    return (
        <div className="membership-page-container">
            <h1>✨ CarScope 멤버십 플랜</h1>
            <p className="subtitle">당신에게 맞는 최고의 자동차 생활을 위한 플랜을 선택하세요.</p>
            
            <div className="pricing-grid">
                
                <div className="membership-box basic-plan">
                    <div className="plan-header">
                        <h2>베이직 플랜</h2>
                        <p className="plan-price">무료</p>
                    </div>
                    <div className="feature-list">
                        <h3>주요 혜택</h3>
                        <ul>
                            <li>✔️ 실시간 인기 검색어 제공</li>
                            <li>✔️ 일반 리뷰 및 뉴스 열람</li>
                            <li>✔️ 전국 주차장 정보 검색</li>
                            <li className="disabled">❌ 프리미엄 주차장 할인</li>
                            <li className="disabled">❌ 심층 분석 리포트</li>
                            <li className="disabled">❌ 광고 제거</li>
                            <li className="disabled">❌ 전문가 1:1 Q&A</li>
                        </ul>
                    </div>
                    <Link to="/" className="cta-button basic-button">
                        현재 이용 중
                    </Link>
                </div>

                <div className="membership-box premium-plan">
                    <div className="plan-header">
                        <h2>프리미엄 플랜</h2>
                        <p className="plan-price">월 9,900원</p>
                    </div>
                    <div className="feature-list">
                        <h3>주요 혜택</h3>
                        <ul>
                            <li>✔️ 실시간 인기 검색어 제공</li>
                            <li>✔️ 일반 리뷰 및 뉴스 열람</li>
                            <li>✔️ 전국 주차장 정보 검색</li>
                            <li>✅ **프리미엄 주차장 할인 (최대 50%)**</li>
                            <li>✅ **심층 분석 리포트 매월 제공**</li>
                            <li>✅ **광고 완벽 제거**</li>
                            <li>✅ **전문가 1:1 Q&A**</li>
                        </ul>
                    </div>
                    <Link to="/join" className="cta-button premium-button">
                        첫 달 무료 체험 시작
                    </Link>
                </div>
            </div>

            <p className="contact-info">
                *이미 프리미엄 멤버이신가요? <Link to="/login">로그인</Link> 후 모든 혜택을 누리세요.
            </p>
        </div>
    );
};

export default MembershipPage;