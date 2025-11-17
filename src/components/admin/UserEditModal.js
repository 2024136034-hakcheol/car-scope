import React, { useState, useEffect } from 'react';
import '../../styles/AdminPage.css';

const UserEditModal = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setFormData(prev => ({
            ...prev,
            isAdmin: role === 'admin',
            isJournalist: role === 'journalist'
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const getUserRole = (user) => {
        if (user.isAdmin) return 'admin';
        if (user.isJournalist) return 'journalist';
        return 'general';
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>사용자 정보 수정 ({user.email})</h2>
                <form onSubmit={handleSubmit} className="modal-form">
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
                        <label htmlFor="role">권한</label>
                        <select
                            id="role"
                            value={getUserRole(formData)}
                            onChange={handleRoleChange}
                            className="role-select"
                        >
                            <option value="general">일반</option>
                            <option value="journalist">기자</option>
                            <option value="admin">관리자</option>
                        </select>
                    </div>
                    <div className="modal-buttons">
                        <button type="button" className="cancel-button" onClick={onClose}>취소</button>
                        <button type="submit" className="save-button">저장</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEditModal;