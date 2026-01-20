/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from './router';
import { Block } from '../../../app/utils/Block/Block';
import { describe, it } from 'mocha';
import type { defaultProps } from '../../../app/utils/Block/Block';

class TestBlock extends Block<defaultProps> {
  render() {
    const div = document.createElement('div');
    div.textContent = 'Test Content';
    return div;
  }
}

class ErrorBlock extends Block<defaultProps> {
  render() {
    const div = document.createElement('div');
    div.textContent = '404';
    return div;
  }
}

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    (Router as any).__instance = null;
    router = new Router('#app');
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('Должен возвращать сам себя', () => {
    const router2 = new Router('#app');
    expect(router).to.equal(router2);
  });

  it('Переход на новую страницу по методу go()', () => {
    router.use('/test', TestBlock).start();
    router.go('/test');
    expect(window.location.pathname).to.equal('/test');
  });

  it('Должен рендерить компонент при переходе', () => {
    router.use('/test', TestBlock).start();
    router.go('/test');
    const app = document.querySelector('#app');
    expect(app?.textContent).to.equal('Test Content');
  });

  it('Работает цепочка use', () => {
    const result = router.use('/', TestBlock);
    expect(result).to.equal(router);
  });

  it('Работает метод back() у history', () => {
    const spy = sinon.spy(window.history, 'back');
    router.back();
    expect(spy.calledOnce).to.be.true;
    spy.restore();
  });

  it('Работает метод forward() у history', () => {
    const spy = sinon.spy(window.history, 'forward');
    router.forward();
    expect(spy.calledOnce).to.be.true;
    spy.restore();
  });

  it('Выбрасывает страницу 404', () => {
    router.use('404', ErrorBlock).start();
    router.go('/any');
    const app = document.querySelector('#app');
    expect(app?.textContent).to.equal('404');
  });
});
