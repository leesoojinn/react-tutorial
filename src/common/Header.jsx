import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  // 회원가입 정보 가져오기
  const isSignupSuccess = useSelector((state) => state.signup.isSignupSuccess);
  const userEmail = useSelector((state) => state.signup.userEmail);

  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px 0 24px",
      }}
    >
      <h1
        style={{
          color: "gray",
          cursor: "pointer",
        }}
      >
        {/* usNavigate로 홈 아이콘을 누르면 main으로 이동 */}
        <FaHome onClick={() => navigate("/")} />
      </h1>
      {isSignupSuccess ? (
        <div>
          <p>{userEmail}</p>
          <button>로그아웃</button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
    </header>
  );
}
