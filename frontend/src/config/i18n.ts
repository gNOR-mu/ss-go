import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from '@/assets/locales/es.json';
import en from '@/assets/locales/en.json';

// Recuperar el idioma guardado en localStorage o usar 'es' por defecto
const savedLanguage = localStorage.getItem('user_language') || 'es';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: es },
            en: { translation: en }
        },
        lng: savedLanguage,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false
        }
    });

// Guardar automáticamente en localStorage cuando el usuario cambie de idioma
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('user_language', lng);
});

export default i18n;
