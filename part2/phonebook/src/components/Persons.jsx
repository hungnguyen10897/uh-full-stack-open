const Persons = ({ persons, seachString, deletePerson }) => (
  <ul>
    {persons
      .filter((person) => {
        console.log(person);
        return person.name.toLocaleLowerCase().includes(seachString);
      })
      .map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button
            type="delete"
            onClick={(event) => {
              event.preventDefault();
              deletePerson(person);
            }}
          >
            delete
          </button>
        </p>
      ))}
  </ul>
);

export default Persons;
