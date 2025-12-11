import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../AuthContext';
import imageCompression from 'browser-image-compression';
import '../styles/AdminBannerPage.css';

const AdminBannerPage = () => {
    const { dbUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    const [banners, setBanners] = useState({
        slot1: { imageUrl: '', linkUrl: '' },
        slot2: { imageUrl: '', linkUrl: '' },
        slot3: { imageUrl: '', linkUrl: '' }
    });

    useEffect(() => {
        if (!dbUser || !dbUser.isAdmin) {
            alert('관리자만 접근 가능합니다.');
            navigate('/');
            return;
        }
        fetchBanners();
    }, [dbUser, navigate]);

    const fetchBanners = async () => {
        try {
            const slots = ['slot1', 'slot2', 'slot3'];
            const newBanners = { ...banners };

            for (const slot of slots) {
                const docRef = doc(db, 'banners', slot);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    newBanners[slot] = { 
                        ...newBanners[slot], 
                        ...docSnap.data() 
                    };
                }
            }
            setBanners(newBanners);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleImageChange = async (e, slot) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const options = {
                maxSizeMB: 0.8,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };
            const compressedFile = await imageCompression(file, options);
            
            const reader = new FileReader();
            reader.onload = () => {
                setBanners(prev => ({
                    ...prev,
                    [slot]: { ...prev[slot], imageUrl: reader.result }
                }));
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error(error);
            alert("이미지 처리 중 오류가 발생했습니다.");
        }
    };

    const handleLinkChange = (e, slot) => {
        setBanners(prev => ({
            ...prev,
            [slot]: { ...prev[slot], linkUrl: e.target.value }
        }));
    };

    const saveBanner = async (slot) => {
        const data = banners[slot];
        if (!data.imageUrl) {
            alert("이미지를 등록해주세요.");
            return;
        }

        try {
            await setDoc(doc(db, 'banners', slot), {
                imageUrl: data.imageUrl,
                linkUrl: data.linkUrl || '',
                updatedAt: new Date()
            });
            alert(`[${slot}] 배너가 홈 화면에 적용되었습니다.`);
        } catch (error) {
            console.error(error);
            alert("저장 실패");
        }
    };

    const deleteBanner = async (slot) => {
        if (!window.confirm("삭제하시겠습니까? 홈 화면에서 즉시 사라집니다.")) return;
        
        try {
            await deleteDoc(doc(db, 'banners', slot));
            setBanners(prev => ({
                ...prev,
                [slot]: { imageUrl: '', linkUrl: '' }
            }));
            alert("삭제되었습니다.");
        } catch (error) {
            console.error(error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-banner-container page-content">
            <h2>메인 배너 관리</h2>
            <p className="banner-guide">※ 1920px * 600px 사이즈 권장 (이미지 위주 배너)</p>

            <div className="banner-slots">
                {['slot1', 'slot2', 'slot3'].map((slot, index) => (
                    <div key={slot} className="banner-card">
                        <h3>Banner Slot {index + 1}</h3>
                        
                        <div className="preview-area">
                            {banners[slot].imageUrl ? (
                                <img src={banners[slot].imageUrl} alt="preview" />
                            ) : (
                                <div className="no-image">등록된 배너 없음</div>
                            )}
                        </div>

                        <div className="input-area">
                            <label>이미지 파일 (필수)</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleImageChange(e, slot)} 
                            />
                            
                            <label>클릭 시 이동 주소 (선택)</label>
                            <input 
                                type="text" 
                                placeholder="예: /news 또는 https://naver.com" 
                                value={banners[slot].linkUrl} 
                                onChange={(e) => handleLinkChange(e, slot)} 
                            />
                        </div>

                        <div className="btn-area">
                            <button className="save-btn" onClick={() => saveBanner(slot)}>저장 및 적용</button>
                            <button className="del-btn" onClick={() => deleteBanner(slot)}>삭제</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminBannerPage;