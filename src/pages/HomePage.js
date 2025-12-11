import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
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
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [bannerSlides, setBannerSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    const [trends, setTrends] = useState([]);
    const [latestNews, setLatestNews] = useState([]);
    const [popularReviews, setPopularReviews] = useState([]);

    const defaultBanners = [
        {
            id: 'default1',
            color: "#5c84ff",
            linkUrl: "/membership",
            imageUrl: null 
        },
        {
            id: 'default2',
            color: "#6c5ce7",
            linkUrl: "/news",
            imageUrl: null
        },
        {
            id: 'default3',
            color: "#00b894",
            linkUrl: "/parking",
            imageUrl: null
        }
    ];

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'banners'));
                const loadedBanners = [];
                
                querySnapshot.forEach((doc) => {
                    loadedBanners.push({ id: doc.id, ...doc.data() });
                });

                if (loadedBanners.length > 0) {
                    loadedBanners.sort((a, b) => a.id.localeCompare(b.id));
                    setBannerSlides(loadedBanners);
                } else {
                    setBannerSlides(defaultBanners);
                }
            } catch (error) {
                console.error(error);
                setBannerSlides(defaultBanners);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const newsRef = collection(db, "news");

                const trendQuery = query(newsRef, orderBy("views", "desc"), limit(5));
                const trendSnap = await getDocs(trendQuery);
                setTrends(trendSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                const newsQuery = query(newsRef, orderBy("createdAt", "desc"), limit(3));
                const newsSnap = await getDocs(newsQuery);
                setLatestNews(newsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                const reviewQuery = query(newsRef, orderBy("likes", "desc"), limit(3));
                const reviewSnap = await getDocs(reviewQuery);
                setPopularReviews(reviewSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            } catch (error) {
                console.error(error);
            }
        };
        fetchContent();
    }, []);

    useEffect(() => {
        if (bannerSlides.length === 0) return;
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

    const handleBannerClick = (link) => {
        if (!link) return;
        if (link.startsWith('http')) {
            window.open(link, '_blank');
        } else {
            navigate(link);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    };

    if (loading) return null;

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
                                style={{ 
                                    backgroundColor: slide.imageUrl ? 'transparent' : slide.color,
                                    backgroundImage: slide.imageUrl ? `url(${slide.imageUrl})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    cursor: slide.linkUrl ? 'pointer' : 'default'
                                }}
                                onClick={() => handleBannerClick(slide.linkUrl)}
                            >
                            </div>
                        ))}
                    </div>
                    
                    {bannerSlides.length > 1 && (
                        <>
                            <div className="slider-nav-arrows">
                                <button className="arrow prev" onClick={(e) => { e.stopPropagation(); prevSlide(); }}>&lt;</button>
                                <button className="arrow next" onClick={(e) => { e.stopPropagation(); nextSlide(); }}>&gt;</button>
                            </div>

                            <div className="slider-dots">
                                {bannerSlides.map((_, idx) => (
                                    <span 
                                        key={idx} 
                                        className={`dot ${currentSlide === idx ? 'active' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); handleDotClick(idx); }}
                                    ></span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <section className="integrated-info-section">
                <div className="trend-wrapper">
                    <h2>실시간 인기 검색어</h2>
                    <p>지금 CarScope 사용자들은 무엇에 관심이 있을까요?</p>
                    <div className="trend-list-container">
                        {trends.length > 0 ? (
                            trends.map((item, index) => (
                                <div key={item.id} className="trend-item-card" onClick={() => navigate(`/news/${item.id}`)}>
                                    <span className="trend-rank">{index + 1}</span>
                                    {item.title}
                                </div>
                            ))
                        ) : (
                            <p style={{color: '#999'}}>데이터 집계 중입니다...</p>
                        )}
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
                            {latestNews.length > 0 ? (
                                latestNews.map((item) => (
                                    <li key={item.id} onClick={() => navigate(`/news/${item.id}`)} style={{cursor: 'pointer'}}>
                                        <span className="info-title">{item.title}</span>
                                        <span className="info-date">{formatDate(item.createdAt)}</span>
                                    </li>
                                ))
                            ) : (
                                <li style={{justifyContent: 'center', color: '#999'}}>등록된 뉴스가 없습니다.</li>
                            )}
                        </ul>
                    </div>

                    <div className="info-column">
                        <div className="column-header">
                            <h3>인기 리뷰</h3>
                            <Link to="/news" className="more-link">더보기 &gt;</Link>
                        </div>
                        <ul className="info-list">
                            {popularReviews.length > 0 ? (
                                popularReviews.map((item) => (
                                    <li key={item.id} onClick={() => navigate(`/news/${item.id}`)} style={{cursor: 'pointer'}}>
                                        <span className="info-title">{item.title}</span>
                                        <span className="info-rating">♥ {item.likes || 0}</span>
                                    </li>
                                ))
                            ) : (
                                <li style={{justifyContent: 'center', color: '#999'}}>등록된 리뷰가 없습니다.</li>
                            )}
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