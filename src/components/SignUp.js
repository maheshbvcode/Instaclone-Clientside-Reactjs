import React, { useState } from 'react'
import logo from '../images/logoinsta.png'
import { Link,useNavigate } from 'react-router-dom'
import M from 'materialize-css'
export const SignUp = () => {
  
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const navigate = useNavigate()
  const PostData = async()=>{
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
      return;
    }
    // else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)){
    //   M.toast({html: "Invalid password. Your password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.",
    //    classes:"#c62828 red darken-3"})
    //    return;

    // }
    try {
      const response = await fetch("https://instaclone-nodejs-server.onrender.com/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
          email,
        }),
      });
      const data = await response.json();
      if (data.error) {
        M.toast({ html: data.error, classes: "#c62828 red darken-3" });
      } else {
        M.toast({ html: data.message, classes: "#43a047 green darken-1" });
        navigate("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className='mycard'>
      <div className='card auth-card input-field'>
      <img alt='' width='200px' src={logo}/>
      <input type='text' placeholder='Name'
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
        <input type='text' placeholder='email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input type='password' placeholder='password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button className='btn waves-effect waves-light #64b5f6 blue darken-1'
        onClick={()=>PostData()}
        >
          SignUp
        </button>
        
      </div>
      <div className='card auth-card'>
        Already have an account? <Link style={{ 'color': 'blue !important' }} className='change-color' to='/signin'>Sign In</Link>
      </div>
    </div>
  )
}
