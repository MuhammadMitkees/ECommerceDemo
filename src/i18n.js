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
      home: "Home",
      supermarket: "Supermarket",
      toys_games: "Toys & Games",
      perfumes: "Perfumes",
      laptops: "Laptops",
      tablets: "Tablets",
      // NotFound page translations
      "Oops! You're floating in space!": "Oops! You're floating in space!",
      "Looks like this page got lost in the cosmic void. Our astronaut couldn't find it either!":
        "Looks like this page got lost in the cosmic void. Our astronaut couldn't find it either!",
      "Return to Earth (Home)": "Return to Earth (Home)",
      "Go Back": "Go Back",
      "Fun fact: In space, no one can hear you 404":
        "Fun fact: In space, no one can hear you 404",
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
      home: "المنزل",
      supermarket: "السوبر ماركت",
      toys_games: "الألعاب",
      perfumes: "العطور",
      laptops: " الكمبيوترات المحمولة",
      tablets: "الأجهزة اللوحية",
      // NotFound page translations
      "Oops! You're floating in space!": "عفوًا! أنت تطفو في الفضاء!",
      "Looks like this page got lost in the cosmic void. Our astronaut couldn't find it either!":
        "يبدو أن هذه الصفحة قد فُقدت في الفراغ الكوني. رائد الفضاء لدينا لم يتمكن من العثور عليها أيضًا!",
      "Return to Earth (Home)": "العودة إلى الأرض (الصفحة الرئيسية)",
      "Go Back": "العودة",
      "Fun fact: In space, no one can hear you 404":
        "حقيقة ممتعة: في الفضاء، لا يمكن لأحد أن يسمع خطأ 404",
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
