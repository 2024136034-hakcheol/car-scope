import React, { useState } from 'react';
import '../App.css'; 

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="main-content">
      <div className="login-container">
        <h2 className="login-title">로그인</h2>
        <form className="login-form">
          
          <div className="form-group">
            <label htmlFor="id_email">아이디 / 이메일</label>
            <input type="text" id="id_email" placeholder="아이디 또는 이메일 주소" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <div className="password-input-group">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="비밀번호" 
                required 
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className="password-toggle-button"
              >
                {showPassword ? '숨기기' : '보이기'}
              </button>
            </div>
          </div>
          
          <button type="submit" className="login-submit-button">로그인</button>
        </form>
        
        <div className="login-links">
          <a href="/find-password">비밀번호 찾기</a>
          <span> | </span>
          <a href="/register">회원가입</a>
        </div>

        <div className="social-login-separator">
            <span>또는</span>
        </div>
        
        <div className="social-login-buttons">
            <button className="social-button google-login">Google로 로그인</button>
            <button className="social-button kakao-login">Kakao로 로그인</button>
            <button className="social-button naver-login">Naver로 로그인</button>
            <button className="social-button apple-login">Apple로 로그인</button> {/* Apple 버튼 추가 */}
        </div>
        
      </div>
    </div>
  );
}

export default LoginPage;