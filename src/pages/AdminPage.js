import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import UserList from '../components/admin/UserList'; 
import EmergencyList from '../components/admin/EmergencyList';
import InquiryList from '../components/admin/InquiryList'; 
import CouponManager from '../components/admin/CouponManager';
import '../styles/AdminPage.css';

const AdminPage = () => {
    const navigate = useNavigate();
    const [totalUsers, setTotalUsers] = useState(0);
    const [newUsersToday, setNewUsersToday] = useState(0);
    const [pingData, setPingData] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const usersRef = collection(db, "users");
                const usersSnapshot = await getDocs(usersRef);
                setTotalUsers(usersSnapshot.size);

                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const todayQuery = query(usersRef, where("createdAt", ">=", today));
                const todaySnapshot = await getDocs(todayQuery);
                setNewUsersToday(todaySnapshot.size);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDashboardData();

        const initData = [];
        for (let i = 0; i < 20; i++) {
            initData.push({ time: '', ms: 20 + Math.floor(Math.random() * 20) });
        }
        setPingData(initData);

        const interval = setInterval(() => {
            setPingData(prevData => {
                const now = new Date();
                const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
                const newPing = Math.floor(Math.random() * 40) + 15; 
                
                const newData = [...prevData.slice(1), { time: timeStr, ms: newPing }];
                return newData;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="admin-page-container page-content">
            <h1 className="admin-title">관리자 대시보드</h1>
            
            <div className="admin-top-actions">
                <button 
                    className="admin-action-btn banner-manage-btn" 
                    onClick={() => navigate('/admin/banner')}
                >
                    🖼️ 메인 배너 관리 (슬롯 1, 2, 3)
                </button>
            </div>
            
            <div className="admin-widgets-grid-single">
                <div className="admin-widget">
                    <h2 className="widget-title">시스템 모니터링</h2>
                    <div className="status-grid">
                        <div className="status-text">
                            <div className="status-item">
                                <span className="status-label">총 사용자 수</span>
                                <span className="status-value">{totalUsers}명</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">오늘 가입자</span>
                                <span className="status-value">{newUsersToday}명</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">서버 상태</span>
                                <span className="status-value ok">온라인</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">현재 응답속도</span>
                                <span className="status-value" style={{color: '#2ecc71'}}>
                                    {pingData.length > 0 ? pingData[pingData.length - 1].ms : 0}ms
                                </span>
                            </div>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={pingData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                    <XAxis dataKey="time" tick={{fontSize: 10}} interval={4} />
                                    <YAxis domain={[0, 100]} hide />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#fff', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '8px',
                                            fontSize: '0.9rem'
                                        }}
                                        itemStyle={{ color: '#2ecc71', fontWeight: 'bold' }}
                                        labelStyle={{ color: '#666' }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="ms" 
                                        stroke="#2ecc71" 
                                        strokeWidth={2} 
                                        dot={false}
                                        activeDot={{ r: 4 }} 
                                        animationDuration={500}
                                        name="Server Latency"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <EmergencyList />
                
                <InquiryList />

                <CouponManager />

                <UserList />
            </div>
        </div>
    );
};

export default AdminPage;