import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Edit from "./pages/Edit";
import { useState } from "react";

function App() {
  // useState로 todos의 내용 저장하기
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "공부하기",
      content: "오늘 정예반 과제 끝내야해",
      author: "짱구",
    },
    {
      id: 2,
      title: "돌 줍기",
      content: "예쁜 돌 주워서 집에 가져갈거야",
      author: "맹구",
    },
    {
      id: 3,
      title: "소꿉놀이",
      content: "애들 모아서 소꿉놀이 해야징",
      author: "유리",
    },
  ]);

  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route path="/" element={<Main todos={todos} />} />
      <Route
        path="/detail/:id"
        element={<Detail todos={todos} setTodos={setTodos} />}
      />
      <Route
        path="/create"
        element={<Create todos={todos} setTodos={setTodos} />}
      />
      <Route
        path="/edit/:id"
        element={<Edit todos={todos} setTodos={setTodos} />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
