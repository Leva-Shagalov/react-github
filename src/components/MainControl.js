function MainControl({ setIsAddingTask }) {
  const handleClick = () => {
    setIsAddingTask((prev) => !prev);
  };
  return (
    <section class="main__control control container">
      <h1 class="control__title">TASKMANAGER</h1>
      <button class="control__button" onClick={handleClick}>
        + ADD NEW TASK
      </button>
    </section>
  );
}

export default MainControl;
