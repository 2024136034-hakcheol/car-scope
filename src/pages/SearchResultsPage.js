import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/SearchResultsPage.css';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q'); // URL에서 검색어 가져오기
    const navigate = useNavigate();
    
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndFilterData = async () => {
            if (!searchQuery) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                // Firebase는 부분 텍스트 검색(LIKE)을 지원하지 않으므로, 
                // 전체 데이터를 가져와서 클라이언트(JS)에서 필터링하는 방식을 사용합니다.
                // (데이터가 수천 건이 넘어가면 Algolia 같은 검색 서비스를 붙여야 하지만, 지금은 이 방식이 가장 빠릅니다.)
                
                const newsRef = collection(db, "news");
                const q = query(newsRef, orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);

                const allNews = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // 검색어 필터링 (제목 또는 내용에 포함된 경우)
                const filtered = allNews.filter(news => 
                    news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    news.content.replace(/<[^>]+>/g, '').toLowerCase().includes(searchQuery.toLowerCase())
                );

                setResults(filtered);
            } catch (error) {
                console.error("검색 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilterData();
    }, [searchQuery]);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString();
    };

    return (
        <div className="search-page-container page-content">
            <h2 className="search-header">
                "{searchQuery}" 검색 결과 ({results.length}건)
            </h2>

            {loading ? (
                <div className="loading">검색 중입니다...</div>
            ) : (
                <div className="search-results-list">
                    {results.length > 0 ? (
                        results.map((item) => (
                            <div key={item.id} className="search-item-card" onClick={() => navigate(`/news/${item.id}`)}>
                                <div className="result-img">
                                    <img src={item.imageUrl} alt={item.title} />
                                </div>
                                <div className="result-info">
                                    <span className="result-category">
                                        {item.category === 'domestic' ? '국내' : 
                                         item.category === 'international' ? '해외' : '산업'}
                                    </span>
                                    <h3>{item.title}</h3>
                                    <p className="result-snippet">
                                        {item.content.replace(/<[^>]+>/g, '').substring(0, 100)}...
                                    </p>
                                    <span className="result-date">{formatDate(item.createdAt)}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>검색 결과가 없습니다.</p>
                            <button onClick={() => navigate('/news')}>전체 뉴스 보러가기</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;