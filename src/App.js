import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MembershipPage from './pages/MembershipPage';

const Header = () => {
  return (
    <header className="app-header">
      <nav>
        <Link to="/" className="logo">CarScope</Link>
        <div className="nav-links">
          <Link to="/">홈</Link>
          <Link to="/reviews">리뷰</Link>
          <Link to="/parking">주차</Link>
          <Link to="/membership" className="membership-link">
            멤버십 ✨
          </Link>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; 2024 CarScope. All rights reserved.</p>
      <p>
        <Link to="/policy">개인정보처리방침</Link> | 
        <Link to="/terms">이용약관</Link>
      </p>
    </footer>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/reviews" element={<div>리뷰 페이지</div>} />
          <Route path="/parking" element={<div>주차장 페이지</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;