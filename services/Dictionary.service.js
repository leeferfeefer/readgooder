import axios from "axios";

const API_KEY = 'daf80cd9-738d-4772-96f1-7653068dd080';

const instance = axios.create({
    timeout: 5000,
    baseURL: 'https://dictionaryapi.com/api/v3/references/collegiate/json/'
});

const getDefintion = async (word) => {
    const response = await instance.get(`${word}?key=${API_KEY}`);
    return response.data;
};

export default {
    getDefintion
};