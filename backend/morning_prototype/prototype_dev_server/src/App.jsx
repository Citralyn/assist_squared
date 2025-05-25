import { BrowserRouter, Routes, Route } from "react-router";

import NavBar from './components/NavBar.jsx';

import Home from './pages/Home.jsx';
import Assist from './pages/Assist';
import Peter from './pages/Peter';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="assist" element={<Assist />} />
          <Route path="peter" element={<Peter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

