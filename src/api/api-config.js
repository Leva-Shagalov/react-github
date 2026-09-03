const apiConfig = async (pathname) => {
  const BASE_URL = "https://22.objects.htmlacademy.pro/task-manager";

  const response = await fetch(`${BASE_URL}${pathname}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic hS2sfS44wcl1sa2j",
    },
  });

  if (!response.ok) {
    const error = new Error("Ошибка при загрузке данных");
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default apiConfig;
