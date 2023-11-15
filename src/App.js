import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/HomeLayout";
import { BoardList } from "./page/board/BoardList";
import { BoardWrite } from "./page/board/BoardWrite";
import { BoardView } from "./page/board/BoardView";
import { BoardEdit } from "./page/board/BoardEdit";
import { MemberSignup } from "./page/member/MemberSignup";
import { MemberList } from "./page/member/MemberList";
import { MemberView } from "./page/member/MemberView";
import MemberEdit from "./page/member/MemberEdit";
import { MemberLogin } from "./page/member/MemberLogin";
import LoginProvider from "./component/LoginProvider";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<BoardList />} />
      <Route path="write" element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
      <Route path="edit/:id" element={<BoardEdit />}></Route>
      <Route path="signup" element={<MemberSignup />}></Route>
      <Route path="member/list" element={<MemberList />} />
      <Route path="member" element={<MemberView />} />
      <Route path="medit/:id" element={<MemberEdit />} />
      <Route path="login" element={<MemberLogin />} />
    </Route>,
  ),
);

function App(props) {
  return (
    <LoginProvider>
      <RouterProvider router={routes} />
    </LoginProvider>
  );
}

export default App;
