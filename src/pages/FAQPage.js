import React, { useState } from 'react';
import '../styles/FAQPage.css';

const FAQPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        {
            id: 1,
            category: 'account',
            question: '회원가입은 어떻게 하나요?',
            answer: '상단 메뉴의 "로그인" 버튼을 클릭한 후, 하단의 "회원가입" 링크를 통해 가입하실 수 있습니다. 약관 동의 및 간단한 정보 입력을 통해 CarScope의 회원이 되어보세요.'
        },
        {
            id: 2,
            category: 'account',
            question: '비밀번호를 잊어버렸어요.',
            answer: '로그인 페이지 하단의 "비밀번호 찾기"를 이용해주세요. 가입 시 등록한 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.'
        },
        {
            id: 3,
            category: 'service',
            question: '뉴스 기사는 누구나 작성할 수 있나요?',
            answer: '뉴스 기사 작성은 "기자" 권한이 있는 회원만 가능합니다. 일반 회원은 기사를 열람하고 댓글을 작성하거나 좋아요를 누를 수 있습니다.'
        },
        {
            id: 4,
            category: 'service',
            question: '사진 업로드 용량 제한이 있나요?',
            answer: '네, 쾌적한 서비스 환경을 위해 사진 업로드 시 파일당 최대 5MB의 용량 제한이 있습니다. 5MB를 초과하는 이미지는 업로드할 수 없습니다.'
        },
        {
            id: 5,
            category: 'account',
            question: '회원 탈퇴는 어디서 하나요?',
            answer: '마이페이지의 "설정" 탭에서 회원 탈퇴를 진행하실 수 있습니다. 탈퇴 시 작성한 게시물은 자동으로 삭제되지 않으므로 미리 정리해주시기 바랍니다.'
        },
        {
            id: 6,
            category: 'etc',
            question: '기타 문의사항은 어떻게 접수하나요?',
            answer: '해결되지 않은 문제는 고객센터 이메일(help@carscope.com)로 문의해 주시면 신속하게 답변해 드리겠습니다.'
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredData = activeTab === 'all' 
        ? faqData 
        : faqData.filter(item => item.category === activeTab);

    return (
        <div className="faq-container page-content">
            <h2 className="faq-title">자주 묻는 질문</h2>
            
            <div className="faq-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('all')}
                >
                    전체
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('account')}
                >
                    계정/로그인
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'service' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('service')}
                >
                    서비스 이용
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'etc' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('etc')}
                >
                    기타
                </button>
            </div>

            <div className="faq-list">
                {filteredData.map((item, index) => (
                    <div key={item.id} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                            <span className="q-mark">Q.</span>
                            <span className="q-text">{item.question}</span>
                            <span className="arrow-icon"></span>
                        </div>
                        <div className="faq-answer">
                            <div className="answer-content">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQPage;