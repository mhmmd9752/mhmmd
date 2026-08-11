import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";


/* ------------------------------------------------------------------ */
/*  آیکون‌های SVG ساده (بدون وابستگی خارجی)                              */
/* ------------------------------------------------------------------ */
const Icon = ({ path, size = 18, className = "", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {path}
  </svg>
);
const IFlame = (p) => <Icon {...p} path={<path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c0-1.5-1-2-1-3.5 2 1 3 3.5 3 6a5 5 0 0 1-10 0c0-4 3-6 5-11.5Z"/>} />;
const ISearch = (p) => <Icon {...p} path={<><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>} />;
const IPlus = (p) => <Icon {...p} path={<><path d="M12 5v14"/><path d="M5 12h14"/></>} />;
const IX = (p) => <Icon {...p} path={<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>} />;
const ICamera = (p) => <Icon {...p} path={<><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3.5"/></>} />;
const IBarcode = (p) => <Icon {...p} path={<><path d="M3 5v14"/><path d="M7 5v14"/><path d="M11 5v14"/><path d="M15 5v10"/><path d="M19 5v14"/><path d="M21 17v2"/></>} />;
const IChevronRight = (p) => <Icon {...p} path={<path d="m9 18 6-6-6-6"/>} />;
const IChevronLeft = (p) => <Icon {...p} path={<path d="m15 18-6-6 6-6"/>} />;
const IChevronDown = (p) => <Icon {...p} path={<path d="m6 9 6 6 6-6"/>} />;
const ICheck = (p) => <Icon {...p} path={<path d="M20 6 9 17l-5-5"/>} />;
const ILoader = (p) => <Icon {...p} path={<path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>} />;
const ITrash = (p) => <Icon {...p} path={<><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>} />;
const ISettings = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></>} />;
const IUtensils = (p) => <Icon {...p} path={<><path d="M3 2v7c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V2"/><path d="M6 2v20"/><path d="M18 2c-2 2-3 5-3 8 0 2 1 3 3 3s3-1 3-3c0-3-1-6-3-8Z" transform="translate(0,0)"/><path d="M18 13v9"/></>} />;
const IImagePlus = (p) => <Icon {...p} path={<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></>} />;
const IAlert = (p) => <Icon {...p} path={<><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></>} />;
const IStar = (p) => <Icon {...p} fill="currentColor" path={<path d="m12 2 3.1 6.6 7.2.9-5.3 5 1.4 7.2-6.4-3.6-6.4 3.6 1.4-7.2-5.3-5 7.2-.9L12 2Z"/>} />;
const IUndo = (p) => <Icon {...p} path={<><path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-1"/></>} />;
const ITrending = (p) => <Icon {...p} path={<><path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/></>} />;
const ISunrise = (p) => <Icon {...p} path={<><path d="M12 2v6"/><path d="m4.2 10.2 1.4 1.4"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.8 11.6-1.4 1.4"/><path d="M6 18a6 6 0 0 1 12 0"/><path d="M2 22h20"/></>} />;
const ISun = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>} />;
const IMoon = (p) => <Icon {...p} path={<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>} />;
const ICookie = (p) => <Icon {...p} path={<><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z"/><path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01"/></>} />;
const ICopy = (p) => <Icon {...p} path={<><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>} />;
const IDownload = (p) => <Icon {...p} path={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></>} />;
const IUpload = (p) => <Icon {...p} path={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></>} />;
const IScale = (p) => <Icon {...p} path={<><path d="M12 3v18"/><path d="M5 7h14"/><path d="M3 7l2.5 6a2.5 2.5 0 0 0 5 0L13 7"/><path d="M11 7l2.5 6a2.5 2.5 0 0 0 5 0L21 7"/></>} />;
const IBookmark = (p) => <Icon {...p} path={<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/>} />;
const IMessage = (p) => <Icon {...p} path={<><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.2-.6L4 20l1.6-3.7A7.3 7.3 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5h.5A7.5 7.5 0 0 1 20 11.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></>} />;

const AI_API_URL = String(window.AI_API_URL || "").replace(/\/$/, "");

async function callAI(payload) {
  if (!AI_API_URL || AI_API_URL.includes("YOUR-WORKER")) {
    throw new Error("AI_API_URL is not configured");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 60000);

  try {
    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const raw = await response.text();
    let data = {};
    try { data = raw ? JSON.parse(raw) : {}; } catch (_) {}

    if (!response.ok) {
      throw new Error(data.error || `network ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("زمان پاسخ‌گویی هوش مصنوعی بیش از حد طول کشید.");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

/* ------------------------------------------------------------------ */
/*  بانک غذای ایرانی — مقادیر به‌ازای هر ۱۰۰ گرم                        */
/* ------------------------------------------------------------------ */

const CATS = [
  { id: "polo", label: "پلو و چلو", cats: ["polo"] },
  { id: "khoresh", label: "خورش و خورشت", cats: ["khoresh"] },
  { id: "kabab", label: "کباب و گوشت", cats: ["kabab"] },
  { id: "nan", label: "نان و صبحانه", cats: ["nan"] },
  { id: "labaniat", label: "لبنیات", cats: ["labaniat"] },
  { id: "ajil-snack", label: "آجیل و اسنک", cats: ["ajil", "snack-shoor"] },
  { id: "shirini", label: "شیرینی و دسر", cats: ["shirini"] },
  { id: "nooshidani", label: "نوشیدنی", cats: ["nooshidani"] },
  { id: "fastfood", label: "فست‌فود و کافه", cats: ["fastfood"] },
  { id: "sausage", label: "سوسیس و کالباس", cats: ["sausage"] },
  { id: "canned-condiment", label: "کنسرو، ترشی و سس", cats: ["canned", "condiment"] },
  { id: "fruit-veg", label: "میوه و سبزی", cats: ["fruit", "vegetable"] },
  { id: "grain", label: "غلات و حبوبات خام", cats: ["grain"] },
  { id: "supplement", label: "مکمل ورزشی", cats: ["supplement"] },
  { id: "sayer", label: "سایر", cats: ["sayer"] },
];

const FOOD_DB = [
  // پلو و چلو
  { id: "chelo", cat: "polo", name: "چلو (برنج سفید)", kcal: 205, protein: 4.3, carb: 44.6, fat: 0.6 },
  { id: "tahdig", cat: "polo", name: "ته‌دیگ برنج", kcal: 260, protein: 4.6, carb: 42.1, fat: 8.9 },
  { id: "baghali-polo", cat: "polo", name: "باقالی پلو (بی‌گوشت)", kcal: 195, protein: 6.1, carb: 37.4, fat: 2.8 },
  { id: "zereshk-polo", cat: "polo", name: "زرشک پلو", kcal: 215, protein: 4.5, carb: 46.2, fat: 1.4 },
  { id: "adas-polo", cat: "polo", name: "عدس پلو", kcal: 198, protein: 6.8, carb: 36.9, fat: 3.1 },
  { id: "loobia-polo", cat: "polo", name: "لوبیا پلو", kcal: 205, protein: 7.9, carb: 34.6, fat: 4.6 },
  { id: "tahchin", cat: "polo", name: "ته‌چین مرغ", kcal: 240, protein: 11, carb: 29, fat: 9.2 },
  { id: "chelo-gousht", cat: "polo", name: "چلو گوشت (خورشتی)", kcal: 236, protein: 12, carb: 27, fat: 8.7 },
  { id: "shirin-polo", cat: "polo", name: "شیرین پلو", kcal: 245, protein: 4.9, carb: 49.6, fat: 3.4 },
  { id: "kalam-polo", cat: "polo", name: "کلم پلو شیرازی", kcal: 210, protein: 6.3, carb: 33.8, fat: 6.9 },
  { id: "estanboli-polo", cat: "polo", name: "استانبولی پلو", kcal: 188, protein: 4.8, carb: 32.6, fat: 4.5 },
  { id: "morasa-polo", cat: "polo", name: "مرصع پلو", kcal: 255, protein: 5.6, carb: 48.3, fat: 4.9 },
  { id: "polo-sade", cat: "polo", name: "پلو ساده با کره", kcal: 228, protein: 4.2, carb: 44.9, fat: 3.6 },
  // خورش و خورشت
  { id: "ghormeh", cat: "khoresh", name: "قورمه سبزی", kcal: 158, protein: 10.5, carb: 8.4, fat: 9.6 },
  { id: "gheimeh", cat: "khoresh", name: "قیمه", kcal: 172, protein: 11.8, carb: 9.2, fat: 10.1 },
  { id: "fesenjan", cat: "khoresh", name: "خورش فسنجان", kcal: 210, protein: 9.8, carb: 12.5, fat: 14.8 },
  { id: "bademjan", cat: "khoresh", name: "خورش بادمجان", kcal: 145, protein: 7.6, carb: 8.9, fat: 9.2 },
  { id: "kashke-bademjan", cat: "khoresh", name: "کشک بادمجان", kcal: 168, protein: 5.9, carb: 11.4, fat: 11.8 },
  { id: "mirza", cat: "khoresh", name: "میرزا قاسمی", kcal: 132, protein: 4.1, carb: 9.6, fat: 8.9 },
  { id: "karafs", cat: "khoresh", name: "خورش کرفس", kcal: 138, protein: 8.9, carb: 7.6, fat: 8.1 },
  { id: "lapeh", cat: "khoresh", name: "خورش لپه", kcal: 150, protein: 9.1, carb: 14.2, fat: 6.8 },
  { id: "ash-reshteh", cat: "khoresh", name: "آش رشته", kcal: 98, protein: 4.2, carb: 15.1, fat: 2.4 },
  { id: "ash-doogh", cat: "khoresh", name: "آش دوغ", kcal: 76, protein: 3.6, carb: 9.8, fat: 2.6 },
  { id: "ash-jo", cat: "khoresh", name: "آش جو", kcal: 85, protein: 3.8, carb: 13.6, fat: 1.9 },
  { id: "dizi", cat: "khoresh", name: "دیزی (آبگوشت)", kcal: 155, protein: 11.2, carb: 10.8, fat: 7.4 },
  { id: "halim", cat: "khoresh", name: "حلیم بوقلمون", kcal: 145, protein: 8.9, carb: 17.2, fat: 4.6 },
  { id: "khorak-bamie", cat: "khoresh", name: "خورش بامیه", kcal: 120, protein: 6.8, carb: 9.4, fat: 6.5 },
  { id: "baghala-ghatogh", cat: "khoresh", name: "باقلا قاتق", kcal: 155, protein: 8.4, carb: 14.2, fat: 7.6 },
  // کباب و گوشت
  { id: "koobideh", cat: "kabab", name: "کباب کوبیده", kcal: 280, protein: 21.4, carb: 1.2, fat: 21 },
  { id: "jujeh", cat: "kabab", name: "جوجه کباب (بی‌پوست)", kcal: 189, protein: 27, carb: 0.8, fat: 8.2 },
  { id: "jujeh-skin", cat: "kabab", name: "جوجه کباب (با پوست)", kcal: 250, protein: 24, carb: 0.8, fat: 16.5 },
  { id: "barg", cat: "kabab", name: "کباب برگ", kcal: 260, protein: 24, carb: 0.5, fat: 17.5 },
  { id: "chenjeh", cat: "kabab", name: "کباب چنجه", kcal: 245, protein: 25.6, carb: 0.4, fat: 15.8 },
  { id: "kabab-torsh", cat: "kabab", name: "کباب ترش گیلانی", kcal: 220, protein: 22.8, carb: 3.4, fat: 13.2 },
  // مرغ — قسمت‌های مختلف × روش‌های پخت
  { id: "sine-morgh-abpaz", cat: "kabab", name: "سینه مرغ آب‌پز (بی‌پوست)", kcal: 165, protein: 31, carb: 0, fat: 3.6 },
  { id: "sine-morgh-bokharpaz", cat: "kabab", name: "سینه مرغ بخارپز", kcal: 150, protein: 30, carb: 0, fat: 2.8 },
  { id: "sine-morgh-sorkhshode", cat: "kabab", name: "سینه مرغ سرخ‌شده (بدون سوخاری)", kcal: 197, protein: 30, carb: 0, fat: 8 },
  { id: "sine-morgh-sookhari", cat: "kabab", name: "سینه مرغ سوخاری", kcal: 246, protein: 19, carb: 14, fat: 13.3 },
  { id: "file-morgh-abpaz", cat: "kabab", name: "فیله مرغ آب‌پز", kcal: 165, protein: 31, carb: 0, fat: 3.6 },
  { id: "file-morgh-sorkhshode", cat: "kabab", name: "فیله مرغ سرخ‌شده", kcal: 197, protein: 30, carb: 0, fat: 8 },
  { id: "file-morgh-sookhari", cat: "kabab", name: "فیله مرغ سوخاری (چیکن‌تندرز)", kcal: 279, protein: 17, carb: 15, fat: 18 },
  { id: "ran-morgh-bipoost-abpaz", cat: "kabab", name: "ران مرغ بی‌پوست آب‌پز", kcal: 177, protein: 24.6, carb: 0, fat: 8.2 },
  { id: "ran-morgh-papoost-abpaz", cat: "kabab", name: "ران مرغ با پوست آب‌پز", kcal: 216, protein: 26, carb: 0, fat: 11.4 },
  { id: "ran-morgh-kababi", cat: "kabab", name: "ران مرغ کبابی با پوست", kcal: 250, protein: 24, carb: 0.8, fat: 16.5 },
  { id: "ran-morgh-sorkhshode", cat: "kabab", name: "ران مرغ سرخ‌شده با پوست", kcal: 280, protein: 23, carb: 0, fat: 20 },
  { id: "ran-morgh-sookhari", cat: "kabab", name: "ران مرغ سوخاری", kcal: 263, protein: 19, carb: 11, fat: 16.6 },
  { id: "bal-morgh-abpaz", cat: "kabab", name: "بال مرغ آب‌پز", kcal: 203, protein: 30.5, carb: 0, fat: 8.1 },
  { id: "bal-morgh-sookhari", cat: "kabab", name: "بال مرغ سوخاری", kcal: 290, protein: 19, carb: 13, fat: 19 },
  { id: "morgh-kamel-kababi", cat: "kabab", name: "مرغ کامل کبابی با پوست", kcal: 239, protein: 27, carb: 0, fat: 14 },
  // گوشت قرمز — انواع پخت
  { id: "gooshte-charkhkarde-sorkhshode", cat: "kabab", name: "گوشت چرخ‌کرده گاو سرخ‌شده", kcal: 254, protein: 26, carb: 0, fat: 17 },
  { id: "gooshte-charkhkarde-abpaz", cat: "kabab", name: "گوشت چرخ‌کرده گاو آب‌پز", kcal: 215, protein: 26, carb: 0, fat: 11.5 },
  { id: "rasteh-gav-kababi", cat: "kabab", name: "راسته گاو کبابی/گریل", kcal: 201, protein: 29, carb: 0, fat: 9 },
  { id: "gooshte-gosfand-kababi", cat: "kabab", name: "گوشت گوسفند کبابی", kcal: 294, protein: 25, carb: 0, fat: 21 },
  { id: "gooshte-gosfand-abpaz", cat: "kabab", name: "خورشتی گوسفند آب‌پز", kcal: 250, protein: 26, carb: 0, fat: 16 },
  // ماهی و میگو — انواع پخت
  { id: "salmon-gerill", cat: "kabab", name: "ماهی سالمون گریل", kcal: 208, protein: 20, carb: 0, fat: 13 },
  { id: "salmon-abpaz", cat: "kabab", name: "ماهی سالمون آب‌پز", kcal: 182, protein: 20, carb: 0, fat: 11 },
  { id: "meygoo-abpaz", cat: "kabab", name: "میگوی آب‌پز", kcal: 99, protein: 21, carb: 0.2, fat: 1.4 },
  { id: "kotlet", cat: "kabab", name: "کتلت", kcal: 245, protein: 13.6, carb: 15.4, fat: 14.9 },
  { id: "kufteh", cat: "kabab", name: "کوفته تبریزی", kcal: 198, protein: 12.4, carb: 14.6, fat: 10.5 },
  { id: "kuku-sabzi", cat: "kabab", name: "کوکو سبزی", kcal: 192, protein: 9.4, carb: 8.1, fat: 13.6 },
  { id: "kuku-sibzamini", cat: "kabab", name: "کوکو سیب‌زمینی", kcal: 210, protein: 6.8, carb: 21.4, fat: 11.7 },
  { id: "dolme", cat: "kabab", name: "دلمه برگ مو", kcal: 128, protein: 3.4, carb: 18.6, fat: 4.7 },
  { id: "jigar", cat: "kabab", name: "جگر کبابی", kcal: 175, protein: 24.6, carb: 3.1, fat: 6.9 },
  { id: "mahi", cat: "kabab", name: "ماهی قزل‌آلا کبابی", kcal: 208, protein: 22.9, carb: 0, fat: 12.5 },
  { id: "mahi-sefid", cat: "kabab", name: "ماهی سفید سرخ‌شده", kcal: 245, protein: 20.1, carb: 4.2, fat: 16.8 },
  { id: "meygoo", cat: "kabab", name: "میگوی سرخ‌شده", kcal: 210, protein: 19.8, carb: 7.5, fat: 11.4 },
  { id: "falafel", cat: "kabab", name: "فلافل", kcal: 333, protein: 13.3, carb: 31.8, fat: 17.8 },
  { id: "joje-baalpar", cat: "kabab", name: "بال کبابی مرغ", kcal: 215, protein: 23.5, carb: 0.6, fat: 13.1 },
  { id: "gardan-kabab", cat: "kabab", name: "کباب گردن", kcal: 295, protein: 22.8, carb: 0.5, fat: 22.4 },
  // نان و صبحانه
  { id: "sangak", cat: "nan", name: "نان سنگک", kcal: 252, protein: 8.7, carb: 50.1, fat: 1.5 },
  { id: "barbari", cat: "nan", name: "نان بربری", kcal: 268, protein: 8.1, carb: 53.4, fat: 2.2 },
  { id: "lavash", cat: "nan", name: "نان لواش", kcal: 275, protein: 9.1, carb: 55.8, fat: 1.8 },
  { id: "taftoon", cat: "nan", name: "نان تافتون", kcal: 260, protein: 8.4, carb: 52.6, fat: 1.9 },
  { id: "nan-baguette", cat: "nan", name: "نان باگت", kcal: 270, protein: 9, carb: 53, fat: 2.5 },
  { id: "nan-tost", cat: "nan", name: "نان تست", kcal: 265, protein: 8.5, carb: 49, fat: 3.5 },
  { id: "tokhme-morgh", cat: "nan", name: "تخم‌مرغ آب‌پز", kcal: 155, protein: 13, carb: 1.1, fat: 11 },
  { id: "omlet", cat: "nan", name: "املت", kcal: 190, protein: 11.8, carb: 2.4, fat: 15.1 },
  { id: "nimru", cat: "nan", name: "نیمرو", kcal: 196, protein: 12.5, carb: 1.2, fat: 15.8 },
  { id: "adasi", cat: "nan", name: "عدسی صبحانه", kcal: 116, protein: 7.8, carb: 18, fat: 1.5 },
  { id: "halva-ardei", cat: "nan", name: "حلوا ارده", kcal: 485, protein: 7.5, carb: 44, fat: 32 },
  { id: "asal", cat: "nan", name: "عسل", kcal: 304, protein: 0.3, carb: 82, fat: 0 },
  { id: "morabba", cat: "nan", name: "مربای آلبالو", kcal: 250, protein: 0.4, carb: 63, fat: 0.1 },
  { id: "arde-shire", cat: "nan", name: "ارده و شیره خرما", kcal: 420, protein: 9, carb: 52, fat: 20 },
  { id: "mooseli", cat: "nan", name: "موزلی/گرانولا", kcal: 380, protein: 10, carb: 64, fat: 9 },
  { id: "cornflakes", cat: "nan", name: "کورن‌فلکس", kcal: 357, protein: 7.5, carb: 84, fat: 0.9 },
  // لبنیات
  { id: "shir-kamel", cat: "labaniat", name: "شیر کامل (۳٪ چربی)", kcal: 61, protein: 3.2, carb: 4.8, fat: 3.3 },
  { id: "shir-kamchan", cat: "labaniat", name: "شیر کم‌چرب", kcal: 42, protein: 3.4, carb: 5, fat: 1 },
  { id: "mast-khiar", cat: "labaniat", name: "ماست و خیار", kcal: 62, protein: 3.4, carb: 4.1, fat: 3.2 },
  { id: "mast-mousir", cat: "labaniat", name: "ماست موسیر", kcal: 90, protein: 4, carb: 6, fat: 5.5 },
  { id: "mast-chekide", cat: "labaniat", name: "ماست چکیده (یونانی)", kcal: 97, protein: 6.8, carb: 3.9, fat: 6.1 },
  { id: "mast-sade", cat: "labaniat", name: "ماست ساده پرچرب", kcal: 88, protein: 3.5, carb: 4.7, fat: 6.5 },
  { id: "mast-kamchan", cat: "labaniat", name: "ماست کم‌چرب", kcal: 56, protein: 4.3, carb: 5.9, fat: 1.5 },
  { id: "panir", cat: "labaniat", name: "پنیر لیقوان/سفید", kcal: 264, protein: 14.2, carb: 2.1, fat: 22 },
  { id: "panir-uf", cat: "labaniat", name: "پنیر یو‌اف (فویلی)", kcal: 280, protein: 15, carb: 3, fat: 23 },
  { id: "panir-pizza", cat: "labaniat", name: "پنیر پیتزا (موزارلا)", kcal: 280, protein: 22, carb: 2.5, fat: 21 },
  { id: "panir-khamei", cat: "labaniat", name: "پنیر خامه‌ای", kcal: 342, protein: 6, carb: 4, fat: 34 },
  { id: "khame", cat: "labaniat", name: "خامه", kcal: 340, protein: 2.5, carb: 3, fat: 35 },
  { id: "kare", cat: "labaniat", name: "کره حیوانی", kcal: 717, protein: 0.9, carb: 0.1, fat: 81 },
  { id: "kashk", cat: "labaniat", name: "کشک مایع", kcal: 90, protein: 6.2, carb: 5.4, fat: 4.8 },
  // آجیل و خشکبار
  { id: "gerdo", cat: "ajil", name: "گردو", kcal: 654, protein: 15.2, carb: 13.7, fat: 65.2 },
  { id: "tokhme-aftab", cat: "ajil", name: "تخمه آفتابگردان (مغز)", kcal: 584, protein: 20.8, carb: 20, fat: 51.5 },
  { id: "tokhme-kadoo", cat: "ajil", name: "تخمه کدو (مغز)", kcal: 559, protein: 30.2, carb: 10.7, fat: 49.1 },
  { id: "tokhme-hendevane", cat: "ajil", name: "تخمه هندوانه", kcal: 557, protein: 28.3, carb: 15.3, fat: 47.4 },
  { id: "nokhodchi", cat: "ajil", name: "نخودچی و کشمش", kcal: 380, protein: 12, carb: 65, fat: 8 },
  { id: "keshmesh", cat: "ajil", name: "کشمش", kcal: 299, protein: 3.1, carb: 79, fat: 0.5 },
  { id: "barge-zardalu", cat: "ajil", name: "برگه زردآلو", kcal: 241, protein: 3.4, carb: 63, fat: 0.5 },
  { id: "khorma", cat: "ajil", name: "خرما (مضافتی)", kcal: 277, protein: 1.8, carb: 75, fat: 0.2 },
  { id: "khorma-gerdo", cat: "ajil", name: "خرما با مغز گردو", kcal: 380, protein: 5.5, carb: 62, fat: 13 },
  { id: "ajil-shoor", cat: "ajil", name: "آجیل مخلوط شور", kcal: 600, protein: 18, carb: 22, fat: 50 },
  { id: "ajil-4maghz", cat: "ajil", name: "چهارمغز (بی‌نمک)", kcal: 610, protein: 17, carb: 20, fat: 54 },
  { id: "pesteh", cat: "ajil", name: "پسته", kcal: 562, protein: 20.3, carb: 27.6, fat: 45.3 },
  { id: "badam", cat: "ajil", name: "بادام", kcal: 579, protein: 21.2, carb: 21.7, fat: 49.9 },
  { id: "badam-zamini", cat: "ajil", name: "بادام‌زمینی برشته", kcal: 567, protein: 25.8, carb: 16.1, fat: 49.2 },
  { id: "nakhod-borshte", cat: "ajil", name: "نخود برشته", kcal: 378, protein: 20.5, carb: 58, fat: 6 },
  { id: "anjir-khoshk", cat: "ajil", name: "انجیر خشک", kcal: 249, protein: 3.3, carb: 64, fat: 0.9 },
  // اسنک شور
  { id: "chips-mast", cat: "snack-shoor", name: "چیپس ماست", kcal: 520, protein: 6, carb: 55, fat: 30 },
  { id: "chips-sibzamini", cat: "snack-shoor", name: "چیپس سیب‌زمینی", kcal: 536, protein: 6.6, carb: 53, fat: 34.6 },
  { id: "pofak", cat: "snack-shoor", name: "پفک نمکی", kcal: 545, protein: 5, carb: 58, fat: 33 },
  { id: "cheetoz", cat: "snack-shoor", name: "چی توز", kcal: 550, protein: 5.5, carb: 56, fat: 34 },
  { id: "chips-mahi", cat: "snack-shoor", name: "چیپس ماهی", kcal: 490, protein: 8, carb: 52, fat: 27 },
  { id: "chips-panjere", cat: "snack-shoor", name: "چیپس پنجره‌ای", kcal: 530, protein: 6, carb: 54, fat: 32 },
  { id: "kraker", cat: "snack-shoor", name: "کراکر نمکی", kcal: 460, protein: 9, carb: 66, fat: 17 },
  { id: "popcorn-namaki", cat: "snack-shoor", name: "پاپ‌کورن نمکی", kcal: 387, protein: 9, carb: 78, fat: 4.5 },
  // شیرینی و اسنک شیرین
  { id: "lavashak", cat: "shirini", name: "لواشک", kcal: 300, protein: 1, carb: 74, fat: 0.5 },
  { id: "gaz", cat: "shirini", name: "گز اصفهان", kcal: 380, protein: 5, carb: 70, fat: 10 },
  { id: "sohan", cat: "shirini", name: "سوهان قم", kcal: 480, protein: 6, carb: 62, fat: 22 },
  { id: "pashmak", cat: "shirini", name: "پشمک", kcal: 380, protein: 0.1, carb: 98, fat: 0 },
  { id: "baghlava", cat: "shirini", name: "باقلوا", kcal: 470, protein: 6, carb: 55, fat: 25 },
  { id: "zoolbia", cat: "shirini", name: "زولبیا", kcal: 380, protein: 3, carb: 60, fat: 14 },
  { id: "bamieh", cat: "shirini", name: "بامیه", kcal: 410, protein: 3.5, carb: 55, fat: 19 },
  { id: "ghotab", cat: "shirini", name: "قطاب یزدی", kcal: 430, protein: 6, carb: 58, fat: 19 },
  { id: "koluche", cat: "shirini", name: "کلوچه فومنی", kcal: 410, protein: 5.5, carb: 68, fat: 12 },
  { id: "nan-khormaei", cat: "shirini", name: "نان خرمایی", kcal: 350, protein: 5, carb: 62, fat: 9 },
  { id: "nan-berenji", cat: "shirini", name: "نان برنجی", kcal: 460, protein: 4, carb: 68, fat: 18 },
  { id: "cake-yazdi", cat: "shirini", name: "کیک یزدی", kcal: 400, protein: 6, carb: 58, fat: 15 },
  { id: "cake-basteh", cat: "shirini", name: "کیک بسته‌بندی (کوچک)", kcal: 405, protein: 5, carb: 58, fat: 17 },
  { id: "kolouche-fomani", cat: "shirini", name: "کلوچه خرمایی صنعتی", kcal: 395, protein: 5, carb: 64, fat: 13 },
  { id: "biscuit-sade", cat: "shirini", name: "بیسکویت ساده", kcal: 435, protein: 7, carb: 72, fat: 13 },
  { id: "vafer", cat: "shirini", name: "ویفر", kcal: 480, protein: 5, carb: 60, fat: 25 },
  { id: "shokolat", cat: "shirini", name: "شکلات تخته‌ای شیری", kcal: 545, protein: 7.6, carb: 59, fat: 31 },
  { id: "tafi", cat: "shirini", name: "تافی/آبنبات شیری", kcal: 400, protein: 2, carb: 60, fat: 15 },
  { id: "bastani", cat: "shirini", name: "بستنی سنتی زعفرانی", kcal: 220, protein: 4, carb: 25, fat: 11 },
  { id: "bastani-familia", cat: "shirini", name: "بستنی صنعتی وانیلی", kcal: 207, protein: 3.5, carb: 24, fat: 11 },
  { id: "faloode", cat: "shirini", name: "فالوده شیرازی", kcal: 180, protein: 0.5, carb: 44, fat: 0.2 },
  { id: "sholeh-zard", cat: "shirini", name: "شله زرد", kcal: 158, protein: 1.6, carb: 32.4, fat: 2.9 },
  { id: "farni", cat: "shirini", name: "فرنی", kcal: 128, protein: 2.8, carb: 23, fat: 2.6 },
  { id: "harireh-badam", cat: "shirini", name: "حریره بادام", kcal: 175, protein: 4.5, carb: 22, fat: 7.5 },
  { id: "mafin", cat: "shirini", name: "کاپ‌کیک/مافین", kcal: 390, protein: 5.5, carb: 52, fat: 18 },
  // نوشیدنی
  { id: "doogh", cat: "nooshidani", name: "دوغ", kcal: 32, protein: 1.6, carb: 2.8, fat: 1.4 },
  { id: "doogh-sanati", cat: "nooshidani", name: "دوغ گازدار صنعتی", kcal: 28, protein: 1.3, carb: 3.5, fat: 0.9 },
  { id: "sharbat-albalu", cat: "nooshidani", name: "شربت آلبالو", kcal: 110, protein: 0.1, carb: 27, fat: 0 },
  { id: "shir-kakao", cat: "nooshidani", name: "شیر کاکائو", kcal: 75, protein: 3.2, carb: 10.5, fat: 2.3 },
  { id: "chai-shirin", cat: "nooshidani", name: "چای شیرین (یک استکان)", kcal: 30, protein: 0, carb: 8, fat: 0 },
  { id: "noshabe-cola", cat: "nooshidani", name: "نوشابه کولا", kcal: 42, protein: 0, carb: 10.6, fat: 0 },
  { id: "noshabe-portoghal", cat: "nooshidani", name: "نوشابه پرتقالی", kcal: 45, protein: 0, carb: 11.5, fat: 0 },
  { id: "ab-mive-portoghal", cat: "nooshidani", name: "آبمیوه پرتقال (بسته‌بندی)", kcal: 45, protein: 0.7, carb: 10.4, fat: 0.2 },
  { id: "ab-mive-mokhtalet", cat: "nooshidani", name: "نکتار میوه‌ی مخلوط", kcal: 48, protein: 0.3, carb: 12, fat: 0.1 },
  { id: "ab-maeval-shair", cat: "nooshidani", name: "ماءالشعیر", kcal: 37, protein: 0.3, carb: 8.5, fat: 0 },
  { id: "ab-maadani", cat: "nooshidani", name: "آب معدنی", kcal: 0, protein: 0, carb: 0, fat: 0 },
  { id: "ghahve-fori", cat: "nooshidani", name: "قهوه فوری (بدون شکر و شیر)", kcal: 2, protein: 0.1, carb: 0.3, fat: 0 },
  // فست‌فود
  { id: "pizza-makhsoos", cat: "fastfood", name: "پیتزا مخصوص", kcal: 266, protein: 11, carb: 33, fat: 10 },
  { id: "pizza-peperoni", cat: "fastfood", name: "پیتزا پپرونی", kcal: 298, protein: 12, carb: 32, fat: 13.5 },
  { id: "sandwich-kalbas", cat: "fastfood", name: "ساندویچ کالباس", kcal: 280, protein: 11, carb: 32, fat: 12 },
  { id: "hamburger", cat: "fastfood", name: "همبرگر", kcal: 295, protein: 17, carb: 25, fat: 14 },
  { id: "hotdog", cat: "fastfood", name: "هات‌داگ", kcal: 300, protein: 12, carb: 22, fat: 20 },
  { id: "sandwich-falafel", cat: "fastfood", name: "ساندویچ فلافل", kcal: 250, protein: 9, carb: 33, fat: 9 },
  { id: "sibzamini-sorkhkarde", cat: "fastfood", name: "سیب‌زمینی سرخ‌کرده", kcal: 312, protein: 3.4, carb: 41, fat: 15 },
  { id: "shawarma-morgh", cat: "fastfood", name: "شاورما مرغ", kcal: 220, protein: 18, carb: 17, fat: 9 },
  { id: "zapata", cat: "fastfood", name: "زاپاتا (پیتزا رول)", kcal: 275, protein: 10, carb: 30, fat: 13 },
  { id: "club-sandwich", cat: "fastfood", name: "ساندویچ کلاب", kcal: 250, protein: 14, carb: 22, fat: 12 },
  // سوسیس و کالباس
  { id: "sausage-alman", cat: "sausage", name: "سوسیس آلمانی", kcal: 300, protein: 13, carb: 3, fat: 26 },
  { id: "sausage-hotdog", cat: "sausage", name: "سوسیس هات‌داگ", kcal: 315, protein: 11, carb: 4, fat: 29 },
  { id: "kalbas-gousht", cat: "sausage", name: "کالباس گوشت", kcal: 250, protein: 14, carb: 5, fat: 20 },
  { id: "kalbas-morgh", cat: "sausage", name: "کالباس مرغ", kcal: 200, protein: 15, carb: 6, fat: 13 },
  { id: "jambon", cat: "sausage", name: "ژامبون", kcal: 145, protein: 18, carb: 2, fat: 7 },
  { id: "mortadella", cat: "sausage", name: "مارتادلا", kcal: 260, protein: 13, carb: 4, fat: 22 },
  // کنسرو و ترشی
  { id: "ton-roghan", cat: "canned", name: "تن ماهی (در روغن)", kcal: 198, protein: 25, carb: 0, fat: 10 },
  { id: "ton-ab", cat: "canned", name: "تن ماهی (در آب)", kcal: 116, protein: 26, carb: 0, fat: 1 },
  { id: "loobia-konservi", cat: "canned", name: "لوبیا چیتی کنسروی", kcal: 91, protein: 5, carb: 15, fat: 0.5 },
  { id: "zorat-konservi", cat: "canned", name: "ذرت کنسروی", kcal: 86, protein: 2.9, carb: 19, fat: 1 },
  { id: "khiar-shoor", cat: "canned", name: "خیارشور", kcal: 12, protein: 0.5, carb: 2.6, fat: 0.2 },
  { id: "kompot-albalu", cat: "canned", name: "کمپوت آلبالو", kcal: 75, protein: 0.5, carb: 18, fat: 0.1 },
  { id: "zeytoon-parvarde", cat: "canned", name: "زیتون پرورده", kcal: 145, protein: 1, carb: 4, fat: 15 },
  { id: "torshi-mokhtalet", cat: "canned", name: "ترشی مخلوط", kcal: 35, protein: 0.7, carb: 7, fat: 0.4 },
  { id: "liteh-gojeh", cat: "canned", name: "لیته گوجه‌فرنگی", kcal: 32, protein: 1.5, carb: 6, fat: 0.3 },
  // سس و چاشنی
  { id: "sos-mayonez", cat: "condiment", name: "سس مایونز", kcal: 680, protein: 1, carb: 3, fat: 75 },
  { id: "sos-ketchup", cat: "condiment", name: "سس کچاپ", kcal: 112, protein: 1.2, carb: 26, fat: 0.2 },
  { id: "rob-gojeh", cat: "condiment", name: "رب گوجه‌فرنگی", kcal: 82, protein: 4.3, carb: 18, fat: 0.5 },
  { id: "sos-gojeh", cat: "condiment", name: "سس گوجه‌فرنگی خانگی", kcal: 30, protein: 1.2, carb: 7, fat: 0.2 },
  { id: "khardal", cat: "condiment", name: "خردل", kcal: 66, protein: 4.4, carb: 5, fat: 3.4 },
  { id: "serke", cat: "condiment", name: "سرکه", kcal: 18, protein: 0, carb: 0.5, fat: 0 },
  { id: "sos-fry", cat: "condiment", name: "سس مخصوص فست‌فود", kcal: 450, protein: 1.5, carb: 8, fat: 46 },
  { id: "roghan-zeytoon", cat: "condiment", name: "روغن زیتون", kcal: 884, protein: 0, carb: 0, fat: 100 },
  // میوه
  { id: "sib", cat: "fruit", name: "سیب", kcal: 52, protein: 0.3, carb: 14, fat: 0.2 },
  { id: "moz", cat: "fruit", name: "موز", kcal: 89, protein: 1.1, carb: 23, fat: 0.3 },
  { id: "porteghal", cat: "fruit", name: "پرتقال", kcal: 47, protein: 0.9, carb: 12, fat: 0.1 },
  { id: "hendevane", cat: "fruit", name: "هندوانه", kcal: 30, protein: 0.6, carb: 8, fat: 0.2 },
  { id: "angoor", cat: "fruit", name: "انگور", kcal: 69, protein: 0.7, carb: 18, fat: 0.2 },
  { id: "kharboze", cat: "fruit", name: "خربزه", kcal: 34, protein: 0.8, carb: 8, fat: 0.2 },
  { id: "golabi", cat: "fruit", name: "گلابی", kcal: 57, protein: 0.4, carb: 15, fat: 0.1 },
  { id: "holoo", cat: "fruit", name: "هلو", kcal: 39, protein: 0.9, carb: 10, fat: 0.3 },
  { id: "zardalu", cat: "fruit", name: "زردآلو", kcal: 48, protein: 1.4, carb: 11, fat: 0.4 },
  { id: "aloo", cat: "fruit", name: "آلو", kcal: 46, protein: 0.7, carb: 11, fat: 0.3 },
  { id: "anar", cat: "fruit", name: "انار", kcal: 83, protein: 1.7, carb: 19, fat: 1.2 },
  { id: "kiwi", cat: "fruit", name: "کیوی", kcal: 61, protein: 1.1, carb: 15, fat: 0.5 },
  { id: "narangi", cat: "fruit", name: "نارنگی", kcal: 53, protein: 0.8, carb: 13, fat: 0.3 },
  { id: "toot-farangi", cat: "fruit", name: "توت‌فرنگی", kcal: 32, protein: 0.7, carb: 8, fat: 0.3 },
  { id: "albalu", cat: "fruit", name: "آلبالو/گیلاس", kcal: 63, protein: 1, carb: 16, fat: 0.2 },
  { id: "talebi", cat: "fruit", name: "طالبی", kcal: 34, protein: 0.8, carb: 8, fat: 0.2 },
  { id: "anbe", cat: "fruit", name: "انبه", kcal: 60, protein: 0.8, carb: 15, fat: 0.4 },
  { id: "khorma-tazeh", cat: "fruit", name: "خرمای تازه (رطب)", kcal: 142, protein: 1.2, carb: 35, fat: 0.2 },
  // سبزیجات
  { id: "sibzamini-khaam", cat: "vegetable", name: "سیب‌زمینی (خام)", kcal: 77, protein: 2, carb: 17, fat: 0.1 },
  { id: "gojeh-farangi", cat: "vegetable", name: "گوجه‌فرنگی", kcal: 18, protein: 0.9, carb: 3.9, fat: 0.2 },
  { id: "khiar", cat: "vegetable", name: "خیار", kcal: 15, protein: 0.7, carb: 3.6, fat: 0.1 },
  { id: "piaz", cat: "vegetable", name: "پیاز", kcal: 40, protein: 1.1, carb: 9.3, fat: 0.1 },
  { id: "havij", cat: "vegetable", name: "هویج", kcal: 41, protein: 0.9, carb: 10, fat: 0.2 },
  { id: "bademjan-khaam", cat: "vegetable", name: "بادمجان (خام)", kcal: 25, protein: 1, carb: 6, fat: 0.2 },
  { id: "felfel-dolmei", cat: "vegetable", name: "فلفل دلمه‌ای", kcal: 31, protein: 1, carb: 6, fat: 0.3 },
  { id: "kadoo-sabz", cat: "vegetable", name: "کدو سبز", kcal: 17, protein: 1.2, carb: 3.1, fat: 0.3 },
  { id: "kahoo", cat: "vegetable", name: "کاهو", kcal: 15, protein: 1.4, carb: 2.9, fat: 0.2 },
  { id: "esfenaj", cat: "vegetable", name: "اسفناج", kcal: 23, protein: 2.9, carb: 3.6, fat: 0.4 },
  { id: "kalam", cat: "vegetable", name: "کلم", kcal: 25, protein: 1.3, carb: 5.8, fat: 0.1 },
  { id: "loobia-sabz", cat: "vegetable", name: "لوبیا سبز", kcal: 31, protein: 1.8, carb: 7, fat: 0.2 },
  { id: "zorat-shirin", cat: "vegetable", name: "ذرت شیرین", kcal: 96, protein: 3.4, carb: 21, fat: 1.5 },
  { id: "ghaarch", cat: "vegetable", name: "قارچ", kcal: 22, protein: 3.1, carb: 3.3, fat: 0.3 },
  // غلات و حبوبات خام
  { id: "berenj-khaam", cat: "grain", name: "برنج خام (نپخته)", kcal: 365, protein: 7.1, carb: 80, fat: 0.7 },
  { id: "adas-khaam", cat: "grain", name: "عدس خام", kcal: 353, protein: 25.8, carb: 60, fat: 1.1 },
  { id: "nokhod-khaam", cat: "grain", name: "نخود خام", kcal: 364, protein: 19, carb: 61, fat: 6 },
  { id: "loobia-ghermez-khaam", cat: "grain", name: "لوبیا قرمز خام", kcal: 333, protein: 24, carb: 60, fat: 0.8 },
  { id: "lape-khaam", cat: "grain", name: "لپه خام", kcal: 358, protein: 25, carb: 60, fat: 1 },
  { id: "makaroni-khaam", cat: "grain", name: "ماکارونی خام", kcal: 371, protein: 13, carb: 75, fat: 1.5 },
  { id: "jo-dosar", cat: "grain", name: "جو دوسر (پرک)", kcal: 389, protein: 16.9, carb: 66, fat: 6.9 },
  { id: "ard-gandom", cat: "grain", name: "آرد گندم", kcal: 364, protein: 10.3, carb: 76, fat: 1 },
  { id: "makaroni-zar", cat: "grain", name: "ماکارونی زر (خام)", kcal: 371, protein: 12, carb: 74, fat: 1.5 },
  { id: "makaroni-tak", cat: "grain", name: "ماکارونی تک (خام)", kcal: 368, protein: 12.5, carb: 73, fat: 1.6 },
  // برند ایرانی (تخمینی — بر اساس مقادیر معمول محصولات مشابه در بازار)
  { id: "mast-kalleh", cat: "labaniat", name: "ماست کاله ۲.۵٪", kcal: 70, protein: 4, carb: 5, fat: 3.5 },
  { id: "mast-mihan", cat: "labaniat", name: "ماست میهن کم‌چرب", kcal: 55, protein: 4.2, carb: 5, fat: 1.5 },
  { id: "doogh-abali", cat: "labaniat", name: "دوغ آبعلی", kcal: 28, protein: 1.2, carb: 3, fat: 0.8 },
  { id: "doogh-kalleh", cat: "labaniat", name: "دوغ کاله بدون گاز", kcal: 30, protein: 1.4, carb: 3.2, fat: 1 },
  { id: "shir-pegah", cat: "labaniat", name: "شیر پگاه کم‌چرب", kcal: 42, protein: 3.3, carb: 5, fat: 1 },
  { id: "shir-kalleh-por", cat: "labaniat", name: "شیر پرچرب کاله", kcal: 64, protein: 3.2, carb: 4.8, fat: 3.5 },
  { id: "panir-uf-kalleh", cat: "labaniat", name: "پنیر یو‌اف کاله", kcal: 280, protein: 15, carb: 3, fat: 23 },
  { id: "panir-pizza-kalleh", cat: "labaniat", name: "پنیر پیتزا کاله", kcal: 290, protein: 21, carb: 2, fat: 22 },
  { id: "kare-mino", cat: "labaniat", name: "کره مینو", kcal: 735, protein: 0.5, carb: 0.5, fat: 82 },
  { id: "khame-kalleh", cat: "labaniat", name: "خامه کاله", kcal: 335, protein: 2.5, carb: 3, fat: 34 },
  { id: "chips-mazmaz", cat: "snack-shoor", name: "چیپس نمکی مزمز", kcal: 530, protein: 6, carb: 52, fat: 34 },
  { id: "pofak-mazmaz", cat: "snack-shoor", name: "پفک نمکی مزمز", kcal: 540, protein: 5, carb: 57, fat: 33 },
  { id: "cheetoz-brand", cat: "labaniat", name: "چی‌توز پنیری", kcal: 550, protein: 6, carb: 55, fat: 34 },
  { id: "chips-lezzi", cat: "snack-shoor", name: "چیپس لِزی", kcal: 525, protein: 6, carb: 53, fat: 33 },
  { id: "biscuit-gorji", cat: "shirini", name: "بیسکویت مادر گرجی", kcal: 460, protein: 7, carb: 68, fat: 17 },
  { id: "vafer-shoniz", cat: "shirini", name: "ویفر شونیز", kcal: 500, protein: 5, carb: 58, fat: 27 },
  { id: "cake-shoniz", cat: "shirini", name: "کیک کاکائویی شونیز", kcal: 410, protein: 5.5, carb: 55, fat: 18 },
  { id: "cake-familia", cat: "shirini", name: "کیک یزدی فامیلا", kcal: 400, protein: 6, carb: 58, fat: 15 },
  { id: "shokolat-shoniz", cat: "labaniat", name: "شکلات شیری شونیز", kcal: 540, protein: 7, carb: 58, fat: 31 },
  { id: "biscuit-mack", cat: "shirini", name: "بیسکویت مک", kcal: 470, protein: 6, carb: 66, fat: 20 },
  { id: "noshabe-zamzam", cat: "nooshidani", name: "نوشابه کولا زمزم", kcal: 42, protein: 0, carb: 10.6, fat: 0 },
  { id: "noshabe-jojo", cat: "nooshidani", name: "نوشابه پرتقالی جوجو", kcal: 46, protein: 0, carb: 11.5, fat: 0 },
  { id: "abmive-sunich", cat: "nooshidani", name: "آبمیوه پرتقال سن‌ایچ", kcal: 45, protein: 0.5, carb: 10.5, fat: 0.1 },
  { id: "maalshair-heyday", cat: "nooshidani", name: "ماءالشعیر هی‌دی", kcal: 38, protein: 0.3, carb: 8.6, fat: 0 },
  { id: "delster-istak", cat: "nooshidani", name: "دلستر ایستک", kcal: 35, protein: 0.3, carb: 8, fat: 0 },
  { id: "sausage-kalleh", cat: "sausage", name: "سوسیس آلمانی کاله", kcal: 300, protein: 13, carb: 3, fat: 26 },
  { id: "kalbas-solico", cat: "sausage", name: "کالباس گوشت سولیکو", kcal: 245, protein: 14, carb: 5, fat: 19 },
  { id: "sosis-hotdog-kalleh", cat: "sausage", name: "سوسیس هات‌داگ کاله", kcal: 315, protein: 11, carb: 4, fat: 29 },
  { id: "rob-yekOta", cat: "condiment", name: "رب گوجه‌فرنگی یک‌و‌یک", kcal: 82, protein: 4.3, carb: 18, fat: 0.5 },
  { id: "sos-mayonez-1x1", cat: "condiment", name: "سس مایونز یک‌ویک", kcal: 680, protein: 1, carb: 3, fat: 75 },
  { id: "sos-ketchup-1x1", cat: "condiment", name: "سس کچاپ یک‌ویک", kcal: 112, protein: 1.2, carb: 26, fat: 0.2 },
  { id: "asal-shahd", cat: "sayer", name: "عسل طبیعی شهد", kcal: 304, protein: 0.3, carb: 82, fat: 0 },
  { id: "halva-ardei-brand", cat: "sayer", name: "حلوا ارده رستگاران", kcal: 485, protein: 7.5, carb: 44, fat: 32 },
  { id: "nabat-tabarzad", cat: "shirini", name: "نبات/آبنبات چوبی", kcal: 390, protein: 0, carb: 98, fat: 0 },
  { id: "panir-rouzaneh", cat: "labaniat", name: "پنیر یو‌اف روزانه", kcal: 275, protein: 15, carb: 2.5, fat: 23 },
  { id: "mast-rouzaneh", cat: "labaniat", name: "ماست پرچرب روزانه", kcal: 88, protein: 3.5, carb: 4.7, fat: 6.5 },
  { id: "doogh-ramak", cat: "labaniat", name: "دوغ رامک", kcal: 30, protein: 1.3, carb: 3, fat: 0.9 },
  { id: "shir-haraz", cat: "labaniat", name: "شیر پاستوریزه هراز", kcal: 62, protein: 3.2, carb: 4.8, fat: 3.3 },
  { id: "mast-choopan", cat: "labaniat", name: "ماست کم‌چرب چوپان", kcal: 56, protein: 4.3, carb: 5.9, fat: 1.5 },
  { id: "panir-labaneh", cat: "labaniat", name: "پنیر لبنه", kcal: 260, protein: 14, carb: 2, fat: 22 },
  { id: "doogh-bahman", cat: "labaniat", name: "دوغ بهمن", kcal: 29, protein: 1.2, carb: 3.1, fat: 0.8 },
  { id: "khame-damdaran", cat: "labaniat", name: "خامه صبحانه دامداران", kcal: 338, protein: 2.5, carb: 3, fat: 34 },
  { id: "shir-pegah-por", cat: "labaniat", name: "شیر پرچرب پگاه", kcal: 64, protein: 3.2, carb: 4.9, fat: 3.5 },
  { id: "mast-pegah", cat: "labaniat", name: "ماست ساده پگاه", kcal: 68, protein: 3.6, carb: 4.9, fat: 3.8 },
  { id: "panir-kalleh-lighvan", cat: "labaniat", name: "پنیر لیقوان کاله", kcal: 270, protein: 15.5, carb: 2, fat: 22.5 },
  { id: "sosis-bahar", cat: "sausage", name: "سوسیس بهار", kcal: 295, protein: 12.5, carb: 3.5, fat: 25.5 },
  { id: "abmive-alibaba", cat: "nooshidani", name: "آبمیوه پرتقالی علی‌بابا", kcal: 46, protein: 0.4, carb: 11, fat: 0.1 },
  { id: "noshidani-shadnoosh", cat: "nooshidani", name: "نوشیدنی میوه‌ای شادنوش", kcal: 45, protein: 0.3, carb: 10.8, fat: 0.1 },
  { id: "pepsi", cat: "nooshidani", name: "نوشابه پپسی", kcal: 41, protein: 0, carb: 10.3, fat: 0 },
  { id: "cocacola", cat: "nooshidani", name: "نوشابه کوکاکولا", kcal: 42, protein: 0, carb: 10.6, fat: 0 },
  { id: "fanta", cat: "sayer", name: "فانتا پرتقالی", kcal: 45, protein: 0, carb: 11.2, fat: 0 },
  { id: "sprite", cat: "sayer", name: "اسپرایت", kcal: 39, protein: 0, carb: 9.8, fat: 0 },
  { id: "ton-shilan", cat: "canned", name: "کنسرو تن ماهی شیلان (آب)", kcal: 116, protein: 26, carb: 0, fat: 1 },
  { id: "rob-tabarok", cat: "condiment", name: "رب گوجه‌فرنگی تبرک", kcal: 82, protein: 4.3, carb: 18, fat: 0.5 },
  { id: "roghan-ladan", cat: "condiment", name: "روغن مایع لادن", kcal: 884, protein: 0, carb: 0, fat: 100 },
  { id: "roghan-talaei", cat: "condiment", name: "روغن آفتابگردان طلایی", kcal: 884, protein: 0, carb: 0, fat: 100 },
  { id: "biscuit-nili", cat: "shirini", name: "بیسکویت نیلی", kcal: 455, protein: 6.5, carb: 70, fat: 16 },
  { id: "biscuit-saghe-talaei", cat: "shirini", name: "بیسکویت ساقه طلایی", kcal: 450, protein: 7, carb: 70, fat: 14 },
  { id: "panir-sefid-ramak", cat: "labaniat", name: "پنیر سفید رامک", kcal: 215, protein: 6, carb: 9.5, fat: 17 },
  { id: "panir-khamei-ramak", cat: "labaniat", name: "پنیر خامه‌ای رامک", kcal: 248, protein: 5, carb: 3, fat: 24 },
  { id: "panir-pizza-ramak", cat: "labaniat", name: "پنیر پیتزا رامک", kcal: 280, protein: 21, carb: 2.5, fat: 21 },
  { id: "kashk-ramak", cat: "labaniat", name: "کشک رامک", kcal: 90, protein: 6.2, carb: 5.4, fat: 4.8 },
  { id: "biscuit-madar", cat: "shirini", name: "بیسکویت مادر (گرجی)", kcal: 460, protein: 7, carb: 68, fat: 17 },
  { id: "vafer-nan-avar", cat: "shirini", name: "ویفر نان‌آور", kcal: 495, protein: 5, carb: 59, fat: 26 },
  { id: "keyk-nan-avar", cat: "shirini", name: "کیک نان‌آور", kcal: 400, protein: 5.5, carb: 57, fat: 16 },
  { id: "chaghale-badam", cat: "fruit", name: "چغاله بادام", kcal: 48, protein: 1.5, carb: 9, fat: 1.2 },
  { id: "azgil", cat: "fruit", name: "ازگیل", kcal: 47, protein: 0.4, carb: 12.4, fat: 0.2 },
  { id: "konar", cat: "fruit", name: "کُنار", kcal: 79, protein: 0.8, carb: 20, fat: 0.2 },
  { id: "beh", cat: "fruit", name: "به (کوئینس)", kcal: 57, protein: 0.4, carb: 15.3, fat: 0.1 },
  { id: "khormalu", cat: "fruit", name: "خرمالو", kcal: 70, protein: 0.6, carb: 18.6, fat: 0.2 },
  { id: "nargil-taze", cat: "fruit", name: "نارگیل تازه", kcal: 354, protein: 3.3, carb: 15, fat: 33.5 },
  { id: "limo-torsh", cat: "fruit", name: "لیمو ترش", kcal: 29, protein: 1.1, carb: 9.3, fat: 0.3 },
  { id: "greypfroot", cat: "fruit", name: "گریپ‌فروت", kcal: 42, protein: 0.8, carb: 10.7, fat: 0.1 },
  { id: "ananas", cat: "fruit", name: "آناناس", kcal: 50, protein: 0.5, carb: 13.1, fat: 0.1 },
  { id: "papaya", cat: "fruit", name: "پاپایا", kcal: 43, protein: 0.5, carb: 11, fat: 0.3 },
  { id: "shalil", cat: "fruit", name: "شلیل", kcal: 44, protein: 1.1, carb: 10.6, fat: 0.3 },
  { id: "tut-sefid", cat: "fruit", name: "توت سفید", kcal: 43, protein: 1.4, carb: 9.8, fat: 0.4 },
  { id: "anjir-taze", cat: "fruit", name: "انجیر تازه", kcal: 74, protein: 0.8, carb: 19.2, fat: 0.3 },
  { id: "zoghal-akhte", cat: "fruit", name: "زغال‌اخته", kcal: 46, protein: 0.4, carb: 12.2, fat: 0.1 },
  { id: "moz-khoshk", cat: "fruit", name: "موز خشک", kcal: 346, protein: 3.9, carb: 88.3, fat: 1.8 },
  { id: "anbe-khoshk", cat: "fruit", name: "انبه خشک", kcal: 319, protein: 3.5, carb: 75, fat: 1.3 },
  { id: "torobche", cat: "vegetable", name: "تربچه", kcal: 16, protein: 0.7, carb: 3.4, fat: 0.1 },
  { id: "changoor-labu", cat: "vegetable", name: "چغندر", kcal: 43, protein: 1.6, carb: 10, fat: 0.2 },
  { id: "karafs-taze", cat: "vegetable", name: "کرفس تازه", kcal: 16, protein: 0.7, carb: 3, fat: 0.2 },
  { id: "jafari", cat: "vegetable", name: "جعفری", kcal: 36, protein: 3, carb: 6.3, fat: 0.8 },
  { id: "shahi", cat: "vegetable", name: "شاهی", kcal: 32, protein: 2.6, carb: 5.1, fat: 0.7 },
  { id: "tarkhoon", cat: "vegetable", name: "ترخون", kcal: 24, protein: 2.3, carb: 3.9, fat: 0.6 },
  { id: "nana-taze", cat: "vegetable", name: "نعناع تازه", kcal: 44, protein: 3.3, carb: 8.4, fat: 0.7 },
  { id: "reyhan", cat: "vegetable", name: "ریحان", kcal: 23, protein: 3.2, carb: 2.7, fat: 0.6 },
  { id: "shanbalile-barg", cat: "vegetable", name: "شنبلیله تازه", kcal: 49, protein: 4.4, carb: 6, fat: 0.9 },
  { id: "barge-changoor", cat: "vegetable", name: "برگ چغندر", kcal: 19, protein: 1.8, carb: 3.7, fat: 0.2 },
  { id: "kalam-broccoli", cat: "vegetable", name: "کلم بروکلی", kcal: 34, protein: 2.8, carb: 6.6, fat: 0.4 },
  { id: "gol-kalam", cat: "vegetable", name: "گل‌کلم", kcal: 25, protein: 1.9, carb: 5, fat: 0.3 },
  { id: "bamie-sabz", cat: "vegetable", name: "بامیه (سبزی)", kcal: 33, protein: 1.9, carb: 7.5, fat: 0.2 },
  { id: "loobia-cheshm-taze", cat: "vegetable", name: "لوبیا چشم‌بلبلی تازه", kcal: 90, protein: 5, carb: 17, fat: 0.5 },
  { id: "sir-taze", cat: "vegetable", name: "سیر", kcal: 149, protein: 6.4, carb: 33, fat: 0.5 },
  { id: "tareh", cat: "vegetable", name: "تره", kcal: 30, protein: 2.4, carb: 4.7, fat: 0.3 },
  { id: "shalgham", cat: "vegetable", name: "شلغم", kcal: 28, protein: 0.9, carb: 6.4, fat: 0.1 },
  { id: "kadoo-halvaei-pokhte", cat: "vegetable", name: "کدو حلوایی پخته", kcal: 26, protein: 1, carb: 6.5, fat: 0.1 },
  { id: "felfel-sabz-tond", cat: "vegetable", name: "فلفل سبز تند", kcal: 40, protein: 2, carb: 8.8, fat: 0.2 },
  { id: "sibzamini-abpaz", cat: "vegetable", name: "سیب‌زمینی آب‌پز", kcal: 87, protein: 1.9, carb: 20, fat: 0.1 },
  { id: "sibzamini-poore", cat: "vegetable", name: "پوره سیب‌زمینی", kcal: 113, protein: 2, carb: 17, fat: 4 },
  { id: "kadoo-sabz-sorkhshode", cat: "vegetable", name: "کدو سبز سرخ‌شده", kcal: 85, protein: 1.5, carb: 8, fat: 5.5 },
  { id: "bademjan-sorkhshode", cat: "vegetable", name: "بادمجان سرخ‌شده", kcal: 185, protein: 1.5, carb: 12, fat: 15 },
  { id: "shir-pak", cat: "labaniat", name: "شیر پاستوریزه پاک", kcal: 61, protein: 3.2, carb: 4.8, fat: 3.3 },
  { id: "mast-pak", cat: "labaniat", name: "ماست پاک", kcal: 68, protein: 3.6, carb: 4.9, fat: 3.8 },
  { id: "doogh-pak", cat: "labaniat", name: "دوغ پاک", kcal: 30, protein: 1.4, carb: 3, fat: 0.9 },
  { id: "panir-pak", cat: "labaniat", name: "پنیر یو‌اف پاک", kcal: 278, protein: 15, carb: 2.8, fat: 23 },
  { id: "shir-doosheh", cat: "labaniat", name: "شیر دوشه", kcal: 62, protein: 3.2, carb: 4.8, fat: 3.3 },
  { id: "kare-pastorize-pegah", cat: "labaniat", name: "کره پاستوریزه پگاه", kcal: 720, protein: 0.6, carb: 0.5, fat: 81 },
  { id: "panir-mozzarella-kalleh", cat: "labaniat", name: "پنیر موزارلا رنده‌شده کاله", kcal: 300, protein: 22, carb: 2, fat: 23 },
  { id: "shir-sooya", cat: "labaniat", name: "شیر سویا", kcal: 54, protein: 3.3, carb: 6, fat: 1.8 },
  { id: "shir-badam-brand", cat: "labaniat", name: "شیر بادام", kcal: 24, protein: 1, carb: 3, fat: 1.1 },
  { id: "bastani-domino", cat: "labaniat", name: "بستنی دومینو", kcal: 210, protein: 3.8, carb: 24, fat: 10.5 },
  { id: "bastani-vidax", cat: "labaniat", name: "بستنی ویداکس", kcal: 215, protein: 3.5, carb: 25, fat: 11 },
  { id: "bastani-mihan-livani", cat: "labaniat", name: "بستنی میهن لیوانی", kcal: 205, protein: 3.6, carb: 23, fat: 10.8 },
  { id: "puding-shokolati", cat: "labaniat", name: "پودینگ شکلاتی", kcal: 130, protein: 3, carb: 20, fat: 4 },
  { id: "creme-caramel", cat: "labaniat", name: "کرم کارامل", kcal: 150, protein: 4, carb: 22, fat: 5 },
  { id: "fandogh", cat: "ajil", name: "فندق", kcal: 628, protein: 15, carb: 17, fat: 61 },
  { id: "badam-hendi", cat: "ajil", name: "بادام هندی (کاجو)", kcal: 553, protein: 18, carb: 30, fat: 44 },
  { id: "chips-adamak", cat: "snack-shoor", name: "چیپس آدمک", kcal: 530, protein: 6, carb: 53, fat: 33 },
  { id: "chips-poker", cat: "snack-shoor", name: "چیپس پوکر", kcal: 525, protein: 6, carb: 54, fat: 32 },
  { id: "cheetoz-toopi", cat: "snack-shoor", name: "چیپس توپی چی‌توز", kcal: 540, protein: 6, carb: 56, fat: 33 },
  { id: "pofak-chetori", cat: "snack-shoor", name: "پفک چتری", kcal: 540, protein: 5, carb: 57, fat: 33 },
  { id: "kraker-asali", cat: "snack-shoor", name: "کراکر عسلی", kcal: 440, protein: 8, carb: 70, fat: 14 },
  { id: "nooghl", cat: "snack-shoor", name: "نقل بادامی", kcal: 400, protein: 4, carb: 85, fat: 5 },
  { id: "badam-shori", cat: "snack-shoor", name: "بادام شور برشته", kcal: 600, protein: 21, carb: 20, fat: 51 },
  { id: "tokhme-mخصوص", cat: "snack-shoor", name: "تخمه مخصوص کشاورز", kcal: 585, protein: 21, carb: 20, fat: 51.5 },
  { id: "chips-halghei", cat: "snack-shoor", name: "چیپس حلقه‌ای", kcal: 525, protein: 6, carb: 54, fat: 32 },
  { id: "shirini-keshmeshi", cat: "shirini", name: "شیرینی کشمشی", kcal: 420, protein: 6, carb: 55, fat: 19 },
  { id: "nan-badami", cat: "shirini", name: "نان بادامی", kcal: 480, protein: 8, carb: 52, fat: 27 },
  { id: "shirini-danmarki", cat: "shirini", name: "شیرینی دانمارکی", kcal: 420, protein: 6, carb: 45, fat: 23 },
  { id: "rolet-khamei", cat: "shirini", name: "رولت خامه‌ای", kcal: 390, protein: 5, carb: 48, fat: 19 },
  { id: "tart-mive", cat: "shirini", name: "تارت میوه", kcal: 320, protein: 4, carb: 42, fat: 15 },
  { id: "shokolat-talkh", cat: "shirini", name: "شکلات تلخ", kcal: 546, protein: 7.8, carb: 46, fat: 31 },
  { id: "shokolat-sobhane", cat: "shirini", name: "شکلات صبحانه (کاکائویی)", kcal: 539, protein: 6, carb: 57, fat: 32 },
  { id: "aloocheh-shokolati", cat: "shirini", name: "آلوچه شکلاتی", kcal: 300, protein: 2, carb: 62, fat: 5 },
  { id: "caramel-tafi", cat: "shirini", name: "کارامل تافی", kcal: 410, protein: 2, carb: 68, fat: 15 },
  { id: "keyk-rolet", cat: "shirini", name: "کیک رولت", kcal: 390, protein: 5, carb: 54, fat: 17 },
  { id: "donat", cat: "shirini", name: "دونات", kcal: 452, protein: 5.5, carb: 51, fat: 25 },
  { id: "macaron-faranse", cat: "shirini", name: "ماکارون فرانسوی", kcal: 410, protein: 6, carb: 60, fat: 17 },
  { id: "kelompeh", cat: "shirini", name: "کلمپه یزدی", kcal: 420, protein: 5, carb: 62, fat: 16 },
  { id: "basloogh", cat: "shirini", name: "باسلوق", kcal: 330, protein: 1, carb: 80, fat: 0.5 },
  { id: "rahat-lokum", cat: "shirini", name: "راحت‌الحلقوم", kcal: 325, protein: 0.5, carb: 80, fat: 0.2 },
  { id: "chai-siah", cat: "nooshidani", name: "چای سیاه (بدون شکر)", kcal: 1, protein: 0, carb: 0.3, fat: 0 },
  { id: "ghahve-turk", cat: "nooshidani", name: "قهوه ترک (بدون شکر)", kcal: 2, protein: 0.1, carb: 0.3, fat: 0 },
  { id: "nescafe-3in1", cat: "nooshidani", name: "نسکافه ۳ در ۱", kcal: 135, protein: 1.5, carb: 22, fat: 4.5 },
  { id: "rc-cola", cat: "nooshidani", name: "نوشابه آر‌سی کولا", kcal: 41, protein: 0, carb: 10.5, fat: 0 },
  { id: "seven-up", cat: "nooshidani", name: "نوشابه سون‌آپ", kcal: 39, protein: 0, carb: 10, fat: 0 },
  { id: "mirinda", cat: "nooshidani", name: "نوشابه میراندا", kcal: 46, protein: 0, carb: 11.5, fat: 0 },
  { id: "abmive-tabarok", cat: "nooshidani", name: "آبمیوه تبرک", kcal: 46, protein: 0.4, carb: 11, fat: 0.1 },
  { id: "sharbat-anar", cat: "nooshidani", name: "شربت انار", kcal: 130, protein: 0.2, carb: 32, fat: 0 },
  { id: "sharbat-sekanjebin", cat: "nooshidani", name: "شربت سکنجبین", kcal: 140, protein: 0.1, carb: 35, fat: 0 },
  { id: "ab-havij", cat: "nooshidani", name: "آب هویج", kcal: 40, protein: 0.9, carb: 9.3, fat: 0.2 },
  { id: "ab-portoghal-taze", cat: "nooshidani", name: "آب پرتقال تازه‌گرفته", kcal: 45, protein: 0.7, carb: 10.4, fat: 0.2 },
  { id: "doogh-khoshgevar", cat: "labaniat", name: "دوغ خوش‌گوار", kcal: 29, protein: 1.3, carb: 3.1, fat: 0.8 },
  { id: "pizza-margherita", cat: "fastfood", name: "پیتزا مارگاریتا", kcal: 250, protein: 11, carb: 30, fat: 9 },
  { id: "pizza-gooshti", cat: "fastfood", name: "پیتزا گوشت و قارچ", kcal: 270, protein: 13, carb: 31, fat: 11 },
  { id: "sandwich-morgh", cat: "fastfood", name: "ساندویچ مرغ", kcal: 265, protein: 16, carb: 28, fat: 10 },
  { id: "burger-do-tabaghe", cat: "fastfood", name: "چیزبرگر دوطبقه", kcal: 330, protein: 19, carb: 27, fat: 17 },
  { id: "naget-morgh", cat: "fastfood", name: "ناگت مرغ", kcal: 296, protein: 15, carb: 17, fat: 19 },
  { id: "finger-morgh", cat: "fastfood", name: "فینگر مرغ", kcal: 280, protein: 16, carb: 18, fat: 16 },
  { id: "pizza-panir", cat: "fastfood", name: "پیتزا پنیر", kcal: 260, protein: 12, carb: 31, fat: 10 },
  { id: "sandwich-kotlet", cat: "fastfood", name: "ساندویچ کتلت", kcal: 290, protein: 12, carb: 30, fat: 13 },
  { id: "sausage-frankfurt", cat: "sausage", name: "سوسیس فرانکفورت", kcal: 310, protein: 12, carb: 3, fat: 28 },
  { id: "kalbas-khales", cat: "sausage", name: "کالباس خالص گوشت ۹۰٪", kcal: 215, protein: 16, carb: 2, fat: 16 },
  { id: "kalbas-pizza-mخصوص", cat: "sausage", name: "کالباس مخصوص پیتزا", kcal: 240, protein: 13, carb: 4, fat: 19 },
  { id: "pastrami", cat: "sausage", name: "پاسترامی", kcal: 147, protein: 21, carb: 2, fat: 6 },
  { id: "salami", cat: "sausage", name: "سالامی", kcal: 336, protein: 20, carb: 2, fat: 28 },
  { id: "konserve-loobia-sabz", cat: "canned", name: "کنسرو لوبیا سبز", kcal: 25, protein: 1.5, carb: 5, fat: 0.2 },
  { id: "konserve-nخود-farangi", cat: "canned", name: "کنسرو نخودفرنگی", kcal: 70, protein: 5, carb: 12, fat: 0.5 },
  { id: "konserve-ghaarch", cat: "canned", name: "کنسرو قارچ", kcal: 22, protein: 2, carb: 3, fat: 0.3 },
  { id: "torshi-liteh", cat: "canned", name: "ترشی لیته", kcal: 40, protein: 1, carb: 8, fat: 0.5 },
  { id: "torshi-sir", cat: "canned", name: "ترشی سیر", kcal: 90, protein: 3, carb: 20, fat: 0.3 },
  { id: "moraba-portoghal", cat: "canned", name: "مربای پرتقال", kcal: 260, protein: 0.5, carb: 65, fat: 0.1 },
  { id: "zeytoon-sabz", cat: "canned", name: "زیتون سبز شور", kcal: 145, protein: 1, carb: 3.8, fat: 15.3 },
  { id: "sos-hezar-jazire", cat: "condiment", name: "سس هزار جزیره", kcal: 320, protein: 1, carb: 15, fat: 29 },
  { id: "sos-panir-condi", cat: "condiment", name: "سس پنیری", kcal: 380, protein: 4, carb: 8, fat: 38 },
  { id: "sos-bbq", cat: "condiment", name: "سس باربیکیو", kcal: 172, protein: 1, carb: 40, fat: 0.5 },
  { id: "sos-soya", cat: "condiment", name: "سس سویا", kcal: 53, protein: 8, carb: 5, fat: 0.1 },
  { id: "sos-ranch", cat: "condiment", name: "سس رنچ", kcal: 450, protein: 1, carb: 6, fat: 47 },
  { id: "khardal-dijon", cat: "condiment", name: "خردل دیژون", kcal: 90, protein: 5, carb: 8, fat: 4.5 },
  { id: "berenj-tarom", cat: "grain", name: "برنج طارم (خام)", kcal: 360, protein: 7, carb: 79, fat: 0.6 },
  { id: "berenj-hashemi", cat: "grain", name: "برنج هاشمی (خام)", kcal: 362, protein: 7, carb: 79.5, fat: 0.6 },
  { id: "jo-poost-kande", cat: "grain", name: "جو پوست‌کنده", kcal: 354, protein: 12.5, carb: 73, fat: 2.3 },
  { id: "gandom-kamel", cat: "grain", name: "گندم کامل", kcal: 340, protein: 13.7, carb: 72, fat: 2.5 },
  { id: "balghor-gandom", cat: "grain", name: "بلغور گندم", kcal: 342, protein: 12, carb: 75, fat: 1.3 },
  { id: "soya-daneh", cat: "grain", name: "دانه سویا (خام)", kcal: 446, protein: 36, carb: 30, fat: 20 },
  { id: "adas-ghermez", cat: "grain", name: "عدس قرمز (خام)", kcal: 352, protein: 24, carb: 63, fat: 1 },
  { id: "nan-hamburger", cat: "nan", name: "نان همبرگر", kcal: 280, protein: 9, carb: 50, fat: 5 },
  { id: "nan-jo", cat: "nan", name: "نان جو", kcal: 246, protein: 9, carb: 48, fat: 2 },
  { id: "nan-sabus-dar", cat: "nan", name: "نان سبوس‌دار", kcal: 240, protein: 9, carb: 46, fat: 2.5 },
  { id: "crouton", cat: "nan", name: "کروتون", kcal: 400, protein: 10, carb: 70, fat: 9 },
  { id: "fesenjan-morgh", cat: "khoresh", name: "فسنجان مرغ", kcal: 205, protein: 11, carb: 12, fat: 13.5 },
  { id: "ghalie-mahi", cat: "khoresh", name: "قلیه ماهی (جنوبی)", kcal: 175, protein: 14, carb: 8, fat: 10 },
  { id: "meygoo-polo", cat: "polo", name: "میگو پلو", kcal: 210, protein: 12, carb: 30, fat: 5 },
  { id: "baghala-ghatogh-mahi", cat: "khoresh", name: "باقلا قاتق با ماهی", kcal: 160, protein: 12, carb: 13, fat: 7 },
  { id: "torsh-tareh", cat: "khoresh", name: "ترش تره گیلانی", kcal: 140, protein: 9, carb: 10, fat: 7.5 },
  { id: "adas-polo-morgh", cat: "polo", name: "عدس پلو با مرغ", kcal: 215, protein: 11, carb: 35, fat: 4.5 },
  { id: "reshte-polo", cat: "polo", name: "رشته پلو", kcal: 205, protein: 5.5, carb: 40, fat: 3.5 },
  { id: "kabab-barg-morgh", cat: "kabab", name: "کباب برگ مرغ", kcal: 190, protein: 26, carb: 0.5, fat: 9 },
  { id: "jigar-morgh-kababi", cat: "kabab", name: "جگر مرغ کبابی", kcal: 165, protein: 22, carb: 1, fat: 8 },
  { id: "del-o-jigar", cat: "kabab", name: "دل و جگر و قلوه کبابی", kcal: 190, protein: 21, carb: 1, fat: 11 },
  { id: "kaleh-pache", cat: "khoresh", name: "کله‌پاچه", kcal: 210, protein: 18, carb: 2, fat: 14 },
  { id: "sirabi", cat: "kabab", name: "سیرابی", kcal: 95, protein: 14, carb: 2, fat: 3.5 },
  { id: "zaban-pokhte", cat: "kabab", name: "زبان پخته", kcal: 224, protein: 19, carb: 0, fat: 16 },
  { id: "eshkeneh", cat: "khoresh", name: "اشکنه", kcal: 55, protein: 2.5, carb: 6, fat: 2.5 },
  { id: "panir-o-gerdo", cat: "nan", name: "پنیر و گردو (ترکیبی)", kcal: 380, protein: 16, carb: 4, fat: 33 },
  { id: "nan-panir-sabzi", cat: "nan", name: "نان و پنیر و سبزی", kcal: 310, protein: 13, carb: 35, fat: 13 },
  { id: "soup-jo", cat: "khoresh", name: "سوپ جو", kcal: 65, protein: 3, carb: 9, fat: 2 },
  { id: "soup-morgh", cat: "khoresh", name: "سوپ مرغ", kcal: 70, protein: 5, carb: 7, fat: 2.5 },
  { id: "soup-mahi", cat: "khoresh", name: "سوپ ماهی", kcal: 75, protein: 7, carb: 6, fat: 2.8 },
  { id: "ash-jo-sade", cat: "khoresh", name: "آش جو ساده", kcal: 70, protein: 3, carb: 12, fat: 1.5 },
  { id: "ash-anar", cat: "khoresh", name: "آش انار", kcal: 90, protein: 4, carb: 14, fat: 2.5 },
  { id: "zaferan", cat: "condiment", name: "زعفران", kcal: 310, protein: 11.4, carb: 65.4, fat: 5.9 },
  { id: "darchin", cat: "condiment", name: "دارچین", kcal: 247, protein: 4, carb: 80.6, fat: 1.2 },
  { id: "zire", cat: "condiment", name: "زیره سبز", kcal: 375, protein: 17.8, carb: 44.2, fat: 22.3 },
  { id: "felfel-siah", cat: "condiment", name: "فلفل سیاه", kcal: 251, protein: 10.4, carb: 64, fat: 3.3 },
  { id: "zardchoobe", cat: "condiment", name: "زردچوبه", kcal: 354, protein: 7.8, carb: 65, fat: 10 },
  { id: "golpar", cat: "condiment", name: "گلپر", kcal: 300, protein: 10, carb: 55, fat: 12 },
  { id: "sumaq", cat: "condiment", name: "سماق", kcal: 165, protein: 5, carb: 50, fat: 10 },
  { id: "morgh-charkhkarde-abpaz", cat: "kabab", name: "مرغ چرخ‌کرده آب‌پز", kcal: 143, protein: 25, carb: 0, fat: 4.3 },
  { id: "morgh-charkhkarde-sorkhshode", cat: "kabab", name: "مرغ چرخ‌کرده سرخ‌شده", kcal: 190, protein: 24, carb: 1, fat: 10 },
  { id: "boghalamoon-sine-abpaz", cat: "kabab", name: "سینه بوقلمون آب‌پز", kcal: 135, protein: 30, carb: 0, fat: 1 },
  { id: "boghalamoon-ran-kababi", cat: "kabab", name: "ران بوقلمون کبابی", kcal: 208, protein: 24, carb: 0, fat: 12 },
  { id: "bal-kababi-sade", cat: "kabab", name: "بال مرغ کبابی ساده", kcal: 215, protein: 23.5, carb: 0.6, fat: 13.1 },
  { id: "gooshte-varagh-varagh", cat: "kabab", name: "گوشت ورقه‌ای کبابی", kcal: 240, protein: 25, carb: 0.5, fat: 15.5 },
  { id: "kabab-hoseini", cat: "kabab", name: "کباب حسینی", kcal: 255, protein: 23, carb: 1, fat: 17.5 },
  { id: "khoresh-alu-esfenaj", cat: "khoresh", name: "خورش آلو اسفناج", kcal: 150, protein: 9, carb: 11, fat: 8 },
  { id: "khoresh-holoo", cat: "khoresh", name: "خورش هلو", kcal: 165, protein: 9, carb: 15, fat: 9 },
  { id: "khoresh-be", cat: "khoresh", name: "خورش به", kcal: 158, protein: 8.5, carb: 14, fat: 8.5 },
  { id: "khoresh-rivas", cat: "khoresh", name: "خورش ریواس", kcal: 135, protein: 7.5, carb: 9, fat: 8 },
  { id: "mosama-bademjan", cat: "khoresh", name: "مسمای بادمجان", kcal: 170, protein: 9, carb: 10, fat: 10.5 },
  { id: "komaj", cat: "shirini", name: "کماج", kcal: 380, protein: 7, carb: 58, fat: 13 },
  { id: "shirini-berenji", cat: "shirini", name: "شیرینی برنجی", kcal: 455, protein: 4, carb: 68, fat: 18 },
  { id: "noon-panjere", cat: "shirini", name: "نان پنجره‌ای", kcal: 470, protein: 5, carb: 62, fat: 22 },
  { id: "masghati", cat: "shirini", name: "معصقتی (ماسقتی)", kcal: 300, protein: 3, carb: 68, fat: 3 },
  { id: "qottab-tabrizi", cat: "shirini", name: "قطاب تبریزی", kcal: 425, protein: 6, carb: 57, fat: 19 },
  { id: "chips-banana", cat: "snack-shoor", name: "چیپس موز", kcal: 519, protein: 2.3, carb: 58, fat: 33.6 },
  { id: "mغز-ajil-mخصوص", cat: "ajil", name: "مغز آجیل مخصوص (بی‌نمک)", kcal: 610, protein: 18, carb: 20, fat: 53 },
  { id: "keshmesh-pesteh-ajil", cat: "ajil", name: "کشمش پسته مخلوط", kcal: 420, protein: 10, carb: 50, fat: 20 },
  { id: "mast-yonani-kalleh", cat: "labaniat", name: "ماست یونانی کاله", kcal: 97, protein: 7, carb: 4, fat: 6 },
  { id: "panir-feta-kalleh", cat: "labaniat", name: "پنیر فتای کاله", kcal: 264, protein: 14, carb: 2.1, fat: 22 },
  { id: "shir-cocoa-kalleh", cat: "labaniat", name: "شیر کاکائویی کاله", kcal: 78, protein: 3.1, carb: 11, fat: 2.4 },
  { id: "ab-maadani-damavand", cat: "nooshidani", name: "آب معدنی دماوند", kcal: 0, protein: 0, carb: 0, fat: 0 },
  { id: "chai-golestan", cat: "nooshidani", name: "چای گلستان (دم‌کرده بدون شکر)", kcal: 1, protein: 0, carb: 0.2, fat: 0 },
  { id: "nabat-sadaf", cat: "shirini", name: "نبات صدف", kcal: 390, protein: 0, carb: 98, fat: 0 },
  { id: "sandwich-panir", cat: "fastfood", name: "ساندویچ پنیر و گوجه", kcal: 270, protein: 10, carb: 32, fat: 11 },
  { id: "lahmajoon", cat: "fastfood", name: "لحم‌عجین", kcal: 255, protein: 12, carb: 28, fat: 11 },
  { id: "manghal-kabab-sandwich", cat: "fastfood", name: "ساندویچ کباب کوبیده", kcal: 310, protein: 16, carb: 26, fat: 16 },
  { id: "kalue", cat: "nan", name: "کلوچه صبحانه ساده", kcal: 350, protein: 6, carb: 55, fat: 11 },
  { id: "nan-shirmal", cat: "nan", name: "نان شیرمال", kcal: 300, protein: 7, carb: 55, fat: 5 },
  { id: "nan-roghani", cat: "nan", name: "نان روغنی", kcal: 340, protein: 7, carb: 50, fat: 12 },
  { id: "gojeh-gilasi", cat: "vegetable", name: "گوجه گیلاسی", kcal: 18, protein: 0.9, carb: 3.9, fat: 0.2 },
  { id: "kalam-boroksel", cat: "vegetable", name: "کلم بروکسل", kcal: 43, protein: 3.4, carb: 9, fat: 0.3 },
  { id: "labu-pokhte", cat: "vegetable", name: "لبو (چغندر پخته)", kcal: 44, protein: 1.7, carb: 9.6, fat: 0.2 },
  { id: "annab", cat: "fruit", name: "عناب", kcal: 79, protein: 1.2, carb: 20.2, fat: 0.2 },
  { id: "tمر-hendi", cat: "fruit", name: "تمبر هندی", kcal: 239, protein: 2.8, carb: 62.5, fat: 0.6 },
  { id: "ash-mast", cat: "khoresh", name: "آش ماست", kcal: 95, protein: 4.5, carb: 11, fat: 3.8 },
  { id: "khoresh-sib", cat: "khoresh", name: "خورش سیب", kcal: 148, protein: 8, carb: 15, fat: 7 },
  { id: "morgh-shekam-por", cat: "kabab", name: "مرغ شکم‌پر", kcal: 245, protein: 22, carb: 6, fat: 15 },
  { id: "kotlet-morgh", cat: "kabab", name: "کتلت مرغ", kcal: 220, protein: 15, carb: 14, fat: 12 },
  { id: "kuku-morgh", cat: "kabab", name: "کوکو مرغ", kcal: 205, protein: 13, carb: 7, fat: 14 },
  { id: "dolme-felfel", cat: "kabab", name: "دلمه فلفل دلمه‌ای", kcal: 115, protein: 4, carb: 16, fat: 4 },
  { id: "dolme-kadoo", cat: "kabab", name: "دلمه کدو", kcal: 105, protein: 3.8, carb: 15, fat: 3.5 },
  { id: "panir-gorgonzola", cat: "labaniat", name: "پنیر گورگونزولا", kcal: 353, protein: 21, carb: 2.3, fat: 29 },
  { id: "panir-parmesan", cat: "labaniat", name: "پنیر پارمسان", kcal: 431, protein: 38, carb: 4.1, fat: 29 },
  { id: "panir-cheddar", cat: "labaniat", name: "پنیر چدار", kcal: 403, protein: 25, carb: 1.3, fat: 33 },
  { id: "mast-probiotic", cat: "labaniat", name: "ماست پروبیوتیک", kcal: 65, protein: 3.8, carb: 5.2, fat: 3 },
  { id: "abmive-anar-tabarok", cat: "nooshidani", name: "آبمیوه انار تبرک", kcal: 70, protein: 0.3, carb: 17, fat: 0.1 },
  { id: "chips-cheetoz-mخصوص", cat: "snack-shoor", name: "چیپس چی‌توز فلفلی", kcal: 545, protein: 5, carb: 57, fat: 33 },
  { id: "biscuit-petit-beurre", cat: "shirini", name: "بیسکویت پتی‌بور", kcal: 435, protein: 7, carb: 73, fat: 12 },
  { id: "wafer-jaanبو", cat: "shirini", name: "ویفر جانبو", kcal: 500, protein: 5, carb: 58, fat: 27 },
  { id: "shirini-zaban", cat: "shirini", name: "شیرینی زبان", kcal: 480, protein: 6, carb: 55, fat: 26 },
  { id: "khoresh-ghure", cat: "khoresh", name: "خورش قوره‌سبزی", kcal: 145, protein: 8.5, carb: 10, fat: 8 },
  { id: "panir-liqvan-sonati", cat: "sayer", name: "پنیر لیقوان سنتی", kcal: 275, protein: 16, carb: 2, fat: 23 },
  // مکمل ورزشی — پروتئین وی و گینر
  { id: "whey-kalleh", cat: "supplement", name: "پروتئین وی کاله پرو", kcal: 380, protein: 74, carb: 9, fat: 5.3 },
  { id: "gainer-kalleh", cat: "supplement", name: "گینر کاله پرو", kcal: 390, protein: 23, carb: 65, fat: 3.5 },
  { id: "whey-concentrate-generic", cat: "supplement", name: "پروتئین وی کنسانتره (عمومی)", kcal: 380, protein: 70, carb: 12, fat: 6 },
  { id: "whey-isolate-generic", cat: "supplement", name: "پروتئین وی ایزوله (عمومی)", kcal: 370, protein: 85, carb: 5, fat: 2 },
  { id: "whey-on-gold", cat: "supplement", name: "پروتئین وی وارداتی (مثل ON)", kcal: 400, protein: 80, carb: 10, fat: 3.3 },
  { id: "whey-pegah", cat: "supplement", name: "پروتئین وی پگاه", kcal: 375, protein: 78, carb: 8, fat: 4 },
  { id: "gainer-generic", cat: "supplement", name: "گینر عمومی (پرکربوهیدرات)", kcal: 378, protein: 15, carb: 75, fat: 3 },
  // کافه — نوشیدنی‌های کافی‌شاپی
  { id: "espresso", cat: "nooshidani", name: "اسپرسو (تک‌شات)", kcal: 3, protein: 0.3, carb: 0.5, fat: 0.1 },
  { id: "americano", cat: "nooshidani", name: "آمریکانو", kcal: 5, protein: 0.3, carb: 0.8, fat: 0.1 },
  { id: "cappuccino", cat: "nooshidani", name: "کاپوچینو", kcal: 62, protein: 3.3, carb: 4.8, fat: 3.3 },
  { id: "latte", cat: "nooshidani", name: "لاته", kcal: 60, protein: 3.2, carb: 4.6, fat: 3 },
  { id: "mocha", cat: "nooshidani", name: "موکا", kcal: 85, protein: 3, carb: 12, fat: 3.2 },
  { id: "hot-chocolate", cat: "nooshidani", name: "شکلات داغ", kcal: 95, protein: 3, carb: 14, fat: 3.2 },
  { id: "milkshake-vanilla", cat: "nooshidani", name: "میلک‌شیک وانیلی", kcal: 130, protein: 3.2, carb: 18, fat: 5 },
  { id: "milkshake-chocolate", cat: "nooshidani", name: "میلک‌شیک شکلاتی", kcal: 140, protein: 3.5, carb: 20, fat: 5.2 },
  { id: "milkshake-nutella", cat: "nooshidani", name: "میلک‌شیک نوتلایی", kcal: 165, protein: 3.8, carb: 21, fat: 7.5 },
  { id: "smoothie-mixed", cat: "nooshidani", name: "اسموتی میوه‌ای", kcal: 70, protein: 1, carb: 17, fat: 0.2 },
  { id: "iced-coffee", cat: "nooshidani", name: "آیس‌کافی", kcal: 55, protein: 2, carb: 8, fat: 1.8 },
  { id: "frappe", cat: "nooshidani", name: "فرپه", kcal: 90, protein: 2, carb: 15, fat: 2.5 },
  { id: "matcha-latte", cat: "nooshidani", name: "ماچا لاته", kcal: 65, protein: 3, carb: 9, fat: 2 },
  { id: "affogato", cat: "nooshidani", name: "آفوگاتو", kcal: 160, protein: 3.5, carb: 20, fat: 7.5 },
  // فودکورت مول‌ها
  { id: "boof-burger", cat: "fastfood", name: "همبرگر بوف", kcal: 310, protein: 18, carb: 26, fat: 16 },
  { id: "chicken-fastfood-mall", cat: "fastfood", name: "مرغ سوخاری فودکورت", kcal: 280, protein: 19, carb: 14, fat: 17 },
  { id: "subway-chicken", cat: "fastfood", name: "ساب‌وی مرغ", kcal: 220, protein: 14, carb: 28, fat: 6 },
  { id: "cinnabon-roll", cat: "fastfood", name: "سینابون رول دارچینی", kcal: 410, protein: 6, carb: 58, fat: 17 },
];

const DEFAULT_TARGETS = { kcal: 2200, protein: 130, carb: 260, fat: 70 };

// واحدهای رایج مصرف به‌ازای هر دسته (علاوه بر گرم) — برای تخمین سریع‌تر پرس غذا
const UNIT_PRESETS = {
  polo: [{ label: "بشقاب کوچک", grams: 180 }, { label: "بشقاب متوسط", grams: 250 }, { label: "بشقاب پر", grams: 350 }],
  khoresh: [{ label: "کاسه کوچک", grams: 150 }, { label: "کاسه متوسط", grams: 220 }, { label: "۱ ملاقه", grams: 120 }],
  kabab: [{ label: "۱ سیخ", grams: 100 }, { label: "۲ سیخ", grams: 200 }, { label: "پرس کامل", grams: 280 }],
  nan: [{ label: "۱ عدد کامل", grams: 120 }, { label: "نصف عدد", grams: 60 }, { label: "۱ برش", grams: 30 }],
  labaniat: [{ label: "۱ لیوان", grams: 200 }, { label: "۱ ق. غذاخوری", grams: 15 }, { label: "۱ برش", grams: 30 }],
  ajil: [{ label: "۱ مشت", grams: 30 }, { label: "۱ ق. غذاخوری", grams: 15 }, { label: "۱ فنجان", grams: 120 }],
  "snack-shoor": [{ label: "بسته کوچک", grams: 30 }, { label: "بسته متوسط", grams: 60 }, { label: "نصف خانواده", grams: 100 }],
  shirini: [{ label: "۱ عدد", grams: 40 }, { label: "۱ برش", grams: 70 }, { label: "۲ عدد", grams: 80 }],
  nooshidani: [{ label: "۱ لیوان", grams: 200 }, { label: "۱ قوطی", grams: 330 }, { label: "نصف لیوان", grams: 100 }],
  fastfood: [{ label: "۱ پرس", grams: 250 }, { label: "نصف پرس", grams: 125 }],
  sausage: [{ label: "۱ عدد", grams: 50 }, { label: "۳ برش", grams: 60 }],
  canned: [{ label: "۱ قوطی", grams: 150 }, { label: "۱ ق. غذاخوری", grams: 15 }],
  condiment: [{ label: "۱ ق. غذاخوری", grams: 15 }, { label: "۱ ق. چای‌خوری", grams: 5 }],
  fruit: [{ label: "۱ عدد متوسط", grams: 150 }, { label: "نصف عدد", grams: 75 }],
  vegetable: [{ label: "۱ عدد متوسط", grams: 120 }, { label: "نصف عدد", grams: 60 }],
  grain: [{ label: "۱ پیمانه", grams: 200 }, { label: "۱ ق. غذاخوری", grams: 15 }],
  brand: [{ label: "۱ بسته/قوطی", grams: 100 }, { label: "نصف بسته", grams: 50 }],
  sayer: [{ label: "۱ کاسه", grams: 150 }],
  cafe: [{ label: "۱ لیوان کوچک", grams: 200 }, { label: "۱ لیوان بزرگ", grams: 350 }, { label: "۱ پرس", grams: 250 }],
  supplement: [{ label: "۱ اسکوپ", grams: 30 }, { label: "۲ اسکوپ", grams: 60 }],
  supplement: [{ label: "۱ اسکوپ (۳۰گ)", grams: 30 }, { label: "۲ اسکوپ", grams: 60 }],
  cafe: [{ label: "لیوان کوچک", grams: 150 }, { label: "لیوان متوسط", grams: 240 }, { label: "لیوان بزرگ", grams: 350 }],
};
const RING_COLORS = { protein: "#C1443B", carb: "#E8A93A", fat: "#8FA05E" };
const MEALS = [
  { id: "sobhane", label: "صبحانه", Icon: ISunrise },
  { id: "nahar", label: "ناهار", Icon: ISun },
  { id: "sham", label: "شام", Icon: IMoon },
  { id: "mianvade", label: "میان‌وعده", Icon: ICookie },
];

function defaultMeal() {
  const h = new Date().getHours();
  if (h < 11) return "sobhane";
  if (h < 16) return "nahar";
  if (h < 21) return "sham";
  return "mianvade";
}

const toFa = (n) => Number(n || 0).toLocaleString("fa-IR", { maximumFractionDigits: 1 });

/* ------------------------------------------------------------------ */
/*  ابزارهای مشترک انیمیشن                                             */
/* ------------------------------------------------------------------ */

function useCountUp(target, duration = 500) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);
  useEffect(() => {
    const from = prevRef.current;
    const to = target;
    if (from === to) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prevRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return display;
}

function Collapse({ open, children }) {
  return (
    <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows .32s cubic-bezier(.16,1,.3,1)" }}>
      <div style={{ overflow: "hidden", minHeight: 0 }}>{children}</div>
    </div>
  );
}
const round = (n) => Math.round(n * 10) / 10;
const dateKey = (d) => {\n  const y = d.getFullYear();\n  const m = String(d.getMonth() + 1).padStart(2, "0");\n  const day = String(d.getDate()).padStart(2, "0");\n  return `${y}-${m}-${day}`;\n};
const faDate = (d) => new Intl.DateTimeFormat("fa-IR", { weekday: "long", day: "numeric", month: "long" }).format(d);
const faDateShort = (d) => new Intl.DateTimeFormat("fa-IR", { weekday: "short" }).format(d);
const isToday = (d) => dateKey(d) === dateKey(new Date());

/* ------------------------------------------------------------------ */
/*  ذخیره‌سازی محلی (localStorage — این نسخه‌ی مستقل HTML است)          */
/* ------------------------------------------------------------------ */

const STORAGE_PREFIX = "sofreh:";
function storageGet(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function storageSet(key, value) {
  try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); }
  catch (e) { console.error("storage set failed", e); }
}

/* ------------------------------------------------------------------ */
/*  توست                                                               */
/* ------------------------------------------------------------------ */

function Toast({ toast, onUndo, onDismiss }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-24 inset-x-0 flex justify-center z-50 px-4 pointer-events-none">
      <div className="pointer-events-auto max-w-md w-full bg-[var(--card-bg-strong)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg" style={{animation:"fadeIn .25s ease"}}>
        <span className="text-[14px] text-[var(--ink)]">{toast.message}</span>
        <div className="flex items-center gap-3">
          {toast.onUndo && (
            <button onClick={onUndo} className="flex items-center gap-1 text-[13px] text-[#E8A93A] font-medium">
              <IUndo size={13} /> بازگردانی
            </button>
          )}
          <button onClick={onDismiss} className="text-[var(--ink-3)]"><IX size={14} /></button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  بشقاب ماکرو - المان امضادار                                        */
/* ------------------------------------------------------------------ */

function StarMotif({ opacity = 0.05, size = 300 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="absolute pointer-events-none" style={{ opacity }}>
      <g stroke="#E8A93A" strokeWidth="0.6" fill="none">
        <rect x="20" y="20" width="60" height="60" />
        <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
        <circle cx="50" cy="50" r="42" />
      </g>
    </svg>
  );
}

function MacroPlate({ kcalTotal, kcalTarget, protein, carb, fat, targets }) {
  const animatedKcal = useCountUp(kcalTotal, 550);
  const size = 208;
  const cx = size / 2;
  const cy = size / 2;
  const rings = [
    { key: "protein", value: protein, target: targets.protein, r: 90, color: RING_COLORS.protein },
    { key: "carb", value: carb, target: targets.carb, r: 74, color: RING_COLORS.carb },
    { key: "fat", value: fat, target: targets.fat, r: 58, color: RING_COLORS.fat },
  ];
  const over = kcalTotal > kcalTarget;

  return (
    <div className="relative flex items-center justify-center pop-in plate-glow" style={{ width: size, height: size }}>
      <StarMotif size={size + 40} />
      <svg width={size} height={size} className="absolute inset-0" style={{transform:"rotate(-90deg)"}}>
        <circle cx={cx} cy={cy} r={101} fill="none" stroke="#E8A93A" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="1 7" strokeLinecap="round" />
        {rings.map((ring) => {
          const circumference = 2 * Math.PI * ring.r;
          const pct = Math.min(ring.value / ring.target, 1);
          return (
            <g key={ring.key}>
              <circle cx={cx} cy={cy} r={ring.r} fill="none" stroke="var(--track)" strokeWidth="9" />
              <circle cx={cx} cy={cy} r={ring.r} fill="none" stroke={ring.color} strokeWidth="9"
                strokeDasharray={circumference} strokeDashoffset={circumference * (1 - pct)}
                strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.6s ease" }} />
            </g>
          );
        })}
      </svg>
      <div className="flex flex-col items-center z-10">
        <span className="text-[12px] tracking-wide text-[var(--ink-label2)]">کالری</span>
        <span className={"font-mono text-3xl font-semibold leading-tight " + (over ? "text-[#C43B30]" : "text-[var(--ink)]")}>
          {toFa(Math.round(animatedKcal))}
        </span>
        <span className="text-[12px] text-[var(--ink-2)] font-mono">/ {toFa(kcalTarget)}</span>
      </div>
    </div>
  );
}

function MacroBar({ label, value, target, color }) {
  const pct = Math.min((value / target) * 100, 100);
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[13.5px] text-[var(--ink-label)]">{label}</span>
        <span className="font-mono text-[12.5px] text-[var(--ink-2)]">
          {toFa(Math.round(value))}<span className="text-[var(--ink-3)]">/{toFa(target)}گ</span>
        </span>
      </div>
      <div className="h-[6px] rounded-full bg-[var(--input-bg-strong)] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: pct + "%", backgroundColor: color, transition: "width .5s ease" }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  نمودار هفتگی (SVG ساده، بدون کتابخانه‌ی جانبی)                     */
/* ------------------------------------------------------------------ */

function WeeklyChart({ centerDate, targetKcal }) {
  const data = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(centerDate);
      d.setDate(d.getDate() - i);
      days.push(d);
    }
    return days.map((d) => {
      const log = storageGet("log:" + dateKey(d), []);
      return { label: faDateShort(d), kcal: log.reduce((s, e) => s + (e.kcal || 0), 0), today: isToday(d) };
    });
  }, [dateKey(centerDate), targetKcal]);

  const max = Math.max(targetKcal, ...data.map((d) => d.kcal), 1);

  return (
    <div className="flex items-end gap-2 h-28 px-1">
      {data.map((row, i) => {
        const h = Math.max((row.kcal / max) * 100, 2);
        const color = row.today ? "#E8A93A" : row.kcal > targetKcal ? "#C1443B" : "#C9BBA0";
        return (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            <div className="w-full rounded-t-md transition-all" style={{ height: h + "%", backgroundColor: color, minHeight: 2 }} />
            <span className="text-[11px] text-[var(--ink-2)] mt-1.5">{row.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ردیف آیتم غذا در فهرست جستجو                                       */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  انتخاب‌گر واحد + تعداد (مثلاً «۲ لیوان» یا «۳ عدد تخم‌مرغ»)         */
/* ------------------------------------------------------------------ */

function UnitQtyControl({ cat, grams, onGramsChange }) {
  const units = UNIT_PRESETS[cat] || [];
  const [mode, setMode] = useState("grams");
  const [qty, setQty] = useState(1);
  const activeUnit = units.find((u) => u.label === mode);

  useEffect(() => {
    if (activeUnit) onGramsChange(activeUnit.grams * qty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, qty]);

  return (
    <div>
      {units.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto pb-2.5 no-scrollbar">
          {units.map((u) => (
            <button key={u.label} onClick={() => { setMode(u.label); setQty(1); }}
              className={"shrink-0 px-3 py-1.5 rounded-full text-[13.5px] border transition-all duration-150 " + (mode === u.label ? "bg-[#E8A93A] border-[#E8A93A] text-[#1C1610] font-medium scale-105" : "border-[var(--card-border)] text-[var(--ink-2)] bg-[var(--card-bg-soft)] active:scale-95")}>
              {u.label}
            </button>
          ))}
          <button onClick={() => setMode("grams")}
            className={"shrink-0 px-3 py-1.5 rounded-full text-[13.5px] border transition-all duration-150 " + (mode === "grams" ? "bg-[#E8A93A] border-[#E8A93A] text-[#1C1610] font-medium scale-105" : "border-[var(--card-border)] text-[var(--ink-2)] bg-[var(--card-bg-soft)] active:scale-95")}>
            گرم دلخواه
          </button>
        </div>
      )}
      {activeUnit ? (
        <div className="flex items-center justify-center gap-4 py-1.5">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 rounded-full bg-[var(--input-bg-strong)] flex items-center justify-center text-[20px] text-[var(--ink)] active:scale-90 transition-transform">−</button>
          <div className="flex flex-col items-center min-w-[64px]">
            <span className="font-mono text-[20px] text-[var(--ink)] font-semibold leading-tight">{toFa(qty)}</span>
            <span className="text-[12px] text-[var(--ink-2)] font-mono">{toFa(grams)} گرم</span>
          </div>
          <button onClick={() => setQty((q) => q + 1)}
            className="w-10 h-10 rounded-full bg-[#E8A93A] flex items-center justify-center text-[20px] text-[#1C1610] active:scale-90 transition-transform">+</button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <input type="range" min="10" max="500" step="10" value={grams}
            onChange={(e) => onGramsChange(Number(e.target.value))} className="flex-1" />
          <span className="font-mono text-[15px] text-[var(--ink)] w-16 text-left">{toFa(grams)} گ</span>
        </div>
      )}
    </div>
  );
}

function FoodPickerRow({ food, onAdd }) {
  const [grams, setGrams] = useState(100);
  const [open, setOpen] = useState(false);
  const factor = grams / 100;

  return (
    <div className="border-b border-[var(--card-border)] py-3">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between text-right">
        <div>
          <div className="text-[16.5px] text-[var(--ink)] font-medium flex items-center gap-1.5">
            {food.name}
            {food.custom && <span className="text-[10px] bg-[#8FA05E]/20 text-[#5C7A3E] px-1.5 py-0.5 rounded-full font-normal">شخصی</span>}
          </div>
          <div className="text-[13.5px] text-[var(--ink-2)] font-mono mt-0.5">{toFa(food.kcal)} کالری / ۱۰۰گ</div>
        </div>
        <IChevronDown size={17} className={"text-[var(--ink-2)] transition-transform duration-200 " + (open ? "rotate-180" : "")} />
      </button>
      <Collapse open={open}>
        <div className="mt-3">
          <UnitQtyControl cat={food.cat} grams={grams} onGramsChange={setGrams} />
          <button
            onClick={() => { onAdd({ ...food, grams, kcal: food.kcal * factor, protein: food.protein * factor, carb: food.carb * factor, fat: food.fat * factor }); setOpen(false); setGrams(100); }}
            className="mt-2 w-full flex items-center justify-center gap-1.5 bg-[#C1443B] text-white rounded-xl py-2.5 text-[14.5px] font-medium active:scale-[0.97] transition-transform"
          >
            <IPlus size={15} /> افزودن به لیست
          </button>
        </div>
      </Collapse>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  تب افزودن غذا                                                       */
/* ------------------------------------------------------------------ */

function AddFoodTab({ onAdd, frequent, savedMeals, onAddSavedMeal, onDeleteSavedMeal, onOpenMealBuilder, customFoods, onSaveCustomFood }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [manual, setManual] = useState(false);
  const [form, setForm] = useState({ name: "", kcal: "", protein: "", carb: "", fat: "" });

  const allFoods = useMemo(() => [...FOOD_DB, ...customFoods], [customFoods]);

  const results = useMemo(() => {
    let list = allFoods;
    if (cat !== "all") {
      const group = CATS.find((c) => c.id === cat);
      list = list.filter((f) => group && group.cats.includes(f.cat));
    }
    if (query.trim()) list = list.filter((f) => f.name.includes(query.trim()));
    return list;
  }, [allFoods, query, cat]);

  const submitManual = () => {
    if (!form.name || !form.kcal) return;
    const custom = {
      id: "custom-" + Date.now(), cat: "sayer", custom: true,
      name: form.name, kcal: Number(form.kcal) || 0, protein: Number(form.protein) || 0,
      carb: Number(form.carb) || 0, fat: Number(form.fat) || 0,
    };
    onSaveCustomFood(custom);
    onAdd({ ...custom, grams: 100 });
    setForm({ name: "", kcal: "", protein: "", carb: "", fat: "" });
    setManual(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl px-3 py-2.5 mb-3">
        <ISearch size={16} className="text-[var(--ink-2)] shrink-0" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجوی غذا یا اسنک؛ مثلاً «تخمه» یا «کباب»"
          className="bg-transparent outline-none text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-3)] w-full" />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-3 -mx-4 px-4 no-scrollbar">
        <button onClick={() => setCat("all")}
          className={"shrink-0 px-3 py-1.5 rounded-full text-[13.5px] border " + (cat === "all" ? "bg-[#E8A93A] border-[#E8A93A] text-[#1C1610] font-medium" : "border-[var(--card-border)] text-[var(--ink-2)]")}>
          همه
        </button>
        {CATS.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={"shrink-0 px-3 py-1.5 rounded-full text-[13.5px] border " + (cat === c.id ? "bg-[#E8A93A] border-[#E8A93A] text-[#1C1610] font-medium" : "border-[var(--card-border)] text-[var(--ink-2)]")}>
            {c.label}
          </button>
        ))}
      </div>

      {!query && cat === "all" && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <IBookmark size={12} className="text-[#E8A93A]" />
              <span className="text-[13px] text-[var(--ink-2)]">وعده‌های من</span>
            </div>
            <button onClick={onOpenMealBuilder} className="text-[12.5px] text-[#E8A93A] flex items-center gap-1">
              <IPlus size={12} /> وعده‌ی جدید
            </button>
          </div>
          {savedMeals.length === 0 ? (
            <p className="text-[12.5px] text-[var(--ink-3)]">چند غذا را با هم ترکیب کن و برای دفعات بعد ذخیره کن.</p>
          ) : (
            <div className="flex gap-2 overflow-x-auto -mx-4 px-4 no-scrollbar">
              {savedMeals.map((m) => (
                <div key={m.id} className="shrink-0 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-xl px-3 py-2 relative">
                  <button onClick={() => onAddSavedMeal(m)} className="text-right active:scale-95 transition">
                    <div className="text-[13.5px] text-[var(--ink)] whitespace-nowrap pl-4">{m.name}</div>
                    <div className="text-[11.5px] text-[var(--ink-3)] font-mono">{m.items.length} قلم</div>
                  </button>
                  <button onClick={() => onDeleteSavedMeal(m.id)} className="absolute top-1.5 left-1.5 text-[var(--ink-3)]"><IX size={11} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!query && cat === "all" && frequent.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <IStar size={12} className="text-[#E8A93A]" />
            <span className="text-[13px] text-[var(--ink-2)]">پراستفاده‌های تو</span>
          </div>
          <div className="flex gap-2 overflow-x-auto -mx-4 px-4 no-scrollbar">
            {frequent.map((f) => (
              <button key={f.id} onClick={() => onAdd({ ...f, grams: 100 })}
                className="shrink-0 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-xl px-3 py-2 text-right active:scale-95 transition">
                <div className="text-[13.5px] text-[var(--ink)] whitespace-nowrap">{f.name}</div>
                <div className="text-[11.5px] text-[var(--ink-3)] font-mono">{toFa(f.kcal)} کالری</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <button onClick={() => setManual((m) => !m)} className="text-[14px] text-[#E8A93A] flex items-center gap-1 mb-2">
        <IImagePlus size={14} />
        {manual ? "بستن افزودن دستی" : "غذای این لیست نیست؟ افزودن دستی"}
      </button>

      {manual && (
        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-3 mb-4 space-y-2">
          <input placeholder="نام غذا" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-black/5 rounded-lg px-3 py-2 text-[14px] text-[var(--ink)] outline-none border border-[var(--card-border)]" />
          <div className="grid grid-cols-4 gap-2">
            {["kcal", "protein", "carb", "fat"].map((k) => (
              <input key={k} placeholder={{ kcal: "کالری", protein: "پروتئین", carb: "کربو", fat: "چربی" }[k]}
                inputMode="decimal" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                className="bg-black/5 rounded-lg px-2 py-2 text-[13px] text-[var(--ink)] outline-none border border-[var(--card-border)] text-center" />
            ))}
          </div>
          <p className="text-[12px] text-[var(--ink-3)]">مقادیر بر اساس ۱۰۰ گرم وارد شود — این غذا برای همیشه ذخیره می‌شود و دفعات بعد هم قابل جستجوست</p>
          <button onClick={submitManual} className="w-full bg-[#8FA05E] text-[#1C1610] font-medium rounded-lg py-2 text-[14px] active:scale-[0.98] transition">افزودن به لیست</button>
        </div>
      )}

      <div>
        {results.length === 0 && <p className="text-[14px] text-[var(--ink-2)] text-center py-6">چیزی پیدا نشد</p>}
        {results.map((f) => <FoodPickerRow key={f.id} food={f} onAdd={onAdd} />)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  تب اسکن عکس غذا با هوش مصنوعی — کلید فقط روی Cloudflare Worker نگهداری می‌شود */
/* ------------------------------------------------------------------ */

function PhotoScanTab({ onAdd }) {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [grams, setGrams] = useState(250);
  const [error, setError] = useState("");
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setImage({ base64, mime: file.type, preview: reader.result });
      setResult(null);
      setError("");
      setStatus("idle");
    };
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!image) return;
    setStatus("loading");
    setError("");
    try {
      const data = await callAI({
        action: "analyze-food",
        image: { data: image.base64, mime: image.mime || "image/jpeg" },
      });
      setResult(data.result);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setError(e.message || "خطا در ارتباط با هوش مصنوعی");
      setStatus("error");
    }
  };

  const factor = grams / 100;

  return (
    <div>
      <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-3 mb-4 flex items-start gap-2">
        <IAlert size={15} className="text-[#E8A93A] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[var(--ink-2)]">تشخیص غذا با ChatGPT انجام می‌شود. کلید API در مرورگر ذخیره نمی‌شود و فقط سرور واسط به آن دسترسی دارد.</p>
      </div>
      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-700 rounded-xl p-3 mb-3 text-[13px]">{error}</div>}
      <div className="border border-dashed border-[var(--border-dash)] rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-3 mb-3 overflow-hidden bg-[var(--card-bg)] backdrop-blur-xl">
        {image ? <img src={image.preview} alt="غذای انتخاب‌شده" className="w-full h-full object-cover" /> : (
          <>
            <ICamera size={30} className="text-[var(--ink-2)]" />
            <span className="text-[14px] text-[var(--ink-2)]">عکس غذا را بگیر یا از گالری انتخاب کن</span>
          </>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button onClick={() => cameraRef.current?.click()} className="flex items-center justify-center gap-1.5 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-xl py-2.5 text-[14px] text-[var(--ink)] active:scale-[0.98] transition"><ICamera size={15} /> گرفتن عکس</button>
        <button onClick={() => galleryRef.current?.click()} className="flex items-center justify-center gap-1.5 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-xl py-2.5 text-[14px] text-[var(--ink)] active:scale-[0.98] transition"><IImagePlus size={15} /> انتخاب از گالری</button>
      </div>
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      <input ref={galleryRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      <button disabled={!image || status === "loading"} onClick={analyze} className="w-full bg-[#E8A93A] text-[#1C1610] font-medium rounded-xl py-3 text-[15px] disabled:opacity-40 active:scale-[0.98] transition flex items-center justify-center gap-2">
        {status === "loading" ? <><ILoader size={16} className="animate-spin" /> در حال تحلیل...</> : "تشخیص غذا و محاسبه ماکرو"}
      </button>

      {result && (
        <div className="mt-4 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[16px] font-semibold text-[var(--ink)]">{result.name}</div>
            <span className="text-[11px] text-[var(--ink-3)]">اعتماد: {result.confidence || "medium"}</span>
          </div>
          <p className="text-[12px] text-[var(--ink-2)] mb-4">{result.note || "مقادیر تخمینی هستند."}</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[["کالری", result.kcal, "kcal"], ["پروتئین", result.protein, "g"], ["کربوهیدرات", result.carb, "g"], ["چربی", result.fat, "g"]].map(([label, value, unit]) => (
              <div key={label} className="bg-black/5 rounded-xl p-2 text-center">
                <div className="text-[10px] text-[var(--ink-3)]">{label}</div>
                <div className="font-mono text-[14px] text-[var(--ink)]">{Number(value || 0).toFixed(1)}{unit === "kcal" ? "" : ""}</div>
                <div className="text-[9px] text-[var(--ink-3)]">{unit}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[13px] text-[var(--ink-2)]">وزن:</span>
            <input type="number" min="1" value={grams} onChange={(e) => setGrams(Number(e.target.value) || 1)} className="w-24 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-lg px-2 py-1.5 text-[14px] text-[var(--ink)] font-mono text-center" />
            <span className="text-[13px] text-[var(--ink-2)]">گرم</span>
          </div>
          <div className="text-[12px] text-[var(--ink-2)] mb-3">برای این مقدار: {Math.round((result.kcal || 0) * factor)} kcal · پروتئین {((result.protein || 0) * factor).toFixed(1)}g · کربوهیدرات {((result.carb || 0) * factor).toFixed(1)}g · چربی {((result.fat || 0) * factor).toFixed(1)}g</div>
          <button onClick={() => onAdd({ id: "ai-" + Date.now(), name: result.name, kcal: (result.kcal || 0) * factor, protein: (result.protein || 0) * factor, carb: (result.carb || 0) * factor, fat: (result.fat || 0) * factor, grams, meal: "snack", source: "ai" })} className="w-full bg-[#8FA05E] text-[#1C1610] font-medium rounded-xl py-2.5 text-[14px]">افزودن به امروز</button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  اپلیکیشن اصلی                                                       */
/* ------------------------------------------------------------------ */

function ChatAssistantTab({ targets, entries }) {
  const [messages, setMessages] = useState(() => storageGet("aiChat", [{ role: "assistant", content: "سلام. من دستیار تغذیه‌ی «سفره‌ی من» هستم. درباره‌ی کالری، ماکروها و انتخاب غذا از من بپرس." }]));
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    storageSet("aiChat", messages);
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const recentEntries = entries.slice(-20).map((e) => ({ name: e.name, grams: e.grams, kcal: e.kcal, protein: e.protein, carb: e.carb, fat: e.fat }));
      const data = await callAI({
        action: "chat",
        messages: next.slice(-12),
        context: { targets, today: recentEntries },
      });
      setMessages((prev) => [...prev, { role: "assistant", content: data.text || "پاسخی دریافت نشد." }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, { role: "assistant", content: "خطا در اتصال به دستیار. تنظیمات سرور API را بررسی کن." }]);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => setMessages([{ role: "assistant", content: "گفت‌وگو پاک شد. سؤال جدیدت را بپرس." }]);

  return (
    <div className="flex flex-col h-[calc(100vh-190px)] min-h-[520px]">
      <div className="flex items-center justify-between mb-3">
        <div><div className="text-[18px] font-semibold text-[var(--ink)]">دستیار تغذیه</div><div className="text-[11px] text-[var(--ink-3)]">مخصوص کالری و غذاهای ایرانی</div></div>
        <button onClick={clear} className="text-[12px] text-[var(--ink-2)] bg-[var(--input-bg-strong)] rounded-lg px-3 py-1.5">پاک کردن</button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3">
        {messages.map((m, i) => (
          <div key={i} className={"flex " + (m.role === "user" ? "justify-start" : "justify-end")}>
            <div className={(m.role === "user" ? "bg-[#E8A93A] text-[#1C1610]" : "bg-[var(--card-bg)] text-[var(--ink)] border border-[var(--card-border)]") + " rounded-2xl px-3.5 py-2.5 max-w-[88%] text-[13px] leading-7 whitespace-pre-wrap"}>{m.content}</div>
          </div>
        ))}
        {loading && <div className="flex justify-end"><div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl px-4 py-3"><ILoader size={16} className="animate-spin text-[var(--ink-2)]" /></div></div>}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2 bg-[var(--card-bg-strong)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="مثلاً: برای ۱۸۰۰ کالری چه بخورم؟" className="flex-1 bg-transparent px-2 text-[13px] text-[var(--ink)] outline-none" />
        <button onClick={send} disabled={!input.trim() || loading} className="bg-[#8FA05E] text-[#1C1610] rounded-xl px-4 py-2 text-[13px] font-medium disabled:opacity-40">ارسال</button>
      </div>
    </div>
  );
}

function TodayList({ entries, onRemove }) {
  const grouped = MEALS.map((meal) => ({
    ...meal,
    items: entries.filter((entry) => entry.meal === meal.id),
  })).filter((meal) => meal.items.length > 0);

  if (entries.length === 0) {
    return (
      <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-6 text-center">
        <div className="text-[15px] text-[var(--ink)] font-medium mb-1">
          هنوز غذایی ثبت نشده
        </div>
        <div className="text-[12px] text-[var(--ink-2)]">
          از بخش «افزودن» اولین غذای امروزت را ثبت کن.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {grouped.map((meal) => {
        const MealIcon = meal.Icon;
        const mealKcal = meal.items.reduce(
          (sum, item) => sum + (item.kcal || 0),
          0
        );

        return (
          <div
            key={meal.id}
            className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E8A93A]/20 flex items-center justify-center">
                  <MealIcon size={15} className="text-[#B9791F]" />
                </div>

                <span className="text-[14px] font-medium text-[var(--ink)]">
                  {meal.label}
                </span>
              </div>

              <span className="text-[12px] font-mono text-[var(--ink-2)]">
                {toFa(Math.round(mealKcal))} کالری
              </span>
            </div>

            <div className="space-y-2">
              {meal.items.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-3 py-2 border-t border-[var(--card-border)]"
                >
                  <div className="min-w-0">
                    <div className="text-[14px] text-[var(--ink)] truncate">
                      {entry.name}
                    </div>

                    <div className="text-[11px] text-[var(--ink-2)] font-mono mt-0.5">
                      {entry.grams ? `${toFa(entry.grams)} گرم · ` : ""}
                      {toFa(Math.round(entry.kcal || 0))} kcal
                    </div>
                  </div>

                  <button
                    onClick={() => onRemove(entry)}
                    className="shrink-0 w-8 h-8 rounded-full bg-[var(--input-bg-strong)] flex items-center justify-center text-[var(--ink-2)]"
                    title="حذف"
                  >
                    <ITrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}


function WeightTracker() {
  const [items, setItems] = useState(() => storageGet("weights", []));
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(() => dateKey(new Date()));

  const save = () => {
    const value = Number(weight);
    if (!Number.isFinite(value) || value <= 0 || value > 500) return;

    setItems((prev) => {
      const next = [...prev.filter((x) => x.date !== date), { date, weight: value }]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-90);
      storageSet("weights", next);
      return next;
    });
    setWeight("");
  };

  const remove = (targetDate) => {
    setItems((prev) => {
      const next = prev.filter((x) => x.date !== targetDate);
      storageSet("weights", next);
      return next;
    });
  };

  const recent = items.slice(-7).reverse();
  const latest = items[items.length - 1]?.weight;
  const previous = items.length > 1 ? items[items.length - 2]?.weight : null;
  const delta = latest != null && previous != null ? latest - previous : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[13.5px] text-[var(--ink)] font-medium">پیگیری وزن</div>
          <div className="text-[11px] text-[var(--ink-3)]">ثبت وزن روی همین مرورگر ذخیره می‌شود.</div>
        </div>
        {latest != null && (
          <div className="text-left">
            <div className="font-mono text-[17px] text-[var(--ink)]">{toFa(latest)} kg</div>
            {delta != null && (
              <div className={"text-[11px] font-mono " + (delta > 0 ? "text-[#C1443B]" : delta < 0 ? "text-[#5C7A3E]" : "text-[var(--ink-3)]")}>
                {delta > 0 ? "+" : ""}{toFa(round(delta))} kg
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-3">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="min-w-0 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-lg px-2 py-2 text-[12px] text-[var(--ink)]"
        />
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          min="1"
          max="500"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="وزن (kg)"
          className="min-w-0 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-lg px-2 py-2 text-[13px] text-[var(--ink)] font-mono"
        />
        <button onClick={save} className="bg-[#E8A93A] text-[#1C1610] rounded-lg px-3 py-2 text-[13px] font-medium">
          ثبت
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="text-[12px] text-[var(--ink-3)] text-center py-3">هنوز وزنی ثبت نشده است.</div>
      ) : (
        <div className="space-y-1.5">
          {recent.map((item) => (
            <div key={item.date} className="flex items-center justify-between bg-[var(--input-bg)] rounded-lg px-3 py-2">
              <span className="text-[12px] text-[var(--ink-2)]">{item.date}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[13px] text-[var(--ink)]">{toFa(item.weight)} kg</span>
                <button onClick={() => remove(item.date)} className="text-[var(--ink-3)]" aria-label="حذف">
                  <IX size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BarcodeScanTab({ onAdd }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanTimerRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    scanTimerRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const findLocal = (value) => {
    const normalized = String(value || "").trim();
    const match = FOOD_DB.find((f) => f.barcode && String(f.barcode) === normalized);
    if (match) {
      setResult(match);
      setStatus("found");
      return;
    }
    setResult(null);
    setStatus("not-found");
  };

  const startCamera = async () => {
    setError("");
    setStatus("starting");

    if (!("BarcodeDetector" in window)) {
      setStatus("unsupported");
      setError("مرورگر فعلی BarcodeDetector را پشتیبانی نمی‌کند. بارکد را دستی وارد کن.");
      return;
    }

    try {
      const detector = new window.BarcodeDetector();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setStatus("scanning");

      const scan = async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) {
          scanTimerRef.current = setTimeout(scan, 250);
          return;
        }
        try {
          const codes = await detector.detect(videoRef.current);
          if (codes.length) {
            const value = codes[0].rawValue || "";
            setCode(value);
            stopCamera();
            findLocal(value);
            return;
          }
        } catch (_) {}
        scanTimerRef.current = setTimeout(scan, 250);
      };
      scan();
    } catch (e) {
      setStatus("error");
      setError(e?.message || "دسترسی به دوربین امکان‌پذیر نیست.");
      stopCamera();
    }
  };

  const addFound = () => {
    if (!result) return;
    onAdd({ ...result, grams: 100 });
    setResult(null);
    setCode("");
    setStatus("idle");
  };

  return (
    <div className="space-y-3">
      <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <IBarcode size={18} className="text-[#E8A93A]" />
          <div className="text-[15px] font-medium text-[var(--ink)]">اسکن بارکد</div>
        </div>
        <p className="text-[12px] text-[var(--ink-2)] leading-6">
          بارکد را با دوربین اسکن کن یا شماره‌ی آن را دستی وارد کن. پایگاه فعلی فقط بارکدهایی را که در بانک غذا تعریف شده‌اند شناسایی می‌کند.
        </p>

        <div className="flex gap-2 mt-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            inputMode="numeric"
            placeholder="مثلاً 626..."
            className="flex-1 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl px-3 py-2.5 text-[14px] text-[var(--ink)] font-mono"
          />
          <button onClick={() => findLocal(code)} className="bg-[#E8A93A] text-[#1C1610] rounded-xl px-4 text-[13px] font-medium">
            بررسی
          </button>
        </div>

        <div className="flex gap-2 mt-2">
          <button onClick={startCamera} disabled={status === "scanning" || status === "starting"} className="flex-1 bg-[var(--input-bg-strong)] text-[var(--ink)] rounded-xl py-2.5 text-[13px]">
            <ICamera size={14} className="inline ml-1" /> شروع دوربین
          </button>
          {status === "scanning" && (
            <button onClick={() => { stopCamera(); setStatus("idle"); }} className="bg-[#C1443B] text-white rounded-xl px-4 text-[13px]">
              توقف
            </button>
          )}
        </div>

        {status === "scanning" && (
          <video ref={videoRef} muted playsInline className="w-full rounded-xl mt-3 bg-black aspect-video object-cover" />
        )}

        {error && <div className="text-[12px] text-[#C1443B] mt-2">{error}</div>}
      </div>

      {result && (
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4">
          <div className="text-[15px] text-[var(--ink)] font-medium">{result.name}</div>
          <div className="text-[12px] text-[var(--ink-2)] font-mono mt-1">
            {toFa(result.kcal)} kcal / 100g · P {toFa(result.protein)} · C {toFa(result.carb)} · F {toFa(result.fat)}
          </div>
          <button onClick={addFound} className="w-full mt-3 bg-[#8FA05E] text-[#1C1610] rounded-xl py-2.5 text-[13px] font-medium">
            افزودن به امروز
          </button>
        </div>
      )}
    </div>
  );
}

function MealBuilderModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);

  const foods = useMemo(() => {
    const q = query.trim();
    return (q ? FOOD_DB.filter((f) => f.name.includes(q)) : FOOD_DB).slice(0, 80);
  }, [query]);

  const toggle = (food) => {
    setSelected((prev) => {
      const exists = prev.find((x) => x.id === food.id);
      if (exists) return prev.filter((x) => x.id !== food.id);
      return [...prev, { ...food, grams: 100 }];
    });
  };

  const setGrams = (id, grams) => {
    setSelected((prev) => prev.map((x) => x.id === id ? { ...x, grams: Math.max(1, Number(grams) || 1) } : x));
  };

  const save = () => {
    if (!name.trim() || selected.length === 0) return;
    const items = selected.map((x) => {
      const factor = x.grams / 100;
      return {
        ...x,
        id: "meal-" + Date.now() + "-" + Math.random().toString(36).slice(2),
        kcal: x.kcal * factor,
        protein: x.protein * factor,
        carb: x.carb * factor,
        fat: x.fat * factor,
      };
    });
    onSave({ id: "saved-" + Date.now(), name: name.trim(), items });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md max-h-[88vh] overflow-hidden bg-[var(--modal-bg)] rounded-t-3xl p-4 modal-sheet">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[16px] font-medium text-[var(--ink)]">ساخت وعده‌ی ذخیره‌شده</div>
          <button onClick={onClose}><IX size={18} className="text-[var(--ink-2)]" /></button>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثلاً صبحانه‌ی همیشگی"
          className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl px-3 py-2.5 text-[14px] text-[var(--ink)] mb-2"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی غذا برای اضافه‌کردن..."
          className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl px-3 py-2.5 text-[13px] text-[var(--ink)] mb-3"
        />

        <div className="max-h-[42vh] overflow-y-auto space-y-1">
          {foods.map((food) => {
            const item = selected.find((x) => x.id === food.id);
            return (
              <div key={food.id} className="flex items-center gap-2 py-2 border-b border-[var(--card-border)]">
                <button onClick={() => toggle(food)} className={"w-7 h-7 rounded-lg border flex items-center justify-center " + (item ? "bg-[#E8A93A] border-[#E8A93A]" : "border-[var(--card-border)]")}>
                  {item && <ICheck size={15} />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-[var(--ink)] truncate">{food.name}</div>
                  <div className="text-[10px] text-[var(--ink-3)] font-mono">{toFa(food.kcal)} kcal/100g</div>
                </div>
                {item && (
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={item.grams}
                    onChange={(e) => setGrams(food.id, e.target.value)}
                    className="w-20 bg-[var(--input-bg)] rounded-lg px-2 py-1.5 text-[12px] text-[var(--ink)] font-mono text-center"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--card-border)]">
          <span className="text-[12px] text-[var(--ink-2)]">{toFa(selected.length)} قلم انتخاب شده</span>
          <button disabled={!name.trim() || selected.length === 0} onClick={save} className="bg-[#E8A93A] disabled:opacity-40 text-[#1C1610] rounded-xl px-5 py-2.5 text-[13px] font-medium">
            ذخیره وعده
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState(() => storageGet("log:" + dateKey(new Date()), []));
  const [targets, setTargets] = useState(() => storageGet("targets", DEFAULT_TARGETS));
  const [frequency, setFrequency] = useState(() => storageGet("frequency", {}));
  const [theme, setTheme] = useState(() => storageGet("theme", "light"));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    storageSet("theme", theme);
  }, [theme]);
  const [tab, setTab] = useState("today");
  const [showTargets, setShowTargets] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);
  const [toast, setToast] = useState(null);
  const [pendingMeal, setPendingMeal] = useState(defaultMeal());
  const [savedMeals, setSavedMeals] = useState(() => storageGet("savedMeals", []));
  const [customFoods, setCustomFoods] = useState(() => storageGet("customFoods", []));
  const [showMealBuilder, setShowMealBuilder] = useState(false);
  const [streak, setStreak] = useState(0);
  const toastTimer = useRef(null);
  const importRef = useRef(null);

  const key = dateKey(date);

  useEffect(() => { setEntries(storageGet("log:" + key, [])); }, [key]);

  useEffect(() => {
    // شمارش زنجیره‌ی روزهای متوالی ثبت‌شده
    let count = 0;
    const todayHasEntries = storageGet("log:" + dateKey(new Date()), []).length > 0;
    let cursor = new Date();
    if (!todayHasEntries) cursor.setDate(cursor.getDate() - 1);
    while (true) {
      const has = storageGet("log:" + dateKey(cursor), []).length > 0;
      if (!has) break;
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    setStreak(count);
  }, [entries]);

  const showToast = (message, onUndo) => {
    clearTimeout(toastTimer.current);
    setToast({ message, onUndo });
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  };

  const addEntry = useCallback((entry) => {
    const withMeta = { ...entry, id: entry.id || Date.now() + "", ts: Date.now(), meal: entry.meal || pendingMeal };
    setEntries((prev) => {
      const next = [...prev, withMeta];
      storageSet("log:" + key, next);
      return next;
    });
    setFrequency((prev) => {
      const next = { ...prev, [withMeta.name]: (prev[withMeta.name] || 0) + 1 };
      storageSet("frequency", next);
      return next;
    });
    setTab("today");
    showToast("«" + withMeta.name + "» افزوده شد");
  }, [key, pendingMeal]);

  const removeEntry = useCallback((entry) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== entry.id);
      storageSet("log:" + key, next);
      return next;
    });
    showToast("«" + entry.name + "» حذف شد", () => {
      setEntries((prev) => {
        const next = [...prev, entry];
        storageSet("log:" + key, next);
        return next;
      });
      setToast(null);
    });
  }, [key]);

  const addSavedMeal = useCallback((meal) => {
    const withMeta = meal.items.map((i) => ({ ...i, id: "mealitem-" + Date.now() + "-" + Math.random().toString(36).slice(2), ts: Date.now(), meal: pendingMeal }));
    setEntries((prev) => {
      const next = [...prev, ...withMeta];
      storageSet("log:" + key, next);
      return next;
    });
    setTab("today");
    showToast("«" + meal.name + "» (" + meal.items.length + " قلم) افزوده شد");
  }, [key, pendingMeal]);

  const saveMealPreset = useCallback((meal) => {
    setSavedMeals((prev) => {
      const next = [...prev, meal];
      storageSet("savedMeals", next);
      return next;
    });
  }, []);

  const saveCustomFood = useCallback((food) => {
    setCustomFoods((prev) => {
      if (prev.some((f) => f.name === food.name)) return prev;
      const next = [...prev, food];
      storageSet("customFoods", next);
      return next;
    });
  }, []);

  const deleteMealPreset = useCallback((id) => {
    setSavedMeals((prev) => {
      const next = prev.filter((m) => m.id !== id);
      storageSet("savedMeals", next);
      return next;
    });
  }, []);

  const exportBackup = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX)) data[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sofreh-backup-" + dateKey(new Date()) + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importBackup = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        Object.keys(data).forEach((k) => { if (k.startsWith(STORAGE_PREFIX)) localStorage.setItem(k, data[k]); });
        window.location.reload();
      } catch (e) { showToast("فایل پشتیبان معتبر نیست"); }
    };
    reader.readAsText(file);
  };

  const totals = useMemo(() => entries.reduce((acc, e) => ({
    kcal: acc.kcal + (e.kcal || 0), protein: acc.protein + (e.protein || 0),
    carb: acc.carb + (e.carb || 0), fat: acc.fat + (e.fat || 0),
  }), { kcal: 0, protein: 0, carb: 0, fat: 0 }), [entries]);

  const frequentFoods = useMemo(() => {
    const names = Object.entries(frequency).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([n]) => n);
    const allFoods = [...FOOD_DB, ...customFoods];
    return names.map((n) => allFoods.find((f) => f.name === n)).filter(Boolean);
  }, [frequency, customFoods]);

  const changeDay = (delta) => { const d = new Date(date); d.setDate(d.getDate() + delta); setDate(d); };
  const saveTargets = (t) => { setTargets(t); storageSet("targets", t); setShowTargets(false); };

  const TABS = [
    { id: "today", label: "امروز", Icon: IUtensils },
    { id: "add", label: "افزودن", Icon: IPlus },
    { id: "photo", label: "اسکن عکس", Icon: ICamera },
    { id: "barcode", label: "بارکد", Icon: IBarcode },
    { id: "ai", label: "دستیار", Icon: IMessage },
  ];

  return (
    <div dir="rtl" className="min-h-screen w-full">
      <div className="blob" style={{ top: "-60px", right: "-40px", width: 220, height: 220, background: "#E8A93A", opacity: 0.28, animation: "floatBlob1 14s ease-in-out infinite" }} />
      <div className="blob" style={{ top: "220px", left: "-60px", width: 200, height: 200, background: "#C1443B", opacity: 0.2, animation: "floatBlob2 17s ease-in-out infinite" }} />
      <div className="blob" style={{ bottom: "80px", right: "10px", width: 180, height: 180, background: "#8FA05E", opacity: 0.22, animation: "floatBlob3 19s ease-in-out infinite" }} />
      <div className="max-w-md mx-auto px-4 pb-28 pt-6 relative" style={{ zIndex: 1 }}>
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => setShowTargets(true)} className="p-2.5 rounded-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] active:scale-90 transition">
            <ISettings size={16} className="text-[var(--ink-2)]" />
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <div className="text-[17px] text-[var(--ink)] font-semibold">سفره‌ی من</div>
              {streak > 1 && (
                <span className="flex items-center gap-0.5 bg-[#E8A93A]/20 text-[#B9791F] text-[11.5px] font-mono px-1.5 py-0.5 rounded-full">
                  <IFlame size={10} /> {toFa(streak)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 justify-center mt-0.5">
              <button onClick={() => changeDay(-1)}><IChevronRight size={16} className="text-[var(--ink-2)]" /></button>
              <span className="text-[13px] text-[var(--ink-2)]">{isToday(date) ? "امروز، " : ""}{faDate(date)}</span>
              <button onClick={() => changeDay(1)} disabled={isToday(date)} className={isToday(date) ? "opacity-30" : ""}>
                <IChevronLeft size={16} className="text-[var(--ink-2)]" />
              </button>
            </div>
          </div>
          <button onClick={() => setShowWeekly((s) => !s)} className={"p-2.5 rounded-full border active:scale-90 transition " + (showWeekly ? "bg-[#E8A93A] border-[#E8A93A]" : "bg-[var(--card-bg)] backdrop-blur-xl border-[var(--card-border)]")}>
            <ITrending size={16} className={showWeekly ? "text-[#1C1610]" : "text-[#E8A93A]"} />
          </button>
        </div>

        <div className="flex justify-center mb-5">
          <MacroPlate kcalTotal={totals.kcal} kcalTarget={targets.kcal} protein={totals.protein} carb={totals.carb} fat={totals.fat} targets={targets} />
        </div>

        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-4 mb-4 space-y-3.5">
          <MacroBar label="پروتئین" value={totals.protein} target={targets.protein} color={RING_COLORS.protein} />
          <MacroBar label="کربوهیدرات" value={totals.carb} target={targets.carb} color={RING_COLORS.carb} />
          <MacroBar label="چربی" value={totals.fat} target={targets.fat} color={RING_COLORS.fat} />
        </div>

        {showWeekly && (
          <div className="space-y-4 mb-5 tab-content">
            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-4">
              <div className="text-[13.5px] text-[var(--ink-2)] mb-1">کالری ۷ روز اخیر</div>
              <WeeklyChart centerDate={date} targetKcal={targets.kcal} />
            </div>
            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-4">
              <WeightTracker />
            </div>
          </div>
        )}

        {(tab === "add" || tab === "photo" || tab === "barcode") && (
          <div className="flex gap-2 mb-4">
            {MEALS.map((m) => {
              const MIcon = m.Icon;
              const active = pendingMeal === m.id;
              return (
                <button key={m.id} onClick={() => setPendingMeal(m.id)}
                  className={"flex-1 flex flex-col items-center gap-1 rounded-xl py-2 border text-[12px] transition " + (active ? "bg-[#E8A93A] border-[#E8A93A] text-[#1C1610]" : "bg-[var(--card-bg)] backdrop-blur-xl border-[var(--card-border)] text-[var(--ink-2)]")}>
                  <MIcon size={14} />
                  {m.label}
                </button>
              );
            })}
          </div>
        )}

        <div key={tab} className="tab-content">
          {tab === "today" && <TodayList entries={entries} onRemove={removeEntry} />}
          {tab === "add" && (
            <AddFoodTab
              onAdd={addEntry}
              frequent={frequentFoods}
              savedMeals={savedMeals}
              onAddSavedMeal={addSavedMeal}
              onDeleteSavedMeal={deleteMealPreset}
              onOpenMealBuilder={() => setShowMealBuilder(true)}
              customFoods={customFoods}
              onSaveCustomFood={saveCustomFood}
            />
          )}
          {tab === "photo" && <PhotoScanTab onAdd={addEntry} />}
          {tab === "barcode" && <BarcodeScanTab onAdd={addEntry} />}
          {tab === "ai" && <ChatAssistantTab targets={targets} entries={entries} />}
        </div>
      </div>

      {showMealBuilder && (
        <MealBuilderModal onClose={() => setShowMealBuilder(false)} onSave={saveMealPreset} />
      )}

      <div className="fixed bottom-0 inset-x-0 bg-[var(--card-bg-strong)] backdrop-blur-xl border-t border-[var(--card-border)] z-10">
        <div className="max-w-md mx-auto grid grid-cols-5 relative">
          <span className="absolute top-0 h-[3px] rounded-full bg-[#E8A93A] transition-all duration-300"
            style={{ width: "20%", right: (TABS.findIndex((t) => t.id === tab) * 20) + "%" }} />
          {TABS.map((t) => {
            const TIcon = t.Icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className={"relative flex flex-col items-center gap-1 py-3 transition-all duration-200 " + (active ? "text-[#E8A93A] scale-105" : "text-[var(--ink-3)]")}>
                <TIcon size={19} />
                <span className="text-[12px] font-medium">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Toast toast={toast} onUndo={() => toast?.onUndo?.()} onDismiss={() => setToast(null)} />

      {showTargets && (
        <div className="fixed inset-0 bg-black/60 flex items-end z-50" onClick={() => setShowTargets(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md mx-auto bg-[var(--card-bg)] backdrop-blur-xl border-t border-[var(--card-border)] rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto modal-sheet">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[16px] text-[var(--ink)] font-medium">تنظیمات</span>
              <button onClick={() => setShowTargets(false)}><IX size={18} className="text-[var(--ink-2)]" /></button>
            </div>
            <TargetsForm targets={targets} onSave={saveTargets} onExport={exportBackup} onImport={importBackup} theme={theme} onSetTheme={setTheme} />
          </div>
        </div>
      )}
    </div>
  );
}

function TargetsForm({ targets, onSave, onExport, onImport, theme, onSetTheme }) {
  const [t, setT] = useState(targets);
  const importInputRef = useRef(null);
  const THEMES = [
    { id: "light", label: "روشن", colors: ["#F6F0E4", "#E8A93A", "#C1443B"] },
    { id: "dark", label: "تیره", colors: ["#17120D", "#E8A93A", "#8FA05E"] },
    { id: "ocean", label: "اقیانوسی", colors: ["#EAF4F5", "#2D9CB2", "#3A6EA5"] },
  ];
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="text-[13px] text-[var(--ink-2)]">تم اپ</div>
        <div className="grid grid-cols-3 gap-2">
          {THEMES.map((th) => (
            <button key={th.id} onClick={() => onSetTheme(th.id)}
              className={"rounded-xl p-2.5 border-2 transition-all " + (theme === th.id ? "border-[#E8A93A] scale-105" : "border-transparent")}
              style={{ background: th.colors[0] }}>
              <div className="flex gap-1 justify-center mb-1.5">
                {th.colors.slice(1).map((c, i) => <span key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
              </div>
              <span className="text-[11.5px] font-medium" style={{ color: th.id === "dark" ? "#F3E9D8" : "#241A10" }}>{th.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3 pt-2 border-t border-[var(--card-border)]">
        <div className="text-[13px] text-[var(--ink-2)] pt-3">هدف‌های روزانه</div>
        {[["kcal", "کالری"], ["protein", "پروتئین (گرم)"], ["carb", "کربوهیدرات (گرم)"], ["fat", "چربی (گرم)"]].map(([k, label]) => (
          <div key={k} className="flex items-center justify-between">
            <span className="text-[14px] text-[var(--ink-label)]">{label}</span>
            <input type="number" value={t[k]} onChange={(e) => setT({ ...t, [k]: Number(e.target.value) })}
              className="w-24 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-lg px-2 py-1.5 text-[14px] text-[var(--ink)] font-mono text-center" />
          </div>
        ))}
        <button onClick={() => onSave(t)} className="w-full bg-[#E8A93A] text-[#1C1610] font-medium rounded-xl py-2.5 text-[15px] active:scale-[0.98] transition">ذخیره هدف‌ها</button>
      </div>
      <div className="space-y-2 pt-2 border-t border-[var(--card-border)]">
        <div className="text-[13px] text-[var(--ink-2)] pt-3">هوش مصنوعی</div>
        <p className="text-[12px] text-[var(--ink-3)]">اسکن عکس و دستیار تغذیه از ChatGPT استفاده می‌کنند. کلید API داخل این اپ ذخیره یا در کد frontend قرار نگرفته است؛ سرور واسط آن را به‌صورت Secret نگه می‌دارد.</p>
      </div>
      <div className="space-y-2 pt-2 border-t border-[var(--card-border)]">
        <div className="text-[13px] text-[var(--ink-2)] pt-3">پشتیبان‌گیری</div>
        <p className="text-[12px] text-[var(--ink-3)]">چون اطلاعات فقط روی همین مرورگر ذخیره می‌شود، بهتر است هر چند وقت یک‌بار از آن نسخه‌ی پشتیبان بگیری.</p>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={onExport} className="flex items-center justify-center gap-1.5 bg-[var(--input-bg-strong)] text-[var(--ink)] font-medium rounded-xl py-2.5 text-[14px] active:scale-[0.98] transition">
            <IDownload size={14} /> دانلود پشتیبان
          </button>
          <button onClick={() => importInputRef.current?.click()} className="flex items-center justify-center gap-1.5 bg-[var(--input-bg-strong)] text-[var(--ink)] font-medium rounded-xl py-2.5 text-[14px] active:scale-[0.98] transition">
            <IUpload size={14} /> بازیابی از فایل
          </button>
        </div>
        <input ref={importInputRef} type="file" accept="application/json" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onImport(f); }} />
      </div>
    </div>
  );
}

window.__APP_MOUNTED__ = true;
document.getElementById("root").replaceChildren();
createRoot(document.getElementById("root")).render(<App />);
