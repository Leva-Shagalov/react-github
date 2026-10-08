function MainFilterItem(props) {
  const { filterType, disabled, checked, count, onChange } = props;

  return (
    <>
      <input
        type="radio"
        id={`filter__${filterType}`}
        className="filter__input visually-hidden"
        name="filter"
        {...(disabled && { disabled: "disabled" })}
        {...(checked && { checked: "checked" })}
        onChange={() => {
          onChange(filterType);
        }}
      />
      <label htmlFor={`filter__${filterType}`} className="filter__label">
        {filterType}{" "}
        <span className={`filter__${filterType}-count`}>{count}</span>
      </label>
    </>
  );
}

export default MainFilterItem;
