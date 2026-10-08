import useSWRMutation from "swr/mutation";
import BoardTasksFormColor from "./BoardTasksFormColor";
import BoardTasksFormRepeatDays from "./BoardTasksFormRepeatDays";
import { useState } from "react";
import { postTasks, deleteTasks, putTasks } from "../../../api/api-config";
import { useSWRConfig } from "swr";
import { colors } from "../../../utils";

const BoardTasksForm = ({ task, setIsEdit, setIsAddingTask }) => {
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
  const { trigger: postTrigger } = useSWRMutation(`tasks`, postTasks);
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
    setSelectedDate(null);
    setButtonRepeatDays(false);
  };
  const handleClickRepeatDays = () => {
    setButtonRepeatDays(...[!buttonRepeatDays]);
    setButtonDate(false);
    setSelectedDate(null);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const newTask = {
      ...task,
      color: selectedColor,
      description: text,
      due_date: selectedDate
        ? `${selectedDate.slice(0, 10)}${new Date().toISOString().slice(10)}`
        : null,
      repeating_days: selectedRepeatDays,
    };

    try {
      if (id !== null) {
        const result = await putTrigger(newTask);
      } else {
        delete newTask.id;
        delete newTask.isEdit;
        await postTrigger(newTask);
        setIsAddingTask(false);
      }

      await mutate("/tasks");
      setIsEdit(false);
    } catch (e) {}
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      if (id !== null) {
        await deleteTrigger(task);
      } else {
        // Скрыть добавление новой таски
      }
    } catch (e) {
    } finally {
      await mutate("/tasks");
    }
  };

  return (
    <article className={`card card--edit card--${selectedColor} card--repeat`}>
      <form className="card__form" method="get">
        <div className="card__inner">
          <div className="card__color-bar">
            <svg className="card__color-bar-wave" width="100%" height="10">
              <use xlinkHref="#wave"></use>
            </svg>
          </div>

          <div className="card__textarea-wrap">
            <label>
              <textarea
                className="card__text"
                placeholder="Start typing your text here..."
                name="text"
                value={text}
                onChange={handleText}
              />
            </label>
          </div>

          <div className="card__settings">
            <div className="card__details">
              <div className="card__dates">
                <button
                  className="card__date-deadline-toggle"
                  type="button"
                  onClick={handleClickDate}
                >
                  date:{" "}
                  <span className="card__date-status">
                    {buttonDate ? "yes" : "no"}
                  </span>
                </button>

                {buttonDate ? (
                  <fieldset className="card__date-deadline">
                    <label className="card__input-deadline-wrap">
                      <input
                        className="card__date"
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
                  className="card__repeat-toggle"
                  type="button"
                  onClick={handleClickRepeatDays}
                >
                  repeat:
                  <span className="card__repeat-status">
                    {buttonRepeatDays ? "yes" : "no"}
                  </span>
                </button>

                {buttonRepeatDays ? (
                  <fieldset className="card__repeat-days">
                    <div className="card__repeat-days-inner">
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

            <div className="card__colors-inner">
              <h3 className="card__colors-title">Color</h3>
              <div className="card__colors-wrap">
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

          <div className="card__status-btns">
            <button className="card__save" type="submit" onClick={handleSave}>
              save
            </button>
            <button
              className="card__delete"
              type="button"
              onClick={handleDelete}
            >
              delete
            </button>
          </div>
        </div>
      </form>
    </article>
  );
};

export default BoardTasksForm;
