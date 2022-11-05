import Component from '../../services/component';
import template from './template';
import {} from './style.scss';

export default class Nav extends Component {
  render() {
    console.log('nav render');
    return super.compile(template);
  }
}
