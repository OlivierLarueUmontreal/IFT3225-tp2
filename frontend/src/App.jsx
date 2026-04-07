import React from "react"
import { Route, Routes, Link } from "react-router-dom"
import './style.css'
import { Header} from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"
import { Home } from "./pages/Home.jsx"
import { Authentication } from "./pages/Authentication.jsx"
import { Register } from "./pages/Register.jsx"

function App() {

  return (
    <>
      <Header/>

      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/authentication" element = {<Authentication/>}/>
        <Route path = "/register" element = {<Register/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
