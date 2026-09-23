import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      sidebar: {
        dashboard: "Dashboard",
        myFarm: "My Farm",
        diseaseDetection: "Disease Detection",
        cropAdvisory: "Crop Advisory",
        weather: "Weather & Forecast",
        marketPrices: "Market Prices",
        knowledgeHub: "Knowledge Hub",
        expertConnect: "Expert Connect",
        alerts: "My Alerts",
        settings: "Settings"
      },
      topbar: {
        searchPlaceholder: "Search village, district or farm location...",
        talkToSaathi: "Talk to Saathi",
        hello: "Hello, Farmer"
      }
    }
  },
  hi: {
    translation: {
      sidebar: {
        dashboard: "डैशबोर्ड",
        myFarm: "मेरा खेत",
        diseaseDetection: "रोग पहचान",
        cropAdvisory: "फसल सलाह",
        weather: "मौसम और पूर्वानुमान",
        marketPrices: "बाजार भाव",
        knowledgeHub: "ज्ञान केंद्र",
        expertConnect: "विशेषज्ञ संपर्क",
        alerts: "मेरे अलर्ट",
        settings: "सेटिंग्स"
      },
      topbar: {
        searchPlaceholder: "गांव, जिला या खेत खोजें...",
        talkToSaathi: "साथी से बात करें",
        hello: "नमस्ते, किसान"
      }
    }
  },
  gu: {
    translation: {
      sidebar: {
        dashboard: "ડેશબોર્ડ",
        myFarm: "મારું ખેતર",
        diseaseDetection: "રોગની તપાસ",
        cropAdvisory: "પાક સલાહ",
        weather: "હવામાન",
        marketPrices: "બજાર ભાવ",
        knowledgeHub: "જ્ઞાન કેન્દ્ર",
        expertConnect: "નિષ્ણાત સંપર્ક",
        alerts: "મારી ચેતવણીઓ",
        settings: "સેટિંગ્સ"
      },
      topbar: {
        searchPlaceholder: "ગામ, જિલ્લો અથવા ખેતર શોધો...",
        talkToSaathi: "સાથી સાથે વાત કરો",
        hello: "નમસ્તે, ખેડૂત"
      }
    }
  },
  // Architecture is ready for MR, BN, TA, TE, KN, ML, PA, OR, AS
  // They will fallback to English until exact translations are added to this object
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;