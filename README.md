# 🛍️ Marketplace Monorepo

**Демо (клиент):** [https://marketplace-monorepo-client.vercel.app](https://marketplace-monorepo-client.vercel.app)  
**API (сервер):** [https://marketplace-monorepo.onrender.com](https://marketplace-monorepo.onrender.com)

---

## 📘 О проекте

**Marketplace Monorepo** — тестовое задание.  
Моно-репозиторий содержит **frontend** (`apps/client`) и **backend** (`apps/server`), реализующий базовый маркетплейс с динамической подгрузкой товаров, поддержкой глобальной валюты и переключаемой темой.  

Этот `README` подготовлен так, чтобы вам было **максимально удобно** быстро запустить проект и понять его структуру.

---

## ✨ Ключевые фичи

- 🌀 Динамическая лента продуктов с бесконечной подгрузкой (infinite scroll)  
- 💱 Поддержка глобальной валюты (конвертация цен на лету через `easy-currencies`)  
- 🌓 Смена темы (светлая / тёмная) с сохранением состояния  
- 📦 Детальная страница товара при клике на карточку  
- 🔥 Firestore в качестве базы данных (через `firebase-admin`)  
- 🧩 Turborepo + pnpm workspaces — единое управление монорепозиторием  

> ⚠️ **Примечание:** при первом обращении к серверу на бесплатных провайдерах (Render и т.п.) возможен *cold start* — небольшая задержка перед загрузкой данных. Это нормальное поведение хостинга.

---

## 🧠 Технологии

### Моно-репозиторий:
- Turborepo  
- pnpm workspaces  

### Клиент:
- React  
- TypeScript  
- Vite  
- Tailwind CSS  
- React Router  
- react-infinite-scroll-component  
- date-fns  
- lucide-react  

### Сервер:
- Node.js + Express (TypeScript)  
- dotenv  
- firebase-admin (Firestore)  
- easy-currencies  
- cors  

---

## ⚙️ Быстрый старт (локально)

### Требования
- Node.js **v18+** (рекомендуется)
- pnpm

---

> ⚠️ **Примечание:** без .env файлов запросы не будут корректно отправляться на сервер!.

### Установка

```bash
git clone <repo-url>
cd marketplace-monorepo
pnpm install



### Запуск (все сразу) - запускает client и server параллельно через Turborepo.
pnpm dev
# или
pnpm run dev


# Сборка и Preview
pnpm clean
pnpm build
pnpm start:all
```

---


## Переменные окружения — примеры

# Сервер — .server.env
```bash
# Firebase Admin SDK
FIREBASE_PROJECT_ID=markeplace-monorepo
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@markeplace-monorepo.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCEXbsVzjlXS3EG\ncZyKtuG0Ra0zFG+HgfqLf+OnCmS21rbpWuzhXpLwEuGnhWA7nYl37EiNspdPzhnI\nu0tTy+IXBfZWhml8PZH3DIqT/ChFcMzYGS0TP40ApolwJHJTnHForjv30A5f5VRE\nk0rFuL5wkSFo1C0bK0fvi1srPUYXP9y9JVeMr6/LqowfBfC9z95v3IbFgV6iLvWF\nz2vzg/N48uzPHtIUOqEjfSU2WEVJ5kjgfpRikKc24RJr0LFkJ5+eKr4Ah1WYsA6r\nqmUe7ZKfyzbPMKmGFxJ+Eh8uqGXZ2IlohO4PPnp9xUPAJ9UMIFGQ6X/nDmtriE7k\nBxVBgGWtAgMBAAECggEAAyaYBXTbOJC7KAQcTdD8nmXqMYUTAo69gASTTq6YpyGF\nSRi4+sRdiwloBazPFZwyYYBmWbkekO++/WA38s6vmwyxSG36pNJyXwcVZWBjNQPy\nXFJ9GDAzEwjjzJ+ReRwINw2ur79sGCxFTTyUUxCKt/M8cFpcmID3PWR7zxOuT29U\n9ikWtm8Sm4DkiOKkh4x2qGwa91QfsWIBMf28L/3la/9HXA+CoFahAiFe2sJ+C1eh\nZWuyqme0aV/xHw+XC48l5bLWhoRLS4GKSML5y4h7dpexi1SQvO05GhnOvlIatklD\nB6fNAbDM1vNu8vVjstU9pb1nRc34wmce3rYWMij1AQKBgQC6OdTcMCcghaoEI2Cj\n9IgCKXWGDRBMZgd/vth1xDPFMUwvdHt8LNu17PyFQK5mdUvfu+evS+0V6RzBz45c\ngCSBWvG4hUuNvxWhYK3yIsUAgsWY5VQ4gOiqCiVjl+/Kz3QuxPmmLfBYS/sVgObC\nBN/4r+xaEXbBFUOMz4HY5FLDtQKBgQC19dmHQVPgPt0UKbq6tBzU6L0XyaheyakB\nl+DxTnqdjxXHTwIS+YtVbUAikFr4ISDah4cgegY5KutKNb4MKzN0HQfA/g2I3g+h\nbZGw7qgUPAL4AH1AM3bvyMfV0vjDrIeVkLM2kZVEXmF/5+VlsxOh6F15VBNOYMp0\n+sNyJi3FGQKBgEK5mfVTI5HZkrNs4aGdamYr6LohUCevnxw8i16W8F3FbiDKwbwa\nbpbe1RQBuvtnJ8qAj2EV+VsSbYVcEww9tdbLeTS+PfYJ83whIfJSVvf540cHVIfy\nWGsku4TV2ct3TY+8cB8E8ssQXmS0DPqTuJRopG0ZOM2yCsQXTdUi6izJAoGAO1dT\nOr3+WaqGtPWq9QqaQIEqceCNLWR83o0mieu7JzkrtBU7Ku8BFroLaXpEgJllOn9q\nfRfugaRSmaAPO663GA4Dolf4GAO7ezzdf6NFY1vy5+hY8KAYELkdGsmz4TSZ/xfy\nqkAuOt7A01LQSCtvoqTCHzhhF3WPcTj6lnaHBLkCgYEAjSaYPNRGOuaV+svN1n8S\nJ90haZLPI/ZcTe8a/cshToygcGpDqAsrKAq3fjFDpTvleYje+DqBq1LVmIF71gao\nBuKFVDUIcb6+pMsH1+9HeSnBnFhjPCSsvZ0sIjtav5/Gsd01JrP1GdPeBt8N9vp8\n4Z8uh2neyHB4CczGuko/OxA=\n-----END PRIVATE KEY-----\n"
PORT=4000

```


# Клиент — .env.development / .env.production


```bash
# .env.development
VITE_SERVER_API_URL=http://localhost:4000
VITE_SERVER_API_ENDPOINT=/api

# .env.production
VITE_SERVER_API_URL=https://marketplace-monorepo.onrender.com
VITE_SERVER_API_ENDPOINT=/api
```

---


## Скрипты
```json
{
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "clean": "pnpm run clean:turbo && pnpm run clean:ts && pnpm run clean:dist",
    "clean:turbo": "rimraf apps/*/.turbo shared-packages/.turbo",
    "clean:ts": "find . -name \"*.tsbuildinfo\" -delete",
    "clean:dist": "rimraf apps/*/dist shared-packages/dist",
    "build:server": "turbo run build --filter=@marketplace/shared-packages --filter=marketplace-server",
    "start:server": "pnpm --filter marketplace-server start",
    "start:all": "pnpm --filter marketplace-server start & pnpm --filter marketplace-client preview"
  }
}
```

---

## 🧭 API — основные endpoint’ы

### Базовый URL (production):
https://marketplace-monorepo.onrender.com/api

### Локально:
http://localhost:4000/api



# GET /api/products
### Описание: получить список продуктов.

### Обязательные query-параметры:

```bash
- page — номер страницы (например: 1)
- size — размер страницы (0–100)
- currency — желаемая валюта (например: USD)
```

### Пример запроса:
```bash
curl "http://localhost:4000/api/products?page=1&size=20&currency=USD"
```

### Пример ответа:

```json
{
  "items": [
    {
      "id": "eL1oanduEZLbEMIMpK6z",
      "photoURL": "....",
      "name": "MacBook Air M2",
      "price": 100521.5,
      "currency": "USD",
      "in_stock": 40,
      "nearest_delivery": "2025-11-12T22:40:35.651Z",
      "rating": 3.56
    },
    {
      "id": "KiChtFcTdjmuX16NTE4u",
      "photoURL": "...",
      "name": "Apple Watch Series 8 GPS + Cellular (45mm)",
      "price": 33215.8,
      "currency": "USD",
      "in_stock": 52,
      "nearest_delivery": "2025-11-12T01:34:48.096Z",
      "rating": 1.3
    },
	...
  ],
  "size": 20,
  "nextPage": 2,
  "total": 330
}
```

---


# GET /api/products/:id

### Описание: получить подробную информацию о товаре по id.

### Пример запроса:


### Обязательные query-параметры:
```bash
- currency — желаемая валюта (например: USD)
```



```bash
curl "http://localhost:4000/api/products/eL1oanduEZLbEMIMpK6z?currency=USD"
```

### Пример ответа:

```json
{
  "id": "eL1oanduEZLbEMIMpK6z",
  "photoURL": "....",
  "name": "MacBook Air M2",
  "attributes": [
    "Color: Space Gray",
    "Storage: 256GB SSD",
    "RAM: 8GB Unified Memory",
    "Processor: Apple M2 chip",
    "Display: 13.6-inch Liquid Retina",
    "Resolution: 2560x1664",
    "Weight: 1.24 kg",
    "Ports: 2x Thunderbolt / USB 4, MagSafe 3",
    "Material: Aluminum"
  ],
  "offers": [
    {
      "id": "1-2",
      "price": 100521.5,
      "currency": "USD",
      "sellerName": "Amazon Global",
      "rating": 2.7,
      "in_stock": 40,
      "nearest_delivery": "2025-11-12T22:40:35.651Z"
    },
	...
  ]
}
```
