import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NewsPage from './pages/NewsPage';
import ParkingPage from './pages/ParkingPage';
import MembershipPage from './pages/MembershipPage';
import AdminPage from './pages/AdminPage';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } 
        />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;