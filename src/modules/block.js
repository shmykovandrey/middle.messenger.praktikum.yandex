import { isThisTypeNode } from 'typescript';
import EventBus from './eventBus';
// import { IEventBus } from './eventBus';

// interface IBlock {
//   eventBus?: () => IEventBus;
// }

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mounted',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:component-render',
  };

  static count = 0;

  constructor(tagName = 'div', props = { 1: '1', 2: 2 }) {
    // const eventBus = new EventBus();
    this.eventBus = new EventBus();
    this._element = null;
    this._meta = null;
    this._meta = { tagName, props };
    this.props = this._makePropsProxy(props);
    this._registerEvents(this.eventBus);
    Block.count += 1;
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMounted);
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate);
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  setProps(props) {
    Object.keys(props).forEach((prop) => {
      this.props[prop] = props[prop];
    });
  }

  showProps() {
    console.log(this.props);
  }

  // eslint-disable-next-line class-methods-use-this
  _makePropsProxy(props) {
    const traps = {
      set(target, prop, val) {
        console.log('props changed');
        // eslint-disable-next-line no-param-reassign
        target[prop] = val;
        return true;
      },
      deleteProperty() {
        throw new Error('хотят удалить');
      },
    };
    const proxyProps = new Proxy(props, traps);
    return proxyProps;
  }

  _createResouces() {
    const { tagName } = this._meta;
    this._element = document.createElement(tagName);
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    console.log('init');
    console.log(Block.count);
    this._createResouces();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _render() {
    const block = this.render();
    this._element.innerHTML = block;
  }

  render() {
    return 'text from render()';
  }

  getElement() {
    return this._element;
  }

  show() {
    this.getElement().style.display = 'block';
  }

  hide() {
    this.getElement().style.display = 'none';
  }
}

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element = null;
  _meta = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {}

  dispatchComponentDidMoun() {}

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }
    let oldProps = this.props;
    console.log(oldProps);
    Object.assign(this.props, nextProps);
    console.log(this.props);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    console.log(block);
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block;
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const traps = {
      set(target, prop, val) {
        console.log('props changed');
        // eslint-disable-next-line no-param-reassign
        target[prop] = val;
        return true;
      },
      deleteProperty() {
        throw new Error('хотят удалить');
      },
    };
    const proxyProps = new Proxy(props, traps);
    return proxyProps;
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
