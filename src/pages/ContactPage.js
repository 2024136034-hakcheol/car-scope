import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from '../AuthContext'; 
import '../styles/ContactPage.css';

const ContactPage = () => {
    const navigate = useNavigate();
    const { currentUser, dbUser, loading } = useContext(AuthContext); 
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        category: 'general',
        title: '',
        content: ''
    });

    useEffect(() => {
        if (currentUser && dbUser) {
            setFormData(prev => ({
                ...prev,
                name: dbUser.name || '',
                contact: dbUser.phone || '' 
            }));
        } else if (!currentUser) {
            setFormData(prev => ({
                ...prev,
                name: '',
                contact: ''
            }));
        }
    }, [currentUser, dbUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        if (!formData.name || !formData.contact || !formData.title || !formData.content) {
            alert("모든 필수 정보를 입력해주세요.");
            return;
        }

        setIsLoading(true);
        try {
            await addDoc(collection(db, "inquiries"), {
                ...formData,
                userId: currentUser ? currentUser.uid : 'guest', 
                userEmail: currentUser ? currentUser.email : null,
                isGuest: !currentUser,
                status: '답변대기',
                createdAt: new Date(),
                answer: '' 
            });
            
            if (currentUser) {
                alert("문의가 정상적으로 접수되었습니다.\n마이페이지에서 내역을 확인하실 수 있습니다.");
                navigate('/mypage');
            } else {
                alert("비회원 문의가 접수되었습니다.\n답변은 기재해주신 연락처로 개별 안내될 수 있습니다.");
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            alert("접수 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) return null; 

    return (
        <div className="contact-container">
            <div className="contact-card">
                <div className="contact-header">
                    <h2>1:1 문의하기</h2>
                    <p>궁금한 점이나 불편사항을 남겨주세요.<br/>친절하게 안내해 드리겠습니다.</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label>이름 <span className="req">*</span></label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="이름" 
                            disabled={!!currentUser} 
                            style={{ 
                                backgroundColor: currentUser ? '#f5f5f5' : 'white', 
                                color: currentUser ? '#666' : '#333', 
                                cursor: currentUser ? 'not-allowed' : 'text' 
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>연락처 (전화번호) <span className="req">*</span></label>
                        <input 
                            type="text" 
                            name="contact" 
                            value={formData.contact} 
                            onChange={handleChange} 
                            placeholder="전화번호" 
                            disabled={!!currentUser} 
                            style={{ 
                                backgroundColor: currentUser ? '#f5f5f5' : 'white', 
                                color: currentUser ? '#666' : '#333', 
                                cursor: currentUser ? 'not-allowed' : 'text' 
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>문의 유형 <span className="req">*</span></label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="general">일반 문의</option>
                            <option value="account">계정/로그인</option>
                            <option value="service">서비스 이용</option>
                            <option value="error">오류 신고</option>
                            <option value="suggestion">제안/기타</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>제목 <span className="req">*</span></label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="문의 제목을 입력해주세요" />
                    </div>

                    <div className="form-group">
                        <label>내용 <span className="req">*</span></label>
                        <textarea 
                            name="content" 
                            value={formData.content} 
                            onChange={handleChange} 
                            placeholder="상세 내용을 입력해주세요."
                            rows="5"
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? "접수 중..." : "문의하기"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;