import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

axios.defaults.baseURL = 'http://localhost:5000';
axios.interceptors.request.use(response => response, async error => {
  if(error.response.status === 401) {
    const headers = {
      'Authorization': `Bearer ${cookies.get('refresh_token')}`,
    }
    const response = await axios.post('auth/refresh', {}, {headers: headers} );

    if(response.status === 200) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
    }

    return axios(error.config);
  }
});
