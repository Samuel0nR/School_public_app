import { Route, Routes } from "react-router";
import { Home } from "../pages/Home";
import { News_wall } from "../pages/News_wall";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/News" element={<News_wall />}></Route>
    </Routes>
  );
};
