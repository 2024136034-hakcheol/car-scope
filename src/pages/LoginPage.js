import React, { useState } from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('로그인 시도:', { email, password });
        // 여기에 실제 로그인 로직을 추가합니다.
    };

    return (
        <div className="main-content">
            <div className="login-container">
                <h2 className="login-title">로그인</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">아이디 / 이메일</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="아이디 또는 이메일 주소"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <div className="password-input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "숨기기" : "보이기"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="login-submit-button">
                        로그인
                    </button>
                </form>

                <div className="login-links">
                    <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a> | <a href="#">회원가입</a>
                </div>

                <div className="social-login-separator">또는</div>
                
                <div className="social-login-buttons">
                    <button className="social-button google-login">Google로 로그인</button>
                    <button className="social-button kakao-login">Kakao로 로그인</button>
                    <button className="social-button naver-login">Naver로 로그인</button>
                    <button className="social-button apple-login">Apple로 로그인</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;