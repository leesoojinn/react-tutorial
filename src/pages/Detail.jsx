import React, { Fragment, useState, useEffect } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit({ todos, setTodos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // todo의 id와 useparams로 가져온 id를 형변환
  const todoId = parseInt(id);
  const todo = todos.find((todo) => todo.id === todoId);

  // 수정하기 내용을 저장
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);

  useEffect(() => {
    // 수정 페이지 컴포넌트가 마운트될 때 todo의 정보를 가져와서 title과 content를 설정
    setTitle(todo.title);
    setContent(todo.content);
  }, [todo]);

  // 수정 버튼 핸들러
  const upDatedTodoHandler = (e) => {
    e.preventDefault();

    const upDatedTodo = { ...todo, title, content };
    console.log(upDatedTodo);

    // 일치하는 id만 바꿔주기, 아니면 그대로 유지
    const upDatedTodos = todos.map((p) => (p.id === todo.id ? upDatedTodo : p));

    setTodos(upDatedTodos);

    navigate("/");
  };

  return (
    <>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={upDatedTodoHandler}
        >
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용"
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "orange",
              cursor: "pointer",
            }}
          >
            수정하기
          </button>
        </form>
      </Container>
    </>
  );
}
