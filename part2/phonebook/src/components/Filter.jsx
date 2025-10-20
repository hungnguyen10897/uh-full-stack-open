const Filter = ({ searchString, setSearchString }) => {
  return (
    <input
      value={searchString}
      onChange={(event) => setSearchString(event.target.value)}
    />
  );
};

export default Filter;
