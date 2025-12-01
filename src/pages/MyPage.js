import React, { useState, useEffect, useContext } from 'react';
import '../styles/MyPage.css';
import { AuthContext } from '../AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import InquiryDetailModal from '../components/InquiryDetailModal'; // 모달 import

const MyPage = () => {
  const { currentUser, dbUser } = useContext(AuthContext);

  // --- 상태 관리 ---
  const [isEditing, setIsEditing] = useState(false);
  const [isRegisteringCar, setIsRegisteringCar] = useState(false);
  const [activeTab, setActiveTab] = useState('reservation'); // 'reservation' or 'inquiry' 탭 상태

  // 모달 상태
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // 데이터 상태
  const [reservationList, setReservationList] = useState([]);
  const [inquiryList, setInquiryList] = useState([]);

  // 입력 폼 상태 (기존 코드 유지)
  const [editData, setEditData] = useState({ nickname: '', phone: '' });
  const [carInput, setCarInput] = useState({ carNumber: '', carModel: '' });

  // 초기 데이터 세팅
  useEffect(() => {
    if (dbUser) {
      setEditData({ nickname: dbUser.nickname || '', phone: dbUser.phone || '' });
      setCarInput({ carNumber: dbUser.carNumber || '', carModel: dbUser.carModel || '' });
    }
  }, [dbUser]);

  // --- 데이터 불러오기 (예약 & 문의) ---
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          // 1. 예약 내역 가져오기
          const resQuery = query(
            collection(db, "reservations"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
          );
          const resSnap = await getDocs(resQuery);
          setReservationList(resSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

          // 2. 문의 내역 가져오기
          const inqQuery = query(
            collection(db, "inquiries"),
            where("userId", "==", currentUser.uid), // ContactPage에서 저장한 userId로 필터링
            orderBy("createdAt", "desc")
          );
          const inqSnap = await getDocs(inqQuery);
          setInquiryList(inqSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        } catch (error) {
          console.error("데이터 불러오기 실패:", error);
        }
      }
    };
    fetchData();
  }, [currentUser]);

  // --- 기존 핸들러들 (User, Car 저장 등) 생략 없이 그대로 사용 ---
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

  // 문의 상세 보기 핸들러
  const handleOpenInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsInquiryModalOpen(true);
  };

  if (!dbUser) return <div className="loading">로딩 중...</div>;

  return (
    <div className="mypage-wrapper">
      <div className="mypage-container">
        <h1 className="page-title">마이페이지</h1>

        {/* 프로필 카드 (기존 코드 동일) */}
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
                    <span className="badge-level">{dbUser.isAdmin ? 'ADMIN' : 'MEMBER'}</span>
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

        {/* 자산 현황 (기존 코드 동일) */}
        <div className="stats-container">
          <div className="stat-box"><p>보유 마일리지</p><h3>{dbUser.mileage ? dbUser.mileage.toLocaleString() : 0} P</h3></div>
          <div className="stat-box"><p>할인 쿠폰</p><h3>{dbUser.coupons ? dbUser.coupons : 0} 장</h3></div>
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
           {/* [좌측 섹션] 탭에 따라 내용 변경 */}
           <div className="section-left-content">
             
             {/* 탭 헤더 */}
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
             
             {/* 탭 내용 1: 예약 내역 */}
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

             {/* 탭 내용 2: 문의 내역 (새로 추가됨) */}
             {activeTab === 'inquiry' && (
                <>
                  {inquiryList.length > 0 ? (
                    <div className="inquiry-list">
                      {inquiryList.map((inq) => (
                        <div key={inq.id} className="inquiry-card" onClick={() => handleOpenInquiry(inq)}>
                          <div className="inq-top">
                            <span className={`inq-status ${inq.answer ? 'answered' : 'waiting'}`}>
                                {inq.answer ? '답변완료' : '답변대기'}
                            </span>
                            <span className="inq-date">
                                {inq.createdAt?.toDate ? inq.createdAt.toDate().toLocaleDateString() : '날짜 없음'}
                            </span>
                          </div>
                          <h4 className="inq-title">{inq.title}</h4>
                          <p className="inq-category">{inq.category === 'general' ? '일반 문의' : inq.category}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-data-box"><p>문의하신 내역이 없습니다.</p></div>
                  )}
                </>
             )}
           </div>

           {/* [우측 섹션] 퀵메뉴 */}
           <div className="section-quick">
            <h3>자주 찾는 메뉴</h3>
            <ul className="quick-list">
              <li>📍 찜한 주차장</li>
              <li>💬 나의 리뷰 관리</li>
              <li onClick={() => setActiveTab('inquiry')}>📞 1:1 문의 내역</li> {/* 클릭 시 탭 이동 */}
            </ul>
          </div>
        </div>
      </div>

      {/* 문의 상세 모달 */}
      <InquiryDetailModal 
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        inquiry={selectedInquiry}
      />
    </div>
  );
};

export default MyPage;