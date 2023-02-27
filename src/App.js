import './App.css';
import React, { createContext,useContext,useReducer } from 'react';
import { BrowserRouter,Route,Routes, useNavigate} from 'react-router-dom';
import { Navabar } from './components/Navabar';
import { Home } from './components/screen/Home';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Profile } from './components/Profile';
import { CreatePost } from './components/CreatePost';
import { useEffect } from 'react';
import {reducer,initialState} from './components/reducers/userReducer'
export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))

    if(user){
      dispatch({type:"USER",payload:user})
      navigate('/')
    }else{
      navigate('/signin')
    }
  },[])
  return(
    <>
    <Routes>
    <Route exact path="/"  element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/create" element={<CreatePost />} />
  </Routes>
  </>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
       <BrowserRouter>
      <Navabar/>
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
   
    
  );
}

export default App;
