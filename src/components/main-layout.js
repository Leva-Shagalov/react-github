import useSWR from "swr";

function MainLayout() {
  const { data, error } = useSWR("/tasks");

  if (error) {
    return <diV>Ошибка доступа или сети</diV>;
  }
  if (!data) {
    return <div>Загрузка...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}

export default MainLayout;
