import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import { useTranslation } from "react-i18next";
const Login = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/auth/login", form);
        const { token, role,userId ,name } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId",userId)
    localStorage.setItem("name",name)
    console.log("INFO user role is: ",role)
    if (role === "PANDIT") {
      navigate("/pandit-dashboard");
    } else {
      navigate("/select-pandit");
    }

    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("Invalid credentials.");
      } else {
        alert("Login failed.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-dark">Login</h2>
        <input
          name={t("username")}
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Username"
        />

        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          className="w-full mb-6 px-4 py-2 border rounded-lg"
          placeholder="Password"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-2 rounded-lg"
        >
          Login
        </button>
        <p className="text-sm text-center mt-6">
           New user?{" "}
          <Link to="/register" className="text-primary font-semibold"> Create an account</Link>
        </p>
      </div>
      
    </div>
  );
};

export default Login;
