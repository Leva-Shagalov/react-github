function BoardTasksFormColor({ color, checked }) {
  const id = crypto.randomUUID();

  return (
    <>
      <input
        type="radio"
        id={`color-${color}-${id}`}
        class={`card__color-input card__color-input--${color} visually-hidden`}
        name="color"
        value={color}
        {...(checked && { checked: "checked" })}
      />
      <label
        for={`color-${color}-${id}`}
        class={`card__color card__color--${color}`}
      >
        {color}
      </label>
    </>
  );
}

export default BoardTasksFormColor;
