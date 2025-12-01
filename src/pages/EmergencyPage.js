import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import '../styles/EmergencyPage.css';

const EmergencyPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        carNumber: '',
        issueType: 'battery', // 기본값
        description: ''
    });

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
                status: '접수대기', // 접수대기, 출동중, 처리완료
                createdAt: new Date()
            });
            
            alert("긴급출동 접수가 완료되었습니다.\n곧 기사가 배정됩니다.");
            navigate('/'); // 메인으로 이동
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("접수 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

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
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="홍길동" />
                    </div>

                    <div className="form-group">
                        <label>연락처 <span className="req">*</span></label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="010-0000-0000" />
                    </div>

                    <div className="form-group">
                        <label>차량 번호 <span className="req">*</span></label>
                        <input type="text" name="carNumber" value={formData.carNumber} onChange={handleChange} placeholder="12가 3456" />
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