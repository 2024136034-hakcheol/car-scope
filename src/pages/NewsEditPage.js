import React, { useState, useContext, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';
import imageCompression from 'browser-image-compression';
import '../styles/NewsWritePage.css';

const NewsEditPage = () => {
    const { id } = useParams();
    const { currentUser, dbUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const quillRef = useRef(null); 
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('domestic');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "news", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setTitle(data.title);
                setCategory(data.category);
                setContent(data.content);
                
                if (currentUser?.uid !== data.authorId && !dbUser?.isAdmin) {
                    alert("수정 권한이 없습니다.");
                    navigate('/news');
                }
            } else {
                alert("게시글을 찾을 수 없습니다.");
                navigate('/news');
            }
            setLoading(false);
        };
        fetchData();
    }, [id, currentUser, dbUser, navigate]);

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
                    image: () => {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        input.click();

                        input.onchange = async () => {
                            const file = input.files[0];
                            if (file) {
                                if (file.size > 5 * 1024 * 1024) {
                                    alert("이미지 용량이 너무 큽니다. (5MB 이하만 가능)");
                                    return;
                                }

                                try {
                                    const options = {
                                        maxSizeMB: 0.5, 
                                        maxWidthOrHeight: 1920,
                                        useWebWorker: true
                                    };
                                    
                                    const compressedFile = await imageCompression(file, options);

                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        const editor = quillRef.current.getEditor();
                                        const range = editor.getSelection();
                                        const imgUrl = reader.result;
                                        
                                        editor.insertEmbed(range.index, 'image', imgUrl);
                                        editor.insertText(range.index + 1, "\n");
                                        editor.setSelection(range.index + 2);
                                    };
                                    reader.readAsDataURL(compressedFile);

                                } catch (error) {
                                    console.error(error);
                                    alert("이미지 업로드 중 오류가 발생했습니다.");
                                }
                            }
                        };
                    }
                }
            }
        };
    }, []);

    const handleUpdate = async () => {
        if (!title || !content) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        if (!window.confirm("수정하시겠습니까?")) return;

        try {
            const imgTag = content.match(/<img src="(.*?)"/);
            const firstImage = imgTag ? imgTag[1] : 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000';

            await updateDoc(doc(db, "news", id), {
                title: title,
                content: content,
                category: category,
                imageUrl: firstImage,
                updatedAt: new Date()
            });

            alert("수정되었습니다.");
            navigate(`/news/${id}`);
        } catch (error) {
            console.error(error);
            if (error.message.includes("larger than 1 MB")) {
                alert("사진 용량이 너무 큽니다. (압축 실패)");
            } else {
                alert("수정 중 오류가 발생했습니다.");
            }
        }
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <div className="write-container page-content">
            <h2 className="write-title">뉴스 기사 수정</h2>
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
                        style={{ height: '500px' }}
                    />
                </div>

                <div className="button-group">
                    <button className="cancel-btn" onClick={() => navigate(`/news/${id}`)}>취소</button>
                    <button className="submit-btn" onClick={handleUpdate}>수정 완료</button>
                </div>
            </div>
        </div>
    );
};

export default NewsEditPage;