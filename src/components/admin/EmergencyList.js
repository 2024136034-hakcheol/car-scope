import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import '../../styles/AdminPage.css';

const EmergencyList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "emergency_requests"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const list = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate().toLocaleString() || ''
            }));
            setRequests(list);
        } catch (error) {
            console.error("Error fetching emergency requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        if (!window.confirm(`상태를 '${newStatus}'(으)로 변경하시겠습니까?`)) return;
        
        try {
            const reqRef = doc(db, "emergency_requests", id);
            await updateDoc(reqRef, { status: newStatus });
            // UI 즉시 업데이트
            setRequests(prev => prev.map(req => 
                req.id === id ? { ...req, status: newStatus } : req
            ));
        } catch (error) {
            alert("상태 변경 실패: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("정말로 이 내역을 삭제하시겠습니까?")) return;
        
        try {
            await deleteDoc(doc(db, "emergency_requests", id));
            setRequests(prev => prev.filter(req => req.id !== id));
        } catch (error) {
            alert("삭제 실패: " + error.message);
        }
    };

    const getStatusColor = (status) => {
        if (status === '접수대기') return '#e74c3c'; // 빨강
        if (status === '출동중') return '#f39c12'; // 주황
        if (status === '처리완료') return '#2ecc71'; // 초록
        return '#333';
    };

    if (loading) return <div className="admin-widget"><p>긴급출동 내역 로딩 중...</p></div>;

    return (
        <div className="admin-widget widget-full">
            <h2 className="widget-title">🚨 긴급출동 요청 내역</h2>
            <div className="user-list-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>접수시간</th>
                            <th>상태</th>
                            <th>고객명</th>
                            <th>연락처</th>
                            <th>차량번호</th>
                            <th>유형</th>
                            <th>위치</th>
                            <th>내용</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 ? (
                            <tr><td colSpan="9" style={{textAlign:'center', padding:'20px'}}>접수된 내역이 없습니다.</td></tr>
                        ) : (
                            requests.map(req => (
                                <tr key={req.id}>
                                    <td>{req.createdAt}</td>
                                    <td>
                                        <span style={{ fontWeight: 'bold', color: getStatusColor(req.status) }}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td>{req.name}</td>
                                    <td>{req.phone}</td>
                                    <td>{req.carNumber}</td>
                                    <td>{req.issueType}</td>
                                    <td>{req.location}</td>
                                    <td title={req.description}>
                                        {req.description.length > 10 ? req.description.substring(0, 10) + '...' : req.description}
                                    </td>
                                    <td className="action-buttons">
                                        <select 
                                            className="role-select"
                                            value={req.status} 
                                            onChange={(e) => handleStatusChange(req.id, e.target.value)}
                                        >
                                            <option value="접수대기">접수대기</option>
                                            <option value="출동중">출동중</option>
                                            <option value="처리완료">처리완료</option>
                                        </select>
                                        <button className="delete-button" style={{padding:'5px', marginLeft:'5px'}} onClick={() => handleDelete(req.id)}>삭제</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmergencyList;