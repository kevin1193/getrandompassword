import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import PasswordGenerator from './components/PasswordGenerator';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<PasswordGenerator />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </div>
      </Router>
      <Analytics />
    </>
  );
}

export default App;