import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const StatCounter = ({ endValue, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const value = parseInt(endValue.replace(/\D/g, ''));
    const isIntersecting = useVisibility(value);

    useEffect(() => {
        if (!isIntersecting) return;

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
        return () => setCount(0);
    }, [value, duration, isIntersecting]);

    const formattedCount = count.toLocaleString() + (endValue.includes('+') ? '+' : '');

    return <span className="stat-value">{formattedCount}</span>;
};

const useVisibility = (value) => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const statElements = document.querySelectorAll('.stat-item');
        statElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [location.pathname, value]);

    return isVisible;
};

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            bgColor: '#4263ec',
            title: 'CarScope 첫 오픈 기념!',
            description: '프리미엄 리뷰를 7일간 무료로 경험하세요.',
            link: 'javascript:void(0)', 
        },
        {
            bgColor: '#219150',
            title: '2024 신차 트렌드 리포트',
            description: '올해 주목해야 할 전기차, 하이브리드 모델 분석!',
            link: 'javascript:void(0)',
        },
        {
            bgColor: '#f28d35',
            title: '🅿 주차장 예약 최대 50% 할인!',
            description: '지금 바로 가까운 주차장을 예약하세요.',
            link: 'javascript:void(0)',
        },
    ];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(slideInterval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="homepage-container">
            <div className="main-banner-slider-wrapper animate-slide-in">
                <div className="main-banner-slider">
                    <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slides.map((slide, index) => (
                            <div key={index} className="slide-item" style={{ backgroundColor: slide.bgColor }}>
                                <div className="banner-link-wrapper">
                                    <div className="banner-content">
                                        <h2>{slide.title}</h2>
                                        <p>{slide.description}</p>
                                        <a href={slide.link}>자세히 보기 &gt;</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="slider-dots">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${currentSlide === index ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="hot-trends-section animate-fade-up">
                <h2>🔥 실시간 인기 검색어</h2>
                <p>지금 CarScope 사용자들은 무엇에 관심이 있을까요?</p>
                <div className="trend-list-container">
                    <div className="trend-item-card"><span className="trend-rank">1</span><span className="trend-keyword">카니발 하이브리드</span></div>
                    <div className="trend-item-card"><span className="trend-rank">2</span><span className="trend-keyword">쏘렌토 플러그인</span></div>
                    <div className="trend-item-card"><span className="trend-rank">3</span><span className="trend-keyword">GV80 페이스리프트</span></div>
                    <div className="trend-item-card"><span className="trend-rank">4</span><span className="trend-keyword">전기차 보조금</span></div>
                    <div className="trend-item-card"><span className="trend-rank">5</span><span className="trend-keyword">테슬라 모델 Y</span></div>
                </div>
            </div>

            <div className="main-content-grid animate-fade-up">
                <div className="card">
                    <h3>인기 리뷰</h3>
                    <ul>
                        <li>현대 쏘나타 2024 시승기</li>
                        <li>BMW 5시리즈, 진정한 혁신인가?</li>
                        <li>가성비 최고의 전기차 TOP 5</li>
                    </ul>
                    <button type="button" className="more-link">더보기</button>
                </div>
                <div className="card">
                    <h3>최신 뉴스</h3>
                    <ul>
                        <li>테슬라, 새로운 자율주행 기술 공개</li>
                        <li>내연기관차 생산 중단 시점은?</li>
                        <li>정부, 전기차 보조금 정책 발표</li>
                    </ul>
                    <button type="button" className="more-link">더보기</button>
                </div>
                <div className="card">
                    <h3>인기 주차장</h3>
                    <ul>
                        <li>강남역 민영 주차장</li>
                        <li>홍대입구역 24시간 주차장</li>
                        <li>김포공항 장기 주차 꿀팁</li>
                    </ul>
                    <button type="button" className="more-link">더보기</button>
                </div>
            </div>

            <div className="user-feedback-section animate-fade-up">
                <h2>⭐️ 최신 사용자 피드백</h2>
                <div className="feedback-grid">
                    <div className="feedback-card">
                        <div className="feedback-rating">⭐️⭐️⭐️⭐️⭐️</div>
                        <p className="feedback-content">"내가 제일 맘에 안 들었던 부분까지 체크해줘서 좋았어요. 다만, 대중교통 이용객에게는 좀..."</p>
                        <div className="feedback-info">김**진 · 람보르기니 아벤타도르 S 이용</div>
                    </div>
                    <div className="feedback-card">
                        <div className="feedback-rating">⭐️⭐️⭐️</div>
                        <p className="feedback-content">"주차장에 쓰레기가 너무 많아요..."</p>
                        <div className="feedback-info">황**현 · 제네시스 G90 이용</div>
                    </div>
                    <div className="feedback-card">
                        <div className="feedback-rating">⭐️⭐️⭐️⭐️</div>
                        <p className="feedback-content">"정보가 빠르고 사이트가 잘 정리 되어있어서 좋아요"</p>
                        <div className="feedback-info">문**철 · 아반떼 N 이용</div>
                    </div>
                </div>
                <button type="button" className="feedback-more-link">모든 후기 보기 &gt;</button>
            </div>

            <div className="parking-recommendation-section animate-fade-up">
                <h2>📌 지금 인기 있는 지역 주차장</h2>
                <p>내 주변, 혹은 방문하려는 지역의 주차장을 빠르게 확인하세요.</p>
                <div className="parking-spot-grid">
                    <div className="parking-spot-card">
                        <div className="spot-header">
                            <span className="spot-area">강남구</span>
                            <span className="spot-price">500원/5분</span>
                        </div>
                        <p className="spot-name">강남 N 타워 주차장</p>
                        <button type="button" className="spot-cta">예약/정보 확인 &gt;</button>
                    </div>
                    <div className="parking-spot-card">
                        <div className="spot-header">
                            <span className="spot-area">마포구</span>
                            <span className="spot-price">1,500원/10분</span>
                        </div>
                        <p className="spot-name">홍대입구역 인근</p>
                        <button type="button" className="spot-cta">예약/정보 확인 &gt;</button>
                    </div>
                    <div className="parking-spot-card">
                        <div className="spot-header">
                            <span className="spot-area">영등포구</span>
                            <span className="spot-price">4,000원/30분</span>
                        </div>
                        <p className="spot-name">여의도 더현대 파크</p>
                        <button type="button" className="spot-cta">예약/정보 확인 &gt;</button>
                    </div>
                </div>
                <button type="button" className="parking-more-link">다른 지역 주차장 찾기 &gt;</button>
            </div>

            <div className="company-stats-section animate-fade-up">
                <h2>CarScope와 함께하는 스마트한 자동차 생활</h2>
                <p>CarScope는 수백만 명의 운전자와 함께 성장하고 있습니다.</p>
                <div className="stats-grid">
                    <div className="stat-item">
                        <StatCounter endValue="250,000+" />
                        <span className="stat-label">사용자 누적 예약 수</span>
                        <span className="stat-description">가장 인기 있는 주차 예약 서비스</span>
                    </div>
                    <div className="stat-item">
                        <StatCounter endValue="5,000+" />
                        <span className="stat-label">주차장 제휴 수</span>
                        <span className="stat-description">전국 주요 주차장과 함께합니다.</span>
                    </div>
                    <div className="stat-item">
                        <StatCounter endValue="500,000+" />
                        <span className="stat-label">사용자 평가 및 평점</span>
                        <span className="stat-description">운전자의 생생한 후기</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;