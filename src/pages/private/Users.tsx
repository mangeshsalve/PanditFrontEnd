import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

interface Pandit {
  id: number;
  name: string;
  experience: string;
  userId: number;
}

const Users = () => {
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const res = await api.get("/api/users/pandits");
        setPandits(res.data);
      } catch (err) {
        console.error("Failed to fetch pandits",err);
         localStorage.removeItem("token");
      window.location.href = "/login";
      }
    };

    fetchPandits();
  }, []);

  const startConversation = async (panditId: number) => {
    try {
      const res = await api.post("/api/conversation", {
         panditId: panditId
      });

      const conversationId = res.data.id;

      navigate(`/chat/${conversationId}`);
    } catch (err) {
      console.error("Failed to start conversation");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-8">
        Choose Your Pandit
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {pandits.map((pandit) => (
          <div
            key={pandit.id}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold">
              {pandit.name}
            </h3>
            <p className="text-gray-500 mb-4">
              Experience: {pandit.experience}
            </p>

            <button
              onClick={() => startConversation(pandit.userId)}
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Start Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;