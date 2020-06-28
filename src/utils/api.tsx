import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://reactjs-cdp.herokuapp.com/'
});

export default axiosConfig;
