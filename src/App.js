import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

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
            <p>이 페이지는 현재 개발 중이며, 여기에 로그인 및 리뷰 기능이 추가될 예정입니다.</p>
        </div>
    );
}


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="App-logo-text">🚗 CarScope</div>
          
          <div className="App-nav-container">
            <nav>
              <Link to="/">홈</Link>
              <Link to="/car-reviews">차량 리뷰</Link>
              <Link to="/parking-reviews">주차장 리뷰</Link>
            </nav>
            
            <button className="search-icon">🔍</button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/car-reviews" element={<CategoryPage title="차량 리뷰" />} />
          <Route path="/parking-reviews" element={<CategoryPage title="주차장 리뷰" />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;