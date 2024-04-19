import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipe from './pages/Recipe';
import Recipelist from './pages/Recipelist';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Recipe />} />
        <Route path="/save" element={<Recipelist />} />
        <Route path="/save/:id" element={<Recipelist />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;