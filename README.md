# tanstack-practise

Pet-проект для изучения экосистемы TanStack: Router, Query и Virtual.

## Стек

- React 19 + Vite
- [@tanstack/react-router](https://tanstack.com/router) — file-based routing, loaders, auth guards, breadcrumbs
- [@tanstack/react-query](https://tanstack.com/query) — серверное состояние, кеш, мутации
- [@tanstack/react-virtual](https://tanstack.com/virtual) — виртуализация списков
- Tailwind CSS 4
- json-server — mock API для `/users`, `/posts`, `/notifications`

## Запуск

```bash
# установка зависимостей
yarn

# mock API (порт 8080)
yarn server

# dev-сервер (в отдельном терминале)
yarn dev
```

## Структура

```
src/
├── api/           # HTTP-клиент и API-функции
├── components/    # UI-компоненты
├── hooks/         # React Query хуки, auth
├── lib/           # QueryClient и прочие утилиты
├── routes/        # TanStack Router (file-based)
└── utils/         # auth helpers
```

## Демо-страницы

| Маршрут | Что изучается |
|---------|---------------|
| `/pokemon` | loader, nested routes |
| `/post` | queryOptions, invalidate/cancel |
| `/users` | pagination, mutations, cache updates |
| `/virtual` | useVirtualizer |
| `/steps` | search params, route masks |
| `/profile`, `/dashboard` | auth guards, useBlocker |
| `/layouts/*` | layout routes, pathless folders |

## Скрипты

- `yarn dev` — dev-сервер
- `yarn server` — json-server на `:8080`
- `yarn build` — production-сборка
- `yarn lint` — ESLint
