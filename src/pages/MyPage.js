import React, { useState, useEffect, useContext } from 'react';
import '../styles/MyPage.css';
import { AuthContext } from '../AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import InquiryDetailModal from '../components/InquiryDetailModal';
import CouponListModal from '../components/CouponListModal';

const MyPage = () => {
  const { currentUser, dbUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isRegisteringCar, setIsRegisteringCar] = useState(false);
  const [activeTab, setActiveTab] = useState('reservation'); 

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const [reservationList, setReservationList] = useState([]);
  const [inquiryList, setInquiryList] = useState([]);

  const [editData, setEditData] = useState({ nickname: '', phone: '' });
  const [carInput, setCarInput] = useState({ carNumber: '', carModel: '' });

  useEffect(() => {
    if (dbUser) {
      setEditData({ nickname: dbUser.nickname || '', phone: dbUser.phone || '' });
      setCarInput({ carNumber: dbUser.carNumber || '', carModel: dbUser.carModel || '' });
    }
  }, [dbUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const resQuery = query(
            collection(db, "reservations"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
          );
          const resSnap = await getDocs(resQuery);
          setReservationList(resSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

          const inqQuery = query(
            collection(db, "inquiries"),
            where("userId", "==", currentUser.uid)
          );
          const inqSnap = await getDocs(inqQuery);
          
          const sortedInq = inqSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                                      .sort((a, b) => {
                                          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
                                          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
                                          return dateB - dateA;
                                      });
                                      
          setInquiryList(sortedInq);

        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [currentUser]);

  const handleUserChange = (e) => { const { name, value } = e.target; setEditData(prev => ({ ...prev, [name]: value })); };
  const handleCarChange = (e) => { const { name, value } = e.target; setCarInput(prev => ({ ...prev, [name]: value })); };
  
  const handleSaveUser = async () => {
    if (!currentUser) return;
    try {
      await updateDoc(doc(db, "users", currentUser.uid), { nickname: editData.nickname, phone: editData.phone });
      alert("회원 정보가 수정되었습니다."); setIsEditing(false); window.location.reload();
    } catch (error) { alert("오류: " + error.message); }
  };

  const handleSaveCar = async () => {
    if (!currentUser) return;
    try {
      await updateDoc(doc(db, "users", currentUser.uid), { carNumber: carInput.carNumber, carModel: carInput.carModel });
      alert("차량 정보가 등록되었습니다."); setIsRegisteringCar(false); window.location.reload();
    } catch (error) { alert("오류: " + error.message); }
  };

  const handleOpenInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsInquiryModalOpen(true);
  };

  if (!dbUser) return <div className="loading">로딩 중...</div>;

  return (
    <div className="mypage-wrapper">
      <div className="mypage-container">
        <h1 className="page-title">마이페이지</h1>

        <div className="profile-card">
          <div className="profile-left">
            <div className="avatar">{dbUser.nickname ? dbUser.nickname[0] : '유'}</div>
            <div className="user-text">
              {isEditing ? (
                 <div className="edit-mode-inputs">
                    <div className="input-group"><label>닉네임</label><input type="text" name="nickname" value={editData.nickname} onChange={handleUserChange} className="edit-input"/></div>
                    <div className="input-group"><label>전화번호</label><input type="text" name="phone" value={editData.phone} onChange={handleUserChange} className="edit-input"/></div>
                 </div>
              ) : (
                <>
                  <div className="name-row">
                    <h2>{dbUser.nickname}님</h2>
                    <span className="badge-level">{dbUser.membershipLevel === 'premium' ? 'PREMIUM' : 'MEMBER'}</span>
                  </div>
                  <p className="user-email">{dbUser.email}</p>
                  <p className="user-phone">{dbUser.phone || '전화번호 미등록'}</p>
                </>
              )}
            </div>
          </div>
          <div className="btn-group">
            {isEditing ? (
              <><button className="btn-save" onClick={handleSaveUser}>저장</button><button className="btn-cancel-edit" onClick={() => setIsEditing(false)}>취소</button></>
            ) : (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>내 정보 수정</button>
            )}
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-box"><p>보유 마일리지</p><h3>{dbUser.mileage ? dbUser.mileage.toLocaleString() : 0} P</h3></div>
          <div className="stat-box clickable" onClick={() => setIsCouponModalOpen(true)}>
            <p>할인 쿠폰</p><h3>{dbUser.coupons ? dbUser.coupons : 0} 장</h3>
          </div>
          <div className="stat-box car-box">
            <p>등록된 차량</p>
            {isRegisteringCar ? (
              <div className="car-register-form">
                <input type="text" name="carNumber" placeholder="예: 12가 3456" value={carInput.carNumber} onChange={handleCarChange} className="car-input"/>
                <input type="text" name="carModel" placeholder="예: 아반떼 (선택)" value={carInput.carModel} onChange={handleCarChange} className="car-input"/>
                <div className="car-btn-row"><button className="btn-car-save" onClick={handleSaveCar}>완료</button><button className="btn-car-cancel" onClick={() => setIsRegisteringCar(false)}>취소</button></div>
              </div>
            ) : (
              <>{dbUser.carNumber ? (<><h3>{dbUser.carNumber}</h3><span className="sub-text">{dbUser.carModel}</span><button className="btn-text-small" onClick={() => setIsRegisteringCar(true)}>변경</button></>) : (<><h3 className="no-car">등록된 차량 없음</h3><button className="btn-register-car" onClick={() => setIsRegisteringCar(true)}>+ 차량 등록하기</button></>)}</>
            )}
          </div>
        </div>

        <div className="content-row">
           <div className="section-left-content">
             <div className="content-tabs">
               <button 
                 className={`tab-btn ${activeTab === 'reservation' ? 'active' : ''}`}
                 onClick={() => setActiveTab('reservation')}
               >
                 최근 예약 내역
               </button>
               <button 
                 className={`tab-btn ${activeTab === 'inquiry' ? 'active' : ''}`}
                 onClick={() => setActiveTab('inquiry')}
               >
                 1:1 문의 내역
               </button>
             </div>
             
             {activeTab === 'reservation' && (
               <>
                 {reservationList.length > 0 ? (
                    <div className="reservation-list">
                      {reservationList.map((res) => (
                        <div key={res.id} className="res-card">
                          <div className="res-top">
                            <span className={`status-tag ${res.status === '이용예정' ? 'active' : 'done'}`}>{res.status}</span>
                            <span className="res-date">{res.date}</span>
                          </div>
                          <h4>{res.parkingName}</h4>
                          <p className="res-time">{res.startTime}부터 ({res.hours}시간)</p>
                          <div className="res-bottom">
                            <span className="res-price">{res.price.toLocaleString()}원</span>
                            {res.status === '이용예정' && <button className="btn-cancel">예약취소</button>}
                          </div>
                        </div>
                      ))}
                    </div>
                 ) : (
                   <div className="no-data-box"><p>아직 예약 내역이 없습니다.</p></div>
                 )}
               </>
             )}

             {activeTab === 'inquiry' && (
                <>
                  {inquiryList.length > 0 ? (
                    <div className="inquiry-list">
                      {inquiryList.map((inq) => (
                        <div key={inq.id} className="inquiry-card" onClick={() => handleOpenInquiry(inq)}>
                          <div className="inq-top">
                            <span className={`inq-status ${inq.status === '답변완료' || inq.answer ? 'answered' : 'waiting'}`}>
                                {inq.status || (inq.answer ? '답변완료' : '답변대기')}
                            </span>
                            <span className="inq-date">
                                {inq.createdAt?.toDate ? inq.createdAt.toDate().toLocaleDateString() : '날짜 없음'}
                            </span>
                          </div>
                          <h4 className="inq-title">{inq.title}</h4>
                          <p className="inq-category">{inq.category === 'general' ? '일반 문의' : 
                             inq.category === 'account' ? '계정/로그인' :
                             inq.category === 'service' ? '서비스 이용' :
                             inq.category === 'error' ? '오류 신고' : '제안/기타'}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-data-box"><p>문의하신 내역이 없습니다.</p></div>
                  )}
                </>
             )}
           </div>

           <div className="section-quick">
            <h3>자주 찾는 메뉴</h3>
            <ul className="quick-list">
              <li>📍 찜한 주차장</li>
              <li>💬 나의 리뷰 관리</li>
              <li onClick={() => setActiveTab('inquiry')}>📞 1:1 문의 내역</li> 
            </ul>
          </div>
        </div>
      </div>

      <InquiryDetailModal 
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        inquiry={selectedInquiry}
      />

      <CouponListModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        userId={currentUser.uid}
      />
    </div>
  );
};

export default MyPage;