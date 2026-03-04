import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {

  en: {
translation: {
    welcome: "Book Trusted Pandits for Every Occasion",
    heroSubtitle: "Spiritual guidance and authentic rituals at your doorstep.",
    chatWithPandit: "Talk to Pandit",
    ourServices: "Our Services",
    ganeshPuja: "Ganesh Puja",
    satyanarayanPuja: "Satyanarayan Puja",
    vastuShanti: "Vastu Shanti",
    serviceDescription: "Experienced pandits conducting authentic rituals with proper vidhi.",
    bookNow: "Book Now",
    experiencedPandits: "Experienced Pandits",
    experiencedPanditsDesc: "Highly knowledgeable and traditionally trained.",
    verifiedProfiles: "Verified Profiles",
    verifiedProfilesDesc: "Background-checked and community trusted.",
    easyBooking: "Easy Booking",
    easyBookingDesc: "Simple and fast booking process.",
    readyToBegin: "Ready to Begin Your Spiritual Journey?",
    ctaSubtitle: "Connect with trusted pandits in minutes."
  }
  },
  hi: {
  translation: {
    welcome: "हर अवसर के लिए विश्वसनीय पंडित बुक करें",
    heroSubtitle: "आध्यात्मिक मार्गदर्शन और प्रामाणिक पूजा विधि आपके घर तक।",
    chatWithPandit: "पंडित से बात करें",
    ourServices: "हमारी सेवाएँ",
    ganeshPuja: "गणेश पूजा",
    satyanarayanPuja: "सत्यनारायण पूजा",
    vastuShanti: "वास्तु शांति",
    serviceDescription: "अनुभवी पंडित द्वारा शास्त्रों के अनुसार पूजा संपन्न की जाती है।",
    bookNow: "अभी बुक करें",
    experiencedPandits: "अनुभवी पंडित",
    experiencedPanditsDesc: "गहन ज्ञान और पारंपरिक प्रशिक्षण से युक्त।",
    verifiedProfiles: "सत्यापित प्रोफाइल",
    verifiedProfilesDesc: "समुदाय द्वारा विश्वसनीय और प्रमाणित।",
    easyBooking: "सरल बुकिंग प्रक्रिया",
    easyBookingDesc: "आसान और तेज़ बुकिंग अनुभव।",
    readyToBegin: "क्या आप अपनी आध्यात्मिक यात्रा शुरू करने के लिए तैयार हैं?",
    ctaSubtitle: "कुछ ही मिनटों में विश्वसनीय पंडित से जुड़ें।"
  }
  },
  mr: {
  translation: {
    welcome: "प्रत्येक प्रसंगासाठी विश्वासू पंडित बुक करा",
    heroSubtitle: "आध्यात्मिक मार्गदर्शन आणि शास्त्रोक्त पूजा विधी आपल्या घरी.",
    chatWithPandit: "पंडितांशी संवाद साधा",
    ourServices: "आमच्या सेवा",
    ganeshPuja: "गणेश पूजा",
    satyanarayanPuja: "सत्यनारायण पूजा",
    vastuShanti: "वास्तु शांती",
    serviceDescription: "अनुभवी पंडितांकडून शास्त्रानुसार पूजा विधी पार पाडले जातात.",
    bookNow: "आता बुक करा",
    experiencedPandits: "अनुभवी पंडित",
    experiencedPanditsDesc: "पारंपरिक शिक्षण व सखोल ज्ञान असलेले.",
    verifiedProfiles: "सत्यापित प्रोफाइल",
    verifiedProfilesDesc: "समाजमान्य आणि विश्वसनीय पंडित.",
    easyBooking: "सुलभ बुकिंग प्रक्रिया",
    easyBookingDesc: "जलद आणि सोपी बुकिंग व्यवस्था.",
    readyToBegin: "आपली आध्यात्मिक यात्रा सुरू करण्यास तयार आहात का?",
    ctaSubtitle: "काही मिनिटांत विश्वासू पंडितांशी संपर्क साधा."
  }
  }
};

i18n
  .use(initReactI18next)
  .init({
        lng: localStorage.getItem("lang") || "en",
    resources,

    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;