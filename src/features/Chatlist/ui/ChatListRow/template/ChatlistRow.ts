export const chatListRowTemplate = `<div class="sidebar__chatlist-row">
  {{{ Avatar }}}
  <div class="sidebar__chatlist-info_row">
    <div class="sidebar__chatlist-text">
      <div class="sidebar__chatlist-name">{{ name }}</div>
      <div class="sidebar__chatlist-lastmessage">{{ messageText }}</div>
    </div>
    <div class="sidebar__chatlist-info">
      <div class="sidebar__chatlist-time">{{ time }}</div>
      <div class="sidebar__chatlist-counter">{{ counter }}</div>
    </div>
  </div>
</div>`;
