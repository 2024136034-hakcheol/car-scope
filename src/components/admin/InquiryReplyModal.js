import React, { useState, useEffect } from 'react';
import '../../styles/AdminPage.css';

const InquiryReplyModal = ({ inquiry, onSave, onClose }) => {
    const [reply, setReply] = useState('');

    useEffect(() => {
        setReply(inquiry.answer || inquiry.reply || '');
    }, [inquiry]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(inquiry.id, reply);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{inquiry.isGuest ? "비회원 문의 확인" : "문의 답변 작성"}</h2>
                
                <div style={{textAlign: 'left', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee'}}>
                    <p style={{margin: '5px 0', color: '#666'}}>
                        <strong>작성자:</strong> {inquiry.name} 
                        {inquiry.isGuest && <span style={{color: '#e74c3c', fontWeight:'bold', marginLeft:'5px'}}>(비회원)</span>}
                        <span style={{color:'#999', marginLeft:'5px'}}>({inquiry.contact})</span>
                    </p>
                    <p style={{margin: '5px 0', color: '#333'}}><strong>제목:</strong> {inquiry.title}</p>
                    <div style={{marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', whiteSpace: 'pre-wrap', fontSize: '0.95rem', color: '#555'}}>
                        {inquiry.content}
                    </div>
                </div>

                {inquiry.isGuest ? (
                    <div style={{textAlign: 'center', padding: '20px 0'}}>
                        <div style={{
                            backgroundColor: '#fff3cd', 
                            color: '#856404', 
                            padding: '15px', 
                            borderRadius: '8px',
                            border: '1px solid #ffeeba',
                            marginBottom: '20px',
                            fontSize: '0.95rem'
                        }}>
                            🚫 <strong>비회원 문의입니다.</strong><br/>
                            시스템 답변 등록이 불가능합니다.<br/>
                            상단에 기재된 연락처로 직접 연락해 주세요.
                        </div>
                        <button 
                            type="button" 
                            className="cancel-button" 
                            onClick={onClose}
                            style={{width: '100%', padding: '12px', fontSize: '1rem', backgroundColor: '#333', color: 'white', border:'none'}}
                        >
                            확인 완료 (닫기)
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="modal-form">
                        <div className="input-group">
                            <label style={{ whiteSpace: 'nowrap' }}>관리자 답변</label>
                            <textarea
                                rows="6"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="고객님께 전달할 답변 내용을 입력하세요."
                                style={{
                                    width: '100%', 
                                    padding: '10px', 
                                    border: '1px solid #ddd', 
                                    borderRadius: '4px',
                                    resize: 'vertical',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>
                        
                        <div className="modal-buttons">
                            <button type="button" className="cancel-button" onClick={onClose}>취소</button>
                            <button type="submit" className="save-button">답변 등록</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default InquiryReplyModal;