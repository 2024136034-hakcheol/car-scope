import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가됨
import '../styles/Header.css';
import { AuthContext } from '../AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
    const { currentUser, dbUser, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            navigate('/'); // 로그아웃 후 홈으로 이동
        } catch (error) {
            alert('로그아웃 실패: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // ▼▼▼ 검색 기능 함수 ▼▼▼
    const handleSearch = (e) => {
        // 엔터키를 눌렀거나, 검색 버튼을 클릭했을 때 실행
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchTerm.trim()) {
                // 검색 결과 페이지로 이동 (쿼리스트링 q 사용)
                navigate(`/search?q=${searchTerm}`);
                setSearchTerm(''); // 이동 후 입력창 비우기
            }
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left-section">
                    <Link to="/" className="logo">CarScope</Link>
                </div>
                
                <div className="header-center-section">
                    <div className="search-bar">
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="차량명, 지역명 등으로 검색" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch} // 엔터키 입력 감지
                        />
                        <button className="search-button" onClick={handleSearch}>🔍</button> 
                    </div>
                </div>
                
                <div className="header-right-section">
                    <nav className="nav-menu">
                        <ul>
                            <li><Link to="/news">뉴스</Link></li>
                            <li><Link to="/parking">주차장</Link></li>
                            <li><Link to="/membership">멤버십</Link></li>
                            {dbUser && dbUser.isAdmin && (
                                <li><Link to="/admin">관리자</Link></li>
                            )}
                        </ul>
                    </nav>
                    <div className="auth-buttons">
                        {currentUser ? (
                            <div 
                                className="user-menu-container"
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <span className="user-nickname">
                                    {dbUser ? dbUser.nickname : (currentUser.displayName || "사용자")}님 ▼
                                </span>
                                
                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        <Link to="/mypage" className="dropdown-item">마이페이지</Link>
                                        <button 
                                            onClick={handleLogout} 
                                            className="dropdown-item logout-item"
                                            disabled={loading}
                                        >
                                            로그아웃
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="auth-button login-button">로그인</Link>
                                <Link to="/signup" className="auth-button register-button">회원가입</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;