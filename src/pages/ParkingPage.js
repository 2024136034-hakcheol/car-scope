import React from 'react';
import '../App.css';

function ParkingReviewItem({ title, summary, reviews, tags, image }) {
    return (
        <div className="review-item">
            <img src={image} alt={title} className="review-image" />
            <div className="review-details">
                <div className="review-header">
                    <h3 className="review-title">{title}</h3>
                </div>
                <div className="review-rating">
                    <span className="stars">⭐⭐⭐⭐</span>
                    <span className="review-count">({reviews})</span>
                </div>
                <div className="review-summary">
                    <p>간단 후기 : {summary}</p>
                </div>
            </div>
        </div>
    );
}

function ParkingPage() {
    
    const sampleReviews = [
        { title: "희망대근린공원 공영주차장", summary: "주차장은 전반적으로 깨끗합니다만 주차하고 나오는 길이 어렵네요", reviews: 10, image: "https://via.placeholder.com/100x70?text=Parking1" },
        { title: "서현역 공영주차장", summary: "들어가는 입구는 조금 작지만 중심 상권이랑 가까워서 좋네요", reviews: 299, image: "https://via.placeholder.com/100x70?text=Parking2" },
        { title: "백현동 카페거리 공영주차장", summary: "카페거리 갈 때 종종 들립니다. 넓고 쾌적해서 아주 좋아요!", reviews: 1082, image: "https://via.placeholder.com/100x70?text=Parking3" },
    ];
    
    return (
        <div className="parking-page-container main-content">
            
            <div className="parking-header-area">
                <div className="parking-title-group">
                    <h2 className="parking-main-title">주차장 리뷰</h2>
                </div>
                <div className="parking-search-group">
                    {/* 👇 여기서 텍스트를 "주차장 검색"으로 변경했습니다. */}
                    <input type="text" placeholder="주차장 검색" className="parking-search-input" />
                    <button className="parking-search-button">🔍</button>
                </div>
            </div>
            
            <div className="parking-content-grid">
                
                <div className="parking-sidebar">
                    <div className="sidebar-section">
                        <h4 className="sidebar-title">이런 주차장은 어떠세요?</h4>
                        <div className="sidebar-item">
                            <p className="sidebar-name">카카오 T AK플라자 분당...</p>
                            <p className="sidebar-details">377권 · 32m</p>
                            <p className="sidebar-price">심야권 4,000원 외 1개</p>
                        </div>
                         <div className="sidebar-item">
                            <p className="sidebar-name">어반포트 서현265 주차장</p>
                            <p className="sidebar-details">273권 · 101m</p>
                            <p className="sidebar-price">심야권 2,900원 외 1개</p>
                        </div>
                    </div>
                    
                    <button className="parking-reserve-button">주차장 예약하기</button>
                </div>
                
                <div className="parking-review-list">
                    <h3 className="list-title">리뷰 리스트</h3>
                    {sampleReviews.map((review, index) => (
                        <ParkingReviewItem key={index} {...review} />
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default ParkingPage;