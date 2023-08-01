import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { signupSuccess } from "../redux/modules/signup";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 사용자 인증 정보 변화 감지
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // 로그인 유효성 검사
    // 이메일 필드가 비어있는지 확인
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    // 비밀번호 필드가 비어있는지 확인
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user with login", userCredential.user);

      // 로그인 성공 시 사용자 이메일을 redux 상태에 저장
      dispatch(signupSuccess(email));

      alert("로그인에 성공했습니다.");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error with signup", errorCode, errorMessage);

      // firebase 로그인 에러 발생 시 에러 처리
      switch (errorCode) {
        case "auth/invalid-email":
          alert("유효하지 않은 이메일 형식입니다.");
          break;
        case "auth/wrong-password":
          alert("이메일 또는 비밀번호가 올바르지 않습니다.");
          break;
        case "auth/user-not-found":
          alert("일치하는 정보가 없습니다.");
          break;
        default:
          alert(errorMessage);
          break;
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                type="password"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <button
                onClick={handleLogin}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                로그인하기
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <button
                onClick={() => navigate("/signup")}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                회원가입하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
