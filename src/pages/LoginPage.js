import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e, setter) => {
        const value = e.target.value;
        const name = e.target.name;
        
        if (name === 'userId' || name === 'password') {
            const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
            
            if (!regex.test(value)) {
                alert('아이디와 비밀번호에는 영문, 숫자, 특수문자만 입력할 수 있습니다.');
                return;
            }
            setter(value);
        } else {
            setter(value);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (userId.trim() === '' || password.trim() === '') {
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        alert(`로그인 시도: ID ${userId}`);
    };

    const handleSocialLogin = (platform) => {
        alert(`${platform} 소셜 로그인 시도`);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-page-container">
            <div className="login-card">
                <h2>로그인</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <input
                            type="text"
                            name="userId"
                            placeholder="아이디"
                            value={userId}
                            onChange={(e) => handleInputChange(e, setUserId)}
                            required
                        />
                    </div>
                    <div className="input-group password-input-group">
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