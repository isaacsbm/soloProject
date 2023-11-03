import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header'
import './App.css'
import Dashboard from './components/Dashboard';
import axios from 'axios'
import CreateBracelet from './components/CreateBracelet';
import DeleteBracelet from './components/DeleteBracelet';
import UpdateBracelet from './components/UpdateBracelet';

function App() {
  const [allBracelets, setAllBracelets] = 
  useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/bracelets")
      .then(res => setAllBracelets(res.data))
      .catch(err => console.log(err))
  }, [])
  return (
    <BrowserRouter>
    <>
      <Header></Header>
      <Routes>
        <Route path='/dashboard' element={<Dashboard allBracelets={allBracelets}></Dashboard>} />
        <Route path='/createbracelet' element={<CreateBracelet setAllBracelets={setAllBracelets} allBracelets={allBracelets} />} />
        <Route path='/bracelets/delete/:id' element={<DeleteBracelet setAllBracelets={setAllBracelets} allBracelets={allBracelets} />} />
        <Route path='/bracelets/update/:id' element={<UpdateBracelet setAllBracelets={setAllBracelets} allBracelets={allBracelets} />} />
      </Routes>
    </>
    </BrowserRouter>
  )
}

export default App;
