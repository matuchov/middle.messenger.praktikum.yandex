import { Avatar } from '@/shared/Avatar';
import { Profile } from '@/pages/Profile';
import { Auth } from '@/pages/Auth';
import { ChatPage } from '@/pages/ChatPage';
import { AvatarUpload } from '@/pages/AvatarUpload';
import { ErrorPage } from '../pages/ErrorPage';
import { Block } from './utils/Block';

const routes: Record<string, () => string> = {
  '/': () => ChatPage(),
  '/profile': () => Profile({ page: 'default' }),
  '/changepass': () => Profile({ page: 'changepass' }),
  '/edit': () => Profile({ page: 'edit' }),
  '/login': () => Auth({ page: 'login' }),
  '/registration': () => Auth({ page: 'registration' }),
  '/AvatarUpload': () => AvatarUpload(),
  '/500': () => ErrorPage({ error: '500' }),
};

function handleRoute() {
  let el;
  const path = window.location.pathname;

  if (routes[path]) {
    el = routes[path]();
  } else {
    el = ErrorPage({ error: '404' });
  }

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = el;
}

window.addEventListener('load', handleRoute);

type TProps = { text: string };

class Testblock extends Block<TProps> {
  constructor(props: TProps) {
    super(props, 'button');
  }

  render() {
    return `<div>${this.props.text}</div>`;
  }
}

const block = new Testblock({ text: 'ds' });

const el = document.createElement('div');

el.innerHTML = `<div class="sidebar__chatlist-row">
  {{{ Avatar }}} <div>
  {{{ Avatar2 }}} </div>
  <div class="sidebar__chatlist-info_row">
    <div class="sidebar__chatlist-text {{sds}}">
      <div class="sidebar__chatlist-name">{{ name }}</div>
      <div class="sidebar__chatlist-lastmessage">{{ messageText }}</div>
    </div>
    <div class="sidebar__chatlist-info">
      <div class="sidebar__chatlist-time">{{ time }}</div>
      <div class="sidebar__chatlist-counter">{{ counter }}</div>
    </div>
  </div>
</div>`;

const result: Record<string, ((arg: HTMLElement) => void) | ((arg: string) => void)> = {};

function traverseAllNodes(node: HTMLElement) {
  const triple = /\{\{\{([^{}]+)\}\}\}/g;
  const double = /(?<!\{)\{\{([^{}]+)\}\}(?!\})/g;
  const clear = /[^a-zA-Z0-9]/g;
  if (node.nodeType === Node.ELEMENT_NODE) {
    for (const attr of node.attributes) {
      const { value } = attr;
      console.log(attr.name, '=', attr.value);
      if (value.match(double)) {
        result[value.replace(clear, '')] = (attrValue: string) => {
          attr.value = attr.value.replace(/\{\{(.*?)\}\}/g, attrValue);
        };
      }
    }
  }
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    if (text && typeof text === 'string') {
      if (text.match(triple)) {
        console.log(node);
        result[text.match(/\{\{(.*?)\}\}/)[1]] = (element: HTMLElement) => {
          node.replaceWith(element);
        };
      } else if (text.match(double)) {
        result[text.replace(clear, '')] = (value: string) => {
          node.textContent = value;
        };
      }
    }
  }
  for (const child of node.childNodes) {
    traverseAllNodes(child);
  }
}

traverseAllNodes(el);

console.log(result);

result.Avatar(document.createElement('Avatar'));
result.sidebarchatlisttextsds('new name');

console.log(el);

document.body.append(block.getContent()!);
