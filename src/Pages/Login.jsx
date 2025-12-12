import {  useNavigate } from "react-router-dom";
import './Login.css'
import { useState } from "react";

function Login(){
  const [email,setEmail]=useState('')
  const[password,setPassword]=useState('')

     const navigate=useNavigate()
  const logInClick=(e)=>{
   
    e.preventDefault()

    // if(email==='baskar@gmail.com' || password==='baskar' ){
navigate('/weather')
    // }
    
  }  
    return(

        <div className="main" >
            <form onSubmit={logInClick} className="form-main">
             <h1 style={{textAlign:'center'}}>Login</h1>
             <label htmlFor="">Email</label>
             <input type="email" 
             onChange={(e)=>setEmail(e.target.value)}
             required
             placeholder="enter your email"
             />
             <label htmlFor="">Password</label>
             <input type="password"
             onChange={(e)=>setPassword(e.target.value)}
             required
             placeholder="enter your password"
             />
             <button className='butn'  type="submit" >Login</button>
             </form>

             {/* <h4 style={{textAlign:'center'}} >Don't have an account? <span
             style={{cursor:'pointer',color:'blue'}} 
             onClick={()=>navigate('/register')}
             >Register</span></h4> */}

        </div>
    )
}
export default Login;