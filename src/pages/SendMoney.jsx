import Heading from "../components/Heading";
import SubHeading from "../components/Subheading";
import InputField from "../components/InputBox";
import Button from "../components/Button";
import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";



const SendMoney = () => {
  const location = useLocation();
  const userId = location.state?.userId;  // Safe optional chaining
  console.log(userId);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleMoney = async () => {
  if ( !amount) {
    alert("Please fill in all fields.");
    return;
  }

  const token = localStorage.getItem("token"); // or "accessToken" depending on your app

  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        userId,
        amount : Number(amount),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    navigate("/dashboard")
    const history = response.data;
    console.log(history);
  } catch (error) {
    alert("Transaction failed. Please try again.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Heading label="Send Money" />
        <SubHeading label="For Fast Transfer TransFast" />
        
        <InputField
          label="Amount"
          placeholder="enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button label="Send" onClick={handleMoney} />
      </div>
    </div>
  );
};

export default SendMoney;
