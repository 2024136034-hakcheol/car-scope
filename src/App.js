import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './App.css'; 

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/news" element={<HomePage />} />
                    <Route path="/parking" element={<HomePage />} />
                    <Route path="/membership" element={<HomePage />} />
                    <Route path="/faq" element={<HomePage />} />
                    <Route path="/contact" element={<HomePage />} />
                    <Route path="/privacy" element={<HomePage />} />
                    <Route path="/terms" element={<HomePage />} />
                    <Route path="/emergency" element={<HomePage />} />
                    <Route path="/register" element={<HomePage />} />
                    <Route path="/find-password" element={<HomePage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;