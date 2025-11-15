import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';

const isValidDomain = (domain) => {
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
};

const SignUpPage = () => {
    const [step, setStep] = useState(1);
    const [agreements, setAgreements] = useState({
        terms: false,
        privacy: false,
        marketing: false,
    });
    const [formData, setFormData] = useState({
        id: '',
        emailLocal: '',
        emailDomainSelect: 'naver.com',
        emailDomainCustom: '',
        password: '',
        name: '',
        nickname: '',
        birthdate: '',
        gender: 'none',
        phone: '',
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isIdFocused, setIsIdFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    
    const [idValidation, setIdValidation] = useState({
        letters: false,
        numbers: false,
    });
    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        number: false,
        special: false,
    });

    const navigate = useNavigate();

    const idRef = useRef(null);
    const passwordRef = useRef(null);
    const emailDomainCustomRef = useRef(null);
    const nameRef = useRef(null);
    const nicknameRef = useRef(null);
    const birthdateRef = useRef(null);

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

    const validateId = (id) => {
        const letters = (id.match(/[a-zA-Z]/g) || []).length >= 4;
        const numbers = (id.match(/[0-9]/g) || []).length >= 4;
        setIdValidation({ letters, numbers });
        return letters && numbers;
    };

    const validatePassword = (password) => {
        const length = password.length >= 8 && password.length <= 20;
        const number = /[0-9]/.test(password);
        const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        setPasswordValidation({ length, number, special });
        return length && number && special;
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        if (name === 'id') {
            const regex = /^[a-zA-Z0-9]*$/;
            if (value !== '' && !regex.test(value)) {
                alert('아이디는 영문과 숫자만 입력할 수 있습니다.');
                return;
            }
            validateId(value);
            setIsIdChecked(false);
        }
        
        if (name === 'password') {
            const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
            if (value !== '' && !regex.test(value)) {
                alert('영문, 숫자, 특수문자만 입력할 수 있습니다.');
                return;
            }
            validatePassword(value);
        }

        if (name === 'nickname') {
            const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
            if (value !== '' && specialCharRegex.test(value)) {
                alert('닉네임에는 특수문자를 사용할 수 없습니다.');
                return;
            }
        }

        if (name === 'birthdate') {
            const regex = /^[0-9]*$/;
            if (!regex.test(value)) {
                alert('생년월일은 숫자만 입력할 수 있습니다.');
                return;
            }
            if (value.length > 8) {
                alert('생년월일은 8자리를 초과하여 입력할 수 없습니다.');
                return;
            }
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleIdCheck = () => {
        if (formData.id.trim() === '') {
            alert('아이디를 먼저 입력해주세요.');
            idRef.current.focus();
            return;
        }
        if (!validateId(formData.id)) {
            alert('아이디가 요구 조건을 충족하지 않습니다.');
            idRef.current.focus();
            return;
        }
        
        alert('사용 가능한 아이디입니다.');
        setIsIdChecked(true);
    };

    const handleSubmitStep2 = (e) => {
        e.preventDefault();
        
        if (!validateId(formData.id)) {
            alert('아이디가 요구 조건을 충족하지 않습니다.');
            idRef.current.focus();
            return;
        }

        if (!isIdChecked) {
            alert('아이디 중복확인을 해주세요.');
            idRef.current.focus();
            return;
        }

        if (!validatePassword(formData.password)) {
            alert('비밀번호가 요구 조건을 충족하지 않습니다.');
            passwordRef.current.focus();
            setFormData(prev => ({ ...prev, password: '' }));
            return;
        }

        if (formData.emailDomainSelect === 'direct') {
            if (!isValidDomain(formData.emailDomainCustom)) {
                alert('유효하지 않은 도메인 형식입니다. (예: example.com)');
                emailDomainCustomRef.current.focus();
                setFormData(prev => ({ ...prev, emailDomainCustom: '' }));
                return;
            }
        }

        if (formData.name.length <= 1) {
            alert('이름은 2글자 이상 입력해야 합니다.');
            nameRef.current.focus();
            setFormData(prev => ({ ...prev, name: '' }));
            return;
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharRegex.test(formData.nickname)) {
            alert('닉네임에는 특수문자를 사용할 수 없습니다.');
            nicknameRef.current.focus();
            setFormData(prev => ({ ...prev, nickname: '' }));
            return;
        }

        if (formData.birthdate.length !== 8) {
            alert('생년월일을 8자리(YYYYMMDD)로 입력해주세요.');
            birthdateRef.current.focus();
            setFormData(prev => ({ ...prev, birthdate: '' }));
            return;
        }

        setStep(3);
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    const openModal = (type) => {
        setModalContent(agreementDetails[type]);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', content: '' });

    const agreementDetails = {
        terms: {
            title: '[필수] 이용약관 동의',
            content: `제1조 (목적)
    본 약관은 CarScope(이하 '회사')가 제공하는 CarScope 서비스 및 관련 제반 서비스(이하 '서비스')의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            
    제2조 (정의)
    본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
    '서비스'라 함은 구현되는 단말기(PC, 모바일 등)와 상관없이 '회원'이 이용할 수 있는 CarScope 관련 제반 서비스를 의미합니다.
    '회원'이라 함은 회사의 '서비스'에 접속하여 본 약관에 따라 '회사'와 이용계약을 체결하고 '회사'가 제공하는 '서비스'를 이용하는 고객을 말합니다.`
        },
        privacy: {
            title: '[필수] 개인정보 수집 및 이용 동의',
            content: `회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
            
    1. 수집항목: 이름, 이메일 주소, 비밀번호, 휴대전화 번호, 서비스 이용 기록, 접속 로그
    2. 수집방법: 홈페이지(회원가입)
    3. 이용목적: 회원 관리, 서비스 제공, 마케팅 및 광고 활용`
        },
        marketing: {
            title: '[선택] 마케팅 정보 수신 동의',
            content: `회사는 회원의 동의 하에 다음과 같은 마케팅 정보를 전송합니다.
            
    1. 전송내용: 신규 서비스, 이벤트, 할인 혜택
    2. 전송방법: 이메일, SMS
    3. 철회방법: 회원은 언제든지 수신 동의를 철회할 수 있습니다.`
        }
    };

    return (
        <div className="signup-container page-content">
            {step === 1 && (
                <div className="signup-step step-1">
                    <h2>약관 동의</h2>
                    <div className="agreement-box">
                        <div className="agreement-header">
                            <label>
                                <input type="checkbox" name="terms" checked={agreements.terms} onChange={handleAgreementChange} />
                                [필수] 이용약관 동의
                            </label>
                            <button type="button" className="details-button" onClick={() => openModal('terms')}>자세히</button>
                        </div>
                    </div>
                    <div className="agreement-box">
                        <div className="agreement-header">
                            <label>
                                <input type="checkbox" name="privacy" checked={agreements.privacy} onChange={handleAgreementChange} />
                                [필수] 개인정보 수집 및 이용 동의
                            </label>
                            <button type="button" className="details-button" onClick={() => openModal('privacy')}>자세히</button>
                        </div>
                    </div>
                    <div className="agreement-box">
                        <div className="agreement-header">
                            <label>
                                <input type="checkbox" name="marketing" checked={agreements.marketing} onChange={handleAgreementChange} />
                                [선택] 마케팅 정보 수신 동의
                            </label>
                            <button type="button" className="details-button" onClick={() => openModal('marketing')}>자세히</button>
                        </div>
                    </div>
                    <button className="next-button" onClick={handleNextStep1}>다음</button>
                </div>
            )}

            {step === 2 && (
                <div className="signup-step step-2">
                    <h2>기본 정보 입력</h2>
                    <form onSubmit={handleSubmitStep2} className="signup-form">
                        
                        <div className="input-group">
                            <div className="phone-group">
                                <div className="input-group">
                                    <label htmlFor="id">아이디</label>
                                    <input 
                                        type="text" 
                                        id="id" 
                                        name="id" 
                                        placeholder="아이디를 입력하세요" 
                                        value={formData.id} 
                                        onChange={handleFormChange} 
                                        onFocus={() => setIsIdFocused(true)}
                                        onBlur={() => setIsIdFocused(false)}
                                        ref={idRef}
                                        disabled={isIdChecked}
                                        required 
                                    />
                                </div>
                                <button 
                                    type="button" 
                                    className="sms-button duplicate-check-btn"
                                    onClick={handleIdCheck}
                                    disabled={isIdChecked}
                                >
                                    {isIdChecked ? "확인완료" : "중복확인"}
                                </button>
                            </div>
                            {isIdFocused && !isIdChecked && (
                                <div className="password-validation-guide">
                                    <ul>
                                        <li className={idValidation.letters ? 'valid' : 'invalid'}>
                                            {idValidation.letters ? '✅' : '❌'} 영문 4자리 이상 포함
                                        </li>
                                        <li className={idValidation.numbers ? 'valid' : 'invalid'}>
                                            {idValidation.numbers ? '✅' : '❌'} 숫자 4자리 이상 포함
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        
                        <div className="input-group password-input-group">
                            <label htmlFor="password">비밀번호</label>
                            <div className="password-input-wrapper">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password"
                                    name="password" 
                                    placeholder="비밀번호를 입력하세요" 
                                    value={formData.password} 
                                    onChange={handleFormChange}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                    ref={passwordRef}
                                    required 
                                />
                                <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "숨기기" : "보이기"}
                                </button>
                            </div>
                            {isPasswordFocused && (
                                <div className="password-validation-guide">
                                    <ul>
                                        <li className={passwordValidation.length ? 'valid' : 'invalid'}>
                                            {passwordValidation.length ? '✅' : '❌'} 8~20자 이내
                                        </li>
                                        <li className={passwordValidation.number ? 'valid' : 'invalid'}>
                                            {passwordValidation.number ? '✅' : '❌'} 숫자 1개 이상 포함
                                        </li>
                                        <li className={passwordValidation.special ? 'valid' : 'invalid'}>
                                            {passwordValidation.special ? '✅' : '❌'} 특수문자 1개 이상 포함
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="input-group">
                            <label htmlFor="emailLocal">이메일</label>
                            <div className="email-group">
                                <input 
                                    type="text" 
                                    id="emailLocal" 
                                    name="emailLocal" 
                                    placeholder="이메일" 
                                    className="email-local-input"
                                    value={formData.emailLocal} 
                                    onChange={handleFormChange} 
                                    required 
                                />
                                <span className="email-at">@</span>
                                <select 
                                    name="emailDomainSelect" 
                                    className="email-domain-select" 
                                    value={formData.emailDomainSelect} 
                                    onChange={handleFormChange}
                                >
                                    <option value="direct">직접 입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="daum.net">daum.net</option>
                                </select>
                            </div>
                            {formData.emailDomainSelect === 'direct' && (
                                <input 
                                    type="text" 
                                    name="emailDomainCustom"
                                    placeholder="도메인 입력 (예: example.com)" 
                                    className="email-domain-custom"
                                    value={formData.emailDomainCustom}
                                    onChange={handleFormChange}
                                    ref={emailDomainCustomRef}
                                    required
                                />
                            )}
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="name">이름</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="이름 (2글자 이상)" 
                                    value={formData.name} 
                                    onChange={handleFormChange} 
                                    ref={nameRef}
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="nickname">닉네임</label>
                                <input 
                                    type="text" 
                                    id="nickname" 
                                    name="nickname" 
                                    placeholder="닉네임 (특수문자 제외)" 
                                    value={formData.nickname} 
                                    onChange={handleFormChange} 
                                    ref={nicknameRef}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-row">
                             <div className="input-group">
                                <label htmlFor="birthdate">생년월일</label>
                                <input 
                                    type="text" 
                                    id="birthdate" 
                                    name="birthdate" 
                                    placeholder="YYYYMMDD ('-' 제외하고 입력)" 
                                    value={formData.birthdate} 
                                    onChange={handleFormChange} 
                                    ref={birthdateRef}
                                    required 
                                />
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

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{modalContent.title}</h2>
                        <div className="modal-text-content">
                            {modalContent.content}
                        </div>
                        <button className="modal-close-button" onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUpPage;