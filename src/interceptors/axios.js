import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.request.use(async response => {
  console.log(response)

  const token = cookies.get('access_token');
  if(token) {
    response.headers.Authorization = `Bearer ${token}`;
  }
  return response;
},  async error => {
  console.log("error", error)
  const refreshToken = cookies.get('refresh_token');
  if(error.response.status === 401 && refreshToken) {
    const headers = {
      'Authorization': `Bearer ${refreshToken}`
    }
    const response =  axios.post('auth/refresh', {}, {headers: headers} );

    if(response.status === 200) {
      cookies.set("access_token", response.data.access_token);
      cookies.set("refresh_token", response.data.refresh_token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
    } else {
        cookies.remove("access_token");
        cookies.remove("refresh_token")
      window.location.href = '/login';
    }

    return axios(error.config);
  }
});

const axiosErrorHandler = (response) => {
    const refreshToken = cookies.get('refresh_token');
    if(response.status === 401 && refreshToken) {
        const headers = {
            'Authorization': `Bearer ${refreshToken}`
        }
        const response =  axios.post('auth/refresh', {}, {headers: headers} );

        if(response.status === 200) {
            cookies.set("access_token", response.data.access_token);
            cookies.set("refresh_token", response.data.refresh_token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
        } else {
            cookies.remove("access_token");
            cookies.remove("refresh_token")
            window.location.href = '/login';
        }
    } else{
        window.location.href = '/login';
    }
}

export {axiosErrorHandler};
