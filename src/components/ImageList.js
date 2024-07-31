import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchImage } from '../services/api';

function ImageList() {
  const [images, setImages] = useState([]);
  const location = useLocation();
  const { results } = location.state; // Retrieve the results from state

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(results.img_paths.map(async (pathList, index) => {
        const imageUrls = await Promise.all(pathList.map(async (path) => {
          try {
            return await fetchImage(path);
          } catch (error) {
            console.error('Error fetching image', error);
            return null;
          }
        }));
        return { title: results.titles[index], urls: imageUrls };
      }));
      setImages(loadedImages);
    };

    loadImages();
  }, [results]);

  return (
    <div>
      {images.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <div>
            {item.urls.map((url, idx) => url ? <img key={idx} src={url} alt={item.title} /> : null)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageList;