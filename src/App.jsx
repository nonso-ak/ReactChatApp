import React from 'react'
import David from './pages/David'
import Sarah from './pages/Sarah'
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div>
      {/* <Router>
      <Routes>
        <Route path="/" element={<David />} />
        <Route path="/Sarah" element={<Sarah />} />
      </Routes>
    </Router> */}
    <David/>

     
    </div>
  )
}

export default App
