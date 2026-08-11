# سفره‌ی من

نسخه‌ی فعلی به‌صورت یک سایت استاتیک روی GitHub Pages ساخته می‌شود.

## ساختار

- `app.jsx` — سورس React و JSX
- `index.html` — پوسته‌ی HTML
- `styles.css` — استایل‌های اختصاصی
- `tailwind.input.css` — ورودی Tailwind
- `api-config.js` — فقط URL عمومی Cloudflare Worker
- `package.json` — وابستگی‌های build
- `.github/workflows/pages.yml` — build و deploy خودکار

React، ReactDOM، JSX و Tailwind در زمان build روی GitHub آماده می‌شوند. مرورگر کاربر دیگر برای بالا آمدن سایت به CDNهای React/Babel/Tailwind وابسته نیست.

## OpenAI

کلید OpenAI نباید در GitHub یا frontend قرار بگیرد.

در Cloudflare Worker یک Secret با نام زیر نگه‌داری شود:

`OPENAI_API_KEY`

و Worker باید درخواست‌های `POST` از سایت را به OpenAI منتقل کند.

URL فعلی Worker:

`https://sofreyeman.mhmmdkarimnejad.workers.dev`

## GitHub Pages

در Repository به مسیر:

Settings → Pages → Build and deployment → Source

برو و `GitHub Actions` را انتخاب کن.

پس از push به `main`، workflow سایت را build و deploy می‌کند.

## امنیت

`api-config.js` حاوی API key نیست. API key فقط روی Cloudflare Worker نگه‌داری می‌شود.
