import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (e, setter) => {
        const value = e.target.value;
        const name = e.target.name;
        
        if (name === 'userId' || name === 'password') {
            const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
            if (regex.test(value) || value === '') {
                setter(value);
            }
        } else {
            setter(value);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (userId.trim() === '' || password.trim() === '') {
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        alert(`로그인 시도: ID ${userId}`);
    };

    const handleSocialLogin = (platform) => {
        alert(`${platform} 소셜 로그인 시도`);
    };

    return (
        <div className="login-page-container">
            <div className="login-card">
                <h2>로그인</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <input
                            type="text"
                            name="userId"
                            placeholder="아이디 (영문, 숫자, 특수문자만)"
                            value={userId}
                            onChange={(e) => handleInputChange(e, setUserId)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호 (영문, 숫자, 특수문자만)"
                            value={password}
                            onChange={(e) => handleInputChange(e, setPassword)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button-primary">로그인</button>
                </form>

                <div className="find-links">
                    <Link to="/find-id">아이디 찾기</Link>
                    <span>|</span>
                    <Link to="/find-password">비밀번호 찾기</Link>
                    <span>|</span>
                    <Link to="/signup">회원가입</Link>
                </div>

                <div className="social-login-section">
                    <p className="divider-text">또는 소셜 계정으로 로그인</p>
                    <div className="social-buttons">
                        <button className="social-button google" onClick={() => handleSocialLogin('Google')}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" />
                            <span>Google 로그인</span>
                        </button>
                        <button className="social-button apple" onClick={() => handleSocialLogin('Apple')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.653 14.542c-.083.253-.187.506-.325.759-.28.472-.519.923-.687 1.348-.138.307-.26.587-.398.81-.138.223-.292.385-.459.518-.28.24-.627.423-1.018.518-.21.054-.364.081-.518.081-.292 0-.587-.068-.881-.176-.307-.125-.615-.28-.908-.472-.28-.192-.519-.398-.673-.627-.165-.24-.319-.506-.472-.81-.138-.266-.26-.546-.385-.824-.138-.307-.26-.615-.351-.908-.093-.307-.152-.59-.152-.843 0-.179.035-.351.106-.518.081-.165.176-.307.307-.409.138-.112.28-.192.423-.253.152-.068.307-.112.459-.138.165-.027.325-.041.492-.041.385 0 .759.138 1.133.409.364.266.69.615.937 1.059.223.364.446.759.63 1.196.179.437.351.874.518 1.334.138.351.26.69.351 1.018.093.338.138.654.138.937-.027.325-.138.654-.325.962-.165.28-.364.519-.59.711-.21.179-.446.307-.711.398-.266.093-.561.125-.881.106-.28-.027-.558-.081-.843-.165-.292-.093-.572-.223-.843-.398-.266-.165-.519-.385-.759-.654-.24-.266-.459-.572-.654-.923-.054-.093-.106-.179-.176-.28-.21-.307-.437-.627-.673-.95-.192-.28-.398-.546-.627-.799-.21-.24-.423-.459-.627-.64-.21-.179-.423-.325-.627-.409-.223-.093-.459-.138-.711-.138-.28 0-.546.068-.81.205-.24.125-.459.325-.673.572-.21.24-.385.533-.518.843-.138.307-.253.64-.325 1.004-.081.364-.106.759-.081 1.182.027.423.106.843.253 1.252.179.446.409.874.687 1.284.28.409.615.81 1.004 1.182.385.364.81.673 1.265.923.472.253.962.459 1.451.627.506.165.996.253 1.485.253.472 0 .937-.081 1.409-.239.472-.165.937-.409 1.409-.738.472-.338.908-.738 1.309-1.223.385-.472.711-1.025.962-1.639.24-.615.423-1.291.518-1.996.093-.687.106-1.409.041-2.131zm-2.47-8.086c.21-.223.472-.409.778-.546.307-.138.615-.223.881-.253.28-.027.472-.054.572-.054.112 0 .223.014.338.041.112.027.21.054.28.081.125.041.223.112.292.21.068.093.106.192.106.307 0 .152-.068.307-.205.472-.138.165-.307.325-.518.472-.223.152-.472.28-.759.385-.292.112-.615.179-.962.179-.371 0-.745-.068-1.12-.205-.364-.138-.673-.351-.923-.627-.253-.266-.423-.59-.518-.95-.093-.364-.106-.778-.041-1.209.068-.437.21-.86.423-1.252.165-.307.385-.59.654-.843.28-.253.587-.459.908-.627.325-.179.673-.292 1.059-.351.409-.068.824-.054 1.24.041.409.112.81.28 1.209.518.385.24.711.533.95 0-.28 0-.587-.068-.908-.176-.325-.125-.673-.292-1.045-.472-.364-.179-.745-.307-1.144-.385-.385-.093-.768-.138-1.144-.138-.409 0-.81.081-1.209.239-.409.165-.778.385-1.12.654-.338.28-.615.59-.824.937-.21.351-.351.745-.409 1.182-.068.459-.041.908.081 1.348.112.423.307.824.572 1.182.266.351.572.64 0 0z"/>
                            </svg>
                            <span>Apple 로그인</span>
                        </button>
                        <button className="social-button kakao" onClick={() => handleSocialLogin('Kakao')}>
                            <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing_k.png" alt="KakaoTalk" />
                            <span>카카오 로그인</span>
                        </button>
                        <button className="social-button facebook" onClick={() => handleSocialLogin('Facebook')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-2v2h2v2h-2v8h-4v-8h-2v-2h2v-2c0-1.5 1-3 3-3h3v3z"/>
                            </svg>
                            <span>Facebook 로그인</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;