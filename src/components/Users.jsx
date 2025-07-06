import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate =useNavigate();

    const handleClick = (userId) => {
        console.log(userId);
        navigate("/sendmoney", { state: { userId } });
};


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/v1/user/allUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search: search,
          },
        });

        console.log("Response:", res.data); // Debug
        setUsers(res.data.users); // <-- Make sure this matches your backend
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, [search]);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search users..."
        className="border p-2 rounded mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    {users.map((user) => (
  <div key={user._id} className="border-b flex justify-between items-center gap-1 px-4 py-2">
    <div>
      <p><strong>ID:</strong> {user._id}</p>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Username:</strong> {user.username}</p>
    </div>
   <Button label="Send Money" onClick={() => handleClick(user._id)} />
  </div>
))}

    </div>
  );
};
