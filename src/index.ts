import EventBus from './modules/eventBus';

const eventBus = new EventBus();

const fn1 = (a = 1, b = 2) => {
  console.log('fn1');
  console.log(a + b);
};

const fn2 = (a = 3, b = 4) => {
  console.log('fn2');
  console.log(a * b);
};

try {
  eventBus.on('sum', fn1);
  eventBus.emit('sum', 3, 4);
  eventBus.on('sum', fn2);
  eventBus.emit('sum', 3, 4);
} catch (error) {
  console.error(error);
}
