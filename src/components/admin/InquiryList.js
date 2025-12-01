import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import '../../styles/AdminPage.css';

const InquiryList = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const list = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate().toLocaleString() || ''
            }));
            setInquiries(list);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        if (!window.confirm(`상태를 '${newStatus}'(으)로 변경하시겠습니까?`)) return;
        
        try {
            const reqRef = doc(db, "inquiries", id);
            await updateDoc(reqRef, { status: newStatus });
            setInquiries(prev => prev.map(item => 
                item.id === id ? { ...item, status: newStatus } : item
            ));
        } catch (error) {
            alert("상태 변경 실패: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("정말로 이 문의 내역을 삭제하시겠습니까?")) return;
        
        try {
            await deleteDoc(doc(db, "inquiries", id));
            setInquiries(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            alert("삭제 실패: " + error.message);
        }
    };

    const getStatusColor = (status) => {
        if (status === '답변대기') return '#e74c3c';
        if (status === '답변완료') return '#2ecc71';
        return '#333';
    };

    if (loading) return <div className="admin-widget"><p>문의 내역 로딩 중...</p></div>;

    return (
        <div className="admin-widget widget-full">
            <h2 className="widget-title">💬 1:1 문의 접수 내역</h2>
            <div className="user-list-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>접수시간</th>
                            <th>상태</th>
                            <th>유형</th>
                            <th>작성자</th>
                            <th>연락처</th>
                            <th>제목</th>
                            <th>내용</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.length === 0 ? (
                            <tr><td colSpan="8" style={{textAlign:'center', padding:'20px'}}>접수된 문의가 없습니다.</td></tr>
                        ) : (
                            inquiries.map(item => (
                                <tr key={item.id}>
                                    <td>{item.createdAt}</td>
                                    <td>
                                        <span style={{ fontWeight: 'bold', color: getStatusColor(item.status) }}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>{item.category}</td>
                                    <td>{item.name}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.title}</td>
                                    <td title={item.content}>
                                        {item.content.length > 15 ? item.content.substring(0, 15) + '...' : item.content}
                                    </td>
                                    <td className="action-buttons">
                                        <select 
                                            className="role-select"
                                            value={item.status} 
                                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                        >
                                            <option value="답변대기">답변대기</option>
                                            <option value="답변완료">답변완료</option>
                                        </select>
                                        <button className="delete-button" style={{padding:'5px', marginLeft:'5px'}} onClick={() => handleDelete(item.id)}>삭제</button>
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

export default InquiryList;