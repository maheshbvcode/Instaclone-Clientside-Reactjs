import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logoinsta.png'
import create from '../images/camera@2x.png'
import {UserContext} from '../App'
export const Navabar = () => {

  const {state,dispatch} =useContext(UserContext)
  const navigate = useNavigate()
  const renderList = ()=>{
    if(state){
      return[
        <li key="createpost"><Link to="/create"><img style={{'marginTop':"10px"}} width='40px'src={create} alt=''/></Link></li>,
        <li key="logout">
          <button className='btn #c62828 red darken-3'
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          navigate('/signin')
        }}
        >
          Logout
        </button>
        </li>
      ]
    }else{
      return[
        <li key="signin"><Link to="/signin">Signin</Link></li>,
        <li key="signup"><Link to="/signup">Signup</Link></li>
      ]
    }
  }
  return (
    <nav>
  <div className="nav-wrapper white">
    <Link to={state?"/":"/signin"} className="brand-logo left"><img alt='' width='200px' src={logo}/></Link>
    <ul id="nav-mobile" className="right">
      {renderList()}
    </ul>
  </div>
</nav>
  )
}
