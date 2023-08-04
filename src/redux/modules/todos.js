// import { createSlice } from "@reduxjs/toolkit";

// // useState 가져오기
// const todos = createSlice({
//   name: "todos",
//   initialState: [],
//   reducers: {
//     // 추가 기능
//     addTodo: (state, action) => {
//       // immer  => 불변성 유지하면서 상태를 수정
//       state.push(action.payload);
//     },

//     // 삭제 기능
//     removeTodo: (state, action) => {
//       return state.filter((todo) => todo.id !== action.payload);
//     },

//     // 수정 기능
//     editTodo: (state, action) => {
//       const upDatedTodo = action.payload;
//       return state.map((todo) =>
//         todo.id === upDatedTodo.id ? upDatedTodo : todo
//       );
//     },
//   },
// });

// // reducer 밖으로 보내기
// export const { addTodo, removeTodo, editTodo } = todos.actions;
// // 파일 분리했을 때
// export default todos.reducer;
