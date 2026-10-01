const BASE_URL =
  'https://22.objects.htmlacademy.pro/task-manager';
const AUTHORIZATION = 'Basic hS2sfS44wcl1sa2j';

const apiConfig = async (pathname) => {
  const response = await fetch(`${BASE_URL}${pathname}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTHORIZATION,
    },
  });

  if (!response.ok) {
    const error = new Error('Ошибка при загрузке данных');
    error.status = response.status;
    throw error;
  }

  return response.json();
};

async function sendRequest(url, { arg }) {
  return fetch(`${BASE_URL}/${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTHORIZATION,
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

export { apiConfig, sendRequest };
