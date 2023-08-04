import React, { Fragment, useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function Edit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery(
    ["todos", id],
    async () => {
      const response = await axios.get(`http://localhost:4000/todos/${id}`);
      return response.data;
    }
  );

  // 수정하기 내용을 저장
  const [todoData, setTodoData] = useState({
    title: "",
    content: "",
  });

  // 데이터가 로딩되면 todoData 초기화
  useEffect(() => {
    if (!isLoading && !isError && data) {
      setTodoData({
        title: data.title,
        content: data.content,
      });
    }
  }, [data, isLoading, isError]);

  // 수정 API 요청을 위한 useMutation 훅 사용
  const editTodoMutation = useMutation(
    async (updatedTodo) => {
      const response = await axios.put(
        `http://localhost:4000/todos/${updatedTodo.id}`,
        updatedTodo
      );
      return response.data;
    },
    {
      // 요청이 성공적으로 완료되면 react-query 캐시를 갱신하기 위해 onSuccess 콜백 사용
      onSuccess: () => {
        // 캐시 갱신
        queryClient.invalidateQueries("todos");
        // 수정 완료 후 메인 페이지로 이동
        navigate("/");
      },
    }
  );

  // 수정 버튼 핸들러
  const upDatedTodoHandler = (e) => {
    e.preventDefault();

    // 스프레드 문법
    const updatedTodo = { ...data, ...todoData };
    editTodoMutation.mutate(updatedTodo);

    navigate("/");
  };

  if (isLoading) {
    return <div>로딩 중 ...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (!data) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

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
              value={todoData.title}
              onChange={(e) =>
                // todoData를 보여주고 내용 추가
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
                // todoData를 보여주고 내용 추가
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
