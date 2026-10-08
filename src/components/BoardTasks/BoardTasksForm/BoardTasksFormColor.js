function BoardTasksFormColor({ color, checked, setSelectedColor }) {
  const id = crypto.randomUUID();

  return (
    <>
      <input
        type="radio"
        id={`color-${color}-${id}`}
        className={`card__color-input card__color-input--${color} visually-hidden`}
        name="color"
        value={color}
        {...(checked && { checked: "checked" })}
        onChange={() => setSelectedColor(color)}
      />
      <label
        for={`color-${color}-${id}`}
        className={`card__color card__color--${color}`}
      >
        {color}
      </label>
    </>
  );
}

export default BoardTasksFormColor;
