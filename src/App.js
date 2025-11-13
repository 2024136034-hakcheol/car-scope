import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MembershipPage from './pages/MembershipPage';
import ParkingPage from './pages/ParkingPage';
import NotFoundPage from './pages/NotFoundPage';
import NewsPage from './pages/NewsPage'; 
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<MembershipPage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/parking" element={<ParkingPage />} />
                <Route path="/news" element={<NewsPage />} /> 
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;