import pug from 'pug';
import EventBus from './eventBus';

type Meta = { tagName: string; props: {} };

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element = null;

  _meta: null | Meta = null;

  _childs = null;

  constructor(tagName = 'div', propsAndChilds = {}) {
    const eventBus = new EventBus();
    const { children, props } = this.getChildren(propsAndChilds);
    this._meta = {
      tagName,
      props,
    };

    this._props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._id = `id${Math.trunc(Math.random() * 100000)}`;

    this._children = children;

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
    //this.consoleLog();
  }

  _registerEvents(eventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {}

  dispatchComponentDidMoun() {}

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  consoleLog() {
    console.error(`Element ${this._meta.tagName}`);
    console.log(`Element meta props`);
    console.log(this._meta.props);
    console.log(`Element _props`);
    console.log(this._props);
    console.log(`Element _childs`);
    console.log(this._childs);
    console.log(`Element _children`);
    console.log(this._children);
    console.log(`Element _id`);
    console.log(this._id);
    console.log(`Element fragment`);
    console.log(this.getContent());
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }
    const oldProps = this._props;
    Object.assign(this._props, nextProps);
    this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, nextProps);
  };

  getChildren(propsAndChilds) {
    const props = {};
    const children = {};

    Object.keys(propsAndChilds).forEach((key) => {
      if (propsAndChilds[key] instanceof Component) {
        children[key] = propsAndChilds[key];
      } else {
        props[key] = propsAndChilds[key];
      }
    });
    return { children, props };
  }

  _render() {
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = '';
    this._element.innerHTML = block;
  }

  compile(template, props) {
    if (typeof props === 'undefined') {
      props = this._props;
    }

    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });
    const fragment = this._createDocumentElement('div');
    fragment.innerHTML = pug.compile(template)(propsAndStubs);
    Object.values(this._children).forEach((child) => {
      const stub = fragment.querySelector(`[data-id="${child._id}"]`);
      if (stub) stub.replaceWith(child.getContent());
    });
    return fragment.innerHTML;
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return this._element;
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
