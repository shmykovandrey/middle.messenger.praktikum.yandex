import renderDom from './utils/renderDom';
import Button from './components/button/button';
import Nav from './layouts/nav/nav';
import Input from './components/input/input';
import Form from './components/form/form';

const buttonTest = new Button('div', {
  className: 'test',
  text: 'Классаная какая вышла кнопка',
});

const nav = new Nav('nav', {
  button1: buttonTest,
  button2: new Button('div', {
    className: 'test2',
    text: 'Классаная вышла кнопка',
  }),
  button3: new Button('div', {
    className: 'test3',
    text: 'Классаная вышла кнопка опять',
  }),
});

const inputLogin = new Input('div', {
  inputType: 'text',
  placeholder: 'login',
  name: 'login',
});

// const loginForm = new Form('div', {
//   inputs: [1, 2, 3, 4, 5],
// });

window.buttonTest = buttonTest;
window.nav = nav;
window.input = inputLogin;
// window.loginForm = loginForm;

renderDom('.app', nav);
