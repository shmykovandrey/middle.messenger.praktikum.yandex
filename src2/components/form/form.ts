import tpl from './template';
import Component from '../../services/component';

export default class Form extends Component {
  render() {
    console.log('Form render');
    return super.compile(tpl);
  }
}
