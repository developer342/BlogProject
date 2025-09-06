import cwrite from './style/CommentWrite.module.css'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function CommentWrite({ setMode, onAdded }) {

  const [content, setContent] = useState('')

  const { articleId } = useParams()
  const navigate = useNavigate()
  
  const commentSubmit = async () => {
    if (!content.trim()) {
      alert('댓글을 입력하세요')
      return
    }
    try {
      const res = await axios.post(`/api/articles/${articleId}/comments`, { content })
      const created = res.data

      if(onAdded){
        onAdded(created)
      }
      setContent('')
      setMode('list')

      navigate(`/detail/${articleId}`)
    } catch (e) {
      console.log(e)
      alert('글 등록 실패')
    }

  }

  

  return (
    <div className="CommentWrite">

      <div className={cwrite['commentwrite']}>
        <span style={{ display: 'block', marginBottom: '20px' }}>댓글 작성</span>
        <input
          className='mb-1'
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요" />

        <div className={cwrite['btn-wrap']}>
          <span style={{marginLeft:'890px'}} onClick={commentSubmit}>완료</span>
          <span style={{marginLeft:'10px'}} onClick={()=>{setMode('list')}}>취소</span>
        </div>
      </div>
    </div>
  )
}

export default CommentWrite