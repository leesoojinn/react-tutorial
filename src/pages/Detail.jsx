import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../redux/modules/todos";

export default function Detail() {
  const todos = useSelector((state) => state.todos);
  const userEmail = useSelector((state) => state.signup.userEmail);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log("id:", id);

  // 같은 아이디값 가져오기
  const todo = todos.find((todo) => todo.id === id);
  console.log(todo);

  return (
    <>
      <Header />
      <Container>
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {todo?.title}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {todo?.content}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => {
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
              if (todo.author !== userEmail) {
                alert("게시글 작성자만 삭제 가능합니다.");
                return;
              }

              alert("삭제할까?");
              dispatch(removeTodo(todo.id));
              navigate("/");
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
      </Container>
    </>
  );
}
