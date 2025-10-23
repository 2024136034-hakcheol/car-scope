import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import logo from './logo.png';

function HomePage() {
  return (
    <div className="main-content">
      <h2 style={{ fontSize: '2.5em', marginTop: '0' }}>CarScope에 오신 것을 환영합니다!</h2>
      <p style={{ fontSize: '1.2em' }}>신뢰할 수 있는 차량 및 주차장 리뷰를 확인하세요.</p>
    </div>
  );
}

function CategoryPage({ title }) {
    return (
        <div className="main-content">
            <h2>{title} 페이지</h2>
            <p>이 페이지는 현재 개발 중이며, 여기에 기능이 추가될 예정입니다.</p>
        </div>
    );
}


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="App-logo">
            <Link to="/">
              <img src={logo} alt="CarScope Logo" />
            </Link>
          </div>
          
          <div className="App-center-nav">
            <nav>
              <Link to="/parking">주차장</Link>
              <Link to="/community">커뮤니티</Link>
              <Link to="/news">뉴스</Link>
            </nav>
          </div>

          <div className="App-right-functions">
            <input type="text" placeholder="검색" className="search-input" />
            <button className="login-button">로그인</button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/parking" element={<CategoryPage title="주차장" />} />
          <Route path="/community" element={<CategoryPage title="커뮤니티" />} />
          <Route path="/news" element={<CategoryPage title="뉴스" />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;