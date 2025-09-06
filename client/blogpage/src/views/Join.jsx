
function Join() {
  return (
    <div className="Login">

      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">회원가입</h2>
        
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

          {/* 이메일 */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">이메일</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="이메일을 입력하세요"
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

          {/* 비밀번호 확인 */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">비밀번호 확인</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>

          {/* 버튼 */}
          <button type="submit" className="btn btn-dark w-100">
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}

export default Join