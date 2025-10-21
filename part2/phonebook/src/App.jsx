import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [seachString, setSearchString] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    const searchedPerson = persons.find((person) => person.name === newName);

    if (searchedPerson !== undefined) {
      const confirmed = window.confirm(
        `${searchedPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmed) {
        const updatedPerson = { ...searchedPerson, number: newNumber };
        personService.updatePerson(updatedPerson).then((updatedPerson) => {
          console.log(updatedPerson);
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
        });

        setNewName("");
        setNewNumber("");
      } else {
        return;
      }
    } else {
      const person = { name: newName, number: newNumber };
      personService
        .addPerson(person)
        .then((newPerson) => setPersons(persons.concat(newPerson)));

      setNewName("");
      setNewNumber("");
    }
  };

  const handleDelete = (person) => {
    const confirmed = window.confirm(`Delete ${person.name}?`);
    if (confirmed) {
      personService.deletePerson(person).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter seachString={seachString} setSearchString={setSearchString} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleAdd={handleAdd}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        seachString={seachString}
        deletePerson={handleDelete}
      />
    </div>
  );
};

export default App;
