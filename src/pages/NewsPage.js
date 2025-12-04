import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import '../styles/NewsPage.css';

const initialNewsData = [
    {
        id: 1,
        title: '현대차, 2026년형 아이오닉 7 완전 공개',
        snippet: '차세대 대형 전기 SUV 아이오닉 7이 혁신적인 디자인과 주행 거리로 시장의 기대를 모으고 있습니다...',
        source: 'CarScope 뉴스',
        date: '2025.11.13',
        imageUrl: 'https://images.unsplash.com/photo-1617066348324-722530b1b1c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNhciUyMGRlc2lnbnxlbnwwfHx8fDE2OTk4NzYwMTB8MA&ixlib=rb-4.0.3&q=80&w=1080',
        views: 1280,
        likes: 42,
        liked: false
    },
    {
        id: 2,
        title: '테슬라, 모델 Y 가격 인하... 전기차 시장 공략 가속',
        snippet: '테슬라가 주력 모델인 모델 Y의 가격을 5% 추가 인하하며 공격적인 마케팅을 이어갑니다.',
        source: 'Tech Daily',
        date: '2025.11.12',
        imageUrl: 'https://images.unsplash.com/photo-1554866603-39fb23d11b0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMGNoYXJnaW5nfGVufDB8fHx8MTY5OTg3NjA0NHww&ixlib=rb-4.0.3&q=80&w=1080',
        views: 987,
        likes: 31,
        liked: true
    },
    {
        id: 3,
        title: '정부, 2026년 전기차 보조금 정책 개편안 발표',
        snippet: '환경부는 주행 거리와 배터리 효율성을 중심으로 보조금 지급 기준을 변경한다고 밝혔습니다.',
        source: '정부 정책 브리핑',
        date: '2025.11.11',
        imageUrl: 'https://images.unsplash.com/photo-1593941707882-6b78d89e4c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwxfHxroreanlMjBnJUMzJUI2dmVybm1lbnR8ZW58MHx8fHwxNjk5ODc2MDc3fDA&ixlib=rb-4.0.3&q=80&w=1080',
        views: 750,
        likes: 15,
        liked: false
    },
    {
        id: 4,
        title: '기아 EV9, ‘올해의 차’ 3관왕 달성',
        snippet: '기아의 플래그십 전기 SUV EV9이 북미와 유럽에서 동시에 ‘올해의 차’로 선정되었습니다.',
        source: 'CarScope 뉴스',
        date: '2025.11.10',
        imageUrl: 'https://images.unsplash.com/photo-1621535314251-1616c27e366a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwxfHxiaWclMjBlbGVjdHJpYyUyMHN1dnxlbnwwfHx8fDE2OTk4NzYxMDZ8MA&ixlib=rb-4.0.3&q=80&w=1080',
        views: 2150,
        likes: 128,
        liked: false
    }
];

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('all');

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setNews(initialNewsData);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [category]);

    const handleLikeClick = (id) => {
        setNews(prevNews =>
            prevNews.map(item =>
                item.id === id ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 } : item
            )
        );
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    return (
        <div className="news-container page-content">
            <h1>최신 뉴스</h1>
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
                    {news.map((item) => (
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
                                <span className="news-views">조회수 {item.views.toLocaleString()}</span>
                                <button 
                                    className={`like-button ${item.liked ? 'liked' : ''}`}
                                    onClick={() => handleLikeClick(item.id)}
                                >
                                    {item.liked ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
                                    {item.likes.toLocaleString()}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && (
                <div className="pagination-container">
                    <button className="load-more-btn">
                        더 보기
                    </button>
                </div>
            )}
        </div>
    );
};

export default NewsPage;