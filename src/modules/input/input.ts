import template from './template';
import Component from '../services/component';

export default class Input extends Component {
  render() {
    console.log('input rendered');
    return super.compile(template);
  }
}
