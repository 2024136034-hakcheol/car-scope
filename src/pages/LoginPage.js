import React, { useState } from 'react';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="login-page-container">
            <div className="login-box">
                <h1>로그인</h1>

                <div className="input-group">
                    <label htmlFor="id-email">아이디 / 이메일</label>
                    <input 
                        type="text" 
                        id="id-email" 
                        placeholder="아이디 또는 이메일 주소" 
                        className="login-input"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <div className="password-input-group">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            className="login-input" 
                            placeholder="비밀번호"
                            style={{ width: '100%' }}
                        />
                        <button 
                            type="button" 
                            className="show-password-btn" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "숨기기" : "보이기"}
                        </button>
                    </div>
                </div>
                
                <button type="submit" className="login-submit-btn">로그인</button>

                <div className="link-section">
                    <a href="#">아이디 찾기</a>
                    <span>|</span>
                    <a href="#">비밀번호 찾기</a>
                    <span>|</span>
                    <a href="#">회원가입</a>
                </div>

                <div className="social-login-separator">
                    <span>또는</span>
                </div>

                <div className="social-login-buttons">
                    <button className="social-btn google-btn">Google로 로그인</button>
                    <button className="social-btn kakao-btn">Kakao로 로그인</button>
                    <button className="social-btn naver-btn">Naver로 로그인</button>
                    <button className="social-btn apple-btn">Apple로 로그인</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;