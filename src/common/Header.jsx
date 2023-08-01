import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { logout } from "../redux/modules/signup";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 회원가입 정보 가져오기
  const isSignupSuccess = useSelector((state) => state.signup.isSignupSuccess);
  const userEmail = useSelector((state) => state.signup.userEmail);

  // 로그아웃 버튼 핸들러
  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("click logOut"); // 로그 확인을 위해 추가

    await signOut(auth);

    // 로그아웃 액션을 dispatch하여 redux 상태를 업데이트
    dispatch(logout());
  };

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
          <button
            onClick={handleLogout}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "#fccae7",
              color: "black",
              cursor: "pointer",
            }}
            // #fccae7
            // #cafcf7
          >
            로그아웃
          </button>
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
