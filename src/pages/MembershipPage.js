import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MembershipPage.css';

const MembershipPage = () => {
    return (
        <div className="membership-container page-content">
            <h1>CarScope 멤버십 플랜</h1>
            <p className="membership-subtitle">당신에게 맞는 플랜을 선택하고 모든 기능을 이용해보세요.</p>

            <div className="plans-container">
                <div className="plan-card free-plan">
                    <h2>무료 회원</h2>
                    <div className="plan-price">0원 <span>/ 평생</span></div>
                    <ul className="plan-features">
                        <li>✅ 기본 뉴스 기사 접근</li>
                        <li>✅ 커뮤니티 게시판 이용</li>
                        <li>❌ 프리미엄 리뷰 접근 불가</li>
                        <li>❌ 주차장 실시간 정보 제한</li>
                    </ul>
                    <button className="plan-button">무료로 시작하기</button>
                </div>

                <div className="plan-card premium-plan">
                    <div className="popular-badge">POPULAR</div>
                    <h2>프리미엄</h2>
                    <div className="plan-price">9,900원 <span>/ 월</span></div>
                    <ul className="plan-features">
                        <li>✅ 모든 프리미엄 리뷰 접근</li>
                        <li>✅ 전국 주차장 실시간 정보</li>
                        <li>✅ 광고 없이 이용하기</li>
                        <li>✅ 멤버십 전용 콘텐츠</li>
                    </ul>
                    <button className="plan-button premium-button">프리미엄 구독하기</button>
                </div>
            </div>

            <div className="login-prompt-section">
                <h3>이미 회원이신가요?</h3>
                <p>로그인하고 CarScope의 모든 혜택을 바로 이용하세요.</p>
                <Link to="/login" className="login-prompt-button">로그인</Link>
            </div>
        </div>
    );
};

export default MembershipPage;