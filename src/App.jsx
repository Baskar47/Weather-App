import { useState } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Wheather from './components/Wheather'
import './App.css'
import Register from "./Pages/Register";
import Login from './Pages/Login'

function App() {

  return (
    <div style={{ padding: "20px" }}>

      {/* <Login/> */}
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path='/register' element={<Register/>} />
      <Route  path="/weather" element={<Wheather/>} />
      
      

    </Routes>
    
    </BrowserRouter>
    
    </div>
  );
}

export default App;
