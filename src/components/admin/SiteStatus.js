import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../../styles/AdminPage.css';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MAX_PING_HISTORY = 10;

const SiteStatus = () => {
    const [firebaseStatus, setFirebaseStatus] = useState('확인 중...');
    const [ping, setPing] = useState('N/A');
    const [statusClass, setStatusClass] = useState('');
    const [pingHistory, setPingHistory] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);

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

            const newTime = new Date().toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

            setPingHistory(prev => {
                const updated = [...prev, latency];
                if (updated.length > MAX_PING_HISTORY) {
                    updated.shift();
                }
                return updated;
            });
            setChartLabels(prev => {
                const updated = [...prev, newTime];
                if (updated.length > MAX_PING_HISTORY) {
                    updated.shift();
                }
                return updated;
            });

        } catch (error) {
            setFirebaseStatus('오류');
            setStatusClass('error');
            setPing('N/A');
            console.error("Firebase connection error: ", error);
        }
    };

    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Ping (ms)',
                data: pingHistory,
                borderColor: 'rgb(74, 144, 226)',
                backgroundColor: 'rgba(74, 144, 226, 0.5)',
                fill: true,
                tension: 0.1
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="admin-widget">
            <h2 className="widget-title">사이트 상태</h2>
            <div className="status-grid">
                <div className="status-text">
                    <div className="status-item">
                        <span className="status-label">Firebase 연결:</span>
                        <span className={`status-value ${statusClass}`}>{firebaseStatus}</span>
                    </div>
                    <div className="status-item">
                        <span className="status-label">현재 핑:</span>
                        <span className="status-value">{ping}</span>
                    </div>
                </div>
                <div className="chart-container">
                    <Line options={chartOptions} data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default SiteStatus;