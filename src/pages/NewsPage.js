import React from 'react';
import { Link } from 'react-router-dom';

const dummyNews = [
  { id: 1, title: "테슬라 '모델 Y' 출고 대란... 부품 수급 이슈 재부상", summary: "최근 테슬라 모델 Y의 출고 일정이 예고 없이 지연되면서 부품 공급망 문제가 다시 도마에 올랐습니다. 소비자들의 불만이 커지고 있습니다.", category: "이슈/단독" },
  { id: 2, title: "현대차, 신형 '아이오닉 7' 디자인 티저 공개: 대형 SUV 전기차 시장 정조준", summary: "현대자동차가 7인승 대형 전기 SUV 아이오닉 7의 공식 디자인 티저를 발표했습니다. 박시한 외관과 첨단 기술 탑재가 예상됩니다.", category: "신차/디자인" },
  { id: 3, title: "BMW 'M4 CSL' 트랙 시승기: 일반 모델과의 차이는? '극강의 경량화'", summary: "극한의 트랙 성능을 위해 개발된 M4 CSL 모델을 직접 주행했습니다. 경량화된 차체와 정교한 섀시가 선사하는 짜릿한 경험을 리뷰합니다.", category: "시승기/성능" },
  { id: 4, title: "국토부, 자율주행 레벨 3 상용화 가속화... 연내 법규 개정 추진", summary: "정부가 완전 자율주행으로 가는 교두보인 레벨 3 기술의 상용화를 위해 관련 법규를 신속히 개정하고 인프라 구축에 나섭니다.", category: "정책/미래차" },
  { id: 5, title: "카이엔 터보 E-하이브리드: 800마력대 성능의 괴물 SUV 등장", summary: "포르쉐가 공개한 카이엔 터보 E-하이브리드는 압도적인 마력과 배터리 성능을 결합하여 고성능 SUV 시장의 새로운 기준을 제시합니다.", category: "신차/하이브리드" },
];

const NewsPage = () => {
  return (
    <div className="news-page-container">
      <div className="news-content-area">
        
        <div className="news-left-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">뉴스 카테고리</div>
            <nav className="news-category-nav">
              <Link to="/news/all">전체뉴스</Link>
              <Link to="/news/newcar">신차</Link>
              <Link to="/news/issue">이슈</Link>
              <Link to="/news/review">시승기</Link>
              <Link to="/news/future">미래차</Link>
              <Link to="/news/policy">정책</Link>
            </nav>
          </div>
          
          <div className="sidebar-section ad-banner">
            <div className="sidebar-title">스페셜 오퍼</div>
            <p>CarScope 멤버십 가입 시, 최신 차량 리뷰를 가장 먼저 받아보세요!</p>
            <button className="subscribe-button">구독 신청</button>
          </div>
        </div>
        
        <div className="news-main-list">
          <div className="main-list-header">
            <h2>주요 자동차 뉴스</h2>
            <div className="sort-options">
              <span>정렬:</span>
              <a href="#">최신순</a>
              <a href="#">조회순</a>
              <a href="#">이슈순</a>
            </div>
          </div>
          
          {dummyNews.map(news => (
            <div key={news.id} className="news-item">
              <div className="news-tag">{news.category}</div>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-summary">{news.summary}</p>
              <Link to={`/news/${news.id}`} className="news-readmore">
                자세히 보기 &gt;
              </Link>
            </div>
          ))}
        </div>
        
        <div className="news-right-sidebar">
          <div className="sidebar-section hot-keywords">
            <div className="sidebar-title">인기 키워드</div>
            <div className="keyword-list">
              <button>#테슬라</button>
              <button>#전기차보조금</button>
              <button>#아이오닉7</button>
              <button>#자율주행레벨3</button>
              <button>#카이엔</button>
              <button>#차박</button>
            </div>
          </div>
          
          <div className="sidebar-section popular-posts">
            <div className="sidebar-title">인기 게시글</div>
            <ul>
              <li><Link to="#">가장 잘 팔리는 수입차 TOP 5</Link></li>
              <li><Link to="#">2025년 주목해야 할 신차</Link></li>
              <li><Link to="#">내 차 팔기 시세 확인 방법</Link></li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NewsPage;