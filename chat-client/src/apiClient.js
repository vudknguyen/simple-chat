class ApiClient {
  getMessages() {
    return fetch('http://localhost:3001/api/messages')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Server error');
        }
      });
  }

  getUsers() {
    return fetch('http://localhost:3001/api/users')
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
