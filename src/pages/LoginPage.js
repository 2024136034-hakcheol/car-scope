import React, { useState } from 'react';

const LoginPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const allowedCharsRegex = /^[a-zA-Z!@#$%^&*()_+-=,./<>?;:'"\\|`~]*$/;

    const handleIdChange = (e) => {
        const newValue = e.target.value;
        if (allowedCharsRegex.test(newValue)) {
            setId(newValue);
        } else if (newValue.length > id.length) {
            alert('아이디는 영어 또는 특수문자만 입력 가능합니다.');
        } else {
            setId(newValue);
        }
    };

    const handlePasswordChange = (e) => {
        const newValue = e.target.value;
        if (allowedCharsRegex.test(newValue)) {
            setPassword(newValue);
        } else if (newValue.length > password.length) {
            alert('비밀번호는 영어 또는 특수문자만 입력 가능합니다.');
        } else {
            setPassword(newValue);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 시도:', { id, password });
        alert(`로그인 시도\nID: ${id}\nPassword: ${password}`);
    };

    return (
        <div className="login-page-container">
            <div className="login-box">
                <h1>로그인</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="id">아이디</label>
                        <input
                            id="id"
                            type="text"
                            className="login-input"
                            value={id}
                            onChange={handleIdChange}
                            placeholder="아이디(영어, 특수문자만)"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호</label>
                        <div className="password-input-group">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className="login-input"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="비밀번호(영어, 특수문자만)"
                                required
                            />
                            <button
                                type="button"
                                className="show-password-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '숨기기' : '표시'}
                            </button>
                        </div>
                    </div>
                    
                    <button type="submit" className="login-submit-btn">
                        로그인
                    </button>
                </form>

                {/* 아이디 찾기/비밀번호 찾기/회원가입 링크를 로그인 버튼 바로 아래에 배치 */}
                <div className="link-section">
                    <a href="/find-id">아이디 찾기</a> | 
                    <a href="/find-password">비밀번호 찾기</a> | 
                    <a href="/join">회원가입</a>
                </div>

                <div className="social-login-separator">
                    <span>또는</span>
                </div>

                <div className="social-login-buttons">
                    <button type="button" className="social-btn google-btn">Google로 로그인</button>
                    <button type="button" className="social-btn kakao-btn">카카오로 로그인</button>
                    <button type="button" className="social-btn naver-btn">네이버로 로그인</button>
                    <button type="button" className="social-btn apple-btn">Apple로 로그인</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;