import store from '../../store/store';
import '../../../shared/utils/test/setup';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Block, type defaultProps } from './Block';
import * as sinon from 'sinon';

import { connect } from '../../../shared/utils/connect/model/connect';

interface testProps extends defaultProps {
  text: string;
  list?: Block<testProps>[];
  child?: Block<testProps>;
  object?: { data: { test: number; test2: string } };
}

class TestComponent extends Block<testProps> {
  render() {
    const p = document.createElement('p');
    p.textContent = this.props.text;
    return p;
  }
}

describe('Block Base Class', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    store.clean();
  });
  it('Должен менять содержимое при вызове setProps', () => {
    const component = new TestComponent({ text: 'old' });
    component.setProps({ text: 'new' });
    expect(component.element?.textContent).to.equal('new');
  });

  it('Должен добавлять события на элемент', () => {
    let clicked = false;
    const component = new TestComponent({
      text: 'test',
      events: {
        click: {
          listener: () => {
            clicked = true;
          },
        },
      },
    });

    const el = component.getContent() as HTMLElement;
    el.click();
    expect(clicked).to.be.true;
  });

  it('не должен вызывать перерендер, если переданы одинаковые пропсы', () => {
    const block = new TestComponent({
      text: 'same',
      object: {
        data: {
          test: 10,
          test2: 'same',
        },
      },
    });
    const renderSpy = sandbox.spy(block, 'render');

    block.setProps({ text: 'same' });
    block.setProps({
      object: {
        data: {
          test: 10,
          test2: 'same',
        },
      },
    });

    expect(renderSpy.called).to.be.false;
  });

  it('должен корректно отделять children от обычных props', () => {
    const child = new TestComponent({ text: 'i am child' });
    const parent = new TestComponent({
      text: 'i am parent',
      child: child,
    });

    expect(parent.children.child).to.equal(child);
    expect(parent.props.child).to.be.undefined;
  });

  it('должен обновлять массив дочерних элементов', () => {
    const child1 = new TestComponent({ text: '1' });
    const child2 = new TestComponent({ text: '2' });
    const parent = new TestComponent({
      text: 'test',
      list: [child1, child2],
    });

    expect(Array.isArray(parent.children.list)).to.be.true;
    expect(parent.children.list?.length).to.equal(2);
  });

  it('должен сохранять существующие children при вызове setProps только для данных', () => {
    const child = new TestComponent({ text: 'child' });
    const parent = new TestComponent({
      text: 'old',
      child: child,
    });

    parent.setProps({ text: 'new' });
    expect(parent.props.text).to.equal('new');
    expect(parent.children.child).to.equal(child);
  });
});

describe('Block & Store Connect', () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    store.clean();
  });

  it('Block должен вызывать render при изменении пропсов через setProps', () => {
    const block = new TestComponent({ text: 'old' });
    const spy = sandbox.spy(block, 'render');

    block.setProps({ text: 'new' });

    expect(spy.calledOnce).to.be.true;
    expect(block.props.text).to.equal('new');
  });

  it('Connect должен передавать данные из Store в компонент', () => {
    const withUser = connect(TestComponent, (state) => ({
      text: state.user?.first_name,
    }));
    const block = new withUser({});
    store.set({ user: { first_name: 'Alice', id: 1 } });
    expect(block.props.text).to.equal('Alice');
    expect(block.getContent()?.textContent).to.equal('Alice');
  });

  it('Компонент должен обновляться при изменении Store', () => {
    const withUser = connect(TestComponent, (state) => ({
      text: state.user?.first_name,
    }));
    const block = new withUser({});
    store.set({ user: { first_name: 'Bob', id: 2 } });
    expect(block.props.text).to.equal('Bob');
    expect(block.getContent()?.textContent).to.equal('Bob');
  });
});
