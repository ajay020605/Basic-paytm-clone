import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../components/Button";
import Heading from "../components/Heading";
import InputField from "../components/InputBox";
import SubHeading from "../components/Subheading";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreate = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/account/create", {
        username,
        password,
      });

      const { accountNumber } = response.data.account;

      if (accountNumber) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Account creation failed:", error.response?.data || error.message);
      alert("Account creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Heading label="Transfer Fast" />
        <SubHeading label="Enter your credentials to create a TransFast account." />

        <InputField
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          label={loading ? "Creating..." : "Create account"}
          onClick={handleCreate}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default CreateAccount;
