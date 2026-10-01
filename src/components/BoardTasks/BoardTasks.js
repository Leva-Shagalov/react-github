import { DEFAULT_TASK } from "../../utils";
import BoardTasksForm from "./BoardTasksForm/BoardTasksForm";
import BoardTasksItem from "./BoardTasksItem";

function BoardTasks({ tasks }) {
  return (
    <div class="board__tasks">
      <BoardTasksForm task={DEFAULT_TASK} />
      {tasks.map((task) => (
        <BoardTasksItem task={task} />
      ))}
    </div>
  );
}

export default BoardTasks;
