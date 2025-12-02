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
                <h2>문의 답변 작성</h2>
                
                <div style={{textAlign: 'left', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee'}}>
                    <p style={{margin: '5px 0', color: '#666'}}><strong>작성자:</strong> {inquiry.name} ({inquiry.contact})</p>
                    <p style={{margin: '5px 0', color: '#333'}}><strong>제목:</strong> {inquiry.title}</p>
                    <div style={{marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', whiteSpace: 'pre-wrap', fontSize: '0.95rem', color: '#555'}}>
                        {inquiry.content}
                    </div>
                </div>

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
            </div>
        </div>
    );
};

export default InquiryReplyModal;