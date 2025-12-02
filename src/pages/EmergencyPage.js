import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from '../AuthContext'; 
import '../styles/EmergencyPage.css';

const EmergencyPage = () => {
    const navigate = useNavigate();
    const { currentUser, dbUser, loading } = useContext(AuthContext); 
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        carNumber: '',
        issueType: 'battery',
        description: ''
    });

    useEffect(() => {
        if (!loading) {
            if (currentUser && dbUser) {
                if (!dbUser.carNumber) {
                    alert("긴급출동 서비스는 차량 등록 후 이용 가능합니다.\n마이페이지로 이동하여 차량을 등록해주세요.");
                    navigate('/mypage');
                    return;
                }

                setFormData(prev => ({
                    ...prev,
                    name: dbUser.name || '',
                    phone: dbUser.phone || '',
                    carNumber: dbUser.carNumber || ''
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    name: '',
                    phone: '',
                    carNumber: ''
                }));
            }
        }
    }, [currentUser, dbUser, loading, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        if (!formData.name || !formData.phone || !formData.location || !formData.carNumber) {
            alert("필수 정보를 모두 입력해주세요.");
            return;
        }

        setIsLoading(true);
        try {
            await addDoc(collection(db, "emergency_requests"), {
                ...formData,
                userId: currentUser ? currentUser.uid : 'guest',
                userEmail: currentUser ? currentUser.email : null,
                isGuest: !currentUser,
                status: '접수대기', 
                createdAt: new Date()
            });
            
            if (currentUser) {
                alert("긴급출동 접수가 완료되었습니다.\n곧 기사가 배정됩니다.");
                navigate('/'); 
            } else {
                alert("비회원 긴급출동 접수가 완료되었습니다.\n입력하신 연락처로 기사가 연락드릴 예정입니다.");
                navigate('/');
            }
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("접수 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) return null;

    return (
        <div className="emergency-container">
            <div className="emergency-card">
                <div className="emergency-header">
                    <h2>🚨 긴급출동 서비스</h2>
                    <p>차량에 문제가 생겼나요?<br/>신속하게 도와드리겠습니다.</p>
                </div>

                <form onSubmit={handleSubmit} className="emergency-form">
                    <div className="form-group">
                        <label>운전자 성함 <span className="req">*</span></label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="홍길동" 
                            disabled={!!currentUser} 
                            style={{ 
                                backgroundColor: currentUser ? '#f5f5f5' : 'white', 
                                color: currentUser ? '#666' : '#333',
                                cursor: currentUser ? 'not-allowed' : 'text'
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>연락처 <span className="req">*</span></label>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            placeholder="010-0000-0000" 
                            disabled={!!currentUser} 
                            style={{ 
                                backgroundColor: currentUser ? '#f5f5f5' : 'white', 
                                color: currentUser ? '#666' : '#333',
                                cursor: currentUser ? 'not-allowed' : 'text'
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>차량 번호 <span className="req">*</span></label>
                        <input 
                            type="text" 
                            name="carNumber" 
                            value={formData.carNumber} 
                            onChange={handleChange} 
                            placeholder="12가 3456" 
                            disabled={!!currentUser} 
                            style={{ 
                                backgroundColor: currentUser ? '#f5f5f5' : 'white', 
                                color: currentUser ? '#666' : '#333',
                                cursor: currentUser ? 'not-allowed' : 'text'
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>현재 위치 <span className="req">*</span></label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="서울시 강남구 테헤란로 123 앞" />
                    </div>

                    <div className="form-group">
                        <label>고장 유형 <span className="req">*</span></label>
                        <select name="issueType" value={formData.issueType} onChange={handleChange}>
                            <option value="battery">배터리 방전 (시동 안 걸림)</option>
                            <option value="tire">타이어 펑크/교체</option>
                            <option value="lock">잠금 해제</option>
                            <option value="fuel">비상 급유</option>
                            <option value="tow">견인 요청 (사고/고장)</option>
                            <option value="other">기타</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>상세 내용</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            placeholder="상황을 자세히 적어주시면 도움이 됩니다."
                            rows="3"
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? "접수 처리 중..." : "출동 요청하기"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmergencyPage;