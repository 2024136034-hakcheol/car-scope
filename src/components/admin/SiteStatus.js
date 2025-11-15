import React from 'react';
import '../../styles/AdminPage.css';

const SiteStatus = () => {
    return (
        <div className="admin-widget">
            <h2 className="widget-title">사이트 상태</h2>
            <div className="status-item">
                <span className="status-label">Firebase 연결:</span>
                <span className="status-value ok">정상</span>
            </div>
            <div className="status-item">
                <span className="status-label">사이트 핑:</span>
                <span className="status-value">5ms</span>
            </div>
        </div>
    );
};

export default SiteStatus;