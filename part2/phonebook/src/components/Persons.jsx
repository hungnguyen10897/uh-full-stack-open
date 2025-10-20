const Persons = ({ persons, seachString }) => (
  <ul>
    {persons
      .filter((person) => person.name.toLocaleLowerCase().includes(seachString))
      .map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
  </ul>
);

export default Persons;
