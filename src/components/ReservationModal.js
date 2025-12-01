import React, { useState, useEffect } from 'react';
import '../styles/ReservationModal.css'; // 스타일 파일도 만들 예정

const ReservationModal = ({ isOpen, onClose, parkingLot, onConfirm }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [hours, setHours] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // 모달이 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
      setStartTime('12:00');
      setHours(2);
    }
  }, [isOpen]);

  // 가격 계산 로직
  useEffect(() => {
    if (parkingLot) {
      setTotalPrice(parkingLot.price * hours);
    }
  }, [hours, parkingLot]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    // 예약 데이터 정리
    const reservationData = {
      parkingLotId: parkingLot.id,
      parkingLotName: parkingLot.name,
      date,
      startTime,
      hours,
      totalPrice,
      timestamp: new Date(),
    };
    onConfirm(reservationData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🚗 주차장 예약</h2>
        <div className="modal-info">
          <h3>{parkingLot.name}</h3>
          <p>{parkingLot.address}</p>
          <p className="price-tag">시간당 {parkingLot.price.toLocaleString()}원</p>
        </div>

        <div className="form-group">
          <label>날짜 선택</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>시작 시간</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>

        <div className="form-group">
          <label>이용 시간 ({hours}시간)</label>
          <input 
            type="range" 
            min="1" 
            max="24" 
            value={hours} 
            onChange={(e) => setHours(parseInt(e.target.value))} 
          />
        </div>

        <div className="total-section">
          <span>총 결제 금액</span>
          <span className="total-price">{totalPrice.toLocaleString()}원</span>
        </div>

        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>취소</button>
          <button className="btn-confirm" onClick={handleSubmit}>예약 확정</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;