import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";
const Register = () => {

  const navigate = useNavigate();

    const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    username: "",
    password: "",
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleRegister = async () => {
    try {
      const response = await api.post("api/users/registration", form);

      console.log("Registration success:", response.data);

      toast.success("Account created successfully. Please login!");
      navigate("/login");

    } catch (error: any) {
      if (error.response) {
    const message = error.response.data.message;
     toast.error(error.response.data.message);
    } else {
      toast.error("Server not reachable");
    }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-dark">
          Create Account
        </h2>

        <input
        name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Full Name"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Email"
        />
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="User Name"
        />

        <input
          name="mobileNumber"
          value={form.mobileNumber}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Number"
        />

        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          type="password"
          className="w-full mb-6 px-4 py-2 border rounded-lg"
          placeholder="Password"
        />

        <button  onClick={handleRegister} className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90">
          Register
        </button>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;