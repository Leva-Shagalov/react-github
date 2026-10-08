import useSWR from "swr";
import SortList from "./SortList/SortList";
import BoardTasks from "./BoardTasks/BoardTasks";
import LoadMore from "./LoadMore";
import MainFilter from "./MainFilter/MainFilter";
import MainControl from "./MainControl";
import SvgSprite from "./SvgSprite";
import { useState } from "react";
import { DEFAULT_TASK, filterCallBacks, sortedCallBacks } from "../utils";

function MainLayout() {
  const { data, error } = useSWR("/tasks");
  const [filterType, setFilterType] = useState("all");
  const [sortType, setSortType] = useState("SORT BY DEFAULT");
  const [isAddingTask, setIsAddingTask] = useState(false);

  if (error) {
    return <div>Ошибка доступа или сети</div>;
  }
  if (!data) {
    return <div>Загрузка...</div>;
  }

  const tasks = [...(isAddingTask ? [DEFAULT_TASK] : []), ...data]
    .filter(filterCallBacks[filterType])
    .sort(sortedCallBacks[sortType]);

  return (
    <>
      <SvgSprite />

      <main class="main">
        <MainControl setIsAddingTask={setIsAddingTask} />
        <MainFilter
          data={data}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        <section class="board container">
          <SortList setSortType={setSortType} />
          <BoardTasks tasks={tasks} setIsAddingTask={setIsAddingTask} />
          <LoadMore />
        </section>
      </main>
    </>
  );
}

export default MainLayout;
