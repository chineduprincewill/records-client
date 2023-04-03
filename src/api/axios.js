import axios from 'axios';

export default axios.create({
    baseURL: 'https://recycletradezone.com/recordsMan/api'
    //baseURL: 'http://localhost/recordsMan/public/api'
});
