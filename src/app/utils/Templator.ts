export const templator = (template: string) => {
  const el = document.createElement('div');

  el.innerHTML = template;

  const bindings: {
    setProps: Record<string, ((value: string) => void)[]>;
    setChildrens: Record<string, ((value: HTMLElement | DocumentFragment) => void)[]>;
  } = { setProps: {}, setChildrens: {} };

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
          if (!bindings.setProps[name]) bindings.setProps[name] = [];
          bindings.setProps[name].push(
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
          if (!bindings.setChildrens[name]) bindings.setChildrens[name] = [];
          bindings.setChildrens[name].push((element: HTMLElement | DocumentFragment) => {
            node.parentElement?.replaceChild(element, node);
            // node.replaceWith(element);
          });
        } else if (matchD) {
          const name = matchD[0].replace(clear, '');
          if (!bindings.setProps[name]) bindings.setProps[name] = [];
          bindings.setProps[name].push((value: string) => {
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

  return (props: {
    setProps: { [K in keyof typeof bindings.setProps]: string };
    setChildrens: { [K in keyof typeof bindings.setChildrens]: HTMLElement };
  }) => {
    Object.keys(bindings.setProps).forEach((prop) => {
      bindings.setProps[prop].forEach((fn) => {
        fn(props.setProps[prop]);
      });
    });
    Object.keys(bindings.setChildrens).forEach((prop) => {
      bindings.setChildrens[prop].forEach((fn) => {
        fn(props.setChildrens[prop]);
      });
    });
    return el.children[0] as HTMLElement;
  };
};
