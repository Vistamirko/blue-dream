"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Compass } from 'lucide-react';

export default function ExperiencesSection() {
  const { language } = useLanguage();

  const experiences = [
    {
      id: 'marine-biology',
      title: language === 'it' ? 'Alla Scoperta della Biologia Marina' : 'Discovering Marine Biology',
      subtitle: language === 'it' ? 'Aggiungi alla tua prenotazione' : 'Add to your booking',
      image: '/images/campus-biologia-marina.jpg',
    },
    {
      id: 'bio-archaeology',
      title: language === 'it' ? 'Vacanza Bio-Archeologica: Alla scoperta di relitti fantastici con il ROV' : 'Bio-Archaeological Holiday: Discovering fantastic shipwrecks with ROV',
      subtitle: language === 'it' ? 'Aggiungi alla tua prenotazione' : 'Add to your booking',
      image: '/images/relitto-santa-lucia.webp',
    }
  ];

  return (
    <section id="esperienze" className="bg-[#070c26] py-20 lg:py-32 w-full overflow-hidden">
      <div className="max-w-[1240px] w-[calc(100%-40px)] mx-auto">
        <div className="flex max-lg:flex-col items-start md:items-center gap-10 lg:gap-24">
          
          {/* Left Text Block */}
          <div className="max-lg:w-full flex flex-col gap-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex max-lg:items-center lg:flex-col gap-4">
                <div className="bg-white/10 p-3 rounded-xl w-fit">
                  <Compass className="text-white" size={32} />
                </div>
                <h2 className="text-2xl lg:text-[40px] flex max-lg:flex-col leading-[1.2] lg:gap-1.5 text-white">
                  {language === 'it' ? 'Esplora le' : 'Explore'}{' '}
                  <b className="font-bold">{language === 'it' ? 'Esperienze' : 'Experiences'}</b>
                </h2>
              </div>
              <Link 
                href="/esperienze" 
                className="text-[13px] w-max lg:hidden flex items-center gap-1.5 group text-white"
                aria-label={language === 'it' ? 'Scopri di più' : 'Discover more'}
              >
                <span className="underline">{language === 'it' ? 'Scopri di più' : 'Discover more'}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            <p className="max-w-[300px] text-sm lg:text-[16px] text-white/70 mt-2">
              {language === 'it' 
                ? 'Arricchisci la tua crociera aggiungendo esperienze uniche alla tua prenotazione.'
                : 'Enhance your cruise by adding unique experiences to your booking.'}
            </p>
            <Link 
              href="/esperienze" 
              className="w-max lg:flex hidden items-center justify-center text-[#070c26] text-[15px] font-medium bg-white px-6 py-3 rounded-xl transition-all duration-300 hover:bg-[#1b2c5a] hover:text-white mt-8"
            >
              {language === 'it' ? 'Scopri tutte le esperienze' : 'Discover all experiences'}
            </Link>
          </div>

          {/* Right Cards Slider/Grid */}
          <div className="w-full flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {experiences.map((exp) => (
                <Link 
                  key={exp.id}
                  href={`/esperienze/${exp.id}`}
                  className="flex relative rounded-[20px] overflow-hidden group aspect-[4/5] sm:aspect-square md:aspect-[3/4]"
                >
                  <div className="w-full flex flex-col relative before:content-[''] before:w-full before:h-[70%] before:bottom-0 before:absolute before:bg-gradient-to-t before:from-[#060B25] before:to-transparent before:left-0 group-hover:scale-105 transition-all duration-500 z-0">
                    <img 
                      src={exp.image} 
                      alt={exp.title} 
                      loading="lazy" 
                      className="w-full h-full object-cover" 
                      style={{ backgroundColor: 'rgb(240, 240, 240)' }} 
                    />
                    <div className="absolute top-0 left-0 w-full h-full p-6 md:p-8 flex flex-col justify-end z-10">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-white text-xl md:text-2xl font-bold">{exp.title}</h3>
                        <div className="flex items-center justify-between z-[1]">
                          <p className="text-white/80 text-sm md:text-[15px]">{exp.subtitle}</p>
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-[#070c26] text-white transition-all duration-300">
                            <ArrowRight size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
