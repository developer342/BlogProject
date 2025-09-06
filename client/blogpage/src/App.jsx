import React from "react"
import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import './App.css'
import data from './data.js'
import Write from './views/Write.jsx'
import Detail from './views/Detail.jsx'
import Edit from './views/Edit.jsx'
import Login from './views/Login.jsx'
import Join from "./views/Join.jsx"
import api from './lib/api.js'
import axios from 'axios'

function App() {



  let [글, 글변경] = useState([])


  useEffect(() => {
    axios.get('/api/articles')
      .then(res => {
        글변경(res.data)
      })
      .catch(err => console.error(err))
  }, [])



  return (
    <div className='App'>

      <header>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
          <div className="container">
            <Link to="/" className="navbar-brand fw-bold" style={{ fontSize: '24px' }}>
              Blog
            </Link>

            <div>
              <Link to="/login" className="nav-link d-inline-block text-white me-3">
                로그인
              </Link>
              <Link to="/join" className="nav-link d-inline-block text-white">
                회원가입
              </Link>
            </div>
          </div>
        </nav>

      </header>




      <main>


        <Routes>
          <Route path='/' element={<Main 글={글} 글변경={글변경} />} />

          <Route path='/write' element={<Write 글={글} 글변경={글변경} />} />
          <Route path='/detail/:articleId' element={<Detail 글={글} 글변경={글변경} />} />
          <Route path='/edit/:articleId' element={<Edit 글={글} 글변경={글변경} />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/join" element={<Join/>}/>
        </Routes>

      </main>




    </div>
  )
}

function Main({ 글, 글변경 }) {

  let navigate = useNavigate()





  return (
    <div className='Main'>

      <div className="blog">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9">

              <div className="blog-header">
                <h3>블로그 목록</h3>
              </div>

              <div className="blog-list">

                {글.map((item, i) => (
                  <div className="blog-wrap" key={item.id}>
                    <h4
                      onClick={() => navigate(`/detail/${item.id}`)}
                      style={{ cursor: 'pointer', fontSize: '23px' }}
                    >
                      {item.title}
                    </h4>
                  </div>
                ))}

              </div>

              <div className="write-blog text-end mt-3 me-2">
                <span onClick={() => navigate('/write')} style={{ cursor: 'pointer' }}>
                  글작성
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )


}

export default App
