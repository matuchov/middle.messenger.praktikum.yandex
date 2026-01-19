export const ChatMessageTemplate = `<div class="chat__message {{ messageType }}">
  <div class="chat__message__author">{{ author }}</div>
  <p>{{ messageText }}</p>
  <span class="chat__message-time">{{ time }}</span>
</div>`;
