import React, { useState, useEffect } from 'react';
import './App.css'; 
import { auth, db } from './firebase'; 
import { signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';


function MainReviewPage({ user, handleSignOut, reviews, newReview, setNewReview, handleSubmitReview }) {
  if (!user) {
    return <div style={{ padding: '40px' }}>로그인 후 이용해주세요.</div>;
  }
  
  return (
    <div style={{ padding: '20px', width: '90%', maxWidth: '600px', margin: '0 auto' }}>
      <p style={{ color: '#fff' }}>환영합니다, {user.displayName}님!</p>
      <button onClick={handleSignOut} style={{ padding: '8px 15px', fontSize: '14px', marginBottom: '20px' }}>
        로그아웃
      </button>
      
      <form onSubmit={handleSubmitReview} style={{ marginBottom: '30px' }}>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="차량 또는 주차장 리뷰를 작성해 주세요..."
          required
          rows="4"
          style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: 'none', resize: 'vertical' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '16px', marginTop: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          리뷰 제출
        </button>
      </form>
      
      <main style={{ marginTop: '20px', textAlign: 'left' }}>
          <h2>최신 리뷰 목록</h2>
          <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
              {reviews.map((review) => (
                  <div key={review.id} style={{ borderBottom: '1px solid #444', padding: '10px 0', display: 'flex', alignItems: 'center' }}>
                      <img 
                          src={review.userPhoto || 'https://via.placeholder.com/40'} 
                          alt="Profile" 
                          style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} 
                      />
                      <div>
                          <strong style={{ color: '#eee' }}>{review.userName}</strong>
                          <p style={{ margin: '5px 0 0 0', color: '#ccc' }}>{review.text}</p>
                      </div>
                  </div>
              ))}
              {reviews.length === 0 && <p style={{ color: '#ccc' }}>아직 리뷰가 없습니다. 첫 리뷰를 작성해 보세요!</p>}
          </div>
      </main>
    </div>
  );
}


function App() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(reviewList);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (newReview.trim() === '' || !user) return;

    try {
      await addDoc(collection(db, 'reviews'), {
        text: newReview,
        userName: user.displayName || user.email,
        userPhoto: user.photoURL,
        timestamp: serverTimestamp(),
      });
      setNewReview('');
    } catch (e) {
      console.error('리뷰 추가 실패: ', e);
    }
  };


  return (
    <Router>
      <div className="App">
        <header className="App-header" style={{ marginBottom: '20px' }}>
          <h1>🚗 CarScope: 차량 및 주차장 리뷰</h1>
          <nav>
            {user ? (
              <Link to="/" style={{ color: '#eee', marginRight: '20px' }}>홈</Link>
            ) : (
              <Link to="/login" style={{ color: '#eee', marginRight: '20px' }}>로그인</Link>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<MainReviewPage 
            user={user} 
            handleSignOut={handleSignOut} 
            reviews={reviews} 
            newReview={newReview} 
            setNewReview={setNewReview} 
            handleSubmitReview={handleSubmitReview} 
          />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;