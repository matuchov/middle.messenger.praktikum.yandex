export const testFN = () => {
  const el = document.createElement('div');

  el.innerHTML = `<div class="sidebar__chatlist-row">
  {{{ Avatar }}} <divide></divide>
  {{{ Avatar }}} 
  <div class="sidebar__chatlist-info_row">
    <div class="sidebar__chatlist-text {{ name }}">
      <div class="sidebar__chatlist-name {{ name }}">{{ name }}</div>
      <div class="sidebar__chatlist-lastmessage">{{ messageText }}</div>
    </div>
    <div class="sidebar__chatlist-info">
      <div class="sidebar__chatlist-time">{{ time }}</div>
      <div class="sidebar__chatlist-counter">{{ counter }}</div>
    </div>
  </div>
</div>`;

  const result: Record<string, Function[]> = {};

  function traverseAllNodes(node: ChildNode) {
    const triple = /\{\{\{([^{}]+)\}\}\}/g;
    const double = /(?<!\{)\{\{([^{}]+)\}\}(?!\})/g;
    const clear = /[^a-zA-Z0-9]/g;

    if (node.nodeType === Node.ELEMENT_NODE) {
      const currNode = node as HTMLElement;
      for (const attr of currNode.attributes) {
        const { value } = attr;
        const match = value.match(double);
        if (match) {
          const name = match[0].replace(clear, '');
          if (!result[name]) result[name] = [];
          result[name].push(
            (() => {
              const defaultValue = value;
              return (attrValue: string) => {
                attr.value = defaultValue.replace(/\{\{(.*?)\}\}/g, attrValue);
              };
            })()
          );
        }
      }
    }
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text && typeof text === 'string') {
        const matchT = text.match(triple);
        const matchD = text.match(double);
        if (matchT) {
          const name = matchT[0].replace(clear, '');
          if (!result[name]) result[name] = [];
          result[name].push((element: HTMLElement) => {
            node.replaceWith(element);
          });
        } else if (matchD) {
          const name = matchD[0].replace(clear, '');
          if (!result[name]) result[name] = [];
          result[name].push((value: string) => {
            node.textContent = value;
          });
        }
      }
    }
    for (const child of node.childNodes) {
      traverseAllNodes(child);
    }
  }

  traverseAllNodes(el);

  return { el, result };
};
