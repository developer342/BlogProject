
function Login() {
  return (
    <div className="Login">

      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">로그인</h2>
        
        <form>
          {/* 아이디 */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">아이디</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="아이디를 입력하세요"
            />
          </div>

          {/* 비밀번호 */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">비밀번호</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {/* 버튼 */}
          <button type="submit" className="btn btn-dark w-100">
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login