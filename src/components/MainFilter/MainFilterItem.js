function MainFilterItem(props) {
  const { filterType, disabled, checked, count, onChange } = props;

  return (
    <>
      <input
        type="radio"
        id={`filter__${filterType}`}
        class="filter__input visually-hidden"
        name="filter"
        {...(disabled && { disabled: "disabled" })}
        {...(checked && { checked: "checked" })}
        onChange={() => {
          onChange(filterType);
        }}
      />
      <label for={`filter__${filterType}`} class="filter__label">
        {filterType} <span class={`filter__${filterType}-count`}>{count}</span>
      </label>
    </>
  );
}

export default MainFilterItem;
