import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/NewsPage.module.css';

const newsItems = [
    { id: 1, title: '현대차, 신형 전기차 플랫폼 공개', date: '2025.11.12', category: 'Tech' },
    { id: 2, title: '테슬라 모델 Y, 국내 판매 가격 인하', date: '2021.11.11', category: 'Market' },
    { id: 3, title: '정부, 전기차 충전소 확대 계획 발표', date: '2025.11.10', category: 'Policy' },
    { id: 4, title: '포르쉐, 2025년형 911 터보 공개', date: '2025.11.09', category: 'New Car' },
];

const reviewItems = [
    { id: 1, title: '제네시스 GV80: 압도적인 디자인과 성능', rating: 5, category: 'Review' },
    { id: 2, title: '기아 EV6: 완벽한 밸런스를 갖춘 전기차', rating: 4, category: 'Review' },
];

const NewsPage = () => {
    return (
        <div className={`${styles.newsPageContainer} page-content`}>
            <h1>최신 자동차 뉴스 및 리뷰</h1>
            <p className={styles.description}>업계 동향, 신차 정보, 사용자 리뷰를 한눈에 확인하세요.</p>

            <section className={styles.newsSection}>
                <h2>주요 뉴스</h2>
                <div className={styles.articleGrid}>
                    {newsItems.map(item => (
                        <div key={item.id} className={styles.articleCard}>
                            <span className={styles.categoryBadge}>{item.category}</span>
                            <h3>{item.title}</h3>
                            <p className={styles.date}>{item.date}</p>
                            <Link to={`/news/${item.id}`} className={styles.readMore}>자세히 보기 &gt;</Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.reviewSection}>
                <h2>인기 리뷰</h2>
                <div className={styles.reviewList}>
                    {reviewItems.map(item => (
                        <div key={item.id} className={styles.reviewItem}>
                            <span className={styles.ratingStars}>{'★'.repeat(item.rating) + '☆'.repeat(5 - item.rating)}</span>
                            <h4>{item.title}</h4>
                            <Link to={`/review/${item.id}`} className={styles.readMore}>리뷰 읽기 &gt;</Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default NewsPage;