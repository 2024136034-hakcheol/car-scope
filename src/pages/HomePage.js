import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HomePage.module.css'; 

const generateStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
    }
    return stars;
};

const mainBanners = [
    { id: 1, title: '2024 신차 트렌드 리포트', subtitle: '올해 주목해야 할 전기차, 하이브리드 모델 분석!', cta: '자세히 보기', bgColor: '#4CAF50' },
    { id: 2, title: 'CarScope 첫 오픈 기념!', subtitle: '프리미엄 리뷰를 7일간 무료로 경험하세요.', cta: '자세히 보기', bgColor: '#6200EE' },
    { id: 3, title: '🚗 주차장 예약 최대 50% 할인!', subtitle: '지금 바로 가까운 주차장을 예약하세요.', cta: '자세히 보기', bgColor: '#F28D35' },
];

const hotTrends = [
    { id: 1, rank: 1, keyword: '카니발 하이브리드' },
    { id: 2, rank: 2, keyword: '쏘렌토 플러그인' },
    { id: 3, rank: 3, keyword: 'GV80 페이스리프트' },
    { id: 4, rank: 4, keyword: '전기차 보조금' },
    { id: 5, rank: 5, keyword: '테슬라 모델 Y' },
];

const latestNews = [
    { id: 1, title: '현대차, 신형 전기차 플랫폼 공개', date: '2025.11.12', link: '/news' },
    { id: 2, title: '테슬라 모델 Y, 국내 판매 가격 인하', date: '2025.11.11', link: '/news' },
    { id: 3, title: '정부, 전기차 충전소 확대 계획 발표', date: '2025.11.10', link: '/news' },
];

const topReviews = [
    { id: 1, title: '제네시스 GV80: 압도적인 디자인과 성능', rating: 5, link: '/news' },
    { id: 2, title: '기아 EV6: 완벽한 밸런스를 갖춘 전기차', rating: 4, link: '/news' },
    { id: 3, title: '벤츠 E클래스: 시대를 초월하는 클래식', rating: 5, link: '/news' },
];

const recommendedParking = [
    { id: 1, area: '강남구', name: '강남 N 타워 주차장', price: '500원/5분', link: '/parking' },
    { id: 2, area: '마포구', name: '홍대입구역 인근', price: '1,500원/10분', link: '/parking' },
    { id: 3, area: '영등포구', name: '여의도 더현대 파크', price: '4,000원/30분', link: '/parking' },
];

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % mainBanners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % mainBanners.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + mainBanners.length) % mainBanners.length);
    };

    return (
        <div className={`${styles.homepageContainer} page-content`}>
            <div className={styles.mainBannerSliderWrapper}>
                <div className={styles.mainBannerSlider}>
                    <div 
                        className={styles.sliderTrack}
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {mainBanners.map((banner, index) => (
                            <div 
                                key={banner.id}
                                className={styles.slideItem}
                                style={{ backgroundColor: banner.bgColor }}
                            >
                                <div className={styles.bannerContent}>
                                    <h2>{banner.title}</h2>
                                    <p>{banner.subtitle}</p>
                                    <Link to={banner.id === 3 ? "/parking" : "/news"} className={styles.bannerCta}>
                                        {banner.cta}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.sliderNavArrows}>
                    <button className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide}>&lt;</button>
                    <button className={`${styles.arrow} ${styles.next}`} onClick={nextSlide}>&gt;</button>
                </div>
                <div className={styles.sliderDots}>
                    {mainBanners.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>

            <section className={styles.hotTrendsSection}>
                <h2>🔥 실시간 인기 검색어</h2>
                <p>지금 CarScope 사용자들은 무엇에 관심이 있을까요?</p>
                <div className={styles.trendListContainer}>
                    {hotTrends.map(trend => (
                        <div key={trend.id} className={styles.trendItemCard}>
                            <span className={styles.trendRank}>{trend.rank}</span>
                            <span>{trend.keyword}</span>
                        </div>
                    ))}
                </div>
            </section>

            <div className={styles.mainContentGrid}>
                <div className={`${styles.card} ${styles.animateFadeUp}`}>
                    <h3>최신 뉴스</h3>
                    <ul>
                        {latestNews.map(news => (
                            <li key={news.id}>
                                <Link to={news.link} className={styles.moreLink}>{news.title}</Link> ({news.date})
                            </li>
                        ))}
                    </ul>
                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                        <Link to="/news" className={styles.moreLink}>전체 뉴스 보기 &gt;</Link>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.animateFadeUp}`} style={{ animationDelay: '0.1s' }}>
                    <h3>인기 리뷰</h3>
                    <ul>
                        {topReviews.map(review => (
                            <li key={review.id}>
                                {generateStars(review.rating)} {review.title}
                            </li>
                        ))}
                    </ul>
                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                        <Link to="/news" className={styles.moreLink}>전체 리뷰 보기 &gt;</Link>
                    </div>
                </div>
            </div>

            <section className={`${styles.parkingRecommendationSection} ${styles.animateSlideIn}`}>
                <h2>📍 추천 주차장</h2>
                <p>내 주변 혹은 방문하려는 지역의 주차장을 빠르게 확인하세요.</p>
                <div className={styles.parkingSpotGrid}>
                    {recommendedParking.map(spot => (
                        <div key={spot.id} className={styles.parkingSpotCard}>
                            <div className={styles.spotHeader}>
                                <span className={styles.spotArea}>{spot.area}</span>
                                <span className={styles.spotPrice}>{spot.price}</span>
                            </div>
                            <h4 className={styles.spotName}>{spot.name}</h4>
                            <Link to={spot.link} className={styles.spotCta}>예약/정보 확인 &gt;</Link>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <Link to="/parking" className={styles.parkingMoreLink}>다른 지역 주차장 찾기 &gt;</Link>
                </div>
            </section>

            <section className={`${styles.companyStatsSection} ${styles.animateSlideIn}`} style={{ animationDelay: '0.2s' }}>
                <h2>CarScope와 함께하는 스마트한 자동차 생활</h2>
                <p>CarScope는 수백만 명의 운전자와 함께 성장하고 있습니다.</p>
                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>250,000+</span>
                        <span className={styles.statLabel}>사용자 누적 예약 수</span>
                        <span className={styles.statDescription}>가장 인기 있는 주차 예약 서비스</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>5,000+</span>
                        <span className={styles.statLabel}>주차장 제휴 수</span>
                        <span className={styles.statDescription}>전국 주요 주차장과 함께합니다.</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>500,000+</span>
                        <span className={styles.statLabel}>사용자 평가 및 평점</span>
                        <span className={styles.statDescription}>운전자의 생생한 후기</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;