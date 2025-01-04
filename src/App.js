
import './App.css';

import Navbar from './component/Navbar';
import News from './component/News';
import { BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
import React from 'react'

export default function App() 
{
  return (
    <div>
      <Router>

      <Navbar />

      <Routes>
        <Route exact path="/" element={<News pageSize={8} country='us' category='general' />}/>
        <Route exact path="/Business" element={<News pageSize={8} country='us' category='Business' />}/>
        <Route exact path="/entertainment" element={<News pageSize={8} country='us' category='Entertainment' />}/>
        <Route exact path="/general" element={<News pageSize={8} country='us' category='General' />}/>
        <Route exact path="/health" element={<News pageSize={8} country='us' category='Health' />}/>
        <Route exact path="/science" element={<News pageSize={8} country='us' category='Science' />}/>
        <Route exact path="/sports" element={<News pageSize={8} country='us' category='Sports' />}/>
        <Route exact path="/technology" element={<News pageSize={8} country='us' category='Technology'/>}/>
      </Routes>
      </Router>
    </div> 
  )
}