"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import { experiencesData } from '../../../lib/experiencesData';
import { ChevronLeft, ChevronRight, MapPin, Gauge, Clock, CheckCircle2, Navigation, ArrowRight } from 'lucide-react';
import ExperienceWizard from '../../../components/ExperienceWizard';

export default function ExperienceDetail() {
  const params = useParams();
  const { language } = useLanguage();
  const [experience, setExperience] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingPanelOpen, setIsBookingPanelOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('1_week');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (params.slug) {
      const found = experiencesData.find(e => e.slug === params.slug);
      setExperience(found);
      
      // Select the longest available duration by default if 1_week is not available
      if (found && !found.itineraries['1_week']) {
         const durations = Object.keys(found.itineraries);
         if (durations.length > 0) setSelectedDuration(durations[durations.length - 1]);
      }
    }
  }, [params.slug]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070c26]">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-black text-white mb-6 tracking-tight">
            {language === 'it' ? 'Esperienza non trovata' : 'Experience not found'}
          </h1>
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-bold uppercase tracking-widest text-sm">
            <ChevronLeft size={18} />
            {language === 'it' ? 'Torna alla Home' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  const t = (obj) => obj[language] || obj['en'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % experience.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + experience.images.length) % experience.images.length);
  };

  const getDurationLabel = (key) => {
    const labels = {
      '1_day': language === 'it' ? '1 Giorno' : '1 Day',
      '2_days': language === 'it' ? '2 Giorni' : '2 Days',
      '1_week': language === 'it' ? '1 Settimana' : '1 Week'
    };
    return labels[key] || key;
  };

  return (
    <article className="bg-[#f8fafc] min-h-screen selection:bg-cyan-200 selection:text-cyan-900 pb-20 font-sans relative">
      
      {/* Immersive Hero Carousel */}
      <header className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-[#070c26]">
        {/* Carousel Background */}
        {experience.images.map((img, idx) => (
          <div 
            key={idx} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#070c26] via-[#070c26]/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070c26]/80 via-transparent to-transparent z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img} 
              alt={t(experience.title)} 
              className="h-full w-full object-cover transform scale-105 animate-slow-zoom"
            />
          </div>
        ))}

        {/* Carousel Controls */}
        {experience.images.length > 1 && (
          <div className="absolute inset-0 z-20 flex items-center justify-between px-4 sm:px-12 pointer-events-none">
            <button 
              onClick={prevImage}
              className="pointer-events-auto h-14 w-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:scale-110 transition-all border border-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={nextImage}
              className="pointer-events-auto h-14 w-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:scale-110 transition-all border border-white/10"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 z-30 flex items-end pb-24 md:pb-32 px-6 lg:px-12 xl:px-24">
          <div className="max-w-4xl w-full">

            
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-[0.2em] mb-6">
                <Navigation size={14} className="text-cyan-400" />
                <span>{language === 'it' ? 'Esperienza Esclusiva' : 'Exclusive Experience'}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6 drop-shadow-2xl">
                {t(experience.subtitle)}
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl text-balance">
                {t(experience.title)}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        {experience.images.length > 1 && (
          <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
            {experience.images.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImageIndex ? 'w-12 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area - Overlapping the Hero slightly */}
      <section className="relative z-40 -mt-16 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Description & Itinerary (Takes up 7/12 on large screens) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Description Glass Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
              <h2 className="text-2xl font-black text-[#1a265d] uppercase tracking-tight mb-6">
                {language === 'it' ? 'Scopri la Magia' : 'Discover the Magic'}
              </h2>
              <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
                <p>{t(experience.description)}</p>
              </div>
            </div>

            {/* Interactive Timeline Itinerary */}
            <div id="programma" className="scroll-mt-32 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12">
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 mb-2 block">
                    {language === 'it' ? 'Il tuo percorso' : 'Your journey'}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-[#1a265d] uppercase tracking-tighter leading-none">
                    {language === 'it' ? 'Itinerario Dettagliato' : 'Detailed Itinerary'}
                  </h2>
                </div>
                
                {/* Modern Duration Tabs */}
                {Object.keys(experience.itineraries).length > 1 && (
                  <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full xl:w-auto">
                    {Object.keys(experience.itineraries).map((durationKey) => (
                      <button 
                        key={durationKey}
                        onClick={() => setSelectedDuration(durationKey)}
                        className={`flex-1 xl:flex-none whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                          selectedDuration === durationKey 
                          ? 'bg-white text-[#1a265d] shadow-sm' 
                          : 'text-slate-500 hover:text-[#1a265d] hover:bg-slate-200/50'
                        }`}
                      >
                        {getDurationLabel(durationKey)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Timeline Items */}
              <div className="relative border-l-2 border-slate-100 ml-4 md:ml-6 pl-8 md:pl-12 pb-4">
                {experience.itineraries && experience.itineraries[selectedDuration] ? experience.itineraries[selectedDuration].map((step, idx) => (
                  <div key={idx} className="relative mb-16 last:mb-0 group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[43px] md:-left-[59px] top-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white border-4 border-cyan-100 flex items-center justify-center shadow-sm group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-300 z-10">
                      <div className="h-2 w-2 md:h-3 md:w-3 bg-cyan-500 rounded-full"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100 group-hover:bg-white group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                      <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-cyan-100 text-cyan-800 text-xs font-black uppercase tracking-widest mb-4">
                        {language === 'it' ? 'Giorno' : 'Day'} {step.day}
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-[#1a265d] mb-4 leading-tight">
                        {t(step.title)}
                      </h3>
                      <p className="text-base text-slate-600 leading-relaxed font-medium">
                        {t(step.description)}
                      </p>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center text-slate-500 font-medium">
                    {language === 'it' ? 'Nessun itinerario disponibile per questa durata.' : 'No itinerary available for this duration.'}
                  </div>
                )}
              </div>
              
              <div className="mt-12 p-6 bg-gradient-to-br from-[#1a265d] to-[#070c26] rounded-2xl text-blue-50 text-sm border border-[#1a265d]/20 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <strong className="text-cyan-400 uppercase tracking-widest block mb-2 font-black text-xs">
                  {language === 'it' ? 'Info Importante' : 'Important Info'}
                </strong>
                <p className="font-medium leading-relaxed">
                  {language === 'it' 
                    ? "L'itinerario verrà adattato in base al vento e alle condizioni meteo marine, per garantire sempre una navigazione confortevole e in totale sicurezza. Il comandante ha l'ultima parola sulla rotta."
                    : "The itinerary will be adapted based on wind and marine weather conditions, to always ensure comfortable and totally safe navigation. The captain has the final say on the route."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Sidebar for Details & Booking (Takes up 4/12) */}
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-32 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col gap-6">
              <div className="flex flex-col gap-2 border-b border-slate-100 pb-6">
                <span className="text-sm font-bold text-[#d4af37] uppercase tracking-wider">{language === 'it' ? 'A partire da' : 'From'}</span>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-light text-[#070c26] tracking-tight">{experience.details?.price?.[language] || ''}</span>
                </div>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex-none flex items-center justify-center h-12 w-12 rounded-xl bg-white text-cyan-600 shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.1em] mb-0.5">{language === 'it' ? 'Imbarco' : 'Boarding'}</p>
                    <p className="text-sm font-black text-[#1a265d] tracking-tight">{t(experience.details.boarding)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex-none flex items-center justify-center h-12 w-12 rounded-xl bg-white text-cyan-600 shadow-sm">
                    <Gauge size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.1em] mb-0.5">Livello</p>
                    <p className="text-sm font-black text-[#1a265d] tracking-tight">{t(experience.details.level)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex-none flex items-center justify-center h-12 w-12 rounded-xl bg-white text-cyan-600 shadow-sm">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.1em] mb-0.5">Durata</p>
                    <p className="text-sm font-black text-[#1a265d] tracking-tight">{t(experience.details.duration)}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsBookingPanelOpen(true)}
                className="w-full flex items-center justify-center bg-[#1a265d] text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-[#0f173b] transition-all transform hover:-translate-y-1 shadow-xl shadow-[#1a265d]/20"
              >
                <span>{language === 'it' ? 'Prenota Ora' : 'Book Now'}</span>
              </button>

              {/* Inclusions Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-xs font-black text-cyan-600 uppercase tracking-[0.2em] mb-4">
                  {language === 'it' ? 'Incluso' : 'Included'}
                </h3>
                <div className="flex flex-col gap-3">
                  {experience.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-cyan-500 flex-none" />
                      <p className="text-sm font-bold text-slate-700">
                        {t(item)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Mobile Sticky Bottom Bar */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[90000] bg-white border-t border-slate-200 px-5 pt-4 pb-6 flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{language === 'it' ? 'A partire da' : 'From'}</span>
          <span className="text-[#1a265d] font-black text-2xl tracking-tight">{experience.details?.price?.[language] || ''}</span>
        </div>
        <button 
          onClick={() => setIsBookingPanelOpen(true)}
          className="bg-[#d4af37] hover:bg-[#c29b2b] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#d4af37]/30 transition-all active:scale-95 whitespace-nowrap"
        >
          {language === 'it' ? 'Prenota Ora' : 'Book Now'}
        </button>
      </div>

      {/* Sliding Booking Panel - Experience Wizard */}
      <div className={`fixed inset-0 z-[1000000] transition-opacity duration-300 ${isBookingPanelOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'} flex flex-col justify-end md:justify-center items-center md:p-6`}>
        <div className="absolute inset-0 bg-[#070c26]/60 backdrop-blur-sm transition-opacity duration-300" onClick={() => setIsBookingPanelOpen(false)}></div>
        
        <div className={`relative w-full max-w-[1440px] mx-auto h-[95vh] md:h-[85vh] md:max-h-[800px] transition-transform duration-500 ease-out transform ${isBookingPanelOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-8 md:opacity-0'}`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-1.5 bg-white/50 rounded-full md:hidden"></div>
          <div className="bg-white rounded-t-[32px] md:rounded-[32px] shadow-2xl overflow-hidden h-full flex flex-col">
            <div className="flex-1 overflow-y-auto w-full h-full relative">
              <ExperienceWizard 
                experience={experience} 
                onClose={() => setIsBookingPanelOpen(false)} 
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
