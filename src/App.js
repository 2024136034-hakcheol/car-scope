import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NewsPage from './pages/NewsPage';
import MembershipPage from './pages/MembershipPage';
import AdminPage from './pages/AdminPage';
import AdminRoute from './components/AdminRoute';
import GuestRoute from './components/GuestRoute';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ParkingPage from './pages/ParkingPage';
import NotFoundPage from './pages/NotFoundPage';
import EmergencyBanner from './components/EmergencyBanner';
import MyPage from './pages/MyPage';
import ContactPage from './pages/ContactPage';
import EmergencyPage from './pages/EmergencyPage';

function App() {
  return (
    <Router>
      <Header />
      <EmergencyBanner /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route 
          path="/login" 
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <GuestRoute>
              <SignUpPage />
            </GuestRoute>
          } 
        />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } 
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;