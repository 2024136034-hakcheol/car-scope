import React from 'react';
import '../styles/InquiryDetailModal.css'; // 스타일 파일도 만들어야 함

const InquiryDetailModal = ({ isOpen, onClose, inquiry }) => {
    if (!isOpen || !inquiry) return null;

    // 날짜 포맷팅 함수
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content inquiry-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>문의 내역 상세</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {/* 질문 영역 */}
                    <div className="question-section">
                        <div className="info-row">
                            <span className="badge-category">{inquiry.category}</span>
                            <span className="date">{formatDate(inquiry.createdAt)}</span>
                        </div>
                        <h3 className="inquiry-title">{inquiry.title}</h3>
                        <div className="inquiry-content">
                            {inquiry.content}
                        </div>
                    </div>

                    {/* 답변 영역 */}
                    <div className="answer-section">
                        <h4>관리자 답변</h4>
                        {inquiry.answer ? (
                            <div className="answer-box answered">
                                <div className="admin-profile">
                                    <span className="admin-badge">ADMIN</span>
                                    <span className="admin-name">CarScope 관리자</span>
                                </div>
                                <p className="answer-text">{inquiry.answer}</p>
                            </div>
                        ) : (
                            <div className="answer-box waiting">
                                <p>아직 답변이 등록되지 않았습니다.<br/>조금만 기다려주시면 친절하게 답변해 드리겠습니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-confirm" onClick={onClose}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default InquiryDetailModal;