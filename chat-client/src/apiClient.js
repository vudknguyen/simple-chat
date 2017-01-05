import config from './config';

class ApiClient {
  getMessages() {
    return fetch(config.serverUrl + '/api/messages')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Server error');
        }
      });
  }

  getUsers() {
    return fetch(config.serverUrl + '/api/users')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Server error');
        }
      });
  }
}
const apiclient = new ApiClient();

export default apiclient;
