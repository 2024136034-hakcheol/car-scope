import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const dummyBanners = [
  { id: 1, title: "CarScope 첫 오픈 기념!", subtitle: "프리미엄 리뷰를 7일간 무료로 경험하세요.", color: "#007bff", link: "/event/open" },
  { id: 2, title: "🚘 2024년 신차 트렌드 리포트", subtitle: "올해 주목해야 할 전기차, 하이브리드 모델 분석!", color: "#28a745", link: "/news/newcar" },
  { id: 3, title: "🅿️ 주차장 예약 최대 50% 할인!", subtitle: "지금 바로 가까운 주차장을 예약하세요.", color: "#ffc107", link: "/parking" },
];

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
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      
      <div className="main-content-grid">
        <div className="card latest-news">
          <h3>최신 자동차 뉴스</h3>
          <ul>
            <li><Link to="/news/1">테슬라 '모델 Y' 출고 대란... [이슈]</Link></li>
            <li><Link to="/news/2">신형 '아이오닉 7' 디자인 티저 공개 [신차]</Link></li>
            <li><Link to="/news/3">BMW 'M4 CSL' 트랙 시승기 [시승기]</Link></li>
          </ul>
          <Link to="/news" className="more-link">뉴스 더보기 &gt;</Link>
        </div>
        
        <div className="card hot-parking">
          <h3>인기 주차장 리뷰</h3>
          <ul>
            <li><Link to="/parking/1">희망대 근린공원 주차장 (4.5/5)</Link></li>
            <li><Link to="/parking/2">서현역 공영주차장 (4.2/5)</Link></li>
            <li><Link to="/parking/3">백현동 카페거리 주차장 (4.7/5)</Link></li>
          </ul>
          <Link to="/parking" className="more-link">주차장 리뷰 전체 보기 &gt;</Link>
        </div>
        
        <div className="card popular-community">
          <h3>인기 커뮤니티 주제</h3>
          <ul>
            <li><Link to="/community/1">내 차 연비 챌린지 공유 이벤트</Link></li>
            <li><Link to="/community/2">전기차 충전소 꿀팁 공유</Link></li>
            <li><Link to="/community/3">신차 출고 대기 인증</Link></li>
          </ul>
          <Link to="/community" className="more-link">커뮤니티 가기 &gt;</Link>
        </div>
      </div>

    </div>
  );
};

export default HomePage;