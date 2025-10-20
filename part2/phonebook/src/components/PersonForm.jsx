const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleAdd,
}) => (
  <form>
    <div>
      name:
      <input
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
    </div>
    <div>
      number:
      <input
        value={newNumber}
        onChange={(event) => setNewNumber(event.target.value)}
      />
    </div>
    <div>
      <button type="submit" onClick={handleAdd}>
        add
      </button>
    </div>
  </form>
);

export default PersonForm;
