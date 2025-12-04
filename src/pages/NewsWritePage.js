import React, { useState, useContext, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill'; // 수정됨
import 'react-quill/dist/quill.snow.css'; // 수정됨
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';
import '../styles/NewsWritePage.css';

const NewsWritePage = () => {
    const { currentUser, dbUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const quillRef = useRef(null); 
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('domestic');
    const [content, setContent] = useState('');

    if (!currentUser || (!dbUser?.isAdmin && !dbUser?.isJournalist)) {
        alert("권한이 없습니다.");
        navigate('/news');
        return null;
    }

    // 이미지 핸들러 (이미지 삽입 후 커서 자동 줄바꿈)
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const range = quillRef.current.getEditor().getSelection(true);
                    const imgUrl = reader.result;
                    
                    // 이미지 삽입
                    quillRef.current.getEditor().insertEmbed(range.index, 'image', imgUrl);
                    
                    // 커서를 이미지 다음으로 이동시키고 엔터(줄바꿈) 넣기
                    quillRef.current.getEditor().setSelection(range.index + 1);
                    quillRef.current.getEditor().insertText(range.index + 1, "\n");
                };
                reader.readAsDataURL(file);
            }
        };
    };

    // 모듈 설정 (메모이제이션 필수)
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['link', 'image'],
                    ['clean']
                ],
                handlers: {
                    image: imageHandler
                }
            }
        };
    }, []);

    const handleSubmit = async () => {
        if (!title || !content) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        if (!window.confirm("뉴스를 발행하시겠습니까?")) return;

        try {
            const imgTag = content.match(/<img src="(.*?)"/);
            const firstImage = imgTag ? imgTag[1] : 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000';

            await addDoc(collection(db, "news"), {
                title: title,
                content: content,
                category: category,
                source: dbUser.nickname || 'CarScope Editor',
                authorId: currentUser.uid,
                date: new Date().toLocaleDateString(),
                createdAt: new Date(),
                imageUrl: firstImage,
                views: 0,
                likes: 0,
                likedBy: []
            });

            alert("뉴스가 성공적으로 발행되었습니다.");
            navigate('/news');
        } catch (error) {
            console.error(error);
            alert("발행 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="write-container page-content">
            <h2 className="write-title">뉴스 기사 작성</h2>
            <div className="write-form">
                <div className="form-row">
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="category-select"
                    >
                        <option value="domestic">국내</option>
                        <option value="international">해외</option>
                        <option value="industry">산업/정책</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="제목을 입력하세요" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="title-input"
                    />
                </div>

                <div className="editor-wrapper">
                    <ReactQuill 
                        ref={quillRef}
                        theme="snow" 
                        value={content} 
                        onChange={setContent} 
                        modules={modules}
                        placeholder="내용을 입력하세요. (이미지 첨부 가능)"
                        style={{ height: '500px' }}
                    />
                </div>

                <div className="button-group">
                    <button className="cancel-btn" onClick={() => navigate('/news')}>취소</button>
                    <button className="submit-btn" onClick={handleSubmit}>발행하기</button>
                </div>
            </div>
        </div>
    );
};

export default NewsWritePage;