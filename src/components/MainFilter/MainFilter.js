import { filterCallBacks, filters } from "../../utils";
import MainFilterItem from "./MainFilterItem";

function MainFilter({ data, filterType, setFilterType }) {
  return (
    <section class="main__filter filter container">
      {filters.map((filter) => {
        const count = data.filter(filterCallBacks[filter.filterType]).length;
        const disabled = count <= 0;
        const checked = filterType === filter.filterType;

        return (
          <MainFilterItem
            key={filter.id}
            {...filter}
            count={count}
            disabled={disabled}
            checked={checked}
            onChange={setFilterType}
          />
        );
      })}
    </section>
  );
}

export default MainFilter;
