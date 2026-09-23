function SortListItem(props) {
  const { name, onClick } = props;

  return (
    <a
      href="#"
      class="board__sort-item"
      onClick={() => {
        onClick(name);
      }}
    >
      {name}
    </a>
  );
}

export default SortListItem;
