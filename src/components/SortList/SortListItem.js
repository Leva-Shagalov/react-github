function SortListItem(props) {
  const { name } = props;
  return (
    <a href="#" class="board__sort-item">
      {name}
    </a>
  );
}

export default SortListItem;
