import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  EN: {
    translation: {
      delivering_to: "Delivering to",
      update_location: "Update location",
      all: "All",
      hello_sign_in: "Hello,\nsign in",
      account_lists: "Account & Lists",
      orders: "Orders",
      cart: "Cart",
      search_placeholder: "Search Amazon.sa",
      todays_deals: "Today's Deals",
      mobile_phones: "Mobile Phones",
      electronics: "Electronics",
      home: "Home",
      supermarket: "Supermarket",
      toys_games: "Toys & Games",
      perfumes: "Perfumes",
    },
  },
  AR: {
    translation: {
      delivering_to: "التوصيل إلى",
      update_location: "تحديث الموقع",
      all: "الكل",
      hello_sign_in: "مرحبًا،\nتسجيل الدخول",
      account_lists: "الحساب والقوائم",
      orders: "الطلبات",
      cart: "عربة التسوق",
      search_placeholder: "ابحث في أمازون.السعودية",
      todays_deals: "عروض اليوم",
      mobile_phones: "الهواتف المحمولة",
      electronics: "الإلكترونيات",
      home: "المنزل",
      supermarket: "السوبر ماركت",
      toys_games: "الألعاب",
      perfumes: "العطور",
    },
  },
};

i18n
  .use(LanguageDetector) // detects user language
  .use(initReactI18next) // passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: "EN",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
