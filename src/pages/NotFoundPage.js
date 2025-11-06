import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="error-code">404</h1>
            <h2 className="error-message">페이지를 찾을 수 없습니다.</h2>
            <p className="error-description">
                요청하신 주소의 페이지는 존재하지 않거나, 잘못된 경로로 접근하셨습니다.
            </p>
            <Link to="/" className="home-link-button">
                홈으로 돌아가기
            </Link>
        </div>
    );
};

export default NotFoundPage;