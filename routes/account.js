import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Heading from "../components/Heading";
import SubHeading from "../components/Subheading";
import InputField from "../components/InputBox";
import Button from "../components/Button";

const SendMoney = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const [amount, setAmount] = useState("");

  useEffect(() => {
    console.log("Received userId:", userId);
  }, [userId]);

  const handleMoney = async () => {
    if (!userId || !amount) {
      alert("User ID or amount is missing.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          userId, // Make sure the backend expects "userId" or "accountNumber"
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Transfer error:", error.response?.data || error.message);
      alert("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-4">
        <Heading label="Send Money" />
        <SubHeading label="For Fast Transfer - TransFast" />

        <InputField
          label="Amount"
          placeholder="Enter amount"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />

        <Button label="Send" onClick={handleMoney} />
      </div>
    </div>
  );
};

export default SendMoney;
