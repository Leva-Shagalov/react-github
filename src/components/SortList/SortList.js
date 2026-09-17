import SortListItem from "./SortListItem";

function SortList() {
  const sortTypes = [
    { id: crypto.randomUUID(), name: "SORT BY DEFAULT" },
    { id: crypto.randomUUID(), name: "SORT BY DATE up" },
    { id: crypto.randomUUID(), name: "SORT BY DATE down" },
  ];
  return (
    <div class="board__sort-list">
      {sortTypes.map((type) => {
        return <SortListItem key={type.id} {...type} />;
      })}
    </div>
  );
}

export default SortList;
