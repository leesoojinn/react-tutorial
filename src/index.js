import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = [
  {
    id: nanoid(),
    title: "공부하기",
    content: "오늘 정예반 과제 끝내야해",
    author: "짱구",
  },
  {
    id: nanoid(),
    title: "돌 줍기",
    content: "예쁜 돌 주워서 집에 가져갈거야",
    author: "맹구",
  },
  {
    id: nanoid(),
    title: "소꿉놀이",
    content: "애들 모아서 소꿉놀이 해야징",
    author: "유리",
  },
];

// useState 가져오기
const todos = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // 추가 기능
    addTodo: (state, action) => {
      return [...state, action.payload];
    },

    // 삭제 기능
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    // 수정 기능
    editTodo: (state, action) => {
      const upDatedTodo = action.payload;
      return state.map((todo) =>
        todo.id === upDatedTodo.id ? upDatedTodo : todo
      );
    },
  },
});

// configureStore{} 안에 reducer: {}를 넣는다.
const store = configureStore({
  reducer: {
    // todos는 내가 이름 짓는 거고
    // todos.reducer에서의 todos는 위에 let으로 만든 것이다.
    todos: todos.reducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Routes, Route 태그 및 react-router-dom을 사용하기 위해선 최상단에 BrowserRouter로 감싸줘야한다 */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// reducer 밖으로 보내기
export const { addTodo, removeTodo, editTodo } = todos.actions;
export default todos.reducer;
