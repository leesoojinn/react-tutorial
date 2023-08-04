import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector } from "react-redux";

import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function Main() {
  // 로그인 정보 가져오기
  const isSignupSuccess = useSelector((state) => state.signup.isSignupSuccess);
  const userEmail = useSelector((state) => state.signup.userEmail);

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery("todos", async () => {
    const response = await axios.get("http://localhost:4000/todos");
    return response.data;
  });

  // 추가 버튼
  const addButton = () => {
    if (!isSignupSuccess) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      navigate("/create");
    }
  };

  // 삭제 버튼
  const deleteTodo = useMutation(
    async (todo) => {
      await axios.delete(`http://localhost:4000/todos/${todo.id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "12px",
          }}
        >
          <button
            onClick={addButton}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          >
            추가
          </button>
        </div>
        {/* 앞에가 true면 뒤에 꺼 보여주기 */}
        {isLoading === true && <div>로딩 중 ...</div>}
        {isError === true && <div>{error.message}</div>}
        {data?.map((todo) => (
          <div
            // key값으로 고유한 값 넣어주기
            key={todo.id}
            style={{
              backgroundColor: "#EEEEEE",
              borderRadius: "24px",
              marginBottom: "12px",
              display: "flex",
              padding: "12px 16px 12px 16px",
            }}
          >
            <div
              onClick={() => {
                // todo의 id로 페이지 이동
                navigate(`/detail/${todo.id}`);
              }}
              style={{
                flex: 4,
                borderRight: "1px solid lightgrey",
                cursor: "pointer",
              }}
            >
              <h2>{todo.title}</h2>
              <p
                style={{
                  width: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {todo.content}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "space-around",
                gap: "12px",
              }}
            >
              <div>{todo.author}</div>
              <div>
                <button
                  onClick={() => {
                    // 로그인한 이메일이 일치해야 수정이 가능
                    if (todo.author !== userEmail) {
                      alert("게시글 작성자만 수정 가능합니다.");
                      return;
                    }

                    navigate(`/edit/${todo.id}`);
                  }}
                  style={{
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: "orange",
                    color: "white",
                    cursor: "pointer",
                    marginRight: "6px",
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    // 로그인한 이메일이 일치해야 삭제 가능
                    if (todo.author !== userEmail) {
                      alert("게시글 작성자만 수정 가능합니다.");
                      return;
                    }

                    alert("삭제할까?");
                    deleteTodo.mutate(todo);
                  }}
                  style={{
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
