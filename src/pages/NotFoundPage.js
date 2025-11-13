import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>페이지를 찾을 수 없습니다.</h2>
                <p>요청하신 페이지가 존재하지 않거나, 주소가 변경되었을 수 있습니다.</p>
                <Link to="/" className="not-found-button">
                    홈으로 돌아가기
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;