import { useState } from "react";
import BoardTasksForm from "./BoardTasksForm/BoardTasksForm";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import { putTasks } from "../../api/api-config";

function BoardTasksItem({ task }) {
  const { id, color, description, is_archived, is_favorite } = task;

  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(true);
  };

  const { trigger } = useSWRMutation(`tasks/${id}`, putTasks);
  const { mutate } = useSWRConfig("/tasks");

  if (isEdit) {
    return <BoardTasksForm task={task} setIsEdit={setIsEdit} />;
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
    <article key={id} class={`card card--${color}`}>
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button
              onClick={handleEdit}
              type="button"
              class="card__btn card__btn--edit"
            >
              edit
            </button>
            <button
              type="button"
              class="card__btn card__btn--archive"
              onClick={(event) => handleButton(event, "archived")}
            >
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites"
              onClick={(event) => handleButton(event, "favorite")}
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlinkHref="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">{description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">23 September</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BoardTasksItem;
