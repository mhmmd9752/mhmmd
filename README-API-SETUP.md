# اتصال امن OpenAI برای «سفره‌ی من»

این نسخه کلید OpenAI را از frontend حذف کرده است. کلید باید فقط به‌عنوان Secret روی Cloudflare Worker ذخیره شود.

## 1) Frontend

در `api-config.js` این خط را با آدرس Worker خودت عوض کن:

```js
window.AI_API_URL = "https://YOUR-WORKER.workers.dev";
```

## 2) Cloudflare Worker

فایل‌های `worker.js` و `wrangler.jsonc` را در یک پوشه قرار بده. در `wrangler.jsonc` مقدار `ALLOWED_ORIGIN` را با دامنه واقعی سایتت عوض کن، مثلاً:

```json
"ALLOWED_ORIGIN": "https://example.ir"
```

سپس:

```bash
npm install -g wrangler
wrangler login
wrangler secret put OPENAI_API_KEY
wrangler deploy
```

وقتی دستور `wrangler secret put OPENAI_API_KEY` اجرا شد، کلید `sk-...` را در prompt وارد کن؛ آن را داخل فایل پروژه ننویس.

## 3) GitHub Pages

فایل‌های `index.html`, `app.jsx`, `styles.css`, `api-config.js`, `icon.svg`, و `manifest.json` را در repository قرار بده.

## نکته امنیتی

`api-config.js` فقط URL عمومی Worker را دارد؛ API key در آن نیست. API key در Cloudflare Secret با نام `OPENAI_API_KEY` قرار می‌گیرد.
