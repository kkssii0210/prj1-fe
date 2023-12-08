import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { NavBar } from "../component/NavBar";

export function HomeLayout() {
  return (
    <Box mx={{ base: 0, md: 10, lg: 40 }}>
      <NavBar />
      <Outlet />
    </Box>
  );
}
