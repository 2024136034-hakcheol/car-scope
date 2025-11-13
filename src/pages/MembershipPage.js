import React from 'react';
import styles from '../styles/MembershipPage.module.css'; 

const MembershipPage = () => {
    return (
        <div className={styles.pageContent}>
            <h1 className={styles.pageTitle}>CarScope 멤버십 플랜</h1>
            
            <p>나에게 맞는 멤버십을 선택하고 프리미엄 혜택을 누리세요.</p>

            <div className={styles.membershipPlansContainer}>
                
                <div className={`${styles.planCard} ${styles.basicPlan}`}>
                    <h2>Basic</h2>
                    <p className={styles.price}>월 0원</p>
                    
                    <ul>
                        <li>✔ 주차장 실시간 정보 확인</li>
                        <li>✔ 최신 자동차 뉴스 열람</li>
                        <li>❌ 프리미엄 리뷰 잠금 해제</li>
                        <li>❌ 전용 할인 쿠폰 제공</li>
                        <li>❌ 24시간 고객 센터</li>
                    </ul>

                    <button className="secondary-button">
                        무료로 시작하기
                    </button>
                </div>

                <div className={`${styles.planCard} ${styles.premiumPlan}`}>
                    <h2>Premium</h2>
                    <p className={styles.price}>월 4,900원</p>

                    <ul>
                        <li>✔ 주차장 실시간 정보 확인</li>
                        <li>✔ 최신 자동차 뉴스 열람</li>
                        <li>✔ **프리미엄 리뷰 잠금 해제**</li>
                        <li>✔ **전용 할인 쿠폰 제공**</li>
                        <li>✔ **24시간 고객 센터**</li>
                    </ul>

                    <button className="primary-button">
                        1개월 무료 체험 &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MembershipPage;