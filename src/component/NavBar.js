import { Button, Flex, Spacer, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { LoginContext } from "./LoginProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPen,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
export function NavBar() {
  const navigate = useNavigate();
  const toast = useToast();
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const urlParams = new URLSearchParams();
  const location = useLocation();
  if (login !== "") {
    urlParams.set("id", login.id);
  }
  useEffect(() => {
    fetchLogin();
  }, [location]);
  function HandleLogout() {
    axios
      .post("/api/member/logout")
      .then(() => {
        toast({
          description: "로그아웃 되었습니다.",
          status: "info",
        });
        navigate("/");
      })
      .finally(() => fetchLogin());
  }

  return (
    <Flex mb={5}>
      <Button
        borderRadius={0}
        variant="ghost"
        size="lg"
        onClick={() => navigate("/")}
      >
        {" "}
        <FontAwesomeIcon icon={faHouse} />
        home
      </Button>
      {isAuthenticated() && (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          onClick={() => navigate("/write")}
        >
          <FontAwesomeIcon icon={faPen} />
          write
        </Button>
      )}
      <Spacer />
      {isAuthenticated() || (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          onClick={() => navigate("/signup")}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          sign up
        </Button>
      )}
      {isAdmin() && (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          onClick={() => navigate("/member/list")}
        >
          <FontAwesomeIcon icon={faUsers} />
          회원목록
        </Button>
      )}
      {isAuthenticated() && (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          onClick={() => navigate("/member?" + urlParams.toString())}
        >
          <FontAwesomeIcon icon={faUser} />
          회원정보
        </Button>
      )}
      {isAuthenticated() || (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          onClick={() => navigate("/login")}
        >
          <FontAwesomeIcon icon={faRightToBracket} />
          로그인
        </Button>
      )}
      {isAuthenticated() && (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          onClick={HandleLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          로그아웃
        </Button>
      )}
    </Flex>
  );
}
