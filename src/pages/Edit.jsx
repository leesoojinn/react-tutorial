import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTodo } from "..";

export default function Edit() {
  const todos = useSelector((state) => state.todos);
  const { id } = useParams();
  // console.log("id:", id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todo = todos.find((todo) => todo.id === id);
  // console.log(selectTodo);

  // 수정하기 내용을 저장
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);

  // 수정 버튼 핸들러
  const upDatedTodoHandler = (e) => {
    e.preventDefault();

    // 스프레드 문법
    const upDatedTodo = { ...todo, title, content };
    // 액션 생성자 editTodo s
    dispatch(editTodo(upDatedTodo));

    navigate("/");
  };

  return (
    <Fragment>
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
    </Fragment>
  );
}
