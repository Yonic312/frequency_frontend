import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 회원가입
  const handleSignUp = () => {
    navigate("/signUp");
  };

  // 로그인 시도
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("로그인 시도:", { userId, password });

    try {
      // 로그인 API 호출
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid: userId, password: password }),
      });

      const data = await response.json();
      
      if (data.success) {
        // 로그인 성공 시
        localStorage.setItem("id", userId); // 로컬 저장소에 로그인 상태 저장
        setUser(userId); // 사용자 정보 설정

        // 관리자 페이지로 이동 시
        if (data.isAdmin) {
          navigate("/admin"); // 관리자 페이지로 이동
        } else {
          navigate("/home"); // 일반 사용자의 경우 메인 페이지로 이동
        }
      } else {
        alert("잘못된 이메일 또는 비밀번호입니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-30 h-134">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="loginTitle-custom-text text-black">로그인</label><br />
          <input
            className="w-45 h-6 text-black bg-white border-1"
            placeholder=" ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="mt-2">
          <input
            className="w-45 h-6 text-black bg-white border-1"
            placeholder=" 비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="bg-black mt-2 h-7 w-18">
          로그인
        </button>
        <button className="bg-black ml-2 h-7 w-18" onClick={handleSignUp}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Login;