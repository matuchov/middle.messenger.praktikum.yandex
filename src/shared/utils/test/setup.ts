import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>', {
  url: 'http://localhost',
});

global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
global.DocumentFragment = dom.window.DocumentFragment;
global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;
