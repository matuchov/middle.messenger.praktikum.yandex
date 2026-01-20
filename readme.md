# MessengerApp

Небольшой фронтенд-проект в рамках Sprint_4 на Vite + TypeScript.
Компоненты переведены на архитектуру Block, а также были добавлены валидации форм на события submit и blur.
Подключено ya-praktikum.tech/api/v2/
Сборка шаблонов осуществляется с помощью класса Teplator, который сразу возращает dom элемент, и для элементов в шаблоне может принимать как dom элементы, так и Block компоненты.

В рамках 4 спринта добавлены библиотекм
Стек технологий
Mocha — тестовый фреймворк для запуска тестов в Node.js.
Chai — библиотека утверждений (assertions), использующая expect стиль.
Sinon — инструмент для создания шпионов (spies), заглушек (stubs) и подмены сетевых запросов (FakeServer).
JSDOM — эмуляция среды браузера в Node.js для тестирования DOM-компонентов.

Для поддержания чистоты кода в репозитории используются Husky и Git Hooks. При каждой попытке создания коммита (git commit) автоматически запускается цепочка проверок.
Предварительные проверки (Pre-commit hook)
Если хотя бы одна из этих проверок завершится ошибкой, коммит будет заблокирован до исправления:
TypeScript Check (tsc --noEmit): Проверка всего проекта на отсутствие ошибок типизации.
Linting (eslint): Проверка соблюдения правил написания кода (стиль, неиспользуемые переменные и т.д.).
Unit Tests (mocha): Запуск тестов, чтобы убедиться, что новые изменения не сломали существующий функционал.

Проект на Netlify https://delightful-praline-d9d196.netlify.app/

Страницы:

[Профиль: /settings](https://delightful-praline-d9d196.netlify.app/settings)

[Логин: /](https://delightful-praline-d9d196.netlify.app/)

[Регистрация: /sing-up](https://delightful-praline-d9d196.netlify.app/sing-up)

[Загрузка аватара: /AvatarUpload](https://delightful-praline-d9d196.netlify.app/AvatarUpload)

[Ошибка 404 /any](https://delightful-praline-d9d196.netlify.app/dsadsads)

## Быстрый старт

Установите зависимости и запустите дев-сервер:

```bash
npm install
npm run dev
```

Сборка production:

```bash
npm run build

```

Запуск production:

```bash
npm run start

```

Запуск тестов :

```bash
npm run test

```

Запуск линтеров и проверка типов:

```bash
npm run test

```
