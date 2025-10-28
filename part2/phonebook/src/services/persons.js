import axios from 'axios';

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data);
}

const addPerson = (person) => {
    return axios
        .post(baseUrl, person)
        .then(response => response.data);
}

const deletePerson = (person) => {
    return axios
        .delete(`${baseUrl}/${person.id}`).then(response => response.data);
}

const updatePerson = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data);
}

export default {
    getAll,
    addPerson,
    deletePerson,
    updatePerson,
}