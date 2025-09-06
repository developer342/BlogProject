import { useEffect, useState } from 'react'
import cedit from './style/CommentEdit.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function CommentEdit({ 댓글변경, commentId, setMode, onUpdated }) {

  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const { articleId } = useParams()

  useEffect(() => {

    const fetchComment = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`/api/articles/${articleId}/comments`);
        const list = res.data;

        const found = list.find(c => String(c.id) === String(commentId));

        setContent(found?.content ?? '');
      } catch (e) {
        console.error(e);
        alert('댓글을 불러올 수 없습니다.');
        setMode('list');
      } finally {
        setLoading(false);
      }
    };

    fetchComment();
  }, [commentId, articleId])

  const handleUpdate = async () => {

    if (!content.trim()) {
      alert('내용을 입력하세요')
      return
    }

    try {
      const res = await axios.put(`/api/articles/${articleId}/comments/${commentId}`, { content })


      onUpdated && onUpdated(res.data);
      setMode('list')

    } catch (e) {
      console.error(e)
      alert("수정실패")
    }
  }




  if (loading) return <div>불러오는 중...</div>;


  return (
    <div className="CommentEdit">

      <div className={cedit['commentwrite']}>
        <span style={{ display: 'block', marginBottom: '20px' }}>댓글 수정</span>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />

        <div className={cedit['btn-wrap']}>
          <span style={{ marginLeft: '890px' }} onClick={handleUpdate}>완료</span>
          <span style={{ marginLeft: '10px' }} onClick={() => setMode('list')}>취소</span>
        </div>
      </div>

    </div>
  )
}

export default CommentEdit