import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';

const TermsModal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{title}</h2>
                <div className="modal-text-content">
                    {content}
                </div>
                <button className="modal-close-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

const SignUpPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [modalState, setModalState] = useState({ isOpen: false, type: '' });

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
        phone: '',
        verificationCode: '',
        emailLocal: '',
        emailDomain: 'naver.com',
        emailDomainCustom: '',
        nickname: '',
    });

    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        letter: false,
        number: false,
        special: false,
    });

    const loginIdRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const verificationCodeRef = useRef(null);
    const emailLocalRef = useRef(null);
    const nicknameRef = useRef(null);

    const modalContent = {
        terms: `제1조(목적)
본 약관은 CarScope(이하 "회사")가 제공하는 차량 관리 및 커뮤니티 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조(용어의 정의)
1. "회원"이라 함은 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를 의미합니다.
2. "서비스"라 함은 회사가 제공하는 차량 데이터 분석, 소모품 관리, 커뮤니티 활동 등 모든 제반 서비스를 의미합니다.
... (중략) ...
`,
        privacy: `CarScope(이하 "회사")는 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립합니다.

1. 개인정보의 처리 목적
회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 관련 법령에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
- 회원 가입 및 관리
- 서비스 제공 및 개선
... (중략) ...
`,
    };

    useEffect(() => {
        const { terms, privacy, marketing } = agreements;
        setAgreements(prev => ({
            ...prev,
            all: terms && privacy && marketing
        }));
    }, [agreements.terms, agreements.privacy, agreements.marketing]);

    const validatePassword = (password) => {
        const length = password.length >= 8 && password.length <= 20;
        const letter = /[a-zA-Z]/.test(password);
        const number = /[0-9]/.test(password);
        const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setPasswordValidations({ length, letter, number, special });
        return length && letter && number && special;
    };

    const handleAgreementChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'all') {
            setAgreements({
                all: checked,
                terms: checked,
                privacy: checked,
                marketing: checked,
            });
        } else {
            setAgreements({
                ...agreements,
                [name]: checked,
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'loginId') setIsIdChecked(false);
        if (name === 'nickname') setIsNicknameChecked(false);
        if (name === 'phone') {
            setIsVerificationSent(false);
            setIsPhoneVerified(false);
        }
        if (name === 'emailLocal' || name === 'emailDomain' || name === 'emailDomainCustom') {
            setIsEmailChecked(false);
        }
        if (name === 'password') {
            validatePassword(value);
        }
    };

    const handleEmailDomainChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, emailDomain: value });
        setIsEmailChecked(false);
        if (value !== 'custom') {
            setFormData(prev => ({ ...prev, emailDomainCustom: '' }));
        }
    };

    const checkDuplicateId = () => {
        if (!formData.loginId) {
            alert('아이디를 입력해주세요.');
            loginIdRef.current.focus();
            return;
        }
        const mockExistingIds = ['testuser', 'admin', 'carscope'];
        if (mockExistingIds.includes(formData.loginId)) {
            alert('이미 사용 중인 아이디입니다.');
            setIsIdChecked(false);
            loginIdRef.current.focus();
        } else {
            alert('사용 가능한 아이디입니다.');
            setIsIdChecked(true);
        }
    };

    const checkDuplicateNickname = () => {
        if (!formData.nickname) {
            alert('닉네임을 입력해주세요.');
            nicknameRef.current.focus();
            return;
        }
        const mockExistingNicknames = ['관리자', '운영자', '홍길동'];
        if (mockExistingNicknames.includes(formData.nickname)) {
            alert('이미 사용 중인 닉네임입니다.');
            setIsNicknameChecked(false);
            nicknameRef.current.focus();
        } else {
            alert('사용 가능한 닉네임입니다.');
            setIsNicknameChecked(true);
        }
    };

    const sendSmsVerification = () => {
        if (!formData.phone) {
            alert('휴대폰 번호를 입력해주세요.');
            phoneRef.current.focus();
            return;
        }
        alert('인증번호가 발송되었습니다. (테스트 코드: 123456)');
        setIsVerificationSent(true);
        verificationCodeRef.current.focus();
    };

    const verifySmsCode = () => {
        if (!formData.verificationCode) {
            alert('인증번호를 입력해주세요.');
            verificationCodeRef.current.focus();
            return;
        }
        if (formData.verificationCode === '123456') {
            alert('휴대폰 인증이 완료되었습니다.');
            setIsPhoneVerified(true);
        } else {
            alert('인증번호가 올바르지 않습니다.');
            setIsPhoneVerified(false);
            verificationCodeRef.current.focus();
        }
    };

    const checkEmail = () => {
        if (!formData.emailLocal) {
            alert('이메일 아이디를 입력해주세요.');
            emailLocalRef.current.focus();
            return;
        }
        const domain = formData.emailDomain === 'custom' ? formData.emailDomainCustom : formData.emailDomain;
        if (!domain) {
            alert('이메일 도메인을 입력해주세요.');
            return;
        }
        const fullEmail = `${formData.emailLocal}@${domain}`;
        const mockExistingEmails = ['test@naver.com', 'admin@carscope.com'];
        
        if (mockExistingEmails.includes(fullEmail)) {
            alert('이미 사용 중인 이메일입니다.');
            setIsEmailChecked(false);
        } else {
            alert('사용 가능한 이메일입니다.');
            setIsEmailChecked(true);
        }
    };

    const nextStep = () => {
        if (step === 1) {
            if (!agreements.terms || !agreements.privacy) {
                alert('필수 약관에 동의해주세요.');
                return;
            }
            setStep(2);
            window.scrollTo(0, 0);
        } else if (step === 2) {
            if (!formData.loginId) { alert('아이디를 입력해주세요.'); loginIdRef.current.focus(); return; }
            if (!isIdChecked) { alert('아이디 중복 확인을 해주세요.'); return; }
            if (!formData.password) { alert('비밀번호를 입력해주세요.'); passwordRef.current.focus(); return; }
            if (!Object.values(passwordValidations).every(Boolean)) { alert('비밀번호 조건이 충족되지 않았습니다.'); passwordRef.current.focus(); return; }
            if (formData.password !== formData.confirmPassword) { alert('비밀번호가 일치하지 않습니다.'); confirmPasswordRef.current.focus(); return; }
            if (!formData.name) { alert('이름을 입력해주세요.'); nameRef.current.focus(); return; }
            if (!formData.phone) { alert('휴대폰 번호를 입력해주세요.'); phoneRef.current.focus(); return; }
            if (!isPhoneVerified) { alert('휴대폰 인증을 완료해주세요.'); return; }
            if (!formData.emailLocal) { alert('이메일을 입력해주세요.'); emailLocalRef.current.focus(); return; }
            if (!isEmailChecked) { alert('이메일 중복 확인을 해주세요.'); return; }
            if (!formData.nickname) { alert('닉네임을 입력해주세요.'); nicknameRef.current.focus(); return; }
            if (!isNicknameChecked) { alert('닉네임 중복 확인을 해주세요.'); return; }

            const fullEmail = `${formData.emailLocal}@${formData.emailDomain === 'custom' ? formData.emailDomainCustom : formData.emailDomain}`;
            console.log('회원가입 정보:', { ...formData, email: fullEmail, agreements });
            
            setStep(3);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="signup-container">
            {step === 1 && (
                <div className="signup-step step-1">
                    <h2>CarScope 환영합니다! <br />약관에 동의해주세요.</h2>
                    <div className="agreement-box">
                        <label>
                            <input
                                type="checkbox"
                                name="all"
                                checked={agreements.all}
                                onChange={handleAgreementChange}
                            />
                            전체 동의하기
                        </label>
                    </div>
                    <div className="agreement-box">
                        <div className="agreement-header">
                            <label>
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={agreements.terms}
                                    onChange={handleAgreementChange}
                                />
                                [필수] 이용약관 동의
                            </label>
                            <button className="details-button" onClick={() => setModalState({ isOpen: true, type: 'terms' })}>보기</button>
                        </div>
                    </div>
                    <div className="agreement-box">
                        <div className="agreement-header">
                            <label>
                                <input
                                    type="checkbox"
                                    name="privacy"
                                    checked={agreements.privacy}
                                    onChange={handleAgreementChange}
                                />
                                [필수] 개인정보 수집 및 이용 동의
                            </label>
                            <button className="details-button" onClick={() => setModalState({ isOpen: true, type: 'privacy' })}>보기</button>
                        </div>
                    </div>
                    <div className="agreement-box">
                        <label>
                            <input
                                type="checkbox"
                                name="marketing"
                                checked={agreements.marketing}
                                onChange={handleAgreementChange}
                            />
                            [선택] 마케팅 정보 수신 동의
                        </label>
                    </div>
                    <button className="next-button" onClick={nextStep}>다음</button>
                </div>
            )}

            {step === 2 && (
                <div className="signup-step step-2">
                    <h2>회원 정보를 입력해주세요.</h2>
                    <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-row">
                            <div className="input-group">
                                <label>아이디 *</label>
                                <input
                                    type="text"
                                    name="loginId"
                                    placeholder="아이디 입력 (4~20자)"
                                    value={formData.loginId}
                                    onChange={handleInputChange}
                                    ref={loginIdRef}
                                    disabled={isIdChecked}
                                    maxLength={20}
                                />
                            </div>
                            <button 
                                type="button" 
                                className="sms-button duplicate-check-btn" 
                                onClick={checkDuplicateId}
                                disabled={isIdChecked}
                            >
                                중복확인
                            </button>
                        </div>

                        <div className="input-group">
                            <label>비밀번호 *</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="영문, 숫자, 특수문자 조합 8~20자"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    ref={passwordRef}
                                    maxLength={20}
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "숨기기" : "보기"}
                                </button>
                            </div>
                            <div className="password-validation-guide">
                                <ul>
                                    <li className={passwordValidations.length ? 'valid' : 'invalid'}>
                                        {passwordValidations.length ? '✓' : '•'} 8~20자 이내
                                    </li>
                                    <li className={passwordValidations.letter ? 'valid' : 'invalid'}>
                                        {passwordValidations.letter ? '✓' : '•'} 영문 포함
                                    </li>
                                    <li className={passwordValidations.number ? 'valid' : 'invalid'}>
                                        {passwordValidations.number ? '✓' : '•'} 숫자 포함
                                    </li>
                                    <li className={passwordValidations.special ? 'valid' : 'invalid'}>
                                        {passwordValidations.special ? '✓' : '•'} 특수문자 포함
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>비밀번호 확인 *</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="비밀번호 재입력"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    ref={confirmPasswordRef}
                                    maxLength={20}
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? "숨기기" : "보기"}
                                </button>
                            </div>
                            {formData.confirmPassword && (
                                <span style={{ color: formData.password === formData.confirmPassword ? '#2ecc71' : '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
                                    {formData.password === formData.confirmPassword ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                                </span>
                            )}
                        </div>

                        <div className="input-group">
                            <label>이름 *</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="이름 입력"
                                value={formData.name}
                                onChange={handleInputChange}
                                ref={nameRef}
                            />
                        </div>

                        <div className="input-group">
                            <label>휴대폰 번호 *</label>
                            <div className="phone-group">
                                <div className="input-group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="'-' 없이 숫자만 입력"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        ref={phoneRef}
                                        disabled={isVerificationSent || isPhoneVerified}
                                        maxLength={11}
                                    />
                                </div>
                                <button 
                                    type="button" 
                                    className="sms-button" 
                                    onClick={sendSmsVerification}
                                    disabled={isVerificationSent || isPhoneVerified}
                                >
                                    인증번호 전송
                                </button>
                            </div>
                        </div>

                        {isVerificationSent && !isPhoneVerified && (
                            <div className="input-group">
                                <div className="phone-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="verificationCode"
                                            placeholder="인증번호 입력"
                                            value={formData.verificationCode}
                                            onChange={handleInputChange}
                                            ref={verificationCodeRef}
                                            maxLength={6}
                                        />
                                    </div>
                                    <button type="button" className="sms-button" onClick={verifySmsCode}>
                                        인증확인
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="input-group">
                            <label>이메일 *</label>
                            <div className="email-group with-button">
                                <input
                                    type="text"
                                    name="emailLocal"
                                    className="email-local-input"
                                    placeholder="이메일 아이디"
                                    value={formData.emailLocal}
                                    onChange={handleInputChange}
                                    ref={emailLocalRef}
                                    disabled={isEmailChecked}
                                />
                                <span className="email-at">@</span>
                                <select
                                    name="emailDomain"
                                    className="email-domain-select"
                                    value={formData.emailDomain}
                                    onChange={handleEmailDomainChange}
                                    disabled={isEmailChecked}
                                >
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="custom">직접 입력</option>
                                </select>
                                <button 
                                    type="button" 
                                    className="sms-button email-check-btn" 
                                    onClick={checkEmail}
                                    disabled={isEmailChecked}
                                >
                                    중복확인
                                </button>
                            </div>
                            {formData.emailDomain === 'custom' && (
                                <input
                                    type="text"
                                    name="emailDomainCustom"
                                    className="email-domain-custom"
                                    placeholder="도메인 입력 (예: example.com)"
                                    value={formData.emailDomainCustom}
                                    onChange={handleInputChange}
                                    disabled={isEmailChecked}
                                />
                            )}
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label>닉네임 *</label>
                                <input
                                    type="text"
                                    name="nickname"
                                    placeholder="닉네임 입력 (2~10자)"
                                    value={formData.nickname}
                                    onChange={handleInputChange}
                                    ref={nicknameRef}
                                    disabled={isNicknameChecked}
                                    maxLength={10}
                                />
                            </div>
                            <button 
                                type="button" 
                                className="sms-button duplicate-check-btn" 
                                onClick={checkDuplicateNickname}
                                disabled={isNicknameChecked}
                            >
                                중복확인
                            </button>
                        </div>

                        <button className="next-button" onClick={nextStep}>회원가입 완료</button>
                    </form>
                </div>
            )}

            {step === 3 && (
                <div className="signup-step step-3">
                    <h2>회원가입이 완료되었습니다!</h2>
                    <p className="complete-nickname">{formData.nickname}님</p>
                    <p className="complete-message">CarScope의 회원이 되신 것을 환영합니다.</p>
                    <button className="next-button" onClick={() => navigate('/login')}>로그인하러 가기</button>
                </div>
            )}

            <TermsModal 
                isOpen={modalState.isOpen} 
                onClose={() => setModalState({ isOpen: false, type: '' })}
                title={modalState.type === 'terms' ? '이용약관' : '개인정보 처리방침'}
                content={modalContent[modalState.type]}
            />
        </div>
    );
};

export default SignUpPage;