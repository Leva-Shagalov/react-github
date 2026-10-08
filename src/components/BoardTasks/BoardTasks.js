import { DEFAULT_TASK } from "../../utils";
import BoardTasksForm from "./BoardTasksForm/BoardTasksForm";
import BoardTasksItem from "./BoardTasksItem";

function BoardTasks({ tasks, setIsAddingTask }) {
  return (
    <div class="board__tasks">
      {/* <BoardTasksForm task={DEFAULT_TASK} /> */}
      {tasks.map((task) => (
        <BoardTasksItem
          key={task.id}
          task={task}
          setIsAddingTask={setIsAddingTask}
        />
      ))}
    </div>
  );
}

export default BoardTasks;
