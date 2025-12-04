import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaPen } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, where, doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';
import '../styles/NewsPage.css';

const NewsPage = () => {
    const { currentUser, dbUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('all');

    useEffect(() => {
        setLoading(true);
        setNews([]);
        
        let q;
        const newsRef = collection(db, "news");

        if (category === 'all') {
            q = query(newsRef, orderBy("createdAt", "desc"));
        } else {
            q = query(newsRef, where("category", "==", category), orderBy("createdAt", "desc"));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newsList = snapshot.docs.map(doc => {
                const data = doc.data();
                const plainText = data.content ? data.content.replace(/<[^>]+>/g, '') : '';
                return {
                    id: doc.id,
                    ...data,
                    snippet: plainText.substring(0, 80) + '...',
                    liked: data.likedBy ? data.likedBy.includes(currentUser?.uid) : false
                };
            });
            setNews(newsList);
            setLoading(false);
        }, (error) => {
            console.error(error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [category, currentUser]);

    const handleLikeClick = async (e, id, likedBy) => {
        e.preventDefault(); 
        e.stopPropagation();

        if (!currentUser) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }

        const newsRef = doc(db, "news", id);
        const isLiked = likedBy ? likedBy.includes(currentUser.uid) : false;

        try {
            if (isLiked) {
                await updateDoc(newsRef, {
                    likes: increment(-1),
                    likedBy: arrayRemove(currentUser.uid)
                });
            } else {
                await updateDoc(newsRef, {
                    likes: increment(1),
                    likedBy: arrayUnion(currentUser.uid)
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    return (
        <div className="news-container page-content">
            <div style={{position: 'relative'}}>
                <h1>최신 뉴스</h1>
                {dbUser && (dbUser.isAdmin || dbUser.isJournalist) && (
                    <button 
                        className="write-news-btn"
                        onClick={() => navigate('/news/write')}
                    >
                        <FaPen style={{marginRight: '8px'}} /> 기사 작성
                    </button>
                )}
            </div>
            <p className="news-subtitle">CarScope가 전해드리는 가장 빠르고 정확한 자동차 뉴스</p>

            <div className="news-categories">
                <button 
                    className={`category-btn ${category === 'all' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('all')}
                >
                    전체
                </button>
                <button 
                    className={`category-btn ${category === 'domestic' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('domestic')}
                >
                    국내
                </button>
                <button 
                    className={`category-btn ${category === 'international' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('international')}
                >
                    해외
                </button>
                <button 
                    className={`category-btn ${category === 'industry' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('industry')}
                >
                    산업/정책
                </button>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>뉴스를 불러오는 중입니다...</p>
                </div>
            ) : (
                <div className="news-list">
                    {news.length === 0 ? (
                        <div style={{
                            gridColumn: '1/-1', 
                            textAlign: 'center', 
                            padding: '60px 0', 
                            color: '#888',
                            fontSize: '1.1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <div style={{fontSize: '3rem'}}>📭</div>
                            <div>등록된 뉴스가 없습니다.</div>
                        </div>
                    ) : (
                        news.map((item) => (
                            <div key={item.id} className="news-card">
                                <Link to={`/news/${item.id}`} className="news-card-link">
                                    <div className="news-card-image" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                                    <div className="news-card-content">
                                        <h3>{item.title}</h3>
                                        <p>{item.snippet}</p>
                                        <div className="news-card-meta">
                                            <span className="news-source">{item.source}</span>
                                            <span className="news-date">{item.date}</span>
                                        </div>
                                    </div>
                                </Link>
                                <div className="news-card-stats">
                                    <span className="news-views">조회수 {item.views ? item.views.toLocaleString() : 0}</span>
                                    <button 
                                        className={`like-button ${item.liked ? 'liked' : ''}`}
                                        onClick={(e) => handleLikeClick(e, item.id, item.likedBy)}
                                    >
                                        {item.liked ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
                                        {item.likes ? item.likes.toLocaleString() : 0}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NewsPage;