import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import InputField from "../components/InputBox";
import TextLink from "../components/Redirect";
import SubHeading from "../components/Subheading";
import { useState } from "react";
import axios from "axios";

const Signin = () => {
    const [firstName , setFirstName] = useState();
    const [lastName , setLastName ] = useState();
    const [username , setUsername] = useState();
    const [password , setPassword] = useState();

    const navigate = useNavigate();

  const handleSignIn = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
      username,
      lastName,
      firstName,
      password,
    });

    localStorage.setItem("token",response.data.token);

    if (response.status === 201 || response.status === 200) {
      navigate("/createaccount");
    }
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    alert("Signup failed. Please try again.");
  }
};

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <Heading label="Sign In"  />
            <SubHeading label = "Enter your credentials to create an account." />
            <InputField label = "First Name" placeholder= "enter your first name" onChange={e=>{
                setFirstName(e.target.value);
            }} />
            <InputField label = "Last Name" placeholder= "enter your last name" onChange={e=>{
                setLastName(e.target.value);
            }}/>
            <InputField label = " Username " placeholder= "create your unique username" onChange={e=>{
                setUsername(e.target.value);
            }}/>
            <InputField label = " Password " placeholder= "create a strong password" onChange={e=>{
                setPassword(e.target.value);
            }}/>
            <Button label= "Sign in" onClick={handleSignIn }  />
            <TextLink text="Already have an account?" linkText="Login" to="/login" />

            
      </div>
    </div>


    
  );
};

export default Signin;