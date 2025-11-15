import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import '../../styles/AdminPage.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const q = query(collection(db, "users"), orderBy("email"));
                const querySnapshot = await getDocs(q);
                const usersList = querySnapshot.docs.map(doc => ({
                    uid: doc.id,
                    ...doc.data()
                }));
                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching users: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div className="admin-widget"><h2>사용자 목록 (총 0명)</h2><p>로딩 중...</p></div>;
    }

    return (
        <div className="admin-widget widget-full">
            <h2 className="widget-title">사용자 목록 (총 {users.length}명)</h2>
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
                                <td>{user.isAdmin ? '관리자' : '일반'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;