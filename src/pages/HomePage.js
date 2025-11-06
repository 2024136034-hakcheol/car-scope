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
  const sliderRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setSlideWidth(sliderRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []); 

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
  
  const trackWidth = slideWidth * dummyBanners.length;
  const transformValue = `translateX(-${currentSlide * slideWidth}px)`;

  return (
    <div className="homepage-container">
      
      <div className="main-banner-slider" ref={sliderRef}>
        <div 
          className="slider-track"
          style={{ 
            width: `${trackWidth}px`, 
            transform: transformValue 
          }}
        >
          {dummyBanners.map((banner) => (
            <div 
              key={banner.id} 
              className="slide-item" 
              style={{ 
                  backgroundColor: banner.color,
                  width: `${slideWidth}px`,
                  flexShrink: 0
              }}
            >
              <Link to={banner.link} className="banner-link-wrapper">
                <div className="banner-content">
                  <h2>{banner.title}</h2>
                  <p>{banner.subtitle}</p>
                  <span className="banner-cta">자세히 보기 &gt;</span>
                </div>
              </Link>
            </div>
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

      <div className="main-content-grid">
        <div className="card">
          <h3>인기 리뷰</h3>
          <ul>
            <li><Link to="/review/1">현대 쏘나타 2024 시승기</Link></li>
            <li><Link to="/review/2">BMW 5시리즈, 진정한 혁신인가?</Link></li>
            <li><Link to="/review/3">가성비 최고의 전기차 TOP 5</Link></li>
          </ul>
          <Link to="/reviews" className="more-link">더보기</Link>
        </div>
        <div className="card">
          <h3>최신 뉴스</h3>
          <ul>
            <li><Link to="/news/1">테슬라, 새로운 자율주행 기술 공개</Link></li>
            <li><Link to="/news/2">내연기관차 생산 중단 시점은?</Link></li>
            <li><Link to="/news/3">정부, 전기차 보조금 정책 발표</Link></li>
          </ul>
          <Link to="/news" className="more-link">더보기</Link>
        </div>
        <div className="card">
          <h3>인기 주차장</h3>
          <ul>
            <li><Link to="/parking/1">강남역 민영 주차장</Link></li>
            <li><Link to="/parking/2">홍대입구역 24시간 주차장</Link></li>
            <li><Link to="/parking/3">김포공항 장기 주차 꿀팁</Link></li>
          </ul>
          <Link to="/parking" className="more-link">더보기</Link>
        </div>
      </div>

      <div className="company-stats-section">
        <div className="stats-header">
          <h2>CarScope와 함께하는 스마트한 자동차 생활</h2>
          <p>CarScope는 수백만 명의 운전자와 함께 성장하고 있습니다.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">
              <NumberCounter endValue={1500} />+
            </span>
            <span className="stat-label">등록 차량 리뷰</span>
            <span className="stat-description">신뢰도 높은 전문 리뷰어의 평가</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              <NumberCounter endValue={250} />K+
            </span>
            <span className="stat-label">월간 활성 이용자</span>
            <span className="stat-description">매달 CarScope를 찾는 운전자 수</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              <NumberCounter endValue={5000} />+
            </span>
            <span className="stat-label">주차장 데이터</span>
            <span className="stat-description">전국 실시간 주차 정보 제공</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;