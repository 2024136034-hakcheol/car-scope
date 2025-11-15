import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { auth, googleProvider, db } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const LoginPage = () => {
    const [idOrEmail, setIdOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (idOrEmail.trim() === '' || password.trim() === '') {
            alert('아이디(이메일)와 비밀번호를 모두 입력해주세요.');
            return;
        }

        let emailToLogin = idOrEmail;
        let isIdLogin = false;

        try {
            if (!idOrEmail.includes('@')) {
                isIdLogin = true;
                const q = query(collection(db, "users"), where("id", "==", idOrEmail));
                const querySnapshot = await getDocs(q);
                
                if (querySnapshot.empty) {
                    alert("아이디가 틀렸습니다 다시 입력해주세요");
                    return;
                }
                
                emailToLogin = querySnapshot.docs[0].data().email;
            }

            await signInWithEmailAndPassword(auth, emailToLogin, password);
            navigate('/');

        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                if (isIdLogin) {
                    alert("비밀번호가 틀렸습니다 다시 입력해주세요");
                } else {
                    alert("이메일 또는 비밀번호가 틀렸습니다. 다시 입력해주세요.");
                }
            } else {
                alert('로그인 실패: ' + error.message);
            }
        }
    };

    const handleSocialLogin = async (platform) => {
        try {
            if (platform === 'Google') {
                await signInWithPopup(auth, googleProvider);
                navigate('/');
            } else {
                alert(platform + ' 로그인은 현재 지원되지 않습니다.');
            }
        } catch (error) {
            alert(platform + ' 로그인 실패: ' + error.message);
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
                    <button type="submit" className="login-button-primary">로그인</button>
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
                        <button className="social-button google" onClick={() => handleSocialLogin('Google')}>
                            <span>Google 로그인</span>
                        </button>
                        <button className="social-button apple" onClick={() => handleSocialLogin('Apple')}>
                            <span>Apple 로그인</span>
                        </button>
                        <button className="social-button kakao" onClick={() => handleSocialLogin('Kakao')}>
                            <span>카카오 로그인</span>
                        </button>
                        <button className="social-button facebook" onClick={() => handleSocialLogin('Facebook')}>
                            <span>Facebook 로그인</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;