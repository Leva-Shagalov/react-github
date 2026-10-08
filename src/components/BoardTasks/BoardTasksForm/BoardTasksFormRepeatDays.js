function BoardTasksFormRepeatDays({
  day,
  checked,
  selectedRepeatDays,
  setSelectedRepeatDays,
}) {
  return (
    <>
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id={`repeat-${day}-4`}
        name="repeat"
        value={day}
        {...(checked && { checked: "checked" })}
        onChange={() => {
          let copySelectedRepeatDays = Object.assign({}, selectedRepeatDays);
          copySelectedRepeatDays[day] = !checked;
          return setSelectedRepeatDays(copySelectedRepeatDays);
        }}
      />
      <label class="card__repeat-day" for={`repeat-${day}-4`}>
        {day}
      </label>
    </>
  );
}

export default BoardTasksFormRepeatDays;
