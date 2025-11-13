import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ParkingPage.module.css'; 

const parkingSpots = [
    { id: 1, name: '강남 N 타워 주차장', area: '강남구 역삼동', price: '500원/5분', totalSpots: 150 },
    { id: 2, name: '홍대입구역 공영주차장', area: '마포구 동교동', price: '1,500원/10분', totalSpots: 300 },
    { id: 3, name: '여의도 더현대 파크', area: '영등포구 여의도동', price: '4,000원/30분', totalSpots: 50 },
    { id: 4, name: '성수동 서울숲 주차장', area: '성동구 성수동', price: '300원/5분', totalSpots: 220 },
    { id: 5, name: '종로 르메이에르 빌딩', area: '종로구 종로1가', price: '600원/5분', totalSpots: 90 },
];

const ParkingPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSpots = parkingSpots.filter(spot =>
        spot.name.includes(searchTerm) || spot.area.includes(searchTerm)
    );

    return (
        <div className={styles.pageContent}>
            <h1 className={styles.pageTitle}>실시간 주차장 정보 및 예약</h1>
            
            <div className={styles.parkingSearchBar}>
                <input
                    type="text"
                    placeholder="지역 또는 주차장 이름을 검색하세요..."
                    className={styles.searchInputFull}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="primary-button">검색</button>
            </div>

            <h2 className={styles.sectionTitle}>검색 결과 ({filteredSpots.length}개)</h2>
            
            <div className={styles.parkingListContainer}>
                {filteredSpots.map(spot => (
                    <div key={spot.id} className={styles.parkingSpotItem}>
                        <div className={styles.spotDetails}>
                            <h3 className={styles.spotNameList}>{spot.name}</h3>
                            <p className={styles.spotInfo}>{spot.area} | 총 주차면: {spot.totalSpots}면</p>
                        </div>
                        <div>
                            <p className={styles.spotInfo}>**{spot.price}**</p>
                            <Link to={`/parking/${spot.id}`} className="primary-button">
                                예약/정보 확인
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParkingPage;