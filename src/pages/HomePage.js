import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const dummyBanners = [
  { id: 1, title: "CarScope 첫 오픈 기념!", subtitle: "프리미엄 리뷰를 7일간 무료로 경험하세요.", color: "#007bff", link: "/event/open" },
  { id: 2, title: "🚘 2024년 신차 트렌드 리포트", subtitle: "올해 주목해야 할 전기차, 하이브리드 모델 분석!", color: "#28a745", link: "/news/newcar" },
  { id: 3, title: "🅿️ 주차장 예약 최대 50% 할인!", subtitle: "지금 바로 가까운 주차장을 예약하세요.", color: "#ffc107", link: "/parking" },
];

const NumberCounter = ({ endValue, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    const animateCount = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = (timestamp - startTimestamp) / duration;
      setCount(Math.min(endValue, Math.floor(progress * endValue)));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [endValue, duration, isVisible]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => 
        (prevSlide + 1) % dummyBanners.length
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, []);
  
  const handleDotClick = (e, index) => {
      e.preventDefault(); 
      e.stopPropagation(); 
      setCurrentSlide(index);
  };

  return (
    <div className="homepage-container">
      
      <div className="main-banner-slider">
        <div 
          className="slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {dummyBanners.map((banner) => (
            <Link 
              key={banner.id} 
              to={banner.link} 
              className="slide-item" 
              style={{ backgroundColor: banner.color }}
            >
              <div className="banner-content">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
                <span className="banner-cta">자세히 보기 &gt;</span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="slider-dots">
          {dummyBanners.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={(e) => handleDotClick(e, index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="company-stats-section">
        <div className="stats-header">
          <h2>CarScope의 놀라운 성장 지표</h2>
          <p>저희는 항상 투명하고 신뢰할 수 있는 정보를 제공합니다.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">
              <NumberCounter endValue={55000} />건
            </div>
            <div className="stat-label">주차장 예약 수</div>
            <div className="stat-description">월 평균 10% 이상 증가</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              <NumberCounter endValue={850} />개
            </div>
            <div className="stat-label">주차장 제휴 업체 수</div>
            <div className="stat-description">전국 주요 지역 커버</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              <NumberCounter endValue={98} />%
            </div>
            <div className="stat-label">고객 만족도</div>
            <div className="stat-description">최고의 서비스 품질을 약속합니다.</div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;