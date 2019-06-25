import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('jwt');

    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: `https://bw-replate.herokuapp.com/api`
    })
}
