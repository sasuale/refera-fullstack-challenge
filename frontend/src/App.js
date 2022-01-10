import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';

import Navbar from './layouts/frontend/Navbar';
import Order from './components/frontend/Order';
import Category from './components/frontend/Category';
import Company from './components/frontend/Company';

axios.defaults.baseURL = "http://127.0.0.1:8000/";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

function App() {
  return (
    <Router>
      <div className="App">
          <Navbar />
            <Routes>
              <Route path="/" element={<Order/>} /> 
              <Route path="/order" element={<Order/>} /> 
              <Route path="/category" element={<Category/>} /> 
              <Route path="/company" element={<Company/>} /> 
            </Routes>
      </div>
    </Router>
  );
}

export default App;
