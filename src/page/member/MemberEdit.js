import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export function MemberEdit(props) {
  const [params] = useSearchParams();
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [member, setMember] = useState(null);
  const [email, setEmail] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameAvailable, setNicknameAvailable] = useState(false);
  let sameOriginEmail = false;
  useEffect(() => {
    axios.get("/api/member?" + id).then((response) => {
      setMember(response.data);
      setEmail(response.data.email);
      setNickname(response.data.nickname);
    });
  }, []);
  if (member === null) {
    return <Spinner />;
  }
  if (member !== null) {
    sameOriginEmail = member.email === email;
  }
  let emailChecked = sameOriginEmail || emailAvailable;
  let passwordChecked = false;
  if (passwordCheck === password) {
    passwordChecked = true;
  }
  if (password.length === 0) {
    passwordChecked = true;
  }
  function handleEdit() {
    axios
      .put("/api/member/edit", { id: member.id, password, email, nickname })
      .then(() => {
        toast({
          description: id + "번 회원이 수정 됐습니다",
          status: "success",
        });
        navigate("/member?" + id);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
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
      .finally(() => onClose());
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
        if (error.response.status === 404) {
          setNicknameAvailable(true);
          toast({
            description: "사용 가능한 닉네임입니다.",
            status: "success",
          });
        }
      });
  }

  return (
    <div>
      <Box>
        <h1>{id}님 정보</h1>
        <FormControl>
          <FormLabel>password</FormLabel>
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {password.length > 0 && (
          <FormControl>
            <FormLabel>password 확인</FormLabel>
            <Input
              type="text"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </FormControl>
        )}

        <FormControl>
          <FormLabel>email</FormLabel>
          <Flex>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailAvailable(false);
              }}
            />
            <Button isDisabled={emailChecked} onClick={handleEmailCheck}>
              중복확인
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel>nickname</FormLabel>
          <Flex>
            <Input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setNicknameAvailable(false);
              }}
            />
            <Button onClick={handleNicknameCheck}>중복확인</Button>
          </Flex>
        </FormControl>

        <Button
          colorScheme="purple"
          isDisabled={!(emailChecked && passwordChecked && nicknameAvailable)}
          onClick={onOpen}
        >
          수정
        </Button>
        <Button onClick={() => navigate(-1)}>취소</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>수정 확인</ModalHeader>
            <ModalCloseButton />
            <ModalBody>수정 하시겠습니까?</ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>닫기</Button>
              <Button onClick={handleEdit} colorScheme="red">
                수정
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
}

export default MemberEdit;
