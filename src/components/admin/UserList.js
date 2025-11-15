import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc, query, orderBy, limit, startAfter, endBefore, limitToLast } from 'firebase/firestore';
import '../../styles/AdminPage.css';

const USERS_PER_PAGE = 10;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState(null);
    const [firstDoc, setFirstDoc] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isUpdating, setIsUpdating] = useState(null);

    const fetchUsers = async (page = 1, direction = 'next') => {
        setLoading(true);
        try {
            let q;
            if (page === 1) {
                q = query(collection(db, "users"), orderBy("email"), limit(USERS_PER_PAGE));
            } else if (direction === 'next' && lastDoc) {
                q = query(collection(db, "users"), orderBy("email"), startAfter(lastDoc), limit(USERS_PER_PAGE));
            } else if (direction === 'prev' && firstDoc) {
                q = query(collection(db, "users"), orderBy("email"), endBefore(firstDoc), limitToLast(USERS_PER_PAGE));
            } else {
                q = query(collection(db, "users"), orderBy("email"), limit(USERS_PER_PAGE));
            }

            const querySnapshot = await getDocs(q);
            const usersList = querySnapshot.docs.map(doc => ({
                uid: doc.id,
                ...doc.data()
            }));

            if (usersList.length > 0) {
                setFirstDoc(querySnapshot.docs[0]);
                setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
                setUsers(usersList);
            } else if (direction === 'next') {
                alert("마지막 페이지입니다.");
                setLastDoc(null);
                setCurrentPage(prev => prev - 1);
            } else if (direction === 'prev') {
                alert("첫 페이지입니다.");
                setFirstDoc(null);
                setCurrentPage(prev => prev + 1);
            }
            
        } catch (error) {
            console.error("Error fetching users: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(1, 'next');
    }, []);

    const handleRoleChange = async (uid, newRole) => {
        setIsUpdating(uid);
        const userDocRef = doc(db, "users", uid);
        
        let roleData = {
            isAdmin: false,
            isJournalist: false,
        };

        if (newRole === 'admin') {
            roleData.isAdmin = true;
        } else if (newRole === 'journalist') {
            roleData.isJournalist = true;
        }
        
        try {
            await updateDoc(userDocRef, roleData);
            setUsers(users.map(user => 
                user.uid === uid ? { ...user, ...roleData } : user
            ));
        } catch (error) {
            alert("권한 변경에 실패했습니다.");
        } finally {
            setIsUpdating(null);
        }
    };

    const getUserRole = (user) => {
        if (user.isAdmin) return 'admin';
        if (user.isJournalist) return 'journalist';
        return 'general';
    };

    const goToNextPage = () => {
        if (!lastDoc && currentPage > 1) {
            alert("마지막 페이지입니다.");
            return;
        }
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        fetchUsers(newPage, 'next');
    };

    const goToPrevPage = () => {
        if (currentPage === 1) {
            alert("첫 페이지입니다.");
            return;
        }
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        fetchUsers(newPage, 'prev');
    };

    if (loading && users.length === 0) {
        return <div className="admin-widget"><h2>사용자 목록</h2><p>로딩 중...</p></div>;
    }

    return (
        <div className="admin-widget widget-full">
            <h2 className="widget-title">사용자 목록 (페이지 {currentPage})</h2>
            <div className="user-list-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>닉네임</th>
                            <th>이메일</th>
                            <th>이름</th>
                            <th>권한</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.uid}>
                                <td>{user.id}</td>
                                <td>{user.nickname}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>
                                    <select 
                                        className="role-select"
                                        value={getUserRole(user)} 
                                        onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                                        disabled={isUpdating === user.uid}
                                    >
                                        <option value="general">일반</option>
                                        <option value="journalist">기자</option>
                                        <option value="admin">관리자</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-controls">
                <button onClick={goToPrevPage} disabled={currentPage === 1}>이전</button>
                <span>페이지 {currentPage}</span>
                <button onClick={goToNextPage} disabled={users.length < USERS_PER_PAGE}>다음</button>
            </div>
        </div>
    );
};

export default UserList;