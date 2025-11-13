import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NewsPage.module.css'; 

const newsItems = [
    { id: 1, title: '현대차, 신형 전기차 플랫폼 공개', date: '2025.11.12', content: '내용 1...' },
    { id: 2, title: '테슬라 모델 Y, 국내 판매 가격 인하', date: '2025.11.11', content: '내용 2...' },
    { id: 3, title: '정부, 전기차 충전소 확대 계획 발표', date: '2025.11.10', content: '내용 3...' },
    { id: 4, title: '기아 EV9, 유럽 올해의 차 최종 후보 선정', date: '2025.11.09', content: '내용 4...' },
    { id: 5, title: '르노, 신형 SUV XM3 하이브리드 출시 예고', date: '2025.11.08', content: '내용 5...' },
];

const NewsPage = () => {
    return (
        <div className={styles.pageContent}>
            <h1 className={styles.pageTitle}>최신 자동차 뉴스</h1>
            
            <div className={styles.newsListContainer}>
                {newsItems.map(item => (
                    <div key={item.id} className={styles.newsItem}>
                        <div>
                            <h2 className={styles.newsTitle}>{item.title}</h2>
                            <p className={styles.newsDate}>작성일: {item.date}</p>
                        </div>
                        <Link to={`/news/${item.id}`} className={styles.readMoreButton}>
                            자세히 보기 &gt;
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;