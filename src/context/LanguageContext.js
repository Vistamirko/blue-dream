"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  it: {
    nav_home: "Home",
    nav_fleet: "Flotta",
    nav_itineraries: "Itinerari",
    nav_booking: "Prenota",
    nav_prices: "Prezzi",
    nav_about: "Chi Siamo",
    nav_contacts: "Contatti",
    footer_tagline: "Noleggio monoscafi e catamarani a vela a Procida, nel cuore del Golfo di Napoli. Scegli l'eccellenza per le tue vacanze.",
    footer_contacts: "Contatti",
    footer_legal: "© 2026 Blue Dream Charter & Service. Tutti i diritti riservati. P.IVA 04712491218.",
    base_location: "Sede Operativa: Via Roma, 2 (Marina Grande), 80079 Isola di Procida (NA)",
    hero_title: "Vivi il sogno in barca a vela",
    hero_subtitle: "Noleggio esclusivo di barche a vela e catamarani a Procida.",
    hero_search_btn: "Trova la tua Barca",
    search_departure: "Partenza",
    search_duration: "Durata",
    search_guests: "Ospiti",
    search_skipper: "Skipper richiesto",
    search_submit: "Cerca Disponibilità",
    featured_yachts: "Le Nostre Imbarcazioni In Evidenza",
    featured_yachts_subtitle: "Scegli il modello ideale per la tua prossima avventura marina",
    view_details: "Dettagli Barca",
    quick_contact: "Contattaci su WhatsApp"
  },
  en: {
    nav_home: "Home",
    nav_fleet: "Fleet",
    nav_itineraries: "Itineraries",
    nav_booking: "Book Now",
    nav_prices: "Prices",
    nav_about: "About Us",
    nav_contacts: "Contacts",
    footer_tagline: "Sailing yachts and catamarans rental in Procida, heart of the Gulf of Naples. Choose excellence for your holidays.",
    footer_contacts: "Contacts",
    footer_legal: "© 2026 Blue Dream Charter & Service. All rights reserved. P.IVA 04712491218.",
    base_location: "Base Address: Via Roma, 2 (Marina Grande), 80079 Isola di Procida (NA) Italy",
    hero_title: "Live the Blue Dream",
    hero_subtitle: "Exclusive sailing yacht and catamaran charter in Procida.",
    hero_search_btn: "Find Your Boat",
    search_departure: "Departure",
    search_duration: "Duration",
    search_guests: "Guests",
    search_skipper: "Skipper required",
    search_submit: "Search Availability",
    featured_yachts: "Our Featured Yachts",
    featured_yachts_subtitle: "Choose the perfect model for your next sea adventure",
    view_details: "View Details",
    quick_contact: "Contact on WhatsApp"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('it');

  useEffect(() => {
    const savedLang = localStorage.getItem('blue_dream_lang');
    if (savedLang && (savedLang === 'it' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('blue_dream_lang', lang);
  };

  const t = (key) => {
    return translations[language][key] || translations['it'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
