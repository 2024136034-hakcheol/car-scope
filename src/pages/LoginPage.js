import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="login-page-container">
            <div className="login-box">
                <h1>로그인</h1>
                <div className="input-group">
                    <label htmlFor="username">아이디 / 이메일</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="아이디 또는 이메일 주소" 
                        className="login-input" 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <div className="password-input-group">
                        <input 
                            type="password" 
                            id="password" 
                            className="login-input" 
                        />
                        <button className="show-password-btn">보이기</button>
                    </div>
                </div>
                
                <button className="login-submit-btn">로그인</button>
                
                <div className="link-section">
                    <Link to="/find-id">아이디 찾기</Link> | 
                    <Link to="/find-pw">비밀번호 찾기</Link> | 
                    <Link to="/join">회원가입</Link>
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