import { Navigate } from "react-router-dom";


interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}
const ProtectedRoute = ({ children,allowedRoles  }: Props) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role || "")) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;