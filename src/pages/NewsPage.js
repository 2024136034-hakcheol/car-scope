import React from 'react';
import '../App.css';

function NewsPage() {
    const hotClickNews = [
        {
            id: 1,
            image: "https://via.placeholder.com/150x100?text=News1",
            category: "[시승기]",
            title: "아이오닉 6 N ‘심야 습격’ 감성, 고성능의 한계를 넘은 진가",
            summary: "오토헤럴드] 김훈석 기자 = ‘심야 습격’ 감성. 누리꾼들 눈에 불을 켰다. 세계 무대에서는 있지만 높은 완성도 2025.10.27",
            source: "오토헤럴드",
            date: "2025.10.27"
        },
        {
            id: 2,
            image: "https://via.placeholder.com/150x100?text=News2",
            category: "[탑승기]",
            title: "테슬라, 페달도어 메시지 오류 언제쯤 아예 사라지나 ‘앞차 위협’ 논란 불...",
            summary: "[탑승기 잡담] 테슬라는 매주 정기적인 업데이트에 노출이 자주 발생한다. 특히 X, Y, Z 그리고 사이버트럭까지 더 나아갈 수 있는 차량 시스템은 완전한 업데이트를 진행합니다 2025.10.27.",
            source: "오토헤럴드",
            date: "2025.10.27"
        },
        {
            id: 3,
            image: "https://via.placeholder.com/150x100?text=News3",
            category: "[르포]",
            title: "르포] 현대차, 첫 오일러리 프레젠테이션 그래도…한국형 갓오프드가 필요한가",
            summary: "오토헤럴드] 김훈석 기자 = 아이오닉 6 N ‘심야 습격’ 감성. 누리꾼들 눈에 불을 켰다. 세계 무대에서는 있지만 높은 완성도 2025.10.27",
            source: "오토헤럴드",
            date: "2025.10.27"
        },
         {
            id: 4,
            image: "https://via.placeholder.com/150x100?text=News4",
            category: "[리뷰]",
            title: "BMW, 엑스포서 친환경차 비전 제시 'iX5 Hydrogen 프로토 타입 공개'",
            summary: "오토헤럴드] 박정기 기자 = ‘친환경차’ 시대에 접어들며, 글로벌 자동차 제조사들은 더욱 강력한 기술을 선보이고 있다. BMW는 iX5 Hydrogen 프로토 타입으로 미래 모빌리티를 엿볼 기회를 줬다. 2025.10.27",
            source: "오토헤럴드",
            date: "2025.10.27"
        },
        {
            id: 5,
            image: "https://via.placeholder.com/150x100?text=News5",
            category: "[분석]",
            title: "제네시스 GV90, 전기차 시대 선도할 플래그십 SUV의 등장 예고",
            summary: "오토헤럴드] 이재용 기자 = 제네시스가 새로운 전기차 플래그십 SUV, GV90의 등장을 예고하며 주목받고 있다. 혁신적인 디자인과 최첨단 기술로 무장한 GV90은 럭셔리 전기 SUV 시장의 새로운 기준을 제시할 것으로 기대된다. 2025.10.27",
            source: "오토헤럴드",
            date: "2025.10.27"
        },
    ];

    const popularNewsCategories = [
        "신차발표 모터쇼", "국내외 신차 소식", "수입차 소식", "테마별 기획",
        "보도자료", "모터스포츠", "친환경차 소식", "이런저런 생각, 자동차 잡담", "백만장소식"
    ];

    return (
        <div className="main-content news-page-container">
            <div className="breadcrumb">
                홈 &gt; 뉴스/커뮤니티 &gt; 주요뉴스 &gt; 뉴스
            </div>

            <div className="news-content-grid">
                <div className="news-sidebar-left">
                    <div className="news-category-section">
                        <h4>뉴스/커뮤니티</h4>
                        <ul>
                            <li className="active"><a href="#">주요 뉴스</a></li>
                            <li><a href="#">보도자료</a></li>
                            <li><a href="#">테마별 기획</a></li>
                        </ul>
                    </div>

                    <div className="sidebar-ad-card">
                        <img src="https://via.placeholder.com/200x100?text=AD" alt="Jetcar Ad" />
                        <p>Jetcar 인기가치차</p>
                        <p className="highlight">보증금 100만원부터</p>
                    </div>

                    <div className="sidebar-mini-section">
                        <h4>멤버 미디어</h4>
                        <ul>
                            <li><a href="#">동영상</a></li>
                            <li><a href="#">사진</a></li>
                        </ul>
                    </div>
                    <div className="sidebar-mini-section">
                        <h4>커뮤니티</h4>
                        <ul>
                            <li><a href="#">자유게시판</a></li>
                            <li><a href="#">내게 맞는 문의</a></li>
                        </ul>
                    </div>
                    <div className="sidebar-ad-card small">
                        <p>신용 관계없이 진행</p>
                        <p>신용 심사 NO</p>
                        <button className="ad-button">할부예측 바로가기</button>
                    </div>
                </div>

                <div className="news-main-content">
                    <div className="news-header-area">
                        <h2 className="news-main-title">주요 뉴스</h2>
                        <div className="news-share-buttons">
                            <span className="share-icon">📤</span>
                        </div>
                    </div>

                    <div className="news-tabs">
                        <div className="news-tab-item active">핫클릭</div>
                        <div className="news-tab-item">최신순</div>
                        <div className="news-tab-item">조회순</div>
                    </div>

                    <div className="popular-news-categories">
                        {popularNewsCategories.map((cat, index) => (
                            <span key={index} className="popular-category-tag">{cat}</span>
                        ))}
                    </div>

                    <div className="news-list">
                        {hotClickNews.map(news => (
                            <div className="news-item" key={news.id}>
                                <img src={news.image} alt={news.title} className="news-item-image" />
                                <div className="news-item-details">
                                    <p className="news-item-title"><span className="news-category">{news.category}</span> {news.title}</p>
                                    <p className="news-item-summary">{news.summary}</p>
                                    <p className="news-item-meta">{news.source} | {news.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="news-sidebar-right">
                    <div className="utility-buttons-group">
                        <button className="utility-button blue">
                            <span className="icon"></span> 신차 견적
                        </button>
                        <button className="utility-button grey">
                            <span className="icon"></span> 내차 판매 견적
                        </button>
                    </div>
                    <div className="news-right-ad">
                        <img src="https://via.placeholder.com/280x250?text=AD_Banner" alt="광고 배너" />
                    </div>
                    <div className="news-right-mini-buttons">
                        <button className="mini-button"><span className="icon"></span> 신차 견적</button>
                        <button className="mini-button"><span className="icon"></span> 내차 만들기</button>
                        <button className="mini-button"><span className="icon"></span> 제원/옵션</button>
                        <button className="mini-button"><span className="icon"></span> 중고차 시세</button>
                        <button className="mini-button"><span className="icon"></span> 자동차 보험</button>
                        <button className="mini-button"><span className="icon"></span> 시승차 신청</button>
                    </div>

                    <div className="news-popular-articles">
                        <h4>뉴스</h4>
                        <ul>
                            <li><a href="#">[연말특집] 현대, 왜 오일러리 프레젠테이션 그래도...</a></li>
                            <li><a href="#">[시승기] 아이오닉 6 N ‘심야 습격’ 감성</a></li>
                            <li><a href="#">[분석] 제네시스 GV90, 전기차 시대 선도할 플래그십 SUV의 등장 예고</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsPage;