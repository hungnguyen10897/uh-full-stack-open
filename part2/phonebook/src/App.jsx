import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [seachString, setSearchString] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName) !== undefined) {
      alert(`${newName} is already in the phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    const person = { name: newName, number: newNumber, id: persons.length + 1 };
    setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
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
      <Persons persons={persons} seachString={seachString} />
    </div>
  );
};

export default App;
