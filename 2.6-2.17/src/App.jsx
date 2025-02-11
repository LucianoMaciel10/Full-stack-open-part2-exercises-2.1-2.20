import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import AddForm from "./Components/AddForm";
import PersonsInfo from "./Components/PersonsInfo";
import personsService from "./services/personsService";
import NotificationMsj from "./Components/Notification/NotificationMsj";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null)

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existName = persons.find((person) => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())?.name;

    if (existName) {
      if (window.confirm(`${existName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find((person) => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()).id;
        const person = persons.find((person) => person.id === id)
        personsService
          .update(id, {...person, number: newNumber})
          .then(data => {
            setNotification([`Updated ${data.name}`, 'succes'])
            setTimeout(() => {
              setNotification(null)
            },5000)
            const updatePersons = persons.map(person => person.id === data.id ? data : person)
            setPersons(updatePersons)
          }).catch(error => {
            if (error.response) {
              if (error.response.status === 404) {
                // La persona ya no existe en la base de datos
                setNotification([`Information of ${person.name} has already been removed from server`, 'error']);
                setPersons(persons.filter((p) => p.id !== person.id));
              } else if (error.response.status === 400) {
                // Error de validación (ejemplo: número mal formateado)
                setNotification([error.response.data.error, 'error']);
              } else {
                setNotification(['An unexpected error occurred', 'error']);
              }
            } else {
              setNotification(['Network error, please try again', 'error']);
            }
            setTimeout(() => setNotification(null), 5000);
          });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    personsService
      .create({ name: newName, number: newNumber })
      .then(data => {
        setNotification([`Create ${data.name}`, 'succes'])
        setTimeout(() => {
          setNotification(null)
        },5000)
        setPersons(persons.concat(data))
      })
      .catch(error => {
        if (error.response && error.response.data.error) {
          setNotification([error.response.data.error, 'error']);
        } else {
          setNotification(['An unexpected error occurred', 'error']);
        }
        setTimeout(() => setNotification(null), 5000);
      });
    setNewName("");
    setNewNumber("");
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );

  useEffect(() => {
    personsService
      .getAll()
      .then(data => setPersons(data))
  }, [])
  
  return (  
    <div>
      <h1>Phonebook</h1>
      {
        notification ? <NotificationMsj notification={notification} /> : <></>
      }
      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
      <AddForm
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <PersonsInfo
        setNotification={setNotification}
        filteredPersons={filteredPersons}
        setPersons={setPersons}
        persons={persons}
        filter={filter}
      />
    </div>
  );
};

export default App;
