import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
      <h2 style={{ fontSize: '2.5em', marginTop: '0' }}>CarScope에 오신 것을 환영합니다!</h2>
      <p style={{ fontSize: '1.2em' }}>위의 메뉴를 선택하여 원하는 리뷰 카테고리로 이동해주세요.</p>
    </div>
  );
}

function CategoryPage({ title }) {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
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
          <h1>🚗 CarScope: 차량 및 주차장 리뷰</h1>
          
          <nav>
            <Link to="/">홈</Link>
            <Link to="/car-reviews">차량 리뷰</Link>
            <Link to="/parking-reviews">주차장 리뷰</Link>
          </nav>
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