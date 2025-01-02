import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import Login from "./pages/Login";
import AdminLayout from "./Layouts/AdminLayout";
import Home from "./pages/Admin/Home";
import HomeUser from "./pages/User/Home";
import UserLayout from "./Layouts/UserLayout";
import Report from "./pages/Admin/Report";
import { FunctionComponent } from "react";
interface PrivateRouteProps {
  element: React.ReactNode;
}
function App() {
  const AdminRoute: FunctionComponent<PrivateRouteProps> = ({ element }) => {
    const role = sessionStorage.getItem("role");
    return role === "admin" ? element : <Navigate to={"/"} replace />;
  };
  const UserRoute: FunctionComponent<PrivateRouteProps> = ({ element }) => {
    const role = sessionStorage.getItem("role");
    return role === "user" ? element : <Navigate to={"/"} replace />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />

        <Route path="admin" element={<AdminRoute element={<AdminLayout />} />}>
          <Route index element={<Home />} />
          <Route path="report" element={<Report />} />
        </Route>
        <Route path="user" element={<UserRoute element={<UserLayout />} />}>
          <Route index element={<HomeUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
