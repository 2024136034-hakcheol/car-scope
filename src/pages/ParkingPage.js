import React, { useState } from 'react';
import '../styles/ParkingPage.css';
import ReservationModal from '../components/ReservationModal'; // [1] 모달 불러오기

// 임시 데이터
const DUMMY_PARKING_LOTS = [
  {
    id: 1,
    name: '강남역 메리츠타워 주차장',
    address: '서울 강남구 강남대로 382',
    price: 3000,
    totalSpots: 100,
    availableSpots: 12,
    type: '실내',
    image: 'https://via.placeholder.com/300x200?text=Parking+1'
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
  
  // [2] 모달 상태 관리 (열림 여부, 선택된 주차장)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);

  // 검색 기능
  const filteredList = DUMMY_PARKING_LOTS.filter((lot) =>
    lot.name.includes(searchTerm) || lot.address.includes(searchTerm)
  );

  // [3] 예약 버튼 클릭 시 실행되는 함수
  const handleReserve = (lot) => {
    setSelectedLot(lot);   // 어떤 주차장을 눌렀는지 저장
    setIsModalOpen(true);  // 모달 창 열기
  };

  // [4] 모달에서 '예약 확정' 눌렀을 때 실행되는 함수
  const handleConfirmReservation = (reservationData) => {
    console.log('예약 완료 데이터:', reservationData);
    alert(`${reservationData.parkingLotName}\n예약이 완료되었습니다!`);
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="parking-container">
      {/* 상단 배너 */}
      <div className="parking-banner">
        <h2>주차장 예약 최대 70% 할인</h2>
        <p>CarScope 회원만의 특별한 혜택을 누리세요.</p>
      </div>

      {/* 검색창 */}
      <div className="search-section">
        <input 
          type="text" 
          placeholder="차량명, 지역명 등으로 검색" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>검색</button>
      </div>

      {/* 주차장 리스트 */}
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
              
              {/* 예약 버튼 수정됨: onClick에 함수 직접 연결 */}
              <button 
                className="btn-reserve" 
                disabled={lot.availableSpots === 0}
                onClick={() => handleReserve(lot)}
              >
                {lot.availableSpots > 0 ? '예약하기' : '예약불가'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* [5] 모달 컴포넌트 렌더링 (맨 아래에 추가) */}
      {selectedLot && (
        <ReservationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          parkingLot={selectedLot}
          onConfirm={handleConfirmReservation}
        />
      )}
    </div>
  );
};

export default ParkingPage;