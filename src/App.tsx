import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Chat from "./pages/private/Chat";
import ProtectedRoute from "./auth/ProtectedRoute";
import Register from "./pages/public/Register";
import PanditDashboard from "./pages/private/PanditDashboard";
import Users from "./pages/private/Users";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/pandit-dashboard"
            element={
              <ProtectedRoute allowedRoles={["PANDIT"]}>
              <PanditDashboard />
             </ProtectedRoute>
            }
        />
        <Route
          path="/select-pandit"
           element={
            <ProtectedRoute allowedRoles={["USER"]}>
            <Users />
          </ProtectedRoute>
         }
        />
         <Route
          path="/chat/:conversationId"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Chat />
            </ProtectedRoute>
          }
        /> 
      </Routes>
    </>
  );
}

export default App;
