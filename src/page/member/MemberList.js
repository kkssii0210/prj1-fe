import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberList() {
  const [list, setList] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/member/list").then((response) => setList(response.data));
  }, []);
  if (list === null) {
    return <Spinner />;
  }

  function handleTableRowClick(id) {
    const params = new URLSearchParams();
    params.set("id", id);
    navigate("/member?" + params.toString());
  }

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>password</Th>
            <Th>email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((member) => (
            <Tr
              _hover={{ cursor: "pointer" }}
              key={member.id}
              onClick={() => handleTableRowClick(member.id)}
            >
              <Td>{member.id}</Td>
              <Td>{member.password}</Td>
              <Td>{member.email}</Td>
              <Td>{member.inserted}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
