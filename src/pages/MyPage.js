import React, { useState, useEffect, useContext } from 'react';
import '../styles/MyPage.css';
import { AuthContext } from '../AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const MyPage = () => {
  const { currentUser, dbUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    nickname: '',
    phone: '',
  });

  const [reservationList, setReservationList] = useState([]);

  useEffect(() => {
    if (dbUser) {
      setEditData({
        nickname: dbUser.nickname || '',
        phone: dbUser.phone || '',
      });
    }
  }, [dbUser]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (currentUser) {
        try {
          const q = query(
            collection(db, "reservations"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const list = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setReservationList(list);
        } catch (error) {
          console.error("예약 내역 불러오기 실패:", error);
        }
      }
    };
    fetchReservations();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        nickname: editData.nickname,
        phone: editData.phone
      });

      alert("정보가 성공적으로 수정되었습니다!");
      setIsEditing(false);
      window.location.reload();

    } catch (error) {
      console.error("업데이트 실패:", error);
      alert("정보 수정 중 오류가 발생했습니다.");
    }
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
                  <div className="input-group">
                    <label>닉네임</label>
                    <input 
                      type="text" 
                      name="nickname" 
                      value={editData.nickname} 
                      onChange={handleChange} 
                      className="edit-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>전화번호</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={editData.phone} 
                      onChange={handleChange} 
                      className="edit-input"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="name-row">
                    <h2>{dbUser.nickname}님</h2>
                    <span className="badge-level">{dbUser.isAdmin ? 'ADMIN' : 'GOLD'}</span>
                  </div>
                  <p className="user-email">{dbUser.email}</p>
                  <p className="user-phone">{dbUser.phone}</p>
                </>
              )}
            </div>
          </div>

          <div className="btn-group">
            {isEditing ? (
              <>
                <button className="btn-save" onClick={handleSave}>저장</button>
                <button className="btn-cancel-edit" onClick={() => setIsEditing(false)}>취소</button>
              </>
            ) : (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>내 정보 수정</button>
            )}
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-box">
            <p>보유 마일리지</p>
            <h3>3,500 P</h3>
          </div>
          <div className="stat-box">
            <p>할인 쿠폰</p>
            <h3>2 장</h3>
          </div>
          <div className="stat-box">
            <p>등록된 차량</p>
            <h3>12가 3456</h3>
            <span className="sub-text">Hyundai Ioniq 5</span>
          </div>
        </div>

        <div className="content-row">
           <div className="section-reservations">
             <div className="section-header">
               <h3>최근 예약 내역</h3>
               <button className="btn-text-more">더보기 &gt;</button>
             </div>
             
             {reservationList.length > 0 ? (
                <div className="reservation-list">
                  {reservationList.map((res) => (
                    <div key={res.id} className="res-card">
                      <div className="res-top">
                        <span className={`status-tag ${res.status === '이용예정' ? 'active' : 'done'}`}>
                          {res.status}
                        </span>
                        <span className="res-date">{res.date}</span>
                      </div>
                      <h4>{res.parkingName}</h4>
                      <p className="res-time">{res.startTime}부터 ({res.hours}시간)</p>
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
               <div className="no-data" style={{padding: '20px', color:'#777'}}>
                 아직 예약 내역이 없습니다.
               </div>
             )}
           </div>

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