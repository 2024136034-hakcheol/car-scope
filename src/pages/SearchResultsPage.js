import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/SearchResultsPage.css';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q'); 
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
                const newsRef = collection(db, "news");
                const newsQ = query(newsRef, orderBy("createdAt", "desc"));
                const newsSnapshot = await getDocs(newsQ);

                const parkingRef = collection(db, "parkingLots");
                const parkingQ = query(parkingRef, orderBy("createdAt", "desc"));
                const parkingSnapshot = await getDocs(parkingQ);

                const allNews = newsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    type: 'news',
                    ...doc.data()
                }));

                const allParking = parkingSnapshot.docs.map(doc => ({
                    id: doc.id,
                    type: 'parking',
                    ...doc.data()
                }));

                const filteredNews = allNews.filter(item => 
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    item.content.replace(/<[^>]+>/g, '').toLowerCase().includes(searchQuery.toLowerCase())
                );

                const filteredParking = allParking.filter(item => 
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    item.address.toLowerCase().includes(searchQuery.toLowerCase())
                );

                const combinedResults = [...filteredNews, ...filteredParking];
                setResults(combinedResults);

            } catch (error) {
                console.error(error);
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
                            <div 
                                key={item.id} 
                                className="search-item-card" 
                                onClick={() => item.type === 'news' ? navigate(`/news/${item.id}`) : navigate('/parking')}
                            >
                                <div className="result-img">
                                    <img src={item.imageUrl} alt={item.title || item.name} />
                                </div>
                                <div className="result-info">
                                    <span className={`result-category ${item.type}`}>
                                        {item.type === 'news' ? (
                                            item.category === 'domestic' ? '뉴스 - 국내' : 
                                            item.category === 'international' ? '뉴스 - 해외' : '뉴스 - 산업'
                                        ) : (
                                            '주차장'
                                        )}
                                    </span>
                                    
                                    <h3>{item.type === 'news' ? item.title : item.name}</h3>
                                    
                                    <p className="result-snippet">
                                        {item.type === 'news' ? (
                                            item.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...'
                                        ) : (
                                            `주소: ${item.address} | 가격: ${Number(item.price).toLocaleString()}원/시간`
                                        )}
                                    </p>
                                    
                                    <span className="result-date">
                                        {item.type === 'news' ? formatDate(item.createdAt) : 
                                         item.availableSpots > 0 ? `잔여 ${item.availableSpots}대` : '만차'}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>검색 결과가 없습니다.</p>
                            <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;