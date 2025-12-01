import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc, query, where, orderBy, limit, startAfter, endBefore, limitToLast, deleteDoc } from 'firebase/firestore';
import '../../styles/AdminPage.css';
import UserEditModal from './UserEditModal';

const USERS_PER_PAGE = 10;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState(null);
    const [firstDoc, setFirstDoc] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isUpdating, setIsUpdating] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

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
            } else if (direction === 'next' && page > 1) {
                alert("마지막 페이지입니다.");
                setLastDoc(null);
                setCurrentPage(prev => prev - 1);
            } else if (direction === 'prev' && page > 0) {
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

    const handleSaveUser = async (updatedUser) => {
        setIsUpdating(updatedUser.uid);
        const { uid, ...userData } = updatedUser;
        const userDocRef = doc(db, "users", uid);

        if (updatedUser.id !== editingUser.id) {
            const q = query(collection(db, "users"), where("id", "==", updatedUser.id));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                alert("이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.");
                setIsUpdating(null);
                return;
            }
        }
        
        try {
            await updateDoc(userDocRef, userData);
            setUsers(users.map(user => 
                user.uid === uid ? updatedUser : user
            ));
            setEditingUser(null);
        } catch (error) {
            alert("정보 저장에 실패했습니다.");
        } finally {
            setIsUpdating(null);
        }
    };

    const handlePasswordReset = async (email) => {
        if (!window.confirm(`${email} 사용자에게 비밀번호 재설정 이메일을 발송하시겠습니까?`)) {
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert("비밀번호 재설정 이메일을 발송했습니다.");
        } catch (error) {
            alert("이메일 발송에 실패했습니다: " + error.message);
        }
    };

    const handleDisableUser = async (uid, email) => {
        if (!window.confirm(`${email} 사용자의 계정을 사용 중지하시겠습니까?\n이 작업은 사용자가 로그인할 수 없게 합니다.`)) {
            return;
        }
        setIsUpdating(uid);
        const userDocRef = doc(db, "users", uid);
        try {
            await updateDoc(userDocRef, { disabled: true });
            setUsers(users.map(user => 
                user.uid === uid ? { ...user, disabled: true } : user
            ));
            alert("계정이 사용 중지되었습니다.");
        } catch (error) {
            alert("계정 사용 중지에 실패했습니다: " + error.message);
        } finally {
            setIsUpdating(null);
        }
    };

    const handleEnableUser = async (uid, email) => {
        if (!window.confirm(`${email} 사용자의 계정을 다시 활성화하시겠습니까?`)) {
            return;
        }
        setIsUpdating(uid);
        const userDocRef = doc(db, "users", uid);
        try {
            await updateDoc(userDocRef, { disabled: false });
            setUsers(users.map(user => 
                user.uid === uid ? { ...user, disabled: false } : user
            ));
            alert("계정이 활성화되었습니다.");
        } catch (error) {
            alert("계정 활성화에 실패했습니다: " + error.message);
        } finally {
            setIsUpdating(null);
        }
    };

    const handleDeleteUser = async (uid, email) => {
        if (!window.confirm(`${email} 사용자의 계정을 완전히 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
            return;
        }
        if (!window.confirm("정말로 삭제하시겠습니까? 사용자의 모든 데이터가 삭제됩니다.")) {
            return;
        }
        setIsUpdating(uid);
        const userDocRef = doc(db, "users", uid);
        try {
            await deleteDoc(userDocRef);
            setUsers(users.filter(user => user.uid !== uid));
            alert("계정이 삭제되었습니다.");
        } catch (error) {
            alert("계정 삭제에 실패했습니다: " + error.message);
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
        <>
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
                                <th>생년월일</th>
                                <th>성별</th>
                                <th>전화번호</th>
                                <th>권한</th>
                                <th>수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.uid}>
                                    <td>{user.id}</td>
                                    <td>{user.nickname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>{user.birthdate}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.phone}</td>
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
                                    <td className="action-buttons">
                                        <button 
                                            className="edit-button"
                                            onClick={() => setEditingUser(user)}
                                            disabled={isUpdating === user.uid}
                                        >
                                            수정
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination-controls">
                    <button onClick={goToPrevPage} disabled={currentPage === 1 || loading}>이전</button>
                    <span>페이지 {currentPage}</span>
                    <button onClick={goToNextPage} disabled={users.length < USERS_PER_PAGE || loading}>다음</button>
                </div>
            </div>

            {editingUser && (
                <UserEditModal 
                    user={editingUser}
                    onSave={handleSaveUser}
                    onClose={() => setEditingUser(null)}
                    onPasswordReset={handlePasswordReset}
                    onDisableUser={handleDisableUser}
                    onEnableUser={handleEnableUser}
                    onDeleteUser={handleDeleteUser}
                />
            )}
        </>
    );
};

export default UserList;