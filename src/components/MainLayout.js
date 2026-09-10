import useSWR from "swr";
import SortList from "./SortList";
import BoardTasks from "./BoardTasks";
import LoadMore from "./LoadMore";
import MainFilter from "./MainFilter";
import MainControl from "./MainControl";
import SvgSprite from "./SvgSprite";

function MainLayout() {
  const { data, error } = useSWR("/tasks");

  if (error) {
    return <div>Ошибка доступа или сети</div>;
  }
  if (!data) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <SvgSprite />

      <main class="main">
        <MainControl />
        <MainFilter />

        <section class="board container">
          <SortList />
          <BoardTasks tasks={data} />
          <LoadMore />
        </section>
      </main>
    </>
  );
}

export default MainLayout;
