import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import Layout from "./components/Layout";
import Write from "./pages/Write";
import EditPage from "./pages/EditPage";
import EditUser from "./pages/EditUser";
import BlogPage from "./pages/BlogPage";
import ProtectedRoute from "./components/ProtectedRoute";  // ✅ Import ProtectedRoute

const App = () => {
  return (
    <Routes>
      {/* Layout Route */}
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<LogIn />} />
        <Route path="blog/:id" element={<BlogPage />} />

        {/* 🔒 Protected Routes (Only for Logged-in Users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="write" element={<Write />} />
          <Route path="blog/edit/:id" element={<EditPage />} />
          <Route path="edituser" element={<EditUser />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
