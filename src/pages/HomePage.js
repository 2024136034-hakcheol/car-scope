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
    const [recommendParking, setRecommendParking] = useState([]); // 주차장 데이터 상태 추가

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
        const fetchData = async () => {
            try {
                // 1. 배너 불러오기
                const bannerQuery = await getDocs(collection(db, 'banners'));
                const banners = [];
                bannerQuery.forEach((doc) => {
                    banners.push({ id: doc.id, ...doc.data() });
                });

                if (banners.length > 0) {
                    banners.sort((a, b) => a.id.localeCompare(b.id));
                    setBannerSlides(banners);
                } else {
                    setBannerSlides(defaultBanners);
                }

                // 2. 뉴스 & 리뷰 & 트렌드 불러오기
                const newsRef = collection(db, "news");

                const trendQuery = query(newsRef, orderBy("views", "desc"), limit(5));
                const trendSnap = await getDocs(trendQuery);
                setTrends(trendSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                const latestQuery = query(newsRef, orderBy("createdAt", "desc"), limit(3));
                const latestSnap = await getDocs(latestQuery);
                setLatestNews(latestSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                const popularQuery = query(newsRef, orderBy("likes", "desc"), limit(3));
                const popularSnap = await getDocs(popularQuery);
                setPopularReviews(popularSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                // 3. 추천 주차장 불러오기 (최근 등록순 3개)
                const parkingRef = collection(db, "parkingLots");
                const parkingQuery = query(parkingRef, orderBy("createdAt", "desc"), limit(3));
                const parkingSnap = await getDocs(parkingQuery);
                setRecommendParking(parkingSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            } catch (error) {
                console.error(error);
                setBannerSlides(defaultBanners);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
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

    // 주소에서 '구' 이름만 추출하는 함수 (예: 서울 강남구... -> 강남구)
    const getDistrict = (address) => {
        if (!address) return '지역정보';
        const parts = address.split(' ');
        // 보통 두 번째 단어가 '구'인 경우가 많음 (서울시 강남구)
        return parts.length > 1 ? parts[1] : parts[0];
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
                            <div style={{color: '#999', padding: '20px'}}>
                                아직 데이터가 충분하지 않습니다.<br/>뉴스 기사를 먼저 작성해주세요.
                            </div>
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
                                        <span className="info-rating" style={{color: '#e74c3c'}}>♥ {item.likes || 0}</span>
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
                    {recommendParking.length > 0 ? (
                        recommendParking.map(spot => (
                            <div key={spot.id} className="parking-spot-card">
                                <div className="spot-header">
                                    <span className="spot-area">{getDistrict(spot.address)}</span>
                                    <span className="spot-price">{Number(spot.price).toLocaleString()}원/시간</span>
                                </div>
                                <h4 className="spot-name">{spot.name}</h4>
                                <Link to="/parking" className="spot-cta">예약/정보 확인 &gt;</Link>
                            </div>
                        ))
                    ) : (
                        <div style={{gridColumn: "1 / -1", textAlign: 'center', color: '#999', padding: '20px'}}>
                            등록된 추천 주차장이 없습니다.<br/>관리자 페이지에서 주차장을 등록해주세요.
                        </div>
                    )}
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