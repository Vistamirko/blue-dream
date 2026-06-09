"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { experiencesData } from '../../lib/experiencesData';
import { ArrowRight, Compass } from 'lucide-react';

export default function EsperienzePage() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#070c26] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070c26] to-transparent opacity-80 z-10" />
        <div className="container max-w-[1240px] w-[calc(100%-40px)] mx-auto relative z-20">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="bg-white/10 p-4 rounded-2xl">
              <Compass className="text-accent-gold w-10 h-10" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
              {language === 'it' ? 'Vivi il Mare a 360 Gradi' : 'Experience the Sea at 360 Degrees'}
            </h1>
            <p className="text-lg lg:text-xl text-white/70 max-w-2xl">
              {language === 'it' 
                ? 'Arricchisci la tua crociera aggiungendo esperienze uniche alla tua prenotazione. Scegli tra biologia marina e bio-archeologia.'
                : 'Enhance your cruise by adding unique experiences to your booking. Choose between marine biology and bio-archaeology.'}
            </p>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="pb-32">
        <div className="container max-w-[1240px] w-[calc(100%-40px)] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {experiencesData.map((exp) => (
              <Link 
                key={exp.id}
                href={`/esperienze/${exp.id}`}
                className="flex relative rounded-[32px] overflow-hidden group aspect-square md:aspect-[4/5] bg-[#0a1130] border border-white/5 shadow-2xl"
              >
                <div className="w-full flex flex-col relative before:content-[''] before:w-full before:h-full before:bottom-0 before:absolute before:bg-gradient-to-t before:from-[#070c26] before:via-[#070c26]/60 before:to-transparent before:left-0 group-hover:scale-105 transition-all duration-700 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={exp.images[0]} 
                    alt={language === 'it' ? exp.title.it : exp.title.en} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-700" 
                  />
                  <div className="absolute top-0 left-0 w-full h-full p-8 md:p-10 flex flex-col justify-end z-10">
                    <div className="flex flex-col gap-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="inline-flex px-4 py-1.5 rounded-full bg-accent-gold/20 backdrop-blur-md border border-accent-gold/30 text-accent-gold text-sm font-medium w-fit mb-2">
                        {language === 'it' ? exp.subtitle.it : exp.subtitle.en}
                      </div>
                      <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                        {language === 'it' ? exp.title.it : exp.title.en}
                      </h3>
                      <p className="text-white/70 line-clamp-2 mt-2">
                        {language === 'it' ? exp.description.it : exp.description.en}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                        <div className="flex-1 flex justify-between items-center">
                          <span className="text-white font-medium">
                            {language === 'it' ? 'Scopri i dettagli' : 'Discover details'}
                          </span>
                          <div className="w-12 h-12 rounded-full bg-accent-gold text-white flex items-center justify-center group-hover:bg-white group-hover:text-accent-gold transition-colors duration-300 shadow-lg">
                            <ArrowRight size={24} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
