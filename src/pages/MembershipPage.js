import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/MembershipPage.css';

const MembershipPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [currentMembership, setCurrentMembership] = useState('standard');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setCurrentMembership(userDoc.data().membershipLevel || 'standard');
                }
            } else {
                setCurrentUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSubscribe = async () => {
        if (!currentUser) {
            alert("로그인이 필요한 서비스입니다.");
            navigate('/login');
            return;
        }

        if (currentMembership === 'premium') {
            alert("이미 프리미엄 멤버십을 이용 중입니다.");
            return;
        }

        if (!window.confirm("프리미엄 멤버십을 구독하시겠습니까?\n(실제 결제는 이루어지지 않으며, 즉시 등급이 변경됩니다.)")) {
            return;
        }

        setLoading(true);
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                membershipLevel: 'premium',
                membershipStartDate: new Date()
            });
            setCurrentMembership('premium');
            alert("축하합니다! 프리미엄 멤버십 구독이 완료되었습니다.");
        } catch (error) {
            console.error("Subscription error:", error);
            alert("구독 처리 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="membership-container">
            <div className="membership-header">
                <h2>CarScope 멤버십</h2>
                <p>나에게 맞는 요금제를 선택하고 더 많은 혜택을 누려보세요.</p>
            </div>

            <div className="pricing-grid">
                <div className="pricing-card standard">
                    <div className="card-header">
                        <h3>일반 (Standard)</h3>
                        <p className="price">무료</p>
                    </div>
                    <ul className="features-list">
                        <li>✅ 실시간 뉴스 열람</li>
                        <li>✅ 커뮤니티 글 작성</li>
                        <li>✅ 기본 주차장 검색</li>
                        <li className="disabled">❌ 전문가 심층 리뷰</li>
                        <li className="disabled">❌ 주차장 예약 할인</li>
                        <li className="disabled">❌ 광고 제거</li>
                    </ul>
                    <button className="plan-btn standard-btn" disabled>
                        기본 이용 중
                    </button>
                </div>

                <div className="pricing-card premium">
                    <div className="card-header">
                        <span className="badge">추천</span>
                        <h3>프리미엄 (Premium)</h3>
                        <p className="price">₩9,900 <span>/월</span></p>
                    </div>
                    <ul className="features-list">
                        <li>✅ <strong>모든 일반 혜택 포함</strong></li>
                        <li>✅ 전문가 심층 리뷰 열람</li>
                        <li>✅ 제휴 주차장 50% 할인</li>
                        <li>✅ 광고 없는 쾌적한 환경</li>
                        <li>✅ 프리미엄 전용 배지</li>
                    </ul>
                    <button 
                        className="plan-btn premium-btn" 
                        onClick={handleSubscribe}
                        disabled={currentMembership === 'premium' || loading}
                    >
                        {loading ? "처리 중..." : currentMembership === 'premium' ? "이용 중" : "프리미엄 구독하기"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MembershipPage;