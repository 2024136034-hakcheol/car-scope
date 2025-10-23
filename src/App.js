import React, { useState, useEffect } from 'react';
import './App.css';
import { auth, db } from './firebase';
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('GitHub 로그인 성공:', result.user.displayName);
      })
      .catch((error) => {
        console.error('로그인 실패:', error.code, error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚗 CarScope: 차량 및 주차장 리뷰</h1>
        {user ? (
          <div style={{ padding: '20px' }}>
            <p style={{ color: '#fff' }}>환영합니다, {user.displayName}님!</p>
            <button onClick={handleSignOut} style={{ padding: '10px 20px', fontSize: '16px' }}>
              로그아웃
            </button>
            
            <main>
                <h2>최신 리뷰 목록</h2>
            </main>
          </div>
        ) : (
          <button onClick={handleSignIn} style={{ padding: '10px 20px', fontSize: '16px' }}>
            GitHub로 로그인하여 리뷰 작성
          </button>
        )}
      </header>
    </div>
  );
}

export default App;