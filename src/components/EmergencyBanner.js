import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/EmergencyBanner.css';

const EmergencyBanner = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollTop(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleEmergencyClick = () => {
        navigate('/emergency');
    };

    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <div 
            className="emergency-banner" 
            style={{ top: `${scrollTop + 250}px` }}
        >
            <div className="banner-header">
                <span className="emergency-icon">🚨</span>
                <h3>긴급출동</h3>
            </div>
            <div className="banner-content">
                <button className="request-btn" onClick={handleEmergencyClick}>
                    서비스<br/>접수하기
                </button>
            </div>
            <div className="banner-footer">
                <p>배터리 방전</p>
                <p>타이어 펑크</p>
                <p>비상 견인</p>
            </div>
        </div>
    );
};

export default EmergencyBanner;