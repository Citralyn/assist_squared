import { BrowserRouter, Routes, Route } from "react-router";

import NavBar from './components/NavBar.jsx';

import Home from './pages/Home.jsx';
import Assist from './pages/Assist';
import Resources from './pages/Resources.jsx';
import NextPage from './pages/NextPage';
import Game from './pages/Game';
import Results from './pages/Results';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="assist" element={<Assist />} />
          <Route path="resources" element={<Resources />} />
          <Route path="nextpage" element={<NextPage />} />
          <Route path="gamepage" element={<Game/>}/>
          <Route path="results" element={<Results />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App

