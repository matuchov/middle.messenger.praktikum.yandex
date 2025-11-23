type Props = Record<string, HTMLElement | string | DocumentFragment | unknown>;

export class Templator {
  private _templateEl: DocumentFragment;

  private readonly _regExes = {
    triple: /\{\{\{\s*([a-zA-Z0-9_$]+)\s*\}\}\}/g,
    double: /\{\{\s*([a-zA-Z0-9_$]+)\s*\}\}/,
    // Добавляем глобальную версию регулярки для простой замены в строках атрибутов
    doubleGlobal: /\{\{\s*([a-zA-Z0-9_$]+)\s*\}\}/g,
  };

  constructor(rawHtml: string) {
    const processedHtml = rawHtml.replace(this._regExes.triple, (_, name) => {
      return `<slot-${name} data-tpl-key="${name}"></slot-${name}>`;
    });

    this._templateEl = document.createRange().createContextualFragment(processedHtml);
  }

  compile(ctx: Props): DocumentFragment {
    const fragment = this._templateEl.cloneNode(true) as DocumentFragment;
    this._traverse(fragment, ctx);
    return fragment;
  }

  private _traverse(node: Node, ctx: Props) {
    if (node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement) {
      // 1. Сначала проверяем, слот ли это
      if (node.tagName.startsWith('SLOT-')) {
        const key = node.getAttribute('data-tpl-key');
        if (key && ctx[key]) {
          this._replaceElement(node, ctx[key]);
          // Если элемент заменен, дальше его обрабатывать не нужно, выходим из ветки
          return;
        }
      }

      // 2. Если это обычный элемент (не слот), проверяем его атрибуты
      this._updateElementAttributes(node, ctx);
    }

    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      this._processTextNode(node, ctx);
      return;
    }

    const children = Array.from(node.childNodes);
    children.forEach((child) => this._traverse(child, ctx));
  }

  // Новый метод для обработки атрибутов
  private _updateElementAttributes(element: HTMLElement, ctx: Props) {
    // Превращаем NamedNodeMap в массив, чтобы удобно перебирать
    Array.from(element.attributes).forEach((attr) => {
      // Проверяем, есть ли в значении атрибута {{ ... }}
      if (this._regExes.double.test(attr.value)) {
        // Заменяем все вхождения переменных на их значения
        // Используем doubleGlobal, чтобы заменить все переменные в одной строке
        const newValue = attr.value.replace(this._regExes.doubleGlobal, (_, key) => {
          const val = ctx[key];
          // Если значения нет, подставляем пустую строку
          return val !== undefined && val !== null ? String(val) : '';
        });

        element.setAttribute(attr.name, newValue);
      }
    });
  }

  private _replaceElement(placeholder: HTMLElement, value: unknown) {
    if (value instanceof Node) {
      placeholder.replaceWith(value);
    } else if (Array.isArray(value)) {
      placeholder.replaceWith(...(value as (string | Node)[]));
    } else {
      placeholder.remove();
    }
  }

  private _processTextNode(node: Node, ctx: Props) {
    let text = node.textContent || '';

    let match;
    // Сбрасываем индекс, на случай если регулярка была глобальной (хотя здесь локальная, но для надежности)
    this._regExes.double.lastIndex = 0;

    while ((match = this._regExes.double.exec(text)) !== null) {
      const [fullMatch, key] = match;
      const { index } = match;

      if (index > 0) {
        const tail = (node as Text).splitText(index);
        node = tail;
      }

      const tail = (node as Text).splitText(fullMatch.length);

      const value = ctx[key];
      node.textContent = value !== undefined && value !== null ? String(value) : '';

      node = tail;
      text = node.textContent || '';
      // Для локальной регулярки lastIndex не работает, но цикл работает за счет смещения node и text
      // Если бы использовали global regex здесь, нужно было бы сбрасывать lastIndex = 0 для новой строки
    }
  }
}
