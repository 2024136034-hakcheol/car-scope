import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile, getAuth, signOut } from "firebase/auth";
import { initializeApp, getApp, deleteApp } from "firebase/app";

const termsText = {
    terms: `제1조 (목적)
본 약관은 CarScope(이하 "회사")가 제공하는 자동차 정보 및 커뮤니티 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.

제2조 (용어의 정의)
1. "회원"이라 함은 본 약관에 동의하고 가입신청을 하여 회사의 승낙을 받은 자를 말합니다.
2. "아이디(ID)"라 함은 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을 말합니다.

제3조 (약관의 효력 및 변경)
1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.
2. 회사는 사정상 중요한 사유가 발생될 경우 약관을 변경할 수 있으며, 변경된 약관은 전항과 같은 방법으로 공지함으로써 효력이 발생합니다.

제4조 (회원의 의무)
1. 회원은 관계법령, 본 약관의 규정, 이용안내 및 주의사항 등 회사가 통지하는 사항을 준수하여야 합니다.
2. 회원은 회사의 사전 승낙 없이 서비스를 이용하여 어떠한 영리행위도 할 수 없습니다.`,

    privacy: `1. 수집하는 개인정보 항목
회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
- 수집항목: 이름, 생년월일, 성별, 로그인ID, 비밀번호, 휴대전화번호, 이메일, 닉네임
- 개인정보 수집방법: 홈페이지(회원가입)

2. 개인정보의 수집 및 이용목적
회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
- 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 본인확인
- 회원 관리: 회원제 서비스 이용에 따른 식별, 가입 의사 확인, 연령확인

3. 개인정보의 보유 및 이용기간
회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.`,

    marketing: `1. 마케팅 정보 수신 동의
CarScope는 서비스를 운영함에 있어 각종 정보를 서비스 화면에 게재하거나 이메일, SMS, 알림톡 등의 방법으로 회원에게 제공할 수 있습니다.

2. 전송 방법
- 이메일 (E-mail)
- 휴대폰 문자메시지 (SMS/LMS/MMS)
- 앱 푸시 (App Push)

3. 전송 내용
- 혜택 정보, 이벤트 정보, 상품 정보, 신규 서비스 안내 등 광고성 정보

4. 철회 안내
회원은 언제든지 마케팅 정보 수신 동의를 철회할 수 있으며, 철회 시 혜택 및 이벤트 정보 제공이 제한될 수 있습니다. 철회는 '마이페이지 > 설정'에서 가능합니다.`
};

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
    
    const [isSigningUp, setIsSigningUp] = useState(false);

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
        gender: '',
        phone: '',
        emailLocal: '',
        emailDomain: 'naver.com',
        emailDomainCustom: '',
        nickname: '',
    });

    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        letter: false,
        number: false,
        special: false,
    });

    const [idValidation, setIdValidation] = useState(false);

    const loginIdRef = useRef(null);
    const emailLocalRef = useRef(null);
    const nicknameRef = useRef(null);

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

        if (name === 'loginId') {
            const regex = /^[a-zA-Z0-9]*$/;
            if (!regex.test(value)) return;
            setIsIdChecked(false); 
            validateId(value);
        }

        if (name === 'birthdate') {
            const regex = /^[0-9]*$/;
            if (!regex.test(value)) return;
            if (value.length > 8) {
                alert('생년월일은 8자리까지만 입력 가능합니다.');
                return;
            }
        }

        if (name === 'phone') {
            const regex = /^[0-9]*$/;
            if (!regex.test(value)) return;
        }

        if (name === 'password') validatePassword(value);
        
        if (name === 'emailLocal' || name === 'emailDomain') setIsEmailChecked(false);
        if (name === 'nickname') setIsNicknameChecked(false);

        setFormData(prev => ({ ...prev, [name]: value }));
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

    const checkDuplicateId = async () => {
        if (!formData.loginId) {
            alert('아이디를 입력해주세요.');
            loginIdRef.current.focus();
            return;
        }
        if (formData.loginId.length < 4) {
            alert('아이디는 4자 이상이어야 합니다.');
            loginIdRef.current.focus();
            return;
        }
        
        try {
            const q = query(collection(db, "users"), where("id", "==", formData.loginId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert('이미 사용 중인 아이디입니다.');
                setIsIdChecked(false);
                loginIdRef.current.focus();
            } else {
                alert('사용 가능한 아이디입니다.');
                setIsIdChecked(true);
            }
        } catch (error) {
            console.error(error);
            alert("중복 확인 중 오류가 발생했습니다.");
        }
    };

    const checkEmail = async () => {
        if (!formData.emailLocal) {
            alert('이메일 아이디를 입력해주세요.');
            emailLocalRef.current.focus();
            return;
        }

        const domain = formData.emailDomain === 'custom' ? formData.emailDomainCustom : formData.emailDomain;
        const fullEmail = `${formData.emailLocal}@${domain}`;

        try {
            const q = query(collection(db, "users"), where("email", "==", fullEmail));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert('이미 사용 중인 이메일입니다.');
                setIsEmailChecked(false);
            } else {
                alert('사용 가능한 이메일입니다.');
                setIsEmailChecked(true);
            }
        } catch (error) {
            console.error(error);
            alert("중복 확인 중 오류가 발생했습니다.");
        }
    };

    const checkDuplicateNickname = async () => {
        if (!formData.nickname) {
            alert('닉네임을 입력해주세요.');
            nicknameRef.current.focus();
            return;
        }

        try {
            const q = query(collection(db, "users"), where("nickname", "==", formData.nickname));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert('이미 사용 중인 닉네임입니다.');
                setIsNicknameChecked(false);
                nicknameRef.current.focus();
            } else {
                alert('사용 가능한 닉네임입니다.');
                setIsNicknameChecked(true);
            }
        } catch (error) {
            console.error(error);
            alert("중복 확인 중 오류가 발생했습니다.");
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const nextStep = async () => {
        if (step === 1) {
            if (!agreements.terms || !agreements.privacy) return alert('필수 약관에 동의해주세요.');
            setStep(2);
            window.scrollTo(0,0);
        } else if (step === 2) {
            if (!formData.loginId) return alert('아이디를 입력해주세요.');
            if (!isIdChecked) return alert('아이디 중복확인을 해주세요.');
            
            if (!formData.password) return alert('비밀번호를 입력해주세요.');
            if (formData.password !== formData.confirmPassword) return alert('비밀번호가 일치하지 않습니다.');
            
            if (!formData.name) return alert('이름을 입력해주세요.');
            
            if (!formData.birthdate) return alert('생년월일을 입력해주세요.');
            if (formData.birthdate.length !== 8) return alert('생년월일은 8자리로 입력해주세요. (예: 19900101)');

            if (!formData.gender) return alert('성별을 선택해주세요.');

            if (!formData.phone) return alert('휴대폰 번호를 입력해주세요.');
            
            if (!formData.emailLocal) return alert('이메일을 입력해주세요.');
            if (!isEmailChecked) return alert('이메일 중복확인을 해주세요.');

            if (!formData.nickname) return alert('닉네임을 입력해주세요.');
            if (!isNicknameChecked) return alert('닉네임 중복확인을 해주세요.');
            
            if (isSigningUp) return;
            setIsSigningUp(true);

            let secondaryApp;
            try {
                const domain = formData.emailDomain === 'custom' ? formData.emailDomainCustom : formData.emailDomain;
                const fullEmail = `${formData.emailLocal}@${domain}`;

                const mainApp = getApp();
                secondaryApp = initializeApp(mainApp.options, "Secondary");
                const secondaryAuth = getAuth(secondaryApp);

                const userCredential = await createUserWithEmailAndPassword(secondaryAuth, fullEmail, formData.password);
                const user = userCredential.user;

                await updateProfile(user, {
                    displayName: formData.nickname 
                });

                await setDoc(doc(db, "users", user.uid), {
                    id: formData.loginId,
                    email: fullEmail,
                    name: formData.name,
                    nickname: formData.nickname,
                    birthdate: formData.birthdate,
                    gender: formData.gender,
                    phone: formData.phone,
                    createdAt: new Date(),
                    isAdmin: false,
                    isJournalist: false
                });

                await signOut(secondaryAuth);
                setStep(3);
                window.scrollTo(0,0);

            } catch (error) {
                console.error(error);
                if (error.code === 'auth/email-already-in-use') {
                    alert("이미 가입된 이메일 주소입니다.");
                } else {
                    alert("회원가입 중 오류가 발생했습니다: " + error.message);
                }
            } finally {
                if (secondaryApp) {
                    deleteApp(secondaryApp);
                }
                setIsSigningUp(false);
            }
        }
    };

    const getModalContent = () => {
        switch(modalState.type) {
            case 'terms': return { title: '이용약관', content: termsText.terms };
            case 'privacy': return { title: '개인정보 처리방침', content: termsText.privacy };
            case 'marketing': return { title: '마케팅 정보 수신 동의', content: termsText.marketing };
            default: return { title: '', content: '' };
        }
    };

    const { title: modalTitle, content: modalContent } = getModalContent();

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
                            <button type="button" className="details-button" onClick={() => setModalState({isOpen:true, type:'terms'})}>보기</button>
                        </div>
                    </div>
                    <div className="agreement-box">
                        <div className="agreement-header">
                            <label>
                                <input type="checkbox" name="privacy" checked={agreements.privacy} onChange={handleAgreementChange} />
                                [필수] 개인정보 수집 및 이용 동의
                            </label>
                            <button type="button" className="details-button" onClick={() => setModalState({isOpen:true, type:'privacy'})}>보기</button>
                        </div>
                    </div>
                    <div className="agreement-box">
                        <div className="agreement-header">
                            <label>
                                <input type="checkbox" name="marketing" checked={agreements.marketing} onChange={handleAgreementChange} />
                                [선택] 마케팅 정보 수신 동의
                            </label>
                            <button type="button" className="details-button" onClick={() => setModalState({isOpen:true, type:'marketing'})}>보기</button>
                        </div>
                    </div>
                    <button type="button" className="full-btn" onClick={nextStep}>다음</button>
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
                                        placeholder="아이디 입력 (영문, 숫자만 가능)" 
                                        value={formData.loginId} 
                                        onChange={handleInputChange} 
                                        onFocus={() => setFocusedField('loginId')}
                                        onBlur={() => setFocusedField(null)}
                                        ref={loginIdRef}
                                        maxLength={20}
                                        disabled={isIdChecked}
                                    />
                                    {focusedField === 'loginId' && !isIdChecked && (
                                        <div className="validation-tooltip">
                                            <ul>
                                                <li className={idValidation ? 'valid' : 'invalid'}>
                                                    {idValidation ? '✓' : '•'} 4~20자 이내
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <button 
                                    type="button" 
                                    className="action-btn" 
                                    onClick={checkDuplicateId}
                                    disabled={isIdChecked}
                                >
                                    {isIdChecked ? '확인완료' : '중복확인'}
                                </button>
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
                            <input 
                                type="text" 
                                name="birthdate" 
                                placeholder="생년월일 8자리 (예: 19900101)" 
                                value={formData.birthdate} 
                                onChange={handleInputChange} 
                            />
                        </div>

                        <div className="input-group">
                            <label>성별</label>
                            <div className="gender-options">
                                <label className="gender-label">
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="male" 
                                        checked={formData.gender === 'male'} 
                                        onChange={handleInputChange} 
                                    />
                                    남성
                                </label>
                                <label className="gender-label">
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="female" 
                                        checked={formData.gender === 'female'} 
                                        onChange={handleInputChange} 
                                    />
                                    여성
                                </label>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>휴대폰 번호</label>
                            <input type="tel" name="phone" placeholder="'-' 없이 입력" value={formData.phone} onChange={handleInputChange} maxLength={11} />
                        </div>

                        <div className="input-group">
                            <label>이메일</label>
                            <div className="input-row email-row">
                                <div className="input-wrapper">
                                    <input 
                                        type="text" 
                                        name="emailLocal" 
                                        placeholder="이메일 아이디" 
                                        value={formData.emailLocal} 
                                        onChange={handleInputChange} 
                                        ref={emailLocalRef}
                                        disabled={isEmailChecked}
                                    />
                                </div>
                                <span className="email-at">@</span>
                                <div className="input-wrapper">
                                    <select 
                                        name="emailDomain" 
                                        value={formData.emailDomain} 
                                        onChange={handleInputChange}
                                        disabled={isEmailChecked}
                                    >
                                        <option value="naver.com">naver.com</option>
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="daum.net">daum.net</option>
                                    </select>
                                </div>
                                <button 
                                    type="button" 
                                    className="action-btn" 
                                    onClick={checkEmail}
                                    disabled={isEmailChecked}
                                >
                                    {isEmailChecked ? '확인완료' : '중복확인'}
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>닉네임</label>
                            <div className="input-row">
                                <div className="input-wrapper">
                                    <input 
                                        type="text" 
                                        name="nickname" 
                                        placeholder="닉네임 입력" 
                                        value={formData.nickname} 
                                        onChange={handleInputChange} 
                                        ref={nicknameRef}
                                        disabled={isNicknameChecked}
                                    />
                                </div>
                                <button 
                                    type="button" 
                                    className="action-btn" 
                                    onClick={checkDuplicateNickname}
                                    disabled={isNicknameChecked}
                                >
                                    {isNicknameChecked ? '확인완료' : '중복확인'}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="button" 
                            className="full-btn" 
                            onClick={nextStep}
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? "가입 처리중..." : "회원가입 완료"}
                        </button>
                    </form>
                </div>
            )}

            {step === 3 && (
                <div className="signup-step step-3">
                    <h2>회원가입이 완료되었습니다!</h2>
                    <p className="welcome-name">{formData.nickname || '회원'}님</p>
                    <p className="complete-msg">CarScope의 회원이 되신 것을 환영합니다.</p>
                    <button type="button" className="full-btn" onClick={() => navigate('/login')}>로그인하러 가기</button>
                </div>
            )}

            <TermsModal 
                isOpen={modalState.isOpen} 
                onClose={() => setModalState({isOpen:false, type:''})}
                title={modalTitle}
                content={modalContent} 
            />
        </div>
    );
};

export default SignUpPage;