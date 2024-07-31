import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImageAndText } from '../services/api';

function UploadForm() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const navigate = useNavigate(); // useNavigate replaces useHistory in v6

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image || !text) {
      alert('Both image and text are required.');
      return;
    }

    try {
      const results = await uploadImageAndText(image, text);
      navigate('/results', { state: { results } });
    } catch (error) {
      alert('Error uploading image and text');
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="imageUpload">Upload your image:</label>
          <input
            type="file"
            id="imageUpload"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label htmlFor="textInput">Enter text:</label>
          <input
            type="text"
            id="textInput"
            value={text}
            onChange={handleTextChange}
          />
        </div>
        <button type="submit">Process</button>
      </form>
    </div>
  );
}

export default UploadForm;