import { Route, Routes } from "react-router";
import { Home } from "../pages/Home";
import { News_wall } from "../pages/News_wall";
import { MainLayout } from "../layout/MainLayout";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/News" element={<News_wall />}></Route>
      </Route>
    </Routes>
  );
};
