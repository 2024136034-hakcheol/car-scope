import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, increment } from 'firebase/firestore';
import '../styles/MyPage.css';

const CouponListModal = ({ isOpen, onClose, userId, onUpdate }) => {
    const [couponCode, setCouponCode] = useState('');
    const [myCoupons, setMyCoupons] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && userId) {
            fetchMyCoupons();
        }
    }, [isOpen, userId]);

    const fetchMyCoupons = async () => {
        try {
            const q = query(collection(db, "users", userId, "coupons"));
            const snapshot = await getDocs(q);
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMyCoupons(list);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegisterCoupon = async () => {
        if (!couponCode) {
            alert("쿠폰 코드를 입력해주세요.");
            return;
        }

        setLoading(true);
        try {
            const couponQuery = query(collection(db, "coupons"), where("code", "==", couponCode));
            const couponSnapshot = await getDocs(couponQuery);

            if (couponSnapshot.empty) {
                alert("유효하지 않은 쿠폰 코드입니다.");
                setLoading(false);
                return;
            }

            const couponDoc = couponSnapshot.docs[0];
            const couponData = couponDoc.data();

            if (!couponData.isUnlimited && couponData.currentUses >= couponData.maxUses) {
                alert("선착순 마감된 쿠폰입니다.");
                setLoading(false);
                return;
            }
            
            const myCouponQuery = query(collection(db, "users", userId, "coupons"), where("code", "==", couponCode));
            const myCouponSnapshot = await getDocs(myCouponQuery);

            if (!myCouponSnapshot.empty) {
                alert("이미 등록된 쿠폰입니다.");
                setLoading(false);
                return;
            }

            await addDoc(collection(db, "users", userId, "coupons"), {
                ...couponData,
                registeredAt: new Date(),
                isUsed: false
            });

            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
                coupons: increment(1)
            });

            const couponRef = doc(db, "coupons", couponDoc.id);
            await updateDoc(couponRef, {
                currentUses: increment(1)
            });

            alert("쿠폰이 정상적으로 등록되었습니다.");
            setCouponCode('');
            fetchMyCoupons();
            
            if (onUpdate) onUpdate(); 

        } catch (error) {
            console.error(error);
            alert("쿠폰 등록 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333', paddingBottom: '15px', marginBottom: '20px'}}>
                    <h2 style={{margin: 0, fontSize: '1.5rem'}}>내 할인 쿠폰</h2>
                    <button onClick={onClose} style={{background:'none', border:'none', fontSize:'1.5rem', cursor:'pointer'}}>&times;</button>
                </div>

                <div style={{display: 'flex', gap: '10px', marginBottom: '25px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px'}}>
                    <input 
                        type="text" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="쿠폰 번호 입력"
                        style={{flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem'}}
                    />
                    <button 
                        onClick={handleRegisterCoupon}
                        disabled={loading}
                        style={{padding: '0 20px', backgroundColor: '#1E90FF', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'}}
                    >
                        {loading ? "확인" : "등록"}
                    </button>
                </div>

                <div className="coupon-list-container" style={{maxHeight: '400px', overflowY: 'auto'}}>
                    <h3 style={{fontSize: '1.1rem', marginBottom: '15px'}}>보유 쿠폰 ({myCoupons.length})</h3>
                    {myCoupons.length === 0 ? (
                        <div style={{textAlign: 'center', padding: '40px 0', color: '#999', border: '1px dashed #eee', borderRadius: '8px'}}>
                            보유한 쿠폰이 없습니다.
                        </div>
                    ) : (
                        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                            {myCoupons.map((coupon) => (
                                <div key={coupon.id} style={{border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                                    <div>
                                        <h4 style={{margin: '0 0 5px 0', fontSize: '1.1rem', color: '#333'}}>{coupon.name}</h4>
                                        <p style={{margin: '0', fontSize: '0.9rem', color: '#666'}}>{coupon.description}</p>
                                        <span style={{fontSize: '0.8rem', color: '#999', marginTop: '8px', display: 'inline-block'}}>~ {coupon.expiryDate} 까지</span>
                                    </div>
                                    <div style={{textAlign: 'right'}}>
                                        <span style={{display: 'block', fontSize: '1.2rem', fontWeight: 'bold', color: '#1E90FF'}}>{Number(coupon.discount).toLocaleString()}원</span>
                                        <span style={{fontSize: '0.8rem', color: '#888'}}>할인</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CouponListModal;