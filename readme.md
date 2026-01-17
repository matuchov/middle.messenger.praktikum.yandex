# MessengerApp

Небольшой фронтенд-проект в рамках Sprint_3 на Vite + TypeScript.
Компоненты переведены на архитектуру Block, а также были добавлены валидации форм на события submit и blur.
Подключено ya-praktikum.tech/api/v2/
Сборка шаблонов осуществляется с помощью класса Teplator, который сразу возращает dom элемент, и для элементов в шаблоне может принимать как dom элементы, так и Block компоненты.

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

Запуск линтеров и проверка типов:

```bash
npm run test

```
