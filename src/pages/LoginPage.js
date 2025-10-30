import React from 'react';
import '../App.css';

function LoginPage() {
  return (
    <div className="main-content">
      <div className="login-container">
        <h2 className="login-title">로그인</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" placeholder="이메일 주소" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" placeholder="비밀번호" required />
          </div>
          <button type="submit" className="login-submit-button">로그인</button>
        </form>
        <div className="login-links">
          <a href="/find-password">비밀번호 찾기</a>
          <span> | </span>
          <a href="/register">회원가입</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;