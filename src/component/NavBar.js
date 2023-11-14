import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NavBar() {
  const navigate = useNavigate();

  function HandleLogout() {
    axios.post("/api/member/logout").then(() => console.log("로그아웃 성공"));
  }

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>home</Button>
      <Button onClick={() => navigate("/write")}>write</Button>
      <Button onClick={() => navigate("/signup")}>sign up</Button>
      <Button onClick={() => navigate("/member/list")}>회원목록</Button>
      <Button onClick={() => navigate("/login")}>로그인</Button>
      <Button onClick={HandleLogout}>로그아웃</Button>
    </Flex>
  );
}
