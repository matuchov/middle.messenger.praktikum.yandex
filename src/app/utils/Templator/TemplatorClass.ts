import { Block } from '../Block/Block';

type Props = Record<string, HTMLElement | string | DocumentFragment | unknown>;

export class Templator {
  private _templateEl: DocumentFragment;

  private readonly _regExes = {
    triple: /\{\{\{\s*([a-zA-Z0-9_$]+)\s*\}\}\}/g,
    double: /\{\{\s*([a-zA-Z0-9_$]+)\s*\}\}/,
    doubleGlobal: /\{\{\s*([a-zA-Z0-9_$]+)\s*\}\}/g,
  };

  constructor(rawHtml: string) {
    const processedHtml = rawHtml.replace(this._regExes.triple, (_, name) => {
      return `<slot-${name} data-tpl-key="${name}"></slot-${name}>`;
    });

    this._templateEl = document.createRange().createContextualFragment(processedHtml);
  }

  compile(rawCtx: Props): DocumentFragment {
    const ctx: Props = {};
    Object.entries(rawCtx).forEach(([key, value]) => {
      if (value instanceof Block) {
        ctx[key] = value.getContent()!;
      } else if (Array.isArray(value)) {
        const cont = document.createDocumentFragment();
        value.forEach((item) => {
          if (item instanceof Block) {
            cont.append(item.getContent()!);
          } else if (item instanceof HTMLElement || item instanceof DocumentFragment) {
            cont.append(item);
          }
        });
        ctx[key] = cont;
      } else {
        ctx[key] = value;
      }
    });

    const fragment = this._templateEl.cloneNode(true) as DocumentFragment;
    this._traverse(fragment, ctx);
    return fragment;
  }

  private _traverse(node: Node, ctx: Props) {
    if (node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement) {
      if (node.tagName.startsWith('SLOT-')) {
        const key = node.getAttribute('data-tpl-key');
        if (key) {
          this._replaceElement(node, ctx[key] ?? null);
          return;
        }
      }

      this._updateElementAttributes(node, ctx);
    }

    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      this._processTextNode(node, ctx);
      return;
    }

    const children = Array.from(node.childNodes);
    children.forEach((child) => this._traverse(child, ctx));
  }

  private _updateElementAttributes(element: HTMLElement, ctx: Props) {
    Array.from(element.attributes).forEach((attr) => {
      if (attr.name === '{{isdisabled}}') {
        element.removeAttribute(attr.name);
        if (ctx.isDisabled) {
          element.setAttribute('disabled', '');
        }
        return;
      }

      if (this._regExes.double.test(attr.value)) {
        const newValue = attr.value.replace(this._regExes.doubleGlobal, (_, key) => {
          const val = ctx[key];
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

  private _processTextNode(intNode: Node, ctx: Props) {
    const node = intNode;
    const text = node.textContent || '';

    this._regExes.doubleGlobal.lastIndex = 0;

    if (this._regExes.doubleGlobal.test(text)) {
      const replacedText = text.replace(this._regExes.doubleGlobal, (_, key) => {
        const val = ctx[key];
        return val !== undefined && val !== null ? String(val) : '';
      });

      node.textContent = replacedText;
    }
  }
}
