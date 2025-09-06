import { useNavigate, useParams } from 'react-router-dom'
import edit from './style/Edit.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Edit({ 글, 글변경 }) {

  let navigate = useNavigate()
  let { articleId } = useParams()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const article = 글.find(a => String(a.id) === String(articleId))

  useEffect(() => {
    if (article) {
      setTitle(article.title ?? '');
      setContent(article.content ?? '');
    }
  }, [article]);


  const handleEdit = async () => {

    await axios.put(`/api/articles/${articleId}`, { title, content }) 

    글변경(curr =>
      (Array.isArray(curr) ? curr : []).map(a =>
        String(a.id) === String(articleId) ? { ...a, title, content } : a
      )
    )

    navigate(`/`)

  }





  return (
    <div className="Edit">

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            <div className={edit["write-wrap"]}>
              <input
                type="text"
                className={edit["title"]}
                value={title}
                onInput={(e) => setTitle(e.target.value)}
              />
              <div style={{ borderTop: '1px solid #d3d3d3' }}></div>
              <textarea
                className={edit["text"]}
                value={content}
                onInput={(e) => setContent(e.target.value)}
              />

              <div className={`${edit["btn-wrap"]} text-end mt-2`}>
                <span
                  role="button"
                  className={edit["btn_register"]}
                  onClick={handleEdit}
                >
                  수정완료
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Edit