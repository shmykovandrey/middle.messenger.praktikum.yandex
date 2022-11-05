import renderDom from './modules/utils/renderDom';
import Button from './modules/button/button';
import Nav from './modules/nav/nav';
import Input from './modules/input/input';

const buttonTest = new Button('div', {
  className: 'test',
  text: 'Классаная какая вышла кнопка',
});

const nav = new Nav('nav');

const inputLogin = new Input('div', {
  inputType: 'text',
  placeholder: 'login',
  name: 'login',
});

window.buttonTest = buttonTest;
window.nav = nav;
window.input = inputLogin;

renderDom('.app', inputLogin);
