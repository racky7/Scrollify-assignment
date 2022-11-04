import axios from 'axios';
const instance = axios.create({baseURL: 'https://isocialmedia.herokuapp.com'});
export default instance