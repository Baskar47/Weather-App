import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css'

function Register(){
    const navigate=useNavigate()
    const[form,setForm]=useState({
          name:"",
          email:"",
          password:""
})
const[submitedData,setSubmitedData]=useState(null)


const handleChange=(e)=>{
    setForm({
        ...form,[e.target.name]:e.target.value
    }) 
}

const handleClick=(e)=>{
    e.preventDefault();
    if(form.name==='' || form.email==='' || form.password===''){
        // alert('enter all fields')
        return;
    }
    // setSubmitedData(form);
    navigate("/weather")
}


     
    return(

        <div className='container' >
            <form action="" onSubmit={handleClick} className='form-container' >
                <h1 className="h-tag" >Register Form</h1>
                <label htmlFor="">Name:</label>
                    <input type="text"  autoComplete="username"
                    placeholder="enter your name"
                    name="name"
                    onChange={handleChange}
                    required
                    />
               
                <label htmlFor="">Email:</label>
                <input type="email"  autoComplete="email"
                placeholder="enter you email"
                name="email"
                onChange={handleChange}
                required
                />
                <label htmlFor="">Password:</label>
                <input type="password"  autoComplete="current-password"
                placeholder="enter your password"
                name="password"
                onChange={handleChange}
                required    
                />

                <button className="btn" type="submit" >Submit</button>

                <p style={{textAlign:'center'}} >Already registered? <span  
                style={{cursor:'pointer',color:'blue'}}
                onClick={()=>navigate('/')}
                >login here</span> </p> 
            </form>
            {
                submitedData &&(
                    <div>
                    <h2>register form</h2>
                    <thead>
                    <th>{submitedData.name}</th>
                    <th>{submitedData.email}</th>
                    <th>{submitedData.password}</th>
                    </thead>
                    </div>
                )
            }
 

        </div>
    )
}
export default Register;