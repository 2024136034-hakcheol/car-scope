import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';

const TermsModal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 style={{textAlign: 'center', margin: 0}}>{title}</h2>
                <div className="modal-body">{content}</div>
                <button className="close-btn" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

const SignUpPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [modalState, setModalState] = useState({ isOpen: false, type: '' });
    
    const [focusedField, setFocusedField] = useState(null);

    const [agreements, setAgreements] = useState({
        all: false,
        terms: false,
        privacy: false,
        marketing: false,
    });

    const [formData, setFormData] = useState({
        loginId: '',
        password: '',
        confirmPassword: '',
        name: '',
        birthdate: '',
        phone: '',
        verificationCode: '',
        emailLocal: '',
        emailDomain: 'naver.com',
        emailDomainCustom: '',
        nickname: '',
    });

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        letter: false,
        number: false,
        special: false,
    });

    const [idValidation, setIdValidation] = useState(false);

    const validatePassword = (password) => {
        const length = password.length >= 8 && password.length <= 20;
        const letter = /[a-zA-Z]/.test(password);
        const number = /[0-9]/.test(password);
        const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        setPasswordValidations({ length, letter, number, special });
    };

    const validateId = (id) => {
        const isValid = id.length >= 4 && id.length <= 20;
        setIdValidation(isValid);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'password') validatePassword(value);
        if (name === 'loginId') validateId(value);
    };

    const handleAgreementChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'all') {
            setAgreements({ all: checked, terms: checked, privacy: checked, marketing: checked });
        } else {
            setAgreements(prev => {
                const newAgreements = { ...prev, [name]: checked };
                const all = newAgreements.terms && newAgreements.privacy && newAgreements.marketing;
                return { ...newAgreements, all };
            });
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const nextStep = () => {
        if (step === 1) {
            if (!agreements.terms || !agreements.privacy) return alert('필수 약관에 동의해주세요.');
            setStep(2);
            window.scrollTo(0,0);
        } else if (step === 2) {
            if (!formData.loginId || !formData.password || !formData.name || !formData.phone) return alert('필수 정보를 입력해주세요.');
            setStep(3);
            window.scrollTo(0,0);
        }
    };

    return (
        <div className="signup-container">
            {step === 1 && (
                <div className="signup-step">
                    <h2>CarScope 환영합니다!<br/>약관에 동의해주세요.</h2>
                    <div className="agreement-box" style={{backgroundColor: '#f8f9fa'}}>
                        <label>
                            <input type="checkbox" name="all" checked={agreements.all} onChange={handleAgreementChange} />
                            전체 동의하기
                        </label>
                    </div>
                    <div className="agreement-box">
                        <div className="agreement-header">
                            <label>
                                <input type="checkbox" name="terms" checked={agreements.terms} onChange={handleAgreementChange} />
                                [필수] 이용약관 동의
                            </label>
                            <button className="details-button" onClick={() => setModalState({isOpen:true, type:'terms'})}>보기</button>
                        </div>
                    </div>
                    <div className="agreement-box">
                        <div className="agreement-header">
                            <label>
                                <input type="checkbox" name="privacy" checked={agreements.privacy} onChange={handleAgreementChange} />
                                [필수] 개인정보 수집 및 이용 동의
                            </label>
                            <button className="details-button" onClick={() => setModalState({isOpen:true, type:'privacy'})}>보기</button>
                        </div>
                    </div>
                    <div className="agreement-box">
                        <label>
                            <input type="checkbox" name="marketing" checked={agreements.marketing} onChange={handleAgreementChange} />
                            [선택] 마케팅 정보 수신 동의
                        </label>
                    </div>
                    <button className="full-btn" onClick={nextStep}>다음</button>
                </div>
            )}

            {step === 2 && (
                <div className="signup-step">
                    <h2>회원 정보를 입력해주세요.</h2>
                    <form className="signup-form" onSubmit={e => e.preventDefault()}>
                        
                        <div className="input-group">
                            <label>아이디</label>
                            <div className="input-row">
                                <div className="input-wrapper">
                                    <input 
                                        type="text" 
                                        name="loginId" 
                                        placeholder="아이디 입력" 
                                        value={formData.loginId} 
                                        onChange={handleInputChange} 
                                        onFocus={() => setFocusedField('loginId')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                    {focusedField === 'loginId' && (
                                        <div className="validation-tooltip">
                                            <ul>
                                                <li className={idValidation ? 'valid' : 'invalid'}>
                                                    {idValidation ? '✓' : '•'} 4~20자 이내
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <button className="action-btn">중복확인</button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>비밀번호</label>
                            <div className="password-wrapper">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    placeholder="비밀번호 입력" 
                                    value={formData.password} 
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                />
                                <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "숨기기" : "보기"}
                                </button>
                                
                                {focusedField === 'password' && (
                                    <div className="validation-tooltip">
                                        <ul>
                                            <li className={passwordValidations.length ? 'valid' : 'invalid'}>{passwordValidations.length ? '✓' : '•'} 8~20자 이내</li>
                                            <li className={passwordValidations.letter ? 'valid' : 'invalid'}>{passwordValidations.letter ? '✓' : '•'} 영문 포함</li>
                                            <li className={passwordValidations.number ? 'valid' : 'invalid'}>{passwordValidations.number ? '✓' : '•'} 숫자 포함</li>
                                            <li className={passwordValidations.special ? 'valid' : 'invalid'}>{passwordValidations.special ? '✓' : '•'} 특수문자 포함</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="input-group">
                            <label>비밀번호 확인</label>
                            <div className="password-wrapper">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    name="confirmPassword" 
                                    placeholder="비밀번호 재입력" 
                                    value={formData.confirmPassword} 
                                    onChange={handleInputChange}
                                />
                                <button type="button" className="toggle-pw" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? "숨기기" : "보기"}
                                </button>
                            </div>
                            {formData.confirmPassword && (
                                <span style={{fontSize: '0.85rem', marginTop: '5px', color: formData.password === formData.confirmPassword ? '#2ecc71' : '#e74c3c', fontWeight: '600'}}>
                                    {formData.password === formData.confirmPassword ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                                </span>
                            )}
                        </div>

                        <div className="input-group">
                            <label>이름</label>
                            <input type="text" name="name" placeholder="이름 입력" value={formData.name} onChange={handleInputChange} />
                        </div>

                        <div className="input-group">
                            <label>생년월일</label>
                            <input type="text" name="birthdate" placeholder="생년월일 8자리 (예: 19900101)" value={formData.birthdate} onChange={handleInputChange} maxLength={8} />
                        </div>

                        <div className="input-group">
                            <label>휴대폰 번호</label>
                            <input type="tel" name="phone" placeholder="'-' 없이 입력" value={formData.phone} onChange={handleInputChange} />
                        </div>

                        <div className="input-group">
                            <label>이메일</label>
                            <div className="input-row email-row">
                                <div className="input-wrapper">
                                    <input type="text" name="emailLocal" placeholder="이메일 아이디" value={formData.emailLocal} onChange={handleInputChange} />
                                </div>
                                <span className="email-at">@</span>
                                <div className="input-wrapper">
                                    <select name="emailDomain" value={formData.emailDomain} onChange={handleInputChange}>
                                        <option value="naver.com">naver.com</option>
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="daum.net">daum.net</option>
                                    </select>
                                </div>
                                <button className="action-btn">중복확인</button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>닉네임</label>
                            <div className="input-row">
                                <div className="input-wrapper">
                                    <input type="text" name="nickname" placeholder="닉네임 입력" value={formData.nickname} onChange={handleInputChange} />
                                </div>
                                <button className="action-btn">중복확인</button>
                            </div>
                        </div>

                        <button className="full-btn" onClick={nextStep}>회원가입 완료</button>
                    </form>
                </div>
            )}

            {step === 3 && (
                <div className="signup-step step-3">
                    <h2>회원가입이 완료되었습니다!</h2>
                    <p className="welcome-name">{formData.name || '회원'}님</p>
                    <p className="complete-msg">CarScope의 회원이 되신 것을 환영합니다.</p>
                    <button className="full-btn" onClick={() => navigate('/login')}>로그인하러 가기</button>
                </div>
            )}

            <TermsModal 
                isOpen={modalState.isOpen} 
                onClose={() => setModalState({isOpen:false, type:''})}
                title={modalState.type === 'terms' ? '이용약관' : '개인정보 처리방침'}
                content="약관 내용이 여기에 표시됩니다..." 
            />
        </div>
    );
};

export default SignUpPage;