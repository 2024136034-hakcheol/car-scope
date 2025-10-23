import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>CarScope에 오신 것을 환영합니다!</h2>
      <p>위의 메뉴를 선택하여 원하는 리뷰 카테고리로 이동해주세요.</p>
    </div>
  );
}

function CategoryPage({ title }) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>{title} 페이지</h2>
        <p>이 페이지는 현재 개발 중이며, 여기에 로그인 및 리뷰 기능이 추가될 예정입니다.</p>
    </div>;
}


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
          <h1>🚗 CarScope: 차량 및 주차장 리뷰</h1>
          
          <nav style={{ padding: '10px 0', width: '100%', borderTop: '1px solid #444', borderBottom: '1px solid #444' }}>
            <Link to="/" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none' }}>홈</Link>
            <Link to="/car-reviews" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none' }}>차량 리뷰</Link>
            <Link to="/parking-reviews" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none' }}>주차장 리뷰</Link>
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