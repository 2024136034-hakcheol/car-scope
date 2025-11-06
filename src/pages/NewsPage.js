import React from 'react';

const newsArticles = [
    {
        id: 1,
        title: '친환경 자동차 보조금, 2026년부터 단계적 축소 예정',
        summary: '정부가 전기차 및 수소차에 대한 구매 보조금을 2026년부터 축소하고, 인프라 구축에 집중 투자할 계획을 발표했습니다.',
        date: '2025-11-05',
        views: 1200,
    },
    {
        id: 2,
        title: 'AI 기반 자율주행 기술, 상용화 속도 빨라진다',
        summary: '주요 완성차 업체들이 레벨 4 자율주행 기술 상용화를 목표로 대규모 테스트 드라이브를 시작했습니다. 2027년 양산 목표.',
        date: '2025-11-04',
        views: 3500,
    },
    {
        id: 3,
        title: "신형 SUV '카스코프 모델 X' 국내 출시 임박",
        summary: 'CarScope에서 독자적으로 개발한 새로운 디자인의 SUV가 다음 달 국내 시장에 상륙합니다. 상세 스펙 및 가격 공개 예정.',
        date: '2025-11-03',
        views: 4800,
    },
    {
        id: 4,
        title: '주요 도시, 공영 주차장 스마트 예약 시스템 도입',
        summary: '서울, 부산 등 5대 광역시가 스마트 주차 시스템을 전면 도입하여 주차난 해소에 나섰습니다. 앱을 통한 실시간 예약 및 결제 가능.',
        date: '2025-11-02',
        views: 850,
    },
    {
        id: 5,
        title: '연비 효율 끝판왕! 하이브리드 세단 판매량 갱신',
        summary: '고유가 시대, 소비자들의 선택이 하이브리드 차량으로 몰리면서 역대급 판매 기록을 달성했습니다.',
        date: '2025-11-01',
        views: 5100,
    },
    {
        id: 6,
        title: '테슬라, 새로운 자율주행 기술 공개 시연',
        summary: '일론 머스크가 직접 새로운 자율주행 시스템의 베타 버전을 공개했습니다. 연내 업데이트 예정.',
        date: '2025-10-31',
        views: 2900,
    },
];

const NewsPage = () => {
    const sortedArticles = [...newsArticles].sort((a, b) => b.views - a.views);

    return (
        <div className="news-page-container">
            <h1 className="news-title">최신 자동차 뉴스</h1>
            <p className="news-subtitle">CarScope에서 엄선한 국내외 자동차 산업 소식입니다.</p>
            
            <div className="news-list-wrapper">
                <div className="news-ranking-header">
                    <span className="rank-label">순위</span>
                    <span className="title-label">제목</span>
                    <span className="views-label">조회수</span>
                </div>
                {sortedArticles.map((article, index) => (
                    <a href={`/news/${article.id}`} key={article.id} className="news-list-item">
                        <div className="rank-box">
                            <span className={`rank-number ${index < 3 ? 'top-rank' : ''}`}>
                                {index + 1}
                            </span>
                        </div>
                        <div className="content-box">
                            <h2 className="article-title">{article.title}</h2>
                            <p className="article-date">{article.date} · {article.summary}</p>
                        </div>
                        <div className="views-box">
                            {article.views.toLocaleString()}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;