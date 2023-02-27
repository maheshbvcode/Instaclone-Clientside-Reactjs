import React, { useState,useContext } from 'react'
import logo from '../images/logoinsta.png'
import { Link,useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../App'
export const SignIn = () => {

  const {state,dispatch}  = useContext(UserContext)
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const navigate = useNavigate()
  
  const PostData =async ()=>{
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
      return;
    }
   
    
    try {
      const response = await fetch("https://instaclone-nodejs-server.onrender.com/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password,
          email
        })
      });
  
      const data = await response.json();
        console.log(data)
      if (data.error) {
        M.toast({ html: data.error, classes: "#c62828 red darken-3" });
      } else {
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({ html: "Signin Successfully", classes: "#43a047 green darken-1" });
        navigate("/");
      }
    } 
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='mycard'>
      <div className='card auth-card input-field'>
      <img alt='' width='200px' src={logo}/>
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
          SignIn
        </button>
      </div>
      <div className='card auth-card'>
        Don't have an account? <Link style={{ 'color': 'blue !important' }} to='/signup'>Sign Up</Link>
      </div>
    </div>
  )
}
