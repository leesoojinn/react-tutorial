import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../modules/todos"; // todos 리듀서를 가져온다.

const store = configureStore({
  reducer: {
    todos: todosReducer, // todosReducer는 todos 리듀서를 가리킨다.
  },
});

export default store;
