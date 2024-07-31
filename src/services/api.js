import axios from 'axios';

const apiBaseUrl = 'http://127.0.0.1:5000';

export const uploadImageAndText = async (image, text) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('text', text);


  try {
    console.log(apiBaseUrl)
    console.log(`${apiBaseUrl}/api/upload`)

    const response = await axios.post(`${apiBaseUrl}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image and text', error);
    throw error;
  }
};

export const fetchImage = async (path) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/get_image?path=${encodeURIComponent(path)}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image', error);
    throw error;
  }
};