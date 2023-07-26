import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";

export default function Detail({ todos, setTodos }) {
  const navigate = useNavigate();

  const { id } = useParams();
  console.log("id:", id);

  // 같은 아이디값 가져오기
  const todo = todos.find((todo) => todo.id === id);
  console.log(todo);

  // 삭제 버튼
  // filter로 같은 아이디 값이 아닌 것만 보이게 하기
  const deletedButtonHandler = (todoId) => {
    const deletedTodo = todos.filter((item) => item.id !== todoId);
    setTodos(deletedTodo);
    navigate("/");
  };

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
          {todo.title}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {todo.content}
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
              alert("삭제할까?");
              deletedButtonHandler(todo.id);
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
