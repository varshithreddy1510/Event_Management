import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{
      const auth= localStorage.getItem('user');
      if(auth){
          navigate('/')
      }
    },[])

    const collectData = async ()=>{
        console.warn(name,email,password);
        let result = await fetch('http://localhost:5000/register',{
          method:'post',
          body:JSON.stringify({name,email,password}),
          headers:{
            'Content-Type':'application/json'
          },
        })
        result = await result.json(); 
        // console.log(result)
        localStorage.setItem("user",JSON.stringify(result.result))
        localStorage.setItem("token",JSON.stringify(result.auth))
        navigate('/');
    }

  return (
    <div className="signup-container">
      <div>
        <h1>Register</h1>
      </div>
      <div className="input-container">
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Name" />

        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email" />

        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password" />
      </div>
      <div className="button-container">
        <button onClick={collectData} type="button">Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;
