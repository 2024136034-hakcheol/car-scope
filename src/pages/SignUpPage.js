import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';

const SignUpPage = () => {
    const [step, setStep] = useState(1);
    const [agreements, setAgreements] = useState({
        terms: false,
        privacy: false,
        marketing: false,
    });
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        password: '',
        name: '',
        nickname: '',
        birthdate: '',
        gender: 'none',
        phone: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleAgreementChange = (e) => {
        const { name, checked } = e.target;
        setAgreements(prev => ({ ...prev, [name]: checked }));
    };

    const handleNextStep1 = () => {
        if (agreements.terms && agreements.privacy) {
            setStep(2);
        } else {
            alert('필수 이용약관에 모두 동의해야 합니다.');
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitStep2 = (e) => {
        e.preventDefault();
        
        if (formData.name.length <= 1) {
            alert('이름은 2글자 이상 입력해야 합니다.');
            return;
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharRegex.test(formData.nickname)) {
            alert('닉네임에는 특수문자를 사용할 수 없습니다.');
            return;
        }

        setStep(3);
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="signup-container page-content">
            {step === 1 && (
                <div className="signup-step step-1">
                    <h2>약관 동의</h2>
                    <div className="agreement-box">
                        <label>
                            <input type="checkbox" name="terms" checked={agreements.terms} onChange={handleAgreementChange} />
                            [필수] 이용약관 동의
                        </label>
                        <p>이용약관 내용...</p>
                    </div>
                    <div className="agreement-box">
                        <label>
                            <input type="checkbox" name="privacy" checked={agreements.privacy} onChange={handleAgreementChange} />
                            [필수] 개인정보 수집 및 이용 동의
                        </label>
                        <p>개인정보 수집 및 이용 동의 내용...</p>
                    </div>
                    <div className="agreement-box">
                        <label>
                            <input type="checkbox" name="marketing" checked={agreements.marketing} onChange={handleAgreementChange} />
                            [선택] 마케팅 정보 수신 동의
                        </label>
                        <p>마케팅 정보 수신 동의 내용...</p>
                    </div>
                    <button className="next-button" onClick={handleNextStep1}>다음</button>
                </div>
            )}

            {step === 2 && (
                <div className="signup-step step-2">
                    <h2>기본 정보 입력</h2>
                    <form onSubmit={handleSubmitStep2} className="signup-form">
                        <div className="input-group">
                            <label htmlFor="id">아이디</label>
                            <input type="text" id="id" name="id" placeholder="아이디를 입력하세요" value={formData.id} onChange={handleFormChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">이메일</label>
                            <input type="email" id="email" name="email" placeholder="이메일 주소를 입력하세요" value={formData.email} onChange={handleFormChange} required />
                        </div>
                        <div className="input-group password-input-group">
                            <label htmlFor="password">비밀번호</label>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password"
                                name="password" 
                                placeholder="비밀번호를 입력하세요" 
                                value={formData.password} 
                                onChange={handleFormChange} 
                                required 
                            />
                            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "숨기기" : "보이기"}
                            </button>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="name">이름</label>
                                <input type="text" id="name" name="name" placeholder="이름 (2글자 이상)" value={formData.name} onChange={handleFormChange} required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="nickname">닉네임</label>
                                <input type="text" id="nickname" name="nickname" placeholder="닉네임 (특수문자 제외)" value={formData.nickname} onChange={handleFormChange} required />
                            </div>
                        </div>

                        <div className="form-row">
                             <div className="input-group">
                                <label htmlFor="birthdate">생년월일</label>
                                <input type="text" id="birthdate" name="birthdate" placeholder="YYYY-MM-DD" value={formData.birthdate} onChange={handleFormChange} required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="gender">성별</label>
                                <select id="gender" name="gender" value={formData.gender} onChange={handleFormChange} required>
                                    <option value="none" disabled>성별 선택</option>
                                    <option value="male">남성</option>
                                    <option value="female">여성</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group phone-group">
                            <div className="input-group">
                                <label htmlFor="phone">전화번호</label>
                                <input type="tel" id="phone" name="phone" placeholder="'-' 제외하고 입력" value={formData.phone} onChange={handleFormChange} required />
                            </div>
                            <button type="button" className="sms-button">인증</button>
                        </div>
                        <button type="submit" className="next-button">가입하기</button>
                    </form>
                </div>
            )}

            {step === 3 && (
                <div className="signup-step step-3">
                    <h2 className="complete-nickname">{formData.nickname} 님</h2>
                    <p className="complete-message">CarScope 회원가입을 진심으로 감사드립니다.</p>
                    <button className="next-button" onClick={handleGoToLogin}>로그인 페이지로</button>
                </div>
            )}
        </div>
    );
};

export default SignUpPage;