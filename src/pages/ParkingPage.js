import React, { useState } from 'react';
import '../styles/ParkingPage.css';

// 1. 임시 데이터 (나중에 Firebase로 대체할 부분)
const DUMMY_PARKING_LOTS = [
  {
    id: 1,
    name: '강남역 메리츠타워 주차장',
    address: '서울 강남구 강남대로 382',
    price: 3000,
    totalSpots: 100,
    availableSpots: 12,
    type: '실내',
    image: 'https://via.placeholder.com/300x200?text=Parking+1' // 아까 만든 이미지 URL 넣으면 됨
  },
  {
    id: 2,
    name: '삼성동 코엑스 몰 주차장',
    address: '서울 강남구 영동대로 513',
    price: 4000,
    totalSpots: 500,
    availableSpots: 45,
    type: '지하',
    image: 'https://via.placeholder.com/300x200?text=Parking+2'
  },
  {
    id: 3,
    name: '역삼 하이츠 빌딩',
    address: '서울 강남구 테헤란로 123',
    price: 2500,
    totalSpots: 50,
    availableSpots: 0, // 만차 테스트용
    type: '기계식',
    image: 'https://via.placeholder.com/300x200?text=Parking+3'
  },
];

const ParkingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 검색 기능 필터링
  const filteredList = DUMMY_PARKING_LOTS.filter((lot) =>
    lot.name.includes(searchTerm) || lot.address.includes(searchTerm)
  );

  const handleReserve = (name) => {
    alert(`'${name}' 예약 페이지로 이동합니다. (기능 구현 예정)`);
    // 나중에 여기에 예약 상세 페이지로 이동하는 navigate 코드 추가
  };

  return (
    <div className="parking-container">
      {/* 2. 상단 배너 섹션 (아까 만든 이미지 활용 공간) */}
      <div className="parking-banner">
        <h2>주차장 예약 최대 70% 할인</h2>
        <p>CarScope 회원만의 특별한 혜택을 누리세요.</p>
      </div>

      {/* 3. 검색창 */}
      <div className="search-section">
        <input 
          type="text" 
          placeholder="차량명, 지역명 등으로 검색" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>검색</button>
      </div>

      {/* 4. 주차장 리스트 카드 */}
      <div className="parking-list">
        {filteredList.map((lot) => (
          <div key={lot.id} className="parking-card">
            <div className="card-image">
              <img src={lot.image} alt={lot.name} />
              <span className="badge">{lot.type}</span>
            </div>
            <div className="card-content">
              <h3>{lot.name}</h3>
              <p className="address">{lot.address}</p>
              <div className="info-row">
                <span className="price">{lot.price.toLocaleString()}원 / 시간</span>
                <span className={`spots ${lot.availableSpots === 0 ? 'full' : ''}`}>
                  {lot.availableSpots > 0 ? `잔여 ${lot.availableSpots}대` : '만차'}
                </span>
              </div>
              <button 
                className="btn-reserve" 
                disabled={lot.availableSpots === 0}
                onClick={() => handleReserve(lot.name)}
              >
                {lot.availableSpots > 0 ? '예약하기' : '예약불가'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingPage;