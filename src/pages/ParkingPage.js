import React, { useState, useContext } from 'react';
import '../styles/ParkingPage.css';
import ReservationModal from '../components/ReservationModal';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const filteredList = DUMMY_PARKING_LOTS.filter((lot) =>
    lot.name.includes(searchTerm) || lot.address.includes(searchTerm)
  );

  const handleReserve = (lot) => {
    if (!currentUser) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    setSelectedLot(lot);
    setIsModalOpen(true);
  };

  const handleConfirmReservation = async (reservationData) => {
    try {
      await addDoc(collection(db, "reservations"), {
        userId: currentUser.uid,
        parkingName: reservationData.parkingLotName,
        date: reservationData.date,
        startTime: reservationData.startTime,
        hours: reservationData.hours,
        price: reservationData.totalPrice,
        status: '이용예정',
        createdAt: new Date()
      });

      alert(`${reservationData.parkingLotName}\n예약이 완료되었습니다!`);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding reservation: ", error);
      alert("예약 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="parking-container">
      <div className="parking-banner">
        <h2>주차장 예약 최대 70% 할인</h2>
        <p>CarScope 회원만의 특별한 혜택을 누리세요.</p>
      </div>

      <div className="search-section">
        <input 
          type="text" 
          placeholder="차량명, 지역명 등으로 검색" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>검색</button>
      </div>

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
                onClick={() => handleReserve(lot)}
              >
                {lot.availableSpots > 0 ? '예약하기' : '예약불가'}
              </button>
            </div>
          </div>
        ))}
      </div>

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