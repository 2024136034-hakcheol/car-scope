import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { auth, googleProvider, db } from '../firebase';
import { 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    setPersistence, 
    browserSessionPersistence, 
    browserLocalPersistence,
    signOut
} from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

const LoginPage = () => {
    const [idOrEmail, setIdOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberId, setRememberId] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedId = localStorage.getItem('savedId');
        if (savedId) {
            setIdOrEmail(savedId);
            setRememberId(true);
        }
    }, []);

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleCheckboxChange = (e, setter) => {
        setter(e.target.checked);
    };

    const checkUserStatus = async (uid) => {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.disabled) {
                await signOut(auth);
                throw new Error("ACCOUNT_DISABLED");
            }
        } else {
            await signOut(auth);
            throw new Error("ACCOUNT_DELETED");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (idOrEmail.trim() === '' || password.trim() === '') {
            alert('아이디(이메일)와 비밀번호를 모두 입력해주세요.');
            return;
        }

        let emailToLogin = idOrEmail;
        setLoading(true);

        try {
            const persistenceMode = keepLoggedIn ? browserLocalPersistence : browserSessionPersistence;
            await setPersistence(auth, persistenceMode);

            if (!idOrEmail.includes('@')) {
                const q = query(collection(db, "users"), where("id", "==", idOrEmail));
                const querySnapshot = await getDocs(q);
                
                if (querySnapshot.empty) {
                    alert("아이디가 존재하지 않습니다.");
                    setLoading(false);
                    return;
                }
                emailToLogin = querySnapshot.docs[0].data().email;
            }

            const userCredential = await signInWithEmailAndPassword(auth, emailToLogin, password);
            
            await checkUserStatus(userCredential.user.uid);

            if (rememberId) {
                localStorage.setItem('savedId', idOrEmail);
            } else {
                localStorage.removeItem('savedId');
            }

            navigate('/');

        } catch (error) {
            if (error.message === "ACCOUNT_DISABLED") {
                alert("관리자에 의해 사용이 중지된 계정입니다.");
            } else if (error.message === "ACCOUNT_DELETED") {
                alert("존재하지 않는 계정입니다.");
            } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                alert("비밀번호가 틀렸습니다.");
            } else if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
                alert("존재하지 않는 아이디입니다.");
            } else {
                alert('로그인 실패: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (platform) => {
        if (loading) return;
        setLoading(true);

        try {
            const persistenceMode = keepLoggedIn ? browserLocalPersistence : browserSessionPersistence;
            await setPersistence(auth, persistenceMode);

            if (platform === 'Google') {
                const userCredential = await signInWithPopup(auth, googleProvider);
                
                await checkUserStatus(userCredential.user.uid);

                const user = userCredential.user;
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    const userEmail = user.email.toLowerCase();
                    await setDoc(userDocRef, {
                        id: userEmail,
                        email: userEmail,
                        name: user.displayName,
                        nickname: user.displayName,
                        birthdate: '',
                        gender: 'none',
                        phone: ''
                    });
                }
                navigate('/');
            } else {
                alert(platform + ' 로그인은 현재 지원되지 않습니다.');
            }
        } catch (error) {
            if (error.message === "ACCOUNT_DISABLED") {
                alert("관리자에 의해 사용이 중지된 계정입니다.");
            } else if (error.message === "ACCOUNT_DELETED") {
                alert("계정 정보가 없습니다.");
            } else {
                alert(platform + ' 로그인 실패: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-page-container page-content">
            <div className="login-card">
                <h2>로그인</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <input
                            type="text"
                            name="idOrEmail"
                            placeholder="아이디 또는 이메일"
                            value={idOrEmail}
                            onChange={(e) => handleInputChange(e, setIdOrEmail)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => handleInputChange(e, setPassword)}
                            required
                        />
                        <button 
                            type="button" 
                            className="password-toggle-btn" 
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "숨기기" : "보이기"}
                        </button>
                    </div>
                    
                    <button type="submit" className="login-button-primary" disabled={loading}>
                        {loading ? "로그인 중..." : "로그인"}
                    </button>

                    <div className="login-options">
                        <label className="checkbox-label">
                            <input 
                                type="checkbox" 
                                checked={rememberId} 
                                onChange={(e) => handleCheckboxChange(e, setRememberId)} 
                            />
                            아이디 저장
                        </label>
                        <label className="checkbox-label">
                            <input 
                                type="checkbox" 
                                checked={keepLoggedIn} 
                                onChange={(e) => handleCheckboxChange(e, setKeepLoggedIn)} 
                            />
                            로그인 상태 유지
                        </label>
                    </div>
                </form>

                <div className="find-links">
                    <Link to="/find-id">아이디 찾기</Link>
                    <span>|</span>
                    <Link to="/find-password">비밀번호 찾기</Link>
                    <span>|</span>
                    <Link to="/signup">회원가입</Link>
                </div>

                <div className="social-login-section">
                    <p className="divider-text">또는 소셜 계정으로 로그인</p>
                    <div className="social-buttons">
                        <button className="social-button google" onClick={() => handleSocialLogin('Google')} disabled={loading}>
                            <span>Google 로그인</span>
                        </button>
                        <button className="social-button apple" onClick={() => handleSocialLogin('Apple')} disabled={loading}>
                            <span>Apple 로그인</span>
                        </button>
                        <button className="social-button kakao" onClick={() => handleSocialLogin('Kakao')} disabled={loading}>
                            <span>카카오 로그인</span>
                        </button>
                        <button className="social-button facebook" onClick={() => handleSocialLogin('Facebook')} disabled={loading}>
                            <span>Facebook 로그인</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;