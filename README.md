This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
در این اپ engine ساده ولی تا حد امکان بهینه برای فرایند سرچ و فیلتر هم زمان روی تعداد زیادی داده که با استفاده از کتابخانه Faker.js تولید شده , پیاده سازی شده است.فرایند سرچ کردن با اندکی تاخیر بعد از اتمام تایپ کاربر(debouncing)صورت می گیرد و در نهایت نتیجه جستحو و فیلتر ها به صورت لیست محدودی برای جلوگیری از  باندل سایز زیاد اولیه نمایش داده می شود که البته با اسکرول بقیه داده ها در معرض نمایش کاربر قرار میگیرد .