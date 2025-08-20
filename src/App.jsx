import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from '../src/components/Navbar.jsx'
import Country from './pages/Country.jsx'
import Home from './pages/Home.jsx'
import Compare from './pages/Compare.jsx'
import Details from './pages/Details.jsx'
import News from './pages/News.jsx'

const App = () => {
  return (
    <main className="overflow-x-hidden bg-white dark:bg-black text-black dark:text-white duration-300">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/country" element={<Country />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    </main>

  )
}

export default App