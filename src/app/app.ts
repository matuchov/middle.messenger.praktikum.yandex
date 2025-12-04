import { HTTPTransport } from './utils/HTTPtransport';
import { init } from './router/router';

window.addEventListener('DOMContentLoaded', init);

// const API_URL: string = import.meta.env.VITE_API_URL;

// const transport = new HTTPTransport();

// const ge = () => {
//   transport.get(API_URL + '/auth/user', {}).then((data) => {
//     console.log(data);
//   });
// };

// const login = () => {
//   transport.post(API_URL + '/auth/signin', {
//     data: {
//       login: 'testmatya',
//       password: 'Qaz12345!',
//     },
//   });
// };

// const button = document.createElement('button');
// button.classList.add('mybutton');
// button.innerText = 'get';
// button.addEventListener('click', () => {
//   ge();
// });

// const loginbutton = document.createElement('button');
// loginbutton.classList.add('mybutton');
// loginbutton.innerText = 'Login';
// loginbutton.addEventListener('click', () => {
//   login();
// });

// document.querySelector('#app')!.appendChild(button);
// document.querySelector('#app')!.appendChild(loginbutton);
