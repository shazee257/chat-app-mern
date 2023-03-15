import axios from 'axios';

const baseURL = 'http://localhost:5000';

export default async function apiCall({ method, endPoint }) {
    const headers = { 'Content-Type': 'application/json' };

    const config = {
        method,
        url: `${baseURL}/${endPoint}`,
        headers,
    };

    try {
        const data = await axios(config);
        return [data, null];
    } catch (error) {
        console.log('error: ', error);
        return [null, error];
    }
};
