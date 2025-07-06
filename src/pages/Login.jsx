import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputField from "../components/InputBox";
import TextLink from "../components/Redirect";
import SubHeading from "../components/Subheading";
import { useNavigate } from "react-router-dom";

const Login = () => {
   
    const [username , setUsername] = useState();
    const [password , setPassword] = useState();

    const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/user/login", {
      username,
      password,
    });

    const token = response.data.token;

    if (token) {
      navigate("/dashboard");
    }
    else{
        alert("login failed: Incorrect password");
    

    }

    
  } catch (error) {
    console.error("login failed:", error.response?.data || error.message);
    alert("login failed. Please try again.");
  }
};

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <Heading label="Login"  />
            <SubHeading label = "Enter your credentials to login to your account." />
            
            <InputField label = " Username " placeholder= "enter your username" onChange={e=>{
                setUsername(e.target.value);
            }}/>
            <InputField label = " Password " placeholder= "enter your password" onChange={e=>{
                setPassword(e.target.value);
            }}/>
            <Button label= "login" onClick={handleLogin} />
            <TextLink text="Don't have a account?" linkText="Signin" to="/signin" />

            
      </div>
    </div>


    
  );
};


export default Login;