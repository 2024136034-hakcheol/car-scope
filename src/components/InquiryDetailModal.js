import React from 'react';
import '../styles/MyPage.css';

const InquiryDetailModal = ({ isOpen, onClose, inquiry }) => {
    if (!isOpen || !inquiry) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333', paddingBottom: '15px', marginBottom: '20px'}}>
                    <h2 style={{margin: 0, fontSize: '1.5rem'}}>문의 상세 내역</h2>
                    <button onClick={onClose} style={{background:'none', border:'none', fontSize:'1.5rem', cursor:'pointer'}}>&times;</button>
                </div>
                
                <div style={{marginBottom: '30px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#666', fontSize: '0.9rem'}}>
                        <span style={{padding: '4px 8px', backgroundColor: '#f1f3f5', borderRadius: '4px', fontWeight: '600'}}>
                            {inquiry.category === 'general' ? '일반 문의' : 
                             inquiry.category === 'account' ? '계정/로그인' :
                             inquiry.category === 'service' ? '서비스 이용' :
                             inquiry.category === 'error' ? '오류 신고' : '제안/기타'}
                        </span>
                        <span style={{color: '#888'}}>
                            {inquiry.createdAt?.toDate ? inquiry.createdAt.toDate().toLocaleString() : ''}
                        </span>
                    </div>

                    <h3 style={{fontSize: '1.2rem', marginBottom: '15px', color: '#333'}}>{inquiry.title}</h3>
                    
                    <div style={{
                        backgroundColor: '#fff',
                        border: '1px solid #eee',
                        padding: '20px', 
                        borderRadius: '12px', 
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.6',
                        color: '#444',
                        minHeight: '120px',
                        marginBottom: '20px',
                        fontSize: '1rem'
                    }}>
                        {inquiry.content}
                    </div>
                </div>

                <div style={{borderTop: '1px dashed #ddd', paddingTop: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#1E90FF', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span>💬</span> 관리자 답변
                    </h4>
                    
                    {inquiry.answer ? (
                        <div style={{
                            backgroundColor: '#e3f2fd', 
                            border: '1px solid #bbdefb',
                            padding: '20px', 
                            borderRadius: '12px',
                            color: '#0d47a1',
                            lineHeight: '1.6',
                            whiteSpace: 'pre-wrap',
                            fontSize: '1rem'
                        }}>
                            {inquiry.answer}
                        </div>
                    ) : (
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '30px',
                            borderRadius: '12px',
                            textAlign: 'center',
                            color: '#888'
                        }}>
                            <p style={{margin: 0, fontSize: '0.95rem'}}>
                                현재 관리자가 내용을 확인하고 있습니다.<br/>
                                조금만 기다려주시면 친절하게 답변해 드리겠습니다.
                            </p>
                        </div>
                    )}
                </div>

                <div style={{marginTop: '30px', textAlign: 'center'}}>
                    <button 
                        onClick={onClose}
                        style={{
                            width: '100%',
                            maxWidth: '200px',
                            padding: '14px',
                            backgroundColor: '#333',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            transition: 'background 0.2s'
                        }}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InquiryDetailModal;