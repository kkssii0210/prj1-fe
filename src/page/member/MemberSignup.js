import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");

  const [idAvailable, setIdAvailable] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameAvailable, setNicknameAvailable] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  // submitAvailable 초기화
  let submitAvailable =
    idAvailable &&
    emailAvailable &&
    nicknameAvailable &&
    password === passwordCheck &&
    password.length > 0;
  if (!emailAvailable) {
    submitAvailable = false;
  }

  if (!idAvailable) {
    submitAvailable = false;
  }

  if (password !== passwordCheck) {
    submitAvailable = false;
  }

  if (password.length === 0) {
    submitAvailable = false;
  }

  // 조건에 따라 submitAvailable 업데이트
  if (
    !emailAvailable ||
    !idAvailable ||
    password !== passwordCheck ||
    password.length === 0
  ) {
    submitAvailable = false;
  }

  function handleSubmit() {
    axios
      .post("/api/member/signup", {
        id,
        password,
        email,
        nickname,
      })
      .then(() => {
        toast({
          description: "회원가입이 완료되었습니다",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "입력값을 확인해주세요",
            status: "error",
          });
        } else {
          toast({
            description: "입력값을 확인해주세요",
            status: "error",
          });
        }
        toast({
          description: "가입중에 오류가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => console.log("done"));
  }

  function handleIdCheck() {
    const searchParam = new URLSearchParams();
    searchParam.set("id", id);

    axios
      .get("/api/member/check?" + searchParam.toString())
      .then(() => {
        setIdAvailable(false);
        toast({
          description: "이미 사용 중인 ID입니다.",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIdAvailable(true);
          toast({
            description: "사용 가능한 ID입니다.",
            status: "success",
          });
        }
      });
  }

  function handleEmailCheck() {
    const params = new URLSearchParams();
    params.set("email", email);

    axios
      .get("/api/member/check?" + params)
      .then(() => {
        setEmailAvailable(false);
        toast({
          description: "이미 사용 중인 email입니다.",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setEmailAvailable(true);
          toast({
            description: "사용 가능한 email입니다.",
            status: "success",
          });
        }
      });
  }
  function handleNicknameCheck() {
    const params = new URLSearchParams();
    params.set("nickname", nickname);

    axios
      .get("/api/member/check?" + params.toString())
      .then(() => {
        setNicknameAvailable(false);
        toast({
          description: "이미 사용 중인 닉네임입니다.",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setNicknameAvailable(true);
          toast({
            description: "사용 가능한 닉네임입니다.",
            status: "success",
          });
        } else {
          toast({
            description: "오류가 발생했습니다. 다시 시도해주세요.",
            status: "error",
          });
        }
      });
  }

  return (
    <Box>
      <Card>
        <CardHeader>
          <Heading>회원 가입</Heading>
        </CardHeader>
        <CardBody>
          <FormControl isInvalid={!idAvailable}>
            <FormLabel>id</FormLabel>
            <Flex>
              <Input
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setIdAvailable(false);
                }}
              />
              <Button onClick={handleIdCheck}>중복확인</Button>
            </Flex>
            <FormErrorMessage>ID 중복체크를 해주세요.</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={password.length === 0}>
            <FormLabel>password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormErrorMessage>암호를 입력해 주세요.</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={password !== passwordCheck}>
            <FormLabel>password 확인</FormLabel>
            <Input
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <FormErrorMessage>암호가 다릅니다.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!emailAvailable}>
            <FormLabel>email</FormLabel>
            <Flex>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmailAvailable(false);
                  setEmail(e.target.value);
                }}
              />
              <Button onClick={handleEmailCheck}>중복확인</Button>
            </Flex>
            <FormErrorMessage>email 중복 체크를 해주세요.</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!nicknameAvailable}>
            <FormLabel>nickname</FormLabel>
            <Flex>
              <Input
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setNicknameAvailable(false);
                }}
              />
              <Button onClick={handleNicknameCheck}>중복확인</Button>
            </Flex>
            <FormErrorMessage>닉네임 중복확인을 해주세요.</FormErrorMessage>
          </FormControl>
        </CardBody>
        <CardFooter>
          <Button
            isDisabled={!submitAvailable}
            onClick={handleSubmit}
            colorScheme="blue"
          >
            가입
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
