import axios from 'axios';

var instance = axios.create({
    xsrfCookieName: 'mytoken',
    xsrfHeaderName: 'csrf-token'
});

//taking axios and putting a cookie to it

export default instance;
