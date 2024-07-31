import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { uploadImageAndText } from '../services/api';
import { TailSpin } from 'react-loader-spinner';
import './UploadForm.css';

function UploadForm() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image || !text) {
      alert('Both image and text are required.');
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      const results = await uploadImageAndText(image, text);
      navigate('/results', { state: { results } });
    } catch (error) {
      alert('Error uploading image and text');
      console.error('There was an error!', error);
      setLoading(false); // Hide loading indicator in case of error
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {
            preview ? 
              <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} /> : 
              <p>Drag 'n' drop an image here, or click to select an image</p>
          }
        </div>
        <div className="textarea-container">
          <label htmlFor="textInput">Enter text:</label>
          <textarea
            id="textInput"
            value={text}
            onChange={handleTextChange}
            className="textarea"
          />
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Processing...' : 'Process'}
        </button>
        {loading && (
          <div className="loading-spinner">
            <TailSpin
              height="50"
              width="50"
              color="#007BFF"
              ariaLabel="loading"
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default UploadForm;