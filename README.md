# Веб-приложение Messenger v1.2

## О чем приложение?
Веб-приложение Messenger - это интуитивно понятный мессенджер, который обеспечивает мгновенное общение и обмен сообщениями между пользователями. С моим приложением вы сможете легко подключиться с друзьями, семьей или коллегами, в любой точке мира. С Messenger вы всегда будете в курсе последних обновлений успешно доставленных сообщений и сможете наслаждаться отличной производительностью и безопасностью ваших личных данных. Общайтесь где угодно и когда угодно с помощью Messenger!

## Дизайн
Сслыка на макет: https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1&mode=dev

## Ход разработки
Sprint 1: https://github.com/DenisEvgenev/messenger/tree/sprint_1
Sprint 2: https://github.com/DenisEvgenev/messenger/tree/sprint_2

## Используемые технологии
Handlebars, SCSS, Typescript
Компонентный подход реализован в файле Block.ts - src/core/Block.ts

## Установка
Для начала необходимо склонировать репозиторий: `git clone https://github.com/DenisEvgenev/messenger.git`
Переходим в папку с проектом: `cd messenger`
И устанавлием все необходимые для работы пакеты: `npm install`

Запуск локально версии для разработчика: `npm run dev`

Сборка и запуск на сервере: `npm run start`

Если нужна просто сборка: `npm run build`

Запустить stylelint с фиксом `npm run lint:scss` 

## Входная точка
Если запустили локально: http://localhost:3000/
Netlify ссылка с деплоем: https://dreamy-vacherin-aceb03.netlify.app/
