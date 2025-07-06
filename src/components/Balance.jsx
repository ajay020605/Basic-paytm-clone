// components/BalanceCard.jsx

import axios from "axios";
import { useEffect, useState } from "react";

const BalanceCard = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(response.data.balance);
      } catch (err) {
        console.error("Failed to fetch balance:", err);
      }
    };

    fetchBalance();
  }, []); // empty array = run only on mount

  return (
    <div className="bg-gray-100 rounded-xl shadow p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Balance</h2>
      <p className="text-3xl font-bold text-green-600">
        ₹ {balance !== null ? balance : "Loading..."}
      </p>
    </div>
  );
};

export default BalanceCard;
