import React from 'react';
import styles from './styles/ParkingPage.module.css'; 

const ParkingPage = () => {
    return (
        <div className={`${styles.parkingPageContainer} page-content`}>
            <h2>주차장 찾기 및 예약</h2>
            <p className={styles.parkingPageDescription}>원하는 지역의 주차장을 검색하고 실시간으로 예약하세요.</p>

            <div className={styles.searchSection}>
                <input 
                    type="text" 
                    placeholder="지역 또는 주차장 이름을 검색하세요" 
                    className={styles.searchInput}
                />
                <button className={`primary-button ${styles.searchButton}`}>검색</button>
            </div>

            <section className={styles.parkingSpotList}>
                <h3>내 주변 인기 주차장</h3>
                <div className={styles.spotGrid}>
                    <div className={styles.parkingSpotItem}>
                        <h4 className={styles.spotName}>강남 N 타워 주차장</h4>
                        <p className={styles.spotDetail}>강남역 도보 5분, 실내 주차</p>
                        <p className={styles.spotPrice}>500원/5분</p>
                        <button className={`secondary-button ${styles.reserveButton}`}>예약하기</button>
                    </div>
                    <div className={styles.parkingSpotItem}>
                        <h4 className={styles.spotName}>홍대입구역 인근</h4>
                        <p className={styles.spotDetail}>홍대입구역 3번 출구 인근, 기계식</p>
                        <p className={styles.spotPrice}>1,500원/10분</p>
                        <button className={`secondary-button ${styles.reserveButton}`}>예약하기</button>
                    </div>
                    <div className={styles.parkingSpotItem}>
                        <h4 className={styles.spotName}>여의도 더현대 파크</h4>
                        <p className={styles.spotDetail}>더현대 서울 지하 주차장</p>
                        <p className={styles.spotPrice}>4,000원/30분</p>
                        <button className={`secondary-button ${styles.reserveButton}`}>예약하기</button>
                    </div>
                    <div className={styles.parkingSpotItem}>
                        <h4 className={styles.spotName}>신촌 연세로 주차장</h4>
                        <p className={styles.spotDetail}>24시간 운영, 넓은 공간</p>
                        <p className={styles.spotPrice}>800원/10분</p>
                        <button className={`secondary-button ${styles.reserveButton}`}>예약하기</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ParkingPage;