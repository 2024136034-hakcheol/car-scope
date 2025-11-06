import React from 'react';

const HomePage = () => {
    return (
        <div className="homepage-container">
            {/* 메인 배너 슬라이더 */}
            <div className="main-banner-slider-wrapper">
                <div className="main-banner-slider" style={{ backgroundColor: 'blue', width: '100%' }}>
                    <div className="slider-track">
                        <div className="slide-item">
                            <div className="banner-link-wrapper">
                                <div className="banner-content">
                                    <h2>CarScope 첫 오픈 기념!</h2>
                                    <p>프리미엄 리뷰를 7일간 무료로 경험하세요.</p>
                                    <a href="#">자세히 보기 &gt;</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-dots">
                        <div className="dot active"></div>
                    </div>
                </div>
                <div className="main-banner-slider" style={{ backgroundColor: 'green', width: '100%', marginTop: '10px' }}>
                    <div className="slider-track">
                        <div className="slide-item">
                            <div className="banner-link-wrapper">
                                <div className="banner-content">
                                    <h2>2024 신차 트렌드 리포트</h2>
                                    <p>올해 주목해야 할 전기차, 하이브리드 모델 분석!</p>
                                    <a href="#">자세히 보기 &gt;</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-dots">
                        <div className="dot active"></div>
                    </div>
                </div>
                <div className="main-banner-slider" style={{ backgroundColor: 'orange', width: '100%', marginTop: '10px' }}>
                    <div className="slider-track">
                        <div className="slide-item">
                            <div className="banner-link-wrapper">
                                <div className="banner-content">
                                    <h2>🅿 주차장 예약 최대 50% 할인!</h2>
                                    <p>지금 바로 가까운 주차장을 예약하세요.</p>
                                    <a href="#">자세히 보기 &gt;</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-dots">
                        <div className="dot active"></div>
                    </div>
                </div>
            </div>

            {/* 실시간 인기 검색어 */}
            <div className="hot-trends-section">
                <h2>🔥 실시간 인기 검색어</h2>
                <p>지금 CarScope 사용자들은 무엇에 관심이 있을까요?</p>
                <div className="trend-list-container">
                    <div className="trend-item-card"><span className="trend-rank">1</span><span className="trend-keyword">카니발 하이브리드</span></div>
                    <div className="trend-item-card"><span className="trend-rank">2</span><span className="trend-keyword">쏘렌토 플러그인</span></div>
                    <div className="trend-item-card"><span className="trend-rank">3</span><span className="trend-keyword">GV80 페이스리프트</span></div>
                    <div className="trend-item-card"><span className="trend-rank">4</span><span className="trend-keyword">전기차 보조금</span></div>
                    <div className="trend-item-card"><span className="trend-rank">5</span><span className="trend-keyword">테슬라 모델 Y</span></div>
                </div>
            </div>

            {/* 메인 콘텐츠 그리드 */}
            <div className="main-content-grid">
                <div className="card">
                    <h3>인기 리뷰</h3>
                    <ul>
                        <li>현대 쏘나타 2024 시승기</li>
                        <li>BMW 5시리즈, 진정한 혁신인가?</li>
                        <li>가성비 최고의 전기차 TOP 5</li>
                    </ul>
                    <a href="#" className="more-link">더보기</a>
                </div>
                <div className="card">
                    <h3>최신 뉴스</h3>
                    <ul>
                        <li>테슬라, 새로운 자율주행 기술 공개</li>
                        <li>내연기관차 생산 중단 시점은?</li>
                        <li>정부, 전기차 보조금 정책 발표</li>
                    </ul>
                    <a href="#" className="more-link">더보기</a>
                </div>
                <div className="card">
                    <h3>인기 주차장</h3>
                    <ul>
                        <li>강남역 민영 주차장</li>
                        <li>홍대입구역 24시간 주차장</li>
                        <li>김포공항 장기 주차 꿀팁</li>
                    </ul>
                    <a href="#" className="more-link">더보기</a>
                </div>
            </div>

            {/* 사용자 피드백 섹션 */}
            <div className="user-feedback-section">
                <h2>⭐️ 최신 사용자 피드백</h2>
                <div className="feedback-grid">
                    <div className="feedback-card">
                        <div className="feedback-rating">⭐️⭐️⭐️⭐️⭐️</div>
                        <p className="feedback-content">"내가 제일 맘에 안 들었던 부분까지 체크해줘서 좋았어요. 다만, 대중교통 이용객에게는 좀..."</p>
                        <div className="feedback-info">갑**진 · 람보르기니 아벤타도르 S 이용</div>
                    </div>
                    <div className="feedback-card">
                        <div className="feedback-rating">⭐️⭐️⭐️⭐️</div>
                        <p className="feedback-content">"주차장이 너무 넓네요."</p>
                        <div className="feedback-info">황**현 · 제네시스 G90 이용</div>
                    </div>
                    <div className="feedback-card">
                        <div className="feedback-rating">⭐️⭐️⭐️⭐️⭐️</div>
                        <p className="feedback-content">"카스쿠프 최고! 깔끔하고 센스 굿"</p>
                        <div className="feedback-info">문**진 · 아반떼 N 이용</div>
                    </div>
                </div>
                <a href="#" className="feedback-more-link">모든 후기 보기 &gt;</a>
            </div>

            {/* 인기 지역 주차장 섹션 */}
            <div className="parking-recommendation-section">
                <h2>📌 지금 인기 있는 지역 주차장</h2>
                <p>내 주변, 혹은 방문하려는 지역의 주차장을 빠르게 확인하세요.</p>
                <div className="parking-spot-grid">
                    <div className="parking-spot-card">
                        <div className="spot-header">
                            <span className="spot-area">강남구</span>
                            <span className="spot-price">500원/5분</span>
                        </div>
                        <p className="spot-name">강남 N 타워 주차장</p>
                        <a href="#" className="spot-cta">예약/정보 확인 &gt;</a>
                    </div>
                    <div className="parking-spot-card">
                        <div className="spot-header">
                            <span className="spot-area">마포구</span>
                            <span className="spot-price">1,500원/10분</span>
                        </div>
                        <p className="spot-name">홍대입구역 인근</p>
                        <a href="#" className="spot-cta">예약/정보 확인 &gt;</a>
                    </div>
                    <div className="parking-spot-card">
                        <div className="spot-header">
                            <span className="spot-area">영등포구</span>
                            <span className="spot-price">4,000원/30분</span>
                        </div>
                        <p className="spot-name">여의도 더현대 파크</p>
                        <a href="#" className="spot-cta">예약/정보 확인 &gt;</a>
                    </div>
                </div>
                <a href="#" className="parking-more-link">다른 지역 주차장 찾기 &gt;</a>
            </div>

            {/* 회사 통계 섹션 */}
            <div className="company-stats-section">
                <h2>CarScope와 함께하는 스마트한 자동차 생활</h2>
                <p>CarScope는 수백만 명의 운전자와 함께 성장하고 있습니다.</p>
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-value">250,000+</span>
                        <span className="stat-label">사용자 누적 예약 수</span>
                        <span className="stat-description">가장 인기 있는 주차 예약 서비스</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">5,000+</span>
                        <span className="stat-label">주차장 제휴 수</span>
                        <span className="stat-description">전국 주요 주차장과 함께합니다.</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">490,000+</span>
                        <span className="stat-label">사용자 평가 및 평점</span>
                        <span className="stat-description">운전자의 생생한 후기</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;