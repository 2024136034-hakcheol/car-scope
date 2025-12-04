import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';
import '../styles/NewsDetailPage.css';

const NewsDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser, dbUser } = useContext(AuthContext);
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const docRef = doc(db, "news", id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setNews({ id: docSnap.id, ...docSnap.data() });
                } else {
                    alert("존재하지 않는 게시글입니다.");
                    navigate('/news');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (!window.confirm("정말로 이 기사를 삭제하시겠습니까?")) return;

        try {
            await deleteDoc(doc(db, "news", id));
            alert("삭제되었습니다.");
            navigate('/news');
        } catch (error) {
            alert("삭제 실패: " + error.message);
        }
    };

    const handleEdit = () => {
        navigate(`/news/edit/${id}`);
    };

    if (loading) return <div className="loading-container">로딩 중...</div>;
    if (!news) return null;

    const canManage = currentUser && (dbUser?.isAdmin || dbUser?.isJournalist || currentUser.uid === news.authorId);

    return (
        <div className="news-detail-container page-content">
            <div className="detail-header">
                <span className="detail-category">{news.category === 'domestic' ? '국내' : news.category === 'international' ? '해외' : '산업/정책'}</span>
                <h1 className="detail-title">{news.title}</h1>
                <div className="detail-meta">
                    <span className="detail-date">{news.date}</span>
                    <span className="detail-source">{news.source}</span>
                </div>
            </div>

            <div className="detail-content">
                <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>

            <div className="detail-actions">
                <button className="btn-back" onClick={() => navigate('/news')}>목록으로</button>
                {canManage && (
                    <div className="admin-btns">
                        <button className="btn-edit" onClick={handleEdit}>수정</button>
                        <button className="btn-delete" onClick={handleDelete}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsDetailPage;