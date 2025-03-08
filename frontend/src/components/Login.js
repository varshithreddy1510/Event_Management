import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const handleLogin = async ()=>{
        console.log(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json',
            }
        });
        result = await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/');
        }else{
            alert('Invalid Email or Password');
        }
    }

  return (
    <div className="signup-container"> 
      <div>
        <h1>Register</h1>
      </div>
      <div className="input-container">
        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="Enter Email" />
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder="Enter Password" />
      </div>
      <div className="button-container">
        <button onClick={handleLogin} type="button">Login</button>
      </div>
    </div>
  );
};

export default Login;
