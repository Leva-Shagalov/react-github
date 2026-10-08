import { useState } from "react";
import BoardTasksForm from "./BoardTasksForm/BoardTasksForm";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import { putTasks } from "../../api/api-config";
import dayjs from "dayjs";

function BoardTasksItem({ task, setIsAddingTask }) {
  const { id, color, description, is_archived, is_favorite, due_date } = task;

  const [isEdit, setIsEdit] = useState(task.isEdit);
  const handleEdit = () => {
    setIsEdit(true);
  };

  const { trigger } = useSWRMutation(`tasks/${id}`, putTasks);
  const { mutate } = useSWRConfig("/tasks");

  if (isEdit) {
    return (
      <BoardTasksForm
        task={task}
        setIsEdit={setIsEdit}
        setIsAddingTask={setIsAddingTask}
      />
    );
  }

  const handleButton = async (event, arg) => {
    event.preventDefault();
    let archive = is_archived;
    let favorite = is_favorite;
    if (arg === "archived") {
      archive = !is_archived;
    } else if (arg === "favorite") {
      favorite = !is_favorite;
    }

    try {
      const result = await trigger({
        ...task,
        is_archived: archive,
        is_favorite: favorite,
      });

      await mutate("/tasks");
    } catch (e) {}

    setIsEdit(false);
  };

  return (
    <article key={id} className={`card card--${color}`}>
      <div className="card__form">
        <div className="card__inner">
          <div className="card__control">
            <button
              onClick={handleEdit}
              type="button"
              className="card__btn card__btn--edit"
            >
              edit
            </button>
            <button
              type="button"
              className="card__btn card__btn--archive"
              onClick={(event) => handleButton(event, "archived")}
            >
              archive
            </button>
            <button
              type="button"
              className="card__btn card__btn--favorites"
              onClick={(event) => handleButton(event, "favorite")}
            >
              favorites
            </button>
          </div>

          <div className="card__color-bar">
            <svg className="card__color-bar-wave" width="100%" height="10">
              <use xlinkHref="#wave"></use>
            </svg>
          </div>

          <div className="card__textarea-wrap">
            <p className="card__text">{description}</p>
          </div>

          <div className="card__settings">
            <div className="card__details">
              <div className="card__dates">
                {due_date && (
                  <div className="card__date-deadline">
                    <p className="card__input-deadline-wrap">
                      <span className="card__date">
                        {dayjs(due_date).format("DD MMMM")}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BoardTasksItem;
