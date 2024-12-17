const API_BASE_URL = 'http://localhost:3001/api';

export async function fetchGifs(category: string = 'all') {
  const response = await fetch(`${API_BASE_URL}/gifs?category=${category}`);
  return response.json();
}

export async function uploadGif(file: File, category: 'tv' | 'movie') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);

  const response = await fetch(`${API_BASE_URL}/gifs/upload`, {
    method: 'POST',
    body: formData,
  });

  return response.json();
}