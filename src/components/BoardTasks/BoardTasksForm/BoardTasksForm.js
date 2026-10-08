import useSWRMutation from "swr/mutation";
import BoardTasksFormColor from "./BoardTasksFormColor";
import BoardTasksFormRepeatDays from "./BoardTasksFormRepeatDays";
import { useState } from "react";
import { deleteTasks, putTasks } from "../../../api/api-config";
import { useSWRConfig } from "swr";
import { colors } from "../../../utils";

const BoardTasksForm = ({ task, setIsEdit }) => {
  const { id, color, description, repeating_days: repeatDays, due_date } = task;

  const [selectedColor, setSelectedColor] = useState(color);
  const [text, setText] = useState(description);
  const [selectedDate, setSelectedDate] = useState(due_date);
  const [selectedRepeatDays, setSelectedRepeatDays] = useState(repeatDays);
  const [buttonDate, setButtonDate] = useState(Boolean(due_date));
  const [buttonRepeatDays, setButtonRepeatDays] = useState(
    Object.values(repeatDays).some((bool) => bool === true),
  );

  const { trigger: putTrigger } = useSWRMutation(`tasks/${id}`, putTasks);
  const { trigger: deleteTrigger } = useSWRMutation(`tasks/${id}`, deleteTasks);
  const { mutate } = useSWRConfig("/tasks");

  const handleText = (event) => {
    setText(event.target.value);
  };
  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleClickDate = () => {
    setButtonDate(...[!buttonDate]);
    setButtonRepeatDays(false);
  };
  const handleClickRepeatDays = () => {
    setButtonRepeatDays(...[!buttonRepeatDays]);
    setButtonDate(false);
    setSelectedDate(null);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const result = await putTrigger({
        ...task,
        color: selectedColor,
        description: text,
        due_date: selectedDate
          ? `${selectedDate.slice(0, 10)}${new Date().toISOString().slice(10)}`
          : null,
        repeating_days: selectedRepeatDays,
      });

      await mutate("/tasks");
      setIsEdit(false);
    } catch (e) {}
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await deleteTrigger(task);
    } catch (e) {
    } finally {
      await mutate("/tasks");
    }
  };

  return (
    <article class={`card card--edit card--${selectedColor} card--repeat`}>
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlinkHref="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
                value={text}
                onChange={handleText}
              />
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button
                  class="card__date-deadline-toggle"
                  type="button"
                  onClick={handleClickDate}
                >
                  date:{" "}
                  <span class="card__date-status">
                    {buttonDate ? "yes" : "no"}
                  </span>
                </button>

                {buttonDate ? (
                  <fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="date"
                        placeholder=""
                        name="date"
                        value={
                          selectedDate ? selectedDate.slice(0, 10) : undefined
                        }
                        onChange={handleChangeDate}
                      />
                    </label>
                  </fieldset>
                ) : undefined}

                <button
                  class="card__repeat-toggle"
                  type="button"
                  onClick={handleClickRepeatDays}
                >
                  repeat:
                  <span class="card__repeat-status">
                    {buttonRepeatDays ? "yes" : "no"}
                  </span>
                </button>

                {buttonRepeatDays ? (
                  <fieldset class="card__repeat-days">
                    <div class="card__repeat-days-inner">
                      {Object.entries(repeatDays).map(([day, checked]) => {
                        checked = selectedRepeatDays[day];
                        return (
                          <BoardTasksFormRepeatDays
                            day={day}
                            checked={checked}
                            selectedRepeatDays={selectedRepeatDays}
                            setSelectedRepeatDays={setSelectedRepeatDays}
                          />
                        );
                      })}
                    </div>
                  </fieldset>
                ) : undefined}
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                {Object.entries(colors).map(([color, checked]) => {
                  checked = color === selectedColor;
                  return (
                    <BoardTasksFormColor
                      color={color}
                      checked={checked}
                      setSelectedColor={setSelectedColor}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit" onClick={handleSave}>
              save
            </button>
            <button class="card__delete" type="button" onClick={handleDelete}>
              delete
            </button>
          </div>
        </div>
      </form>
    </article>
  );
};

export default BoardTasksForm;
