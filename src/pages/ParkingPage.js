import React, { useState, useEffect, useContext } from 'react';
import '../styles/ParkingPage.css';
import ReservationModal from '../components/ReservationModal';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';
import imageCompression from 'browser-image-compression';

const ParkingPage = () => {
  const { currentUser, dbUser } = useContext(AuthContext);
  const [parkingLots, setParkingLots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newLot, setNewLot] = useState({
    name: '',
    address: '',
    price: '',
    totalSpots: '',
    availableSpots: '',
    type: '실내',
    imageUrl: ''
  });

  useEffect(() => {
    fetchParkingLots();
  }, []);

  const fetchParkingLots = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "parkingLots"));
      const lots = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setParkingLots(lots);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };
      const compressedFile = await imageCompression(file, options);
      
      const reader = new FileReader();
      reader.onload = () => {
        setNewLot(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      alert("이미지 처리 중 오류가 발생했습니다.");
    }
  };

  const handleAddParking = async () => {
    if (!newLot.name || !newLot.address || !newLot.price || !newLot.imageUrl) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    try {
      await addDoc(collection(db, "parkingLots"), {
        ...newLot,
        price: Number(newLot.price),
        totalSpots: Number(newLot.totalSpots),
        availableSpots: Number(newLot.availableSpots),
        createdAt: new Date()
      });
      alert("주차장이 등록되었습니다.");
      setNewLot({
        name: '', address: '', price: '', totalSpots: '', availableSpots: '', type: '실내', imageUrl: ''
      });
      fetchParkingLots();
    } catch (error) {
      console.error(error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteParking = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteDoc(doc(db, "parkingLots", id));
      alert("삭제되었습니다.");
      fetchParkingLots();
    } catch (error) {
      console.error(error);
      alert("삭제 실패");
    }
  };

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
        parkingId: selectedLot.id,
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
      console.error(error);
      alert("예약 중 오류가 발생했습니다.");
    }
  };

  const filteredList = parkingLots.filter((lot) =>
    lot.name.includes(searchTerm) || lot.address.includes(searchTerm)
  );

  if (loading) return <div className="loading">로딩 중...</div>;

  return (
    <div className="parking-container page-content">
      <div className="parking-banner">
        <h2>주차장 예약 최대 70% 할인</h2>
        <p>CarScope 회원만의 특별한 혜택을 누리세요.</p>
      </div>

      {dbUser?.isAdmin && (
        <div className="admin-parking-form">
          <h3>➕ 신규 주차장 등록 (관리자)</h3>
          <div className="form-grid">
            <input 
              type="text" placeholder="주차장 이름" 
              value={newLot.name} onChange={(e) => setNewLot({...newLot, name: e.target.value})} 
            />
            <input 
              type="text" placeholder="주소" 
              value={newLot.address} onChange={(e) => setNewLot({...newLot, address: e.target.value})} 
            />
            <input 
              type="number" placeholder="시간당 가격 (원)" 
              value={newLot.price} onChange={(e) => setNewLot({...newLot, price: e.target.value})} 
            />
            <div className="spots-input">
              <input 
                type="number" placeholder="총 주차면" 
                value={newLot.totalSpots} onChange={(e) => setNewLot({...newLot, totalSpots: e.target.value})} 
              />
              <input 
                type="number" placeholder="현재 잔여면" 
                value={newLot.availableSpots} onChange={(e) => setNewLot({...newLot, availableSpots: e.target.value})} 
              />
            </div>
            <select value={newLot.type} onChange={(e) => setNewLot({...newLot, type: e.target.value})}>
              <option value="실내">실내</option>
              <option value="실외">실외</option>
              <option value="기계식">기계식</option>
              <option value="지하">지하</option>
            </select>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <button className="btn-add-parking" onClick={handleAddParking}>등록하기</button>
        </div>
      )}

      <div className="search-section">
        <input 
          type="text" 
          placeholder="지역명 또는 주차장명 검색" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>검색</button>
      </div>

      <div className="parking-list">
        {filteredList.length === 0 ? (
          <p className="no-data">등록된 주차장이 없습니다.</p>
        ) : (
          filteredList.map((lot) => (
            <div key={lot.id} className="parking-card">
              <div className="card-image">
                <img src={lot.imageUrl} alt={lot.name} />
                <span className="badge">{lot.type}</span>
                {dbUser?.isAdmin && (
                  <button className="btn-delete-lot" onClick={() => handleDeleteParking(lot.id)}>삭제</button>
                )}
              </div>
              <div className="card-content">
                <h3>{lot.name}</h3>
                <p className="address">{lot.address}</p>
                <div className="info-row">
                  <span className="price">{Number(lot.price).toLocaleString()}원 / 시간</span>
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
          ))
        )}
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