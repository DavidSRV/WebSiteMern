import "./_App.scss";
import NavBar from "./components/NavBar";
import Home from "./page/Home";
import About from "./page/About";
import Services from "./page/Services";
import Contact from "./page/Contact";
import Footer from "./page/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import DashBoard from "./page/DashBoard";
import Logout from "./page/Logout";
import { useState, useEffect } from "react";

function App() {

  const [isLogged, setIsLogged] = useState(false) 
  const [isLogged1, setIsLogged1] = useState(true) 

  const isLoggedIn = async () => {
    try {
      const res = await fetch('/auth',{
        method : 'GET',
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        Credentials : "include"
      });

      if(res.status === 200){
        setIsLogged(true)
        setIsLogged1(false)

      }
      if(res.status === 401){
        setIsLogged(false)
        setIsLogged1(true)

      }
    
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    isLoggedIn()
  },[])


  return (
    <>
      <NavBar isLogged={isLogged1}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route
          path="/Login"
          element={!isLogged1 ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/Register"
          element={!isLogged1 ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/Dashboard"
          element={!isLogged ? <Navigate to="/" replace /> : <DashBoard />}
        />
        <Route
          path="/Logout"
          element={!isLogged ? <Navigate to="/" replace /> : <Logout />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
