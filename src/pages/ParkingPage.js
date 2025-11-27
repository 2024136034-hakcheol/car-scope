import React, { useState } from 'react';
import '../styles/ParkingPage.css';

const DUMMY_PARKING_LOTS = [
  {
    id: 1,
    name: '강남역 메리츠타워 주차장',
    address: '서울 강남구 강남대로 382',
    price: 3000,
    totalSpots: 100,
    availableSpots: 12,
    type: '실내',
    image: 'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MDRfMjUx/MDAxNTg4NTY1Mzc4NTQz.jYmb91zkO7OF8MukAGgkpOnCoeZNABlG-GnkIcPtodIg.5wFooTmkdx9MuQno9moBK6gwlUvZaV0hyH-ZtAsE-98g.JPEG.pybboss/1588565377054.jpg?type=w800'
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
    availableSpots: 0,
    type: '기계식',
    image: 'https://via.placeholder.com/300x200?text=Parking+3'
  },
];

const ParkingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = DUMMY_PARKING_LOTS.filter((lot) =>
    lot.name.includes(searchTerm) || lot.address.includes(searchTerm)
  );

  const handleReserve = (name) => {
    alert(`'${name}' 예약 페이지로 이동합니다. (기능 구현 예정)`);
  };

  return (
    <div className="parking-container">
      {}
      <div className="parking-banner">
        <h2>주차장 예약 최대 70% 할인</h2>
        <p>CarScope 회원만의 특별한 혜택을 누리세요.</p>
      </div>

      {}
      <div className="search-section">
        <input 
          type="text" 
          placeholder="차량명, 지역명 등으로 검색" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>검색</button>
      </div>

      {}
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