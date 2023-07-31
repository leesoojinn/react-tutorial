import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/modules/todos";

export default function Create() {
  const [todoData, setTodoData] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 추가 버튼 핸들러
  const addButtonHandler = () => {
    dispatch(
      addTodo({
        id: nanoid(),
        title: todoData.title,
        content: todoData.content,
        author: "수진",
      })
    );
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
          onSubmit={(e) => {
            e.preventDefault();
            addButtonHandler();
          }}
        >
          <div>
            <input
              value={todoData.title}
              onChange={(e) =>
                // todoData 객체를 복제하되, title 프로퍼티만 새로 입력된 값으로 바꾼 새로운 객체를 만들어서 상태를 업데이트하라!!
                setTodoData({ ...todoData, title: e.target.value })
              }
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
              value={todoData.content}
              onChange={(e) =>
                setTodoData({ ...todoData, content: e.target.value })
              }
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
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
