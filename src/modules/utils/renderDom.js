function renderDom(rootTag, component) {
  // eslint-disable-next-line no-undef
  console.log(rootTag);
  const root = document.querySelector(rootTag);
  root.appendChild(component.getContent());
}

export default renderDom;
