import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const dummyBanners = [
  { id: 1, title: "CarScope 첫 오픈 기념!", subtitle: "프리미엄 리뷰를 7일간 무료로 경험하세요.", color: "#007bff", link: "/event/open" },
  { id: 2, title: "🚘 2024년 신차 트렌드 리포트", subtitle: "올해 주목해야 할 전기차, 하이브리드 모델 분석!", color: "#28a745", link: "/news/newcar" },
  { id: 3, title: "🅿️ 주차장 예약 최대 50% 할인!", subtitle: "지금 바로 가까운 주차장을 예약하세요.", color: "#ffc107", link: "/parking" },
];

const dummyReviews = [
  { id: 1, user: "김**진", car: "람보르기니 아벤타도르 S", rating: 5, content: "내가 제일 최고라는것을 커뮤니티 보고 알았네요. 다들 대중교통 이용하세요~", date: "2024.10.01" },
  { id: 2, user: "문**철", car: "아반떼 N", rating: 4.5, content: "카스코프 최고다 맨쓰~ 맨쓰~~", date: "2024.09.28" },
  { id: 3, user: "황**현", car: "제네시스 G90", rating: 3.5, content: "주차장이 너무 더럽네요...", date: "2024.09.25" },
];

const dummyParkingSpots = [
    { id: 1, name: "강남 N 타워 주차장", area: "강남구", price: "500원/5분", link: "/parking/gangnam" },
    { id: 2, name: "홍대 입구역 인근", area: "마포구", price: "1,500원/10분", link: "/parking/hongdae" },
    { id: 3, name: "여의도 더현대 파크", area: "영등포구", price: "4,000원/30분", link: "/parking/yeouido" },
];

const dummyTrends = [
    { id: 1, keyword: "카니발 하이브리드", rank: 1, link: "/search?q=카니발+하이브리드" },
    { id: 2, keyword: "쏘렌토 풀체인지", rank: 2, link: "/search?q=쏘렌토+풀체인지" },
    { id: 3, keyword: "GV80 페이스리프트", rank: 3, link: "/search?q=GV80+페이스리프트" },
    { id: 4, keyword: "전기차 보조금", rank: 4, link: "/search?q=전기차+보조금" },
    { id: 5, keyword: "테슬라 모델 Y", rank: 5, link: "/search?q=테슬라+모델+Y" },
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

// 별점을 CSS width로 제어하는 방식으로 완전히 변경
const StarRating = ({ rating }) => {
    const starWidthPercentage = (rating / 5) * 100;

    return (
        <div className="star-rating-container" title={`${rating}점`}>
            {/* 회색 별 5개 (배경) */}
            <div className="stars-empty">★★★★★</div>
            {/* 노란색 별 (rating에 따라 너비 제어) */}
            <div className="stars-fill" style={{ width: `${starWidthPercentage}%` }}>
                ★★★★★
            </div>
        </div>
    );
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
      
      <div className="main-banner-slider-wrapper">
        <div 
          className="main-banner-slider" 
          ref={sliderRef}
        >
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
      </div>

      <div className="hot-trends-section">
        <h2>🔥 실시간 인기 검색어</h2>
        <p>지금 CarScope 사용자들은 무엇에 관심이 있을까요?</p>
        <div className="trend-list-container">
          {dummyTrends.map(trend => (
            <Link to={trend.link} key={trend.id} className="trend-item-card">
              <span className="trend-rank">{trend.rank}</span>
              <span className="trend-keyword">{trend.keyword}</span>
            </Link>
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
      
      <div className="user-feedback-section">
        <h2>⭐️ 최신 사용자 피드백</h2>
        <p>CarScope를 이용한 실제 사용자들의 솔직한 후기입니다.</p>
        <div className="feedback-grid">
          {dummyReviews.map(review => (
            <div key={review.id} className="feedback-card">
              <StarRating rating={review.rating} />
              <div className="feedback-content">"{review.content}"</div>
              <div className="feedback-info">
                <span className="feedback-user">{review.user}</span>
                <span className="feedback-car">| {review.car} 이용</span>
              </div>
            </div>
          ))}
        </div>
        <Link to="/community/reviews" className="feedback-more-link">
          모든 후기 보기 &gt;
        </Link>
      </div>
      
      <div className="parking-recommendation-section">
          <h2>📍 지금 인기 있는 지역 주차장</h2>
          <p>내 주변, 혹은 방문하려는 지역의 주차장을 빠르게 확인하세요.</p>
          <div className="parking-spot-grid">
              {dummyParkingSpots.map(spot => (
                  <Link to={spot.link} key={spot.id} className="parking-spot-card">
                      <div className="spot-header">
                          <span className="spot-area">{spot.area}</span>
                          <span className="spot-price">{spot.price}</span>
                      </div>
                      <h4 className="spot-name">{spot.name}</h4>
                      <span className="spot-cta">예약/정보 확인 &gt;</span>
                  </Link>
              ))}
          </div>
          <Link to="/parking" className="parking-more-link">
              다른 지역 주차장 찾기 &gt;
          </Link>
      </div>

      <div className="company-stats-section">
        <div className="stats-header">
          <h2>CarScope와 함께하는 스마트한 자동차 생활</h2>
          <p>CarScope는 수백만 명의 운전자와 함께 성장하고 있습니다.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">
              <NumberCounter endValue={250000} />+
            </span>
            <span className="stat-label">사용자 누적 예약 수</span>
            <span className="stat-description">편리하게 이용된 주차 서비스 횟수</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              <NumberCounter endValue={5000} />+
            </span>
            <span className="stat-label">주차장 제휴 수</span>
            <span className="stat-description">전국 실시간 주차 정보 제공 파트너</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              <NumberCounter endValue={490000} />+
            </span>
            <span className="stat-label">사용자 평가 총점</span>
            <span className="stat-description">누적된 사용자 리뷰의 총점</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;