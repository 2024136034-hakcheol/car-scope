import React from 'react';
import '../styles/MyPage.css';

const MyPage = () => {
  // 1. 임시 사용자 정보 (나중에 DB에서 가져올 내용)
  const userInfo = {
    nickname: '키라링',
    email: 'kiraring@carscope.com',
    level: 'GOLD',
    mileage: 3500,
    coupons: 2,
    carNumber: '12가 3456',
    carModel: 'Hyundai Ioniq 5'
  };

  // 2. 임시 예약 내역 리스트
  const reservations = [
    {
      id: 1,
      name: '강남역 메리츠타워 주차장',
      date: '2025. 12. 02 (화)',
      time: '14:00 - 16:00',
      price: 6000,
      status: '이용예정' // 예약확정, 이용완료, 취소 등
    },
    {
      id: 2,
      name: '삼성동 코엑스 몰 주차장',
      date: '2025. 11. 20 (수)',
      time: '18:00 - 22:00',
      price: 16000,
      status: '이용완료'
    }
  ];

  return (
    <div className="mypage-wrapper">
      <div className="mypage-container">
        <h1 className="page-title">마이페이지</h1>

        {/* --- 섹션 1: 프로필 카드 --- */}
        <div className="profile-card">
          <div className="profile-left">
            <div className="avatar">키</div>
            <div className="user-text">
              <div className="name-row">
                <h2>{userInfo.nickname}님</h2>
                <span className="badge-level">{userInfo.level}</span>
              </div>
              <p className="user-email">{userInfo.email}</p>
            </div>
          </div>
          <button className="btn-edit">내 정보 수정</button>
        </div>

        {/* --- 섹션 2: 자산 현황 (마일리지/쿠폰) --- */}
        <div className="stats-container">
          <div className="stat-box">
            <p>보유 마일리지</p>
            <h3>{userInfo.mileage.toLocaleString()} P</h3>
          </div>
          <div className="stat-box">
            <p>할인 쿠폰</p>
            <h3>{userInfo.coupons} 장</h3>
          </div>
          <div className="stat-box">
            <p>등록된 차량</p>
            <h3>{userInfo.carNumber}</h3>
            <span className="sub-text">{userInfo.carModel}</span>
          </div>
        </div>

        <div className="content-row">
          {/* --- 섹션 3: 예약 내역 (좌측) --- */}
          <div className="section-reservations">
            <div className="section-header">
              <h3>최근 예약 내역</h3>
              <button className="btn-text-more">더보기 &gt;</button>
            </div>

            {reservations.length > 0 ? (
              <div className="reservation-list">
                {reservations.map((res) => (
                  <div key={res.id} className="res-card">
                    <div className="res-top">
                      <span className={`status-tag ${res.status === '이용예정' ? 'active' : 'done'}`}>
                        {res.status}
                      </span>
                      <span className="res-date">{res.date}</span>
                    </div>
                    <h4>{res.name}</h4>
                    <p className="res-time">{res.time}</p>
                    <div className="res-bottom">
                      <span className="res-price">{res.price.toLocaleString()}원</span>
                      {res.status === '이용예정' && (
                        <button className="btn-cancel">예약취소</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data">예약 내역이 없습니다.</div>
            )}
          </div>

          {/* --- 섹션 4: 퀵 메뉴 (우측) --- */}
          <div className="section-quick">
            <h3>자주 찾는 메뉴</h3>
            <ul className="quick-list">
              <li>📍 찜한 주차장</li>
              <li>💬 나의 리뷰 관리</li>
              <li>💳 결제 수단 관리</li>
              <li>📞 1:1 문의 내역</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;