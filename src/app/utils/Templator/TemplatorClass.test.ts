import { expect } from 'chai';
import { Templator } from './TemplatorClass';
import { Block, type defaultProps } from '../Block/Block';

interface testProps extends defaultProps {
  text: string;
}

class MockBlock extends Block<testProps> {
  getContent() {
    const div = document.createElement('div');
    div.textContent = this.props.text || 'mock-content';
    return div;
  }
  render() {
    return document.createDocumentFragment();
  }
}

describe('Templator', () => {
  it('Должен заменять простые переменные в тексте {{key}}', () => {
    const rawHtml = '<div>Hello, {{name}}!</div>';
    const templator = new Templator(rawHtml);
    const fragment = templator.compile({ name: 'World' });

    expect(fragment.querySelector('div')?.textContent).to.equal('Hello, World!');
  });

  it('Должен вставлять содержимое Block через тройные скобки {{{block}}}', () => {
    const rawHtml = '<main>{{{content}}}</main>';
    const contentBlock = new MockBlock({ text: 'I am a block' });
    const templator = new Templator(rawHtml);
    const fragment = templator.compile({ content: contentBlock });
    const main = fragment.querySelector('main');
    expect(main?.firstElementChild?.tagName).to.equal('DIV');
    expect(main?.textContent).to.equal('I am a block');
  });

  it('Должен обрабатывать массивы блоков', () => {
    const rawHtml = '<ul>{{{items}}}</ul>';
    const items = [new MockBlock({ text: 'item 1' }), new MockBlock({ text: 'item 2' })];

    const templator = new Templator(rawHtml);
    const fragment = templator.compile({ items });

    const ul = fragment.querySelector('ul');
    expect(ul?.children.length).to.equal(2);
    expect(ul?.children[0].textContent).to.equal('item 1');
  });

  it('Должен обновлять атрибуты элементов', () => {
    const rawHtml = '<div class="{{className}}" id="{{id}}"></div>';
    const templator = new Templator(rawHtml);
    const fragment = templator.compile({ className: 'active', id: 'main-btn' });

    const div = fragment.querySelector('div');
    expect(div?.getAttribute('class')).to.equal('active');
    expect(div?.getAttribute('id')).to.equal('main-btn');
  });

  it('Должен обрабатывать специфический атрибут {{isdisabled}}', () => {
    const rawHtml = '<button {{isdisabled}}>Click</button>';
    const templator = new Templator(rawHtml);

    const fragTrue = templator.compile({ isDisabled: true });
    expect(fragTrue.querySelector('button')?.hasAttribute('disabled')).to.be.true;

    const fragFalse = templator.compile({ isDisabled: false });
    expect(fragFalse.querySelector('button')?.hasAttribute('disabled')).to.be.false;
  });

  it('Должен корректно работать с несколькими переменными в одном текстовом узле', () => {
    const rawHtml = '<span>{{firstName}} {{lastName}}</span>';
    const templator = new Templator(rawHtml);
    const fragment = templator.compile({ firstName: 'John', lastName: 'Doe' });

    expect(fragment.querySelector('span')?.textContent).to.equal('John Doe');
  });

  it('Должен удалять плейсхолдер, если значение в контексте отсутствует', () => {
    const rawHtml = '<div>{{{missing}}}</div>';
    const templator = new Templator(rawHtml);
    const fragment = templator.compile({});

    expect(fragment.querySelector('div')?.innerHTML).to.equal('');
  });
});
