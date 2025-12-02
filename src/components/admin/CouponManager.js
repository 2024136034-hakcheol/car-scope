import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import '../../styles/AdminPage.css';

const CouponManager = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [newCoupon, setNewCoupon] = useState({
        name: '',
        discount: '',
        description: '',
        expiryDate: '',
        code: ''
    });

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "coupons"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            setCoupons(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const generateRandomCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setNewCoupon(prev => ({ ...prev, code: result }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCoupon(prev => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newCoupon.name || !newCoupon.discount || !newCoupon.expiryDate || !newCoupon.code) {
            alert("모든 필수 정보를 입력해주세요.");
            return;
        }

        try {
            await addDoc(collection(db, "coupons"), {
                ...newCoupon,
                discount: Number(newCoupon.discount),
                createdAt: new Date()
            });
            alert("쿠폰이 생성되었습니다.");
            setNewCoupon({ name: '', discount: '', description: '', expiryDate: '', code: '' });
            fetchCoupons();
        } catch (error) {
            alert("생성 실패: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("이 쿠폰을 삭제하시겠습니까?")) return;
        try {
            await deleteDoc(doc(db, "coupons", id));
            setCoupons(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            alert("삭제 실패: " + error.message);
        }
    };

    return (
        <div className="admin-widget widget-full">
            <h2 className="widget-title">🎫 할인 쿠폰 관리</h2>
            
            <div style={{marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px'}}>
                <h3 style={{marginTop: 0, marginBottom: '15px', fontSize: '1.1rem'}}>새 쿠폰 생성</h3>
                <form onSubmit={handleCreate} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', alignItems: 'end'}}>
                    <div className="input-group" style={{marginBottom: 0}}>
                        <label style={{whiteSpace: 'nowrap'}}>쿠폰명</label>
                        <input type="text" name="name" value={newCoupon.name} onChange={handleChange} placeholder="예: 신규가입 환영 쿠폰" />
                    </div>
                    <div className="input-group" style={{marginBottom: 0}}>
                        <label style={{whiteSpace: 'nowrap'}}>할인 금액 (원)</label>
                        <input type="number" name="discount" value={newCoupon.discount} onChange={handleChange} placeholder="예: 3000" />
                    </div>
                    <div className="input-group" style={{gridColumn: '1 / -1', marginBottom: 0}}>
                        <label>쿠폰 설명</label>
                        <input type="text" name="description" value={newCoupon.description} onChange={handleChange} placeholder="예: 5만원 이상 결제 시 사용 가능" />
                    </div>
                    <div className="input-group" style={{marginBottom: 0}}>
                        <label>유효기간</label>
                        <input type="date" name="expiryDate" value={newCoupon.expiryDate} onChange={handleChange} />
                    </div>
                    <div className="input-group" style={{marginBottom: 0}}>
                        <label>쿠폰 코드</label>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <input type="text" name="code" value={newCoupon.code} onChange={handleChange} placeholder="자동 생성 또는 직접 입력" style={{flex: 1}} />
                            <button type="button" onClick={generateRandomCode} style={{padding: '0 15px', backgroundColor: '#6c5ce7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', whiteSpace:'nowrap', height: '42px'}}>코드 생성</button>
                        </div>
                    </div>
                    <button type="submit" style={{gridColumn: '1 / -1', padding: '12px', backgroundColor: '#1E90FF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px'}}>쿠폰 발급하기</button>
                </form>
            </div>

            <div className="user-list-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>쿠폰명</th>
                            <th>코드</th>
                            <th>할인액</th>
                            <th>설명</th>
                            <th>유효기간</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{textAlign:'center', padding:'20px'}}>로딩 중...</td></tr>
                        ) : coupons.length === 0 ? (
                            <tr><td colSpan="6" style={{textAlign:'center', padding:'20px'}}>생성된 쿠폰이 없습니다.</td></tr>
                        ) : (
                            coupons.map(coupon => (
                                <tr key={coupon.id}>
                                    <td>{coupon.name}</td>
                                    <td><span style={{background:'#eee', padding:'2px 6px', borderRadius:'4px', fontWeight:'bold'}}>{coupon.code}</span></td>
                                    <td style={{color:'#e74c3c', fontWeight:'bold'}}>{coupon.discount.toLocaleString()}원</td>
                                    <td>{coupon.description}</td>
                                    <td>{coupon.expiryDate}</td>
                                    <td>
                                        <button className="delete-button" onClick={() => handleDelete(coupon.id)}>삭제</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CouponManager;