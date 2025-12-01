import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const AnimatedCounter = ({ end, suffix }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, end]);

    return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
};

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const bannerSlides = [
        {
            id: 1,
            title: "CarScope 첫 오픈 기념!",
            desc: "프리미엄 리뷰를 7일간 무료로 경험하세요.",
            color: "#5c84ff",
            link: "/membership"
        },
        {
            id: 2,
            title: "2024 신차 트렌드 리포트",
            desc: "올해 주목해야 할 전기차, 하이브리드 모델 분석!",
            color: "#6c5ce7",
            link: "/news"
        },
        {
            id: 3,
            title: "주차장 예약 최대 50% 할인!",
            desc: "지금 바로 가까운 주차장을 예약하세요.",
            color: "#00b894",
            link: "/parking"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [bannerSlides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    };

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="homepage-container">
            <div className="main-banner-slider-wrapper">
                <div className="main-banner-slider">
                    <div 
                        className="slider-track" 
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {bannerSlides.map((slide) => (
                            <div 
                                key={slide.id} 
                                className="slide-item" 
                                style={{ backgroundColor: slide.color }}
                            >
                                <div className="banner-content">
                                    <h2>{slide.title}</h2>
                                    <p>{slide.desc}</p>
                                    <Link to={slide.link} className="banner-cta">자세히 보기</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="slider-nav-arrows">
                        <button className="arrow prev" onClick={prevSlide}>&lt;</button>
                        <button className="arrow next" onClick={nextSlide}>&gt;</button>
                    </div>

                    <div className="slider-dots">
                        {bannerSlides.map((_, idx) => (
                            <span 
                                key={idx} 
                                className={`dot ${currentSlide === idx ? 'active' : ''}`}
                                onClick={() => handleDotClick(idx)}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>

            <section className="integrated-info-section">
                <div className="trend-wrapper">
                    <h2>🔥 실시간 인기 검색어</h2>
                    <p>지금 CarScope 사용자들은 무엇에 관심이 있을까요?</p>
                    <div className="trend-list-container">
                        {['카니발 하이브리드', '쏘렌토 플러그인', 'GV80 페이스리프트', '전기차 보조금', '테슬라 모델 Y'].map((item, index) => (
                            <div key={index} className="trend-item-card">
                                <span className="trend-rank">{index + 1}</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="content-divider"></div>

                <div className="info-grid-wrapper">
                    <div className="info-column">
                        <div className="column-header">
                            <h3>최신 뉴스</h3>
                            <Link to="/news" className="more-link">더보기 &gt;</Link>
                        </div>
                        <ul className="info-list">
                            <li>
                                <span className="info-title">현대차, 신형 전기차 플랫폼 공개</span>
                                <span className="info-date">2025.11.12</span>
                            </li>
                            <li>
                                <span className="info-title">테슬라 모델 Y, 국내 판매 가격 인하</span>
                                <span className="info-date">2025.11.11</span>
                            </li>
                            <li>
                                <span className="info-title">정부, 전기차 충전소 확대 계획 발표</span>
                                <span className="info-date">2025.11.10</span>
                            </li>
                        </ul>
                    </div>

                    <div className="info-column">
                        <div className="column-header">
                            <h3>인기 리뷰</h3>
                            <Link to="/reviews" className="more-link">더보기 &gt;</Link>
                        </div>
                        <ul className="info-list">
                            <li>
                                <span className="info-title">제네시스 GV80: 압도적인 디자인과 성능</span>
                                <span className="info-rating">★★★★★</span>
                            </li>
                            <li>
                                <span className="info-title">기아 EV9: 완벽한 밸런스를 갖춘 전기차</span>
                                <span className="info-rating">★★★★☆</span>
                            </li>
                            <li>
                                <span className="info-title">벤츠 E클래스: 시대를 소유하는 품격</span>
                                <span className="info-rating">★★★★★</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="parking-recommendation-section">
                <h2>📍 추천 주차장</h2>
                <p>내 주변 제휴 주차장을 최저가로 예약하고 편하게 주차하세요.</p>
                
                <div className="parking-spot-grid">
                    <div className="parking-spot-card">
                        <div className="spot-header">
                            <span className="spot-area">강남구</span>
                            <span className="spot-price">500원/10분</span>
                        </div>
                        <h4 className="spot-name">강남 N 타워 주차장</h4>
                        <Link to="/parking" className="spot-cta">예약/정보 확인 &gt;</Link>
                    </div>
                    <div className="parking-spot-card">
                        <div className="spot-header">
                            <span className="spot-area">마포구</span>
                            <span className="spot-price">3,000원/1시간</span>
                        </div>
                        <h4 className="spot-name">홍대입구역 링크</h4>
                        <Link to="/parking" className="spot-cta">예약/정보 확인 &gt;</Link>
                    </div>
                    <div className="parking-spot-card">
                        <div className="spot-header">
                            <span className="spot-area">영등포구</span>
                            <span className="spot-price">4,000원/30분</span>
                        </div>
                        <h4 className="spot-name">여의도 더현대 파크</h4>
                        <Link to="/parking" className="spot-cta">예약/정보 확인 &gt;</Link>
                    </div>
                </div>
                <Link to="/parking" className="parking-more-link">다른 지역 주차장 찾기 &gt;</Link>
            </section>

            <section className="company-stats-section">
                <h2>CarScope와 함께하는 스마트한 자동차 생활</h2>
                <p>CarScope는 수백만 명의 운전자와 함께 성장하고 있습니다.</p>
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-value">
                            <AnimatedCounter end={500} suffix="만+" />
                        </div>
                        <span className="stat-label-box">누적 사용자</span>
                        <p className="stat-description">대한민국 운전자 3명 중 1명이<br/>CarScope를 경험했습니다.</p>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">
                            <AnimatedCounter end={2500} suffix="+" />
                        </div>
                        <span className="stat-label-box">제휴 주차장</span>
                        <p className="stat-description">전국 어디서나 편리하게<br/>주차장을 예약하세요.</p>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">
                            <AnimatedCounter end={85} suffix="만+" />
                        </div>
                        <span className="stat-label-box">누적 리뷰</span>
                        <p className="stat-description">실제 오너들의 생생한 후기로<br/>내 차를 선택하세요.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;