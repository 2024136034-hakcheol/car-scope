import React from 'react';
import styles from './styles/MembershipPage.module.css';

const MembershipPage = () => {
    return (
        <div className={`${styles.membershipContainer} page-content`}>
            <h1>CarScope 멤버십 플랜</h1>
            <p className={styles.description}>나에게 맞는 멤버십을 선택하고 프리미엄 혜택을 누리세요.</p>

            <div className={styles.planGrid}>
                <div className={styles.planCard}>
                    <h2>Basic</h2>
                    <p className={styles.price}>0원</p>
                    <ul className={styles.featureList}>
                        <li>주차장 실시간 정보 확인</li>
                        <li>최신 자동차 뉴스 알림</li>
                        <li>프리미엄 리뷰 잠금 해제</li>
                        <li className={styles.unavailable}>전용 할인 쿠폰 제공</li>
                        <li className={styles.unavailable}>24시간 고객 센터</li>
                    </ul>
                    <button className={`secondary-button ${styles.ctaButton}`}>무료로 시작하기</button>
                </div>

                <div className={`${styles.planCard} ${styles.premium}`}>
                    <h2>Premium</h2>
                    <p className={styles.price}>4,900원</p>
                    <ul className={styles.featureList}>
                        <li>주차장 실시간 정보 확인</li>
                        <li>최신 자동차 뉴스 알림</li>
                        <li>프리미엄 리뷰 잠금 해제</li>
                        <li>전용 할인 쿠폰 제공</li>
                        <li>24시간 고객 센터</li>
                    </ul>
                    <button className={`primary-button ${styles.ctaButton}`}>가입하고 혜택 누리기</button>
                </div>

                <div className={styles.planCard}>
                    <h2>VIP</h2>
                    <p className={styles.price}>15,000원</p>
                    <ul className={styles.featureList}>
                        <li>모든 Premium 혜택 포함</li>
                        <li>전용 VIP 주차 구역 접근 권한</li>
                        <li>최대 30% 주차 할인율 적용</li>
                        <li>CarScope 이벤트 우선 초대</li>
                        <li>맞춤형 차량 관리 컨설팅</li>
                    </ul>
                    <button className={`secondary-button ${styles.ctaButton}`}>VIP 가입하기</button>
                </div>
            </div>

            <section className={styles.faqSection}>
                <h3>자주 묻는 질문</h3>
                <div className={styles.faqItem}>
                    <h4>멤버십은 언제든지 해지할 수 있나요?</h4>
                    <p>네, Premium 및 VIP 멤버십은 언제든지 월 단위로 해지할 수 있으며, 다음 결제 주기부터 요금이 청구되지 않습니다.</p>
                </div>
                <div className={styles.faqItem}>
                    <h4>Basic 플랜은 정말 무료인가요?</h4>
                    <p>Basic 플랜은 영구적으로 무료이며, CarScope의 핵심 서비스를 제한적으로 이용할 수 있습니다.</p>
                </div>
            </section>
        </div>
    );
};

export default MembershipPage;