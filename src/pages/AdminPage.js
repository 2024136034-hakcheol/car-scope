import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import UserList from '../components/admin/UserList'; 
import EmergencyList from '../components/admin/EmergencyList';
import InquiryList from '../components/admin/InquiryList'; 
import '../styles/AdminPage.css';

const AdminPage = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [newUsersToday, setNewUsersToday] = useState(0);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const usersSnapshot = await getDocs(collection(db, "users"));
                setTotalUsers(usersSnapshot.size);

                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const todayQuery = query(
                    collection(db, "users"),
                    where("createdAt", ">=", today)
                );
                const todaySnapshot = await getDocs(todayQuery);
                setNewUsersToday(todaySnapshot.size);

                const mockData = [
                    { name: '11/25', users: 120 },
                    { name: '11/26', users: 132 },
                    { name: '11/27', users: 101 },
                    { name: '11/28', users: 134 },
                    { name: '11/29', users: 190 },
                    { name: '11/30', users: 230 },
                    { name: '12/01', users: 210 },
                ];
                setChartData(mockData);

            } catch (error) {
                console.error(error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="admin-page-container page-content">
            <h1 className="admin-title">관리자 대시보드</h1>
            
            <div className="admin-widgets-grid-single">
                <div className="admin-widget">
                    <h2 className="widget-title">시스템 현황</h2>
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
                                <span className="status-value ok">정상 가동 중</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">DB 연결</span>
                                <span className="status-value ok">양호</span>
                            </div>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" hide />
                                    <YAxis hide />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#fff', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '8px',
                                            fontSize: '0.9rem'
                                        }}
                                        itemStyle={{ color: '#1E90FF', fontWeight: 'bold' }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="users" 
                                        stroke="#1E90FF" 
                                        strokeWidth={3} 
                                        dot={{ r: 4 }} 
                                        activeDot={{ r: 6 }} 
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <EmergencyList />
                
                <InquiryList />

                <UserList />
            </div>
        </div>
    );
};

export default AdminPage;