import '../../shared/utils/test/setup';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Block, type defaultProps } from './Block';

interface testProps extends defaultProps {
  text: string;
}

describe('Block Base Class', () => {
  class TestComponent extends Block<testProps> {
    render() {
      const p = document.createElement('p');
      p.textContent = this.props.text;
      return p;
    }
  }

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
});
