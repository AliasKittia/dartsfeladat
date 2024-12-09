import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DartsListPage from './DartsListPage';  
import HomePage from './HomePage'; 
import DartsSingle from './DartsSingle'; 
import DartsCreate from './DartsCreate';
import DartsMod from './DartsMod';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar'; 


function App() {
  return (
    <Router>
      <Navbar /> {}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/darts" element={<DartsListPage />} />  
        <Route path="/darts/:dartsId" element={<DartsSingle />} />  
        <Route path="/create-darts" element={<DartsCreate />} />   
        <Route path="/DartsMod/:id" element={<DartsMod />} /> 
      </Routes>
    </Router>
  );
}

export default App;
