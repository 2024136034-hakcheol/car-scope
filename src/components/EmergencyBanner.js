import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/EmergencyBanner.css';

const EmergencyBanner = () => {
    const location = useLocation();

    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <div className="emergency-banner">
            <div className="banner-header">
                <span className="emergency-icon">🚨</span>
                <h3>긴급출동</h3>
            </div>
            <div className="banner-content">
                <p>24시간<br />신속대기</p>
                <div className="phone-number">
                    1588<br />0000
                </div>
                <button className="request-btn">접수하기</button>
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