import React, { useEffect } from 'react';
import { auth } from './firebase'; 
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .catch((error) => {
        console.error('로그인 실패:', error.code, error.message);
      });
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>CarScope 로그인</h1>
      <p>리뷰 작성 및 조회는 로그인 후 이용 가능합니다.</p>
      
      <button onClick={handleSignIn} style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#171515', color: '#fff', border: '2px solid #555', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}>
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" style={{ width: '20px', height: '20px', marginRight: '10px' }}/>
        GitHub로 로그인
      </button>
    </div>
  );
}

export default LoginPage;