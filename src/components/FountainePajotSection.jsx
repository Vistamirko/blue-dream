"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function FountainePajotSection() {
  const { language } = useLanguage();

  return (
    <section className="w-full relative py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-[1240px] w-[calc(100%-40px)] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text & Logo Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            <span className="text-[12px] font-bold text-[#83776D] uppercase tracking-[2.4px] mb-6 block">
              {language === 'it' ? 'Partner Ufficiale' : 'Official Partner'}
            </span>
            
            <h2 className="text-[#070c26] text-[32px] md:text-[44px] font-medium leading-[1.2] mb-6">
              {language === 'it' 
                ? 'Siamo dealer ufficiali di' 
                : 'We are official dealers of'}
            </h2>
            
            <div className="mb-8">
              <img 
                className="logo max-w-full" 
                width="220" 
                height="auto" 
                src="https://www.fountaine-pajot.com/wp-content/themes/fountaine-pajot/assets/images/logo-fountaine-pajot-corpo.svg" 
                alt="Fountaine Pajot" 
              />
            </div>
            
            <p className="text-[#696d78] text-[16px] md:text-[18px] leading-[1.6] max-w-[500px] mb-8">
              {language === 'it'
                ? "Scopri l'eleganza, lo spazio e le prestazioni incomparabili dei catamarani Fountaine Pajot. Dalla vendita all'allestimento, ti accompagniamo in ogni passo per realizzare il tuo sogno sul mare."
                : "Discover the elegance, space, and incomparable performance of Fountaine Pajot catamarans. From sales to fitting, we accompany you every step of the way to realize your dream on the sea."}
            </p>
            
            <Link href="/la-flotta-blue-dream-charter?type=catamarano" className="inline-flex items-center justify-center bg-[#070c26] text-white rounded-xl px-8 py-4 text-[16px] font-semibold hover:bg-[#0052b4] transition-all duration-300">
              {language === 'it' ? 'Esplora i Catamarani' : 'Explore Catamarans'}
            </Link>
          </div>

          {/* Beautiful Photo */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-[30px] overflow-hidden shadow-2xl aspect-[4/3] group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
              <img 
                src="/uploads/2022/03/margarita-8.jpg" 
                alt="Fountaine Pajot Catamaran" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#E1EEFE] rounded-full z-[-1] opacity-70"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[rgba(0,77,178,0.1)] rounded-full z-[-1]"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
