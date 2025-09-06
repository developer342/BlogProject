import { useEffect, useRef, useState } from 'react'
import write from './style/Write.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'



function Write({ 글, 글변경 }) {

  let navigate = useNavigate()
  const fileRef = useRef(null)

  let [title, setTitle] = useState()
  let [content, setContent] = useState()
  const [saving, setSaving] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileName, setFileName] = useState("");


  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력하세요.');
      return;
    }

    try {
      setSaving(true);
      const res = await axios.post('/api/articles', { title, content });
      const created = res.data; // {id, title, content} 응답이라고 가정

      // 부모 상태 업데이트
      글변경(Array.isArray(글) ? [...글, created] : [created]);

      // 👉 등록 후 메인으로 이동
      navigate('/');

      // 👉 혹은 상세 페이지로 이동하고 싶으면:
      // navigate(`/detail/${created.id}`);
    } catch (e) {
      console.error(e);
      alert('글 등록 실패');
    } finally {
      setSaving(false);
    }
  }

  const openPicker = () => fileRef.current?.click();

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName("");
      setPreview(null);
      return;
    }

    setFileName(file.name);
  }




  return (
    <div className="Write">

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            <div className={write["write-wrap"]}>
              <input
                type="text"
                className={write["title"]}
                placeholder="제목을 입력하세요"
                onInput={(e) => setTitle(e.target.value)}
              />
              <div style={{ borderTop: '1px solid #d3d3d3' }}></div>
              <textarea
                className={write["text"]}
                placeholder="내용을 입력하세요"
                onInput={(e) => setContent(e.target.value)}
              />

              <div className='mb-2 mt-2'>첨부파일</div>
              <div style={{ borderTop: '1px solid #d3d3d3' }}></div>

              <div className={`${write["btn-wrap"]} text-end mt-2`}>

                <div className={`${write['file-input']}`}>
                  <input
                    type="file"
                    id='fileInput'
                    style={{ display: 'none' }}
                    ref={fileRef}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    value={selectedFileName}
                    placeholder="선택된 파일 없음"
                    readOnly
                  />
                  <button
                    style={{ marginLeft: '10px' }}
                    onClick={openPicker}
                  >
                    파일선택
                  </button>
                </div>

                <span
                  role="button"
                  className={`${write["btn_register"]} ms-auto`}
                  onClick={() => { handleSubmit() }}
                >
                  글 등록
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )


}

export default Write