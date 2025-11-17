import React, { useState, useEffect } from 'react';
import '../../styles/AdminPage.css';

const UserEditModal = ({ user, onSave, onClose, onPasswordReset }) => {
    const [formData, setFormData] = useState(user);

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
                        />
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
                    <div className="input-group">
                        <label htmlFor="birthdate">생년월일</label>
                        <input
                            type="text"
                            id="birthdate"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="gender">성별</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="role-select"
                        >
                            <option value="none">선택 안함</option>
                            <option value="male">남성</option>
                            <option value="female">여성</option>
                        </select>
                    </div>
                    <div className="modal-buttons">
                        <button 
                            type="button" 
                            className="reset-button-modal" 
                            onClick={() => onPasswordReset(user.email)}
                        >
                            비밀번호 재설정
                        </button>
                        <div>
                            <button type="button" className="cancel-button" onClick={onClose}>취소</button>
                            <button type="submit" className="save-button">저장</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEditModal;