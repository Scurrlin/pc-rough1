"use client"

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './globals.css';

const SearchPage = lazy(() => import('../components/SearchPage'));
const ResultsPage = lazy(() => import('../components/ResultsPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results" element={<ResultsPage />} />
          {/* Other routes... */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;