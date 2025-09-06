import { useEffect, useState } from 'react'
import detail from './style/Detail.module.css'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import CommentWrite from './CommentWrite'
import CommentEdit from './CommentEdit'

function Detail({ 글, 글변경 }) {

  let { articleId } = useParams()
  let navigate = useNavigate()

  const article = 글.find(a => String(a.id) === String(articleId))

  const [댓글, 댓글변경] = useState([])
  const [mode, setMode] = useState('list')
  const [openId, setOpenId] = useState(null);
  const [editId, setEditId] = useState(null)
  const [showWrite, setShowWrite] = useState(false);

  useEffect(() => {
    axios.get(`/api/articles/${articleId}/comments`)
      .then(res => {
        console.log(res.data)
        댓글변경(res.data)
      })
      .catch(err => console.error(err))
  }, [articleId])


  const articleDeleted = async (articleId) => {
    if (!window.confirm('삭제하시겠습니까?')) return


    await axios.delete(`/api/articles/${articleId}`)
    글변경(prev => prev.filter(a => String(a.id) !== String(articleId)))
    navigate('/')
  }

  const handleEdit = (comment) => {
    setEditId(comment.id)
    setMode('edit')
  }

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/articles/${articleId}/comments/${commentId}`)
      댓글변경(prev => prev.filter(c => c.id !== commentId))
    } catch(e) {
      console.error(e)
      alert('삭제 실패')
    }
  }

  const changeMode = ()=>{
    if(mode == 'write')
      setMode('list')
    else if(mode == 'edit')
      setMode('list')
    else
      setMode('write')
  }

  const toggleMenu = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (!article) {
    return <div className="container py-4">게시글을 불러오는 중...</div>;
  }


  return (
    <div className="Detail">



      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            <div className={detail["detail-wrap"]}>
              <h3 className="mb-3 ms-3">{article.title}</h3>

              <div className={`${detail["detail"]} fs-5`}>
                {article.content}
              </div>

              <div className={`${detail["btn-wrap"]} mt-2 text-end`}>
                <span
                  role="button"
                  className="me-2"
                  onClick={() => navigate(`/edit/${articleId}`)}
                >
                  수정
                </span>
                <span
                  role="button"
                  className={detail["delete"]}
                  onClick={() => articleDeleted(articleId)}
                >
                  삭제
                </span>
              </div>

              <div className={detail["comments"]}>

                <div className={detail["comments-header"]}>
                  <span>댓글</span>
                  <span onClick={changeMode}>댓글작성</span>
                </div>

                {mode === 'write' ? (
                  <CommentWrite
                    setMode={setMode}
                    onAdded={(created) => 댓글변경(prev => [...prev, created])} />
                ) : mode === 'edit' ? (
                  <CommentEdit
                    댓글변경={댓글변경}
                    commentId={editId}
                    setMode={setMode}
                    onUpdated={(update) => {
                      댓글변경(prev => prev.map(c => c.id === update.id ? update : c))
                    }} />
                ) : (
                  <div className={detail["comments-list"]}>
                    {댓글.map((comment, i) => (

                      <div key={i} className={detail["comment-row"]}>

                        <div className={detail["comment-content"]}>
                          {comment.content}


                          <span
                            className={detail["menu-anchor"]}
                            role="button"
                            onClick={() => toggleMenu(comment.id)}
                          >

                            <span className={detail["comment-toggle"]} style={{ fontSize: '10px' }}>▶</span>

                            {openId === comment.id && (
                              <span className={detail["comment-menu"]}>
                                <span onClick={() => handleEdit(comment)}>
                                  수정
                                </span>
                                <span className='ms-1 me-1' style={{ borderLeft: '1px solid #d3d3d3' }}></span>
                                <span onClick={() =>{handleDelete(comment.id)}}>
                                  삭제
                                </span>
                              </span>
                            )}
                            
                          </span>
                        </div>


                      </div>

                    ))}


                  </div>
                )}



              </div>


            </div>

          </div>
        </div>
      </div>



    </div>

  )
}

export default Detail