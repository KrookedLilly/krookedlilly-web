import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;