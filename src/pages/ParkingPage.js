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

                {/* 주차장 추천 목록 삭제 */}

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