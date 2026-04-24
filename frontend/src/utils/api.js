const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const verifyCode = async (code) => {
  const response = await fetch(`${API_URL}/verify-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  return response.json();
};

export const submitData = async (payload) => {
  const response = await fetch(`${API_URL}/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return response.json();
};

export const getDashboard = async () => {
  const response = await fetch(`${API_URL}/dashboard`);
  return response.json();
};
