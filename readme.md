# MessengerApp

Небольшой фронтенд-проект в рамках Sprint_2 на Vite + TypeScript.
Компоненты переведены на архитектуру Block, а также были добавлены валидации форм на события submit и blur.
Сборка шаблонов осуществляется с помощью класса Teplator, который сразу возращает dom элемент, и для элементов в шаблоне может принимать как dom элементы, так и Block компоненты.

Проект на Netlify https://delightful-praline-d9d196.netlify.app/

Страницы:

[Профиль: /profile](https://delightful-praline-d9d196.netlify.app/profile)

[Изменение пароля: /changepass](https://delightful-praline-d9d196.netlify.app/changepass)

[Изменение профиля: /edit](https://delightful-praline-d9d196.netlify.app/edit)

[Логин: /login](https://delightful-praline-d9d196.netlify.app/login)

[Регистрация: /registration](https://delightful-praline-d9d196.netlify.app/registration)

[Загрузка аватара: /AvatarUpload](https://delightful-praline-d9d196.netlify.app/AvatarUpload)

[Ошибка 500 /500](https://delightful-praline-d9d196.netlify.app/500)

[Ошибка 404 /500](https://delightful-praline-d9d196.netlify.app/dsadsads)

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
