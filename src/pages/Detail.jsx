import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function Detail() {
  const userEmail = useSelector((state) => state.signup.userEmail);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  // ["todos", id] => 배열로 구성되며, 이 배열이 캐싱된 데이터를 구분하는 식별자 역할을 한다.
  // id 값이 변경될 때마다 새로운 요청이 발생하여 새로운 데이터를 가져오게 된다.
  const { data, isLoading, isError, error } = useQuery(
    ["todos", id],
    async () => {
      const response = await axios.get(`http://localhost:4000/todos/${id}`);
      return response.data;
    }
  );

  // 삭제 버튼
  const deleteTodo = useMutation(
    async (todo) => {
      await axios.delete(`http://localhost:4000/todos/${todo.id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

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
          {data?.title}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {data?.content}
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
              if (data.author !== userEmail) {
                alert("게시글 작성자만 수정 가능합니다.");
                return;
              }

              navigate(`/edit/${data.id}`);
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
              if (data.author !== userEmail) {
                alert("게시글 작성자만 삭제 가능합니다.");
                return;
              }

              alert("삭제할까?");
              deleteTodo.mutate(data);
              navigate("/");
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
