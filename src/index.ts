import renderDom from './modules/utils/renderDom';
import Button from './modules/button/button';

const buttonTest = new Button('div', {
  className: 'test',
  text: 'Классаная какая вышла кнопка',
});

window.buttonTest = buttonTest;

renderDom('.app', buttonTest);
