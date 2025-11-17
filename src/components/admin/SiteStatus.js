import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../../styles/AdminPage.css';

const SiteStatus = () => {
    const [firebaseStatus, setFirebaseStatus] = useState('확인 중...');
    const [ping, setPing] = useState('N/A');
    const [statusClass, setStatusClass] = useState('');

    useEffect(() => {
        const checkStatus = async () => {
            const startTime = performance.now();
            try {
                const docRef = doc(db, "users", "status_check");
                await getDoc(docRef); 
                
                const endTime = performance.now();
                const latency = Math.round(endTime - startTime);
                
                setFirebaseStatus('정상');
                setStatusClass('ok');
                setPing(`${latency}ms`);

            } catch (error) {
                setFirebaseStatus('오류');
                setStatusClass('error');
                setPing('N/A');
                console.error("Firebase connection error: ", error);
            }
        };

        checkStatus();
    }, []);

    return (
        <div className="admin-widget">
            <h2 className="widget-title">사이트 상태</h2>
            <div className="status-item">
                <span className="status-label">Firebase 연결:</span>
                <span className={`status-value ${statusClass}`}>{firebaseStatus}</span>
            </div>
            <div className="status-item">
                <span className="status-label">사이트 핑:</span>
                <span className="status-value">{ping}</span>
            </div>
        </div>
    );
};

export default SiteStatus;