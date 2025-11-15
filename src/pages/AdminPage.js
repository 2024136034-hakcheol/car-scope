import React from 'react';
import SiteStatus from '../components/admin/SiteStatus';
import UserList from '../components/admin/UserList';
import '../styles/AdminPage.css';

const AdminPage = () => {
    return (
        <div className="admin-page-container page-content">
            <h1 className="admin-title">관리자 대시보드</h1>
            <div className="admin-widgets-grid">
                <SiteStatus />
                <UserList />
            </div>
        </div>
    );
};

export default AdminPage;