function MainControl({ setIsAddingTask }) {
  const handleClick = () => {
    setIsAddingTask((prev) => !prev);
  };
  return (
    <section className="main__control control container">
      <h1 className="control__title">TASKMANAGER</h1>
      <button className="control__button" onClick={handleClick}>
        + ADD NEW TASK
      </button>
    </section>
  );
}

export default MainControl;
