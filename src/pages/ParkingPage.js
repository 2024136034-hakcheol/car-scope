import React from 'react';

const ParkingPage = () => {
    return (
        <div className="parking-page-container">
            <div className="parking-content-wrapper">
                <h1>주차장 리뷰</h1>
                
                <div className="parking-search-section">
                    <div className="parking-search-box">
                        <input 
                            type="text" 
                            placeholder="주차장 검색" 
                            className="parking-search-input"
                        />
                        <button className="parking-search-btn">🔍</button>
                    </div>
                </div>

                <h2>이런 주차장은 어떠세요?</h2>
                
                <div className="recommendation-list">
                    <div className="recommendation-item">
                        <div className="item-details">
                            <p className="item-name">카카오 T AK플라자 분당</p>
                            <p className="item-info">377건 · 32m</p>
                        </div>
                        <div className="item-right-section">
                            <p className="item-price">심야권 4,000원 외 1개</p>
                            <button className="parking-reserve-btn">주차장 예약하기</button>
                        </div>
                    </div>
                    <div className="recommendation-item">
                        <div className="item-details">
                            <p className="item-name">아반포트 서현265 주차장</p>
                            <p className="item-info">273건 · 101m</p>
                        </div>
                        <div className="item-right-section">
                            <p className="item-price">심야권 2,900원 외 1개</p>
                            <button className="parking-reserve-btn">주차장 예약하기</button>
                        </div>
                    </div>
                </div>

                <div className="review-list-section">
                    <h2>리뷰 리스트</h2>
                    
                    <div className="review-item-card">
                        <p className="review-parking-name">희망대림공원 공영주차장</p>
                        <div className="review-rating">
                            ⭐️⭐️⭐️⭐️ (10)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParkingPage;