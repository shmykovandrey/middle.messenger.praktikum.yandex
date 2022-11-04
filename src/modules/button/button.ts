import Component from '../../modules/services/component';
import template from './template';
import {} from './style.scss';

export default class Button extends Component {
  render() {
    console.log('Button render');
    return super.compile(template);
  }
}
