import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png'; 
import LoginPage from './pages/LoginPage';
import ParkingPage from './pages/ParkingPage';
import NewsPage from './pages/NewsPage';

const HomePage = () => (
  <div className="main-content">
    <h1>CarScope에 오신 것을 환영합니다!</h1>
    <p>신뢰할 수 있는 차량 및 주차장 리뷰를 확인하세요.</p>
  </div>
);

const CommunityPage = () => (
  <div className="main-content">
    <h1>커뮤니티 페이지</h1>
    <p>이 페이지는 현재 개발 중이며, 여기에 커뮤니티 기능이 추가될 예정입니다.</p>
  </div>
);

const CarPage = () => (
  <div className="main-content">
    <h1>차량 페이지</h1>
    <p>이 페이지는 현재 개발 중이며, 여기에 차량 관련 기능이 추가될 예정입니다.</p>
  </div>
);


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="App-logo">
            <img src={logo} alt="CarScope Logo" />
          </Link>
          
          <div className="App-center-nav">
            <nav>
              <Link to="/parking">주차장</Link>
              <Link to="/community">커뮤니티</Link>
              <Link to="/news">뉴스</Link>
              <Link to="/car">차량</Link>
            </nav>
          </div>
          
          <div className="App-right-functions">
            <input type="text" placeholder="검색" className="search-input" />
            <Link to="/login" className="login-button">로그인</Link>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/parking" element={<ParkingPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/car" element={<CarPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;