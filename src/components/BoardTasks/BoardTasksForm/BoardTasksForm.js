import { colors, repeatDays } from "../../../utils";
import BoardTasksFormColor from "./BoardTasksFormColor";
import BoardTasksFormRepeatDays from "./BoardTasksFormRepeatDays";

function BoardTasksForm() {
  return (
    <article class="card card--edit card--yellow card--repeat">
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
              >
                This is example of task edit. You can set date and chose
                repeating days and color.
              </textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">yes</span>
                </button>

                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="23 September 16:15"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">yes</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    {Object.entries(repeatDays).map(([day, checked]) => (
                      <BoardTasksFormRepeatDays day={day} checked={checked} />
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                {Object.entries(colors).map(([color, checked]) => (
                  <BoardTasksFormColor color={color} checked={checked} />
                ))}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">
              save
            </button>
            <button class="card__delete" type="button">
              delete
            </button>
          </div>
        </div>
      </form>
    </article>
  );
}

export default BoardTasksForm;
