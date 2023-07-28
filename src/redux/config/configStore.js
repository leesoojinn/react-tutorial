import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todos";

// configureStore{} 안에 reducer: {}를 넣는다.
const store = configureStore({
  reducer: {
    // todos는 내가 이름 짓는 거고
    // todos.reducer에서의 todos는 위에 let으로 만든 것이다.
    todos: todos.reducer,
  },
});

export default store;
