import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import ImageList from './components/ImageList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/results" element={<ImageList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;