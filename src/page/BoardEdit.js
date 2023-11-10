import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import axios from "axios";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
  }, []);
  if (board === null) {
    return <Spinner />;
  }

  function handleEdit() {
    axios
      .put("/api/board/edit", board)
      .then(() => {
        toast({
          description: board.id + "번 게시글이 수정 됐습니다",
          status: "success",
        });
        navigate("/board/" + id);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "요청이 잘못됐습니다",
            status: "error",
          });
        } else {
          toast({
            description: "수정 중에 문제가 발생했습니다",
            status: "error",
          });
        }
      })
      .finally(() => {
        console.log("끝");
      });
  }

  return (
    <Box>
      <h1>{id}번 글 수정</h1>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          value={board.title}
          onChange={(e) => {
            updateBoard((draft) => {
              draft.title = e.target.value;
            });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea
          value={board.content}
          onChange={(e) => {
            updateBoard((draft) => {
              draft.content = e.target.value;
            });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input
          value={board.writer}
          onChange={(e) => {
            updateBoard((draft) => {
              draft.writer = e.target.value;
            });
          }}
        />
      </FormControl>
      <Button colorScheme="purple" onClick={handleEdit}>
        저장
      </Button>
      {/* navigate에 -1은 이전경로*/}
      <Button onClick={() => navigate(-1)}>취소</Button>
    </Box>
  );
}
