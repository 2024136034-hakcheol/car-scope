import React from 'react';
import { Link } from 'react-router-dom';

const membershipTiers = [
    { 
        id: 'basic', 
        name: '베이직 (Basic)', 
        price: '0원/월', 
        features: [
            '기본 리뷰 및 뉴스 열람', 
            '주차장 실시간 정보 제공 (제한적)', 
            '월 1회 주차 할인 쿠폰'
        ],
        cta: '현재 등급'
    },
    { 
        id: 'premium', 
        name: '프리미엄 (Premium)', 
        price: '9,900원/월', 
        features: [
            '모든 프리미엄 리뷰 및 심층 뉴스 열람', 
            '전국 주차장 최저가/실시간 예약 무제한', 
            '월 5회 주차 할인 쿠폰 (최대 5천 원 할인)',
            '광고 없는 깨끗한 서비스 환경'
        ],
        cta: '프리미엄 가입하기'
    },
];

const MembershipPage = () => {
    const userStatus = {
        currentTier: 'basic', 
        isSubscribed: false, 
    };
    
    return (
        <div className="membership-page-container">
            <h1>✨ CarScope 멤버십 안내</h1>
            <p className="page-subtitle">
                더 스마트하고 편리한 자동차 생활을 CarScope 프리미엄과 함께 시작하세요.
            </p>

            <div className="current-status-card">
                <h2>현재 멤버십 상태</h2>
                {userStatus.currentTier === 'basic' ? (
                    <p className="status-basic">
                        <span className="tier-name">베이직</span> 등급을 이용 중입니다.
                    </p>
                ) : (
                    <p className="status-premium">
                        <span className="tier-name">프리미엄</span> 구독 중입니다. 
                    </p>
                )}
                {userStatus.currentTier === 'premium' && (
                    <Link to="/membership/manage" className="manage-link">
                        구독 관리 &gt;
                    </Link>
                )}
            </div>

            <div className="membership-tiers-grid">
                {membershipTiers.map((tier) => (
                    <div 
                        key={tier.id} 
                        className={`tier-card ${tier.id === userStatus.currentTier ? 'current-tier' : ''}`}
                    >
                        <h3>{tier.name}</h3>
                        <p className="tier-price">{tier.price}</p>
                        <hr />
                        <ul className="tier-features">
                            {tier.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        
                        {tier.id === userStatus.currentTier ? (
                            <button className="cta-button current-cta" disabled>
                                {tier.cta}
                            </button>
                        ) : (
                            <Link to={`/checkout/${tier.id}`}>
                                <button className="cta-button primary-cta">
                                    {tier.cta}
                                </button>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <div className="faq-section">
                <h2>자주 묻는 질문</h2>
                <ul>
                    <li>Q. 프리미엄 결제는 매월 자동 결제되나요?</li>
                    <li>Q. 구독 취소는 언제든지 가능한가요?</li>
                    <li>Q. 결제 수단 변경은 어디서 하나요?</li>
                </ul>
                <Link to="/support/faq" className="faq-link">
                    더 많은 FAQ 보기 &gt;
                </Link>
            </div>
        </div>
    );
};

export default MembershipPage;