import React, { useState, useEffect } from 'react';
import '../../styles/AdminPage.css';

const UserEditModal = ({ user, onSave, onClose, onPasswordReset, onDisableUser, onEnableUser, onDeleteUser }) => {
    const [formData, setFormData] = useState(user);
    const [mileageToAdd, setMileageToAdd] = useState('');

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleAddMileage = () => {
        const amount = parseInt(mileageToAdd, 10);
        if (isNaN(amount) || amount === 0) {
            alert("유효한 마일리지 금액을 입력해주세요.");
            return;
        }

        const currentMileage = formData.mileage || 0;
        const newMileage = currentMileage + amount;

        setFormData(prev => ({ ...prev, mileage: newMileage }));
        setMileageToAdd('');
        alert(`${amount > 0 ? '지급' : '차감'} 예정입니다. '저장' 버튼을 눌러 확정해주세요.`);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>사용자 정보 수정 ({user.email})</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="input-group">
                        <label htmlFor="id">아이디</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            disabled
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="mileage">보유 마일리지</label>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <input
                                type="number"
                                id="mileage"
                                name="mileage"
                                value={formData.mileage || 0}
                                onChange={handleChange}
                                style={{fontWeight: 'bold', color: '#1E90FF'}}
                            />
                        </div>
                    </div>

                    <div style={{backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #cce5ff'}}>
                        <label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', color:'#004085', fontWeight:'bold'}}>마일리지 지급/차감</label>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <input 
                                type="number" 
                                placeholder="금액 입력 (차감은 -)" 
                                value={mileageToAdd} 
                                onChange={(e) => setMileageToAdd(e.target.value)}
                                style={{flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #b8daff'}}
                            />
                            <button 
                                type="button" 
                                onClick={handleAddMileage}
                                style={{padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                            >
                                적용
                            </button>
                        </div>
                        <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px', marginBottom: 0}}>* 적용 후 하단의 [저장] 버튼을 눌러야 반영됩니다.</p>
                    </div>

                    <div className="input-group">
                        <label htmlFor="nickname">닉네임</label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">이름</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone">전화번호</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="modal-buttons">
                        <button type="button" className="cancel-button" onClick={onClose}>취소</button>
                        <button type="submit" className="save-button">저장</button>
                    </div>

                    <div className="modal-danger-zone">
                        <h3>계정 관리</h3>
                        <div className="danger-buttons">
                            <button 
                                type="button" 
                                className="reset-password-btn" 
                                onClick={() => onPasswordReset(user.email)}
                            >
                                비밀번호 재설정
                            </button>

                            {user.disabled ? (
                                <button 
                                    type="button" 
                                    className="enable-button" 
                                    onClick={() => onEnableUser(user.uid, user.email)}
                                >
                                    계정 활성화
                                </button>
                            ) : (
                                <button 
                                    type="button" 
                                    className="disable-button" 
                                    onClick={() => onDisableUser(user.uid, user.email)}
                                >
                                    계정 사용 중지
                                </button>
                            )}
                            
                            <button 
                                type="button" 
                                className="delete-button" 
                                onClick={() => onDeleteUser(user.uid, user.email)}
                            >
                                계정 완전 삭제
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEditModal;