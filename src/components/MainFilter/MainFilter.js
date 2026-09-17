import { filters } from "../../utils";
import MainFilterItem from "./MainFilterItem";

function MainFilter({ setFilterType }) {
  return (
    <section class="main__filter filter container">
      {filters.map((filter) => {
        return (
          <MainFilterItem
            key={filter.id}
            {...filter}
            onChange={setFilterType}
          />
        );
      })}
    </section>
  );
}

export default MainFilter;
