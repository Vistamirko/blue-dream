"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { fleet } from '../lib/fleetData';
import { Map, Video, Smartphone, Ruler, Users, BedDouble, Bath, MessageCircle, Sailboat, ChevronDown } from 'lucide-react';
import YachtCharterSection from '../components/YachtCharterSection';
import DivisionsSection from '../components/DivisionsSection';
import FountainePajotSection from '../components/FountainePajotSection';
import ExperiencesSection from '../components/ExperiencesSection';

export default function Home() {
  const router = useRouter();
  const { t, language } = useLanguage();
  
  // Search parameters state
  const formRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [boatType, setBoatType] = useState('all');
  const [country, setCountry] = useState([]);
  const [skipper, setSkipper] = useState('any');
  const [guests, setGuests] = useState('any');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Filter 3 featured boats to highlight on home
  const featuredBoats = fleet.filter(b => 
    b.id === 'oceanis-46-fiore-di-mare' || 
    b.id === 'lucia-40-margarita' || 
    b.id === 'ketch-65-miaplacidus'
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/prenota?type=${boatType}&skipper=${skipper}&guests=${guests}&dest=${country.join(',')}`);
  };

  return (
    <div className="flex flex-col">
      
      {/* 1. Immersive Hero Section (Bluemoreyachting Style) */}
      <section className="Banner w-full relative z-[11] after:content-[''] after:w-full after:h-full after:bg-[linear-gradient(180deg,rgba(6,11,37,0.00)_0%,#060B25_100%)] after:absolute after:left-0 after:bottom-0 after:bg-cover after:bg-center after:pointer-events-none after:opacity-100 after:z-[1] before:content-[''] before:w-full lg:before:max-w-[840px] before:h-[900px] before:bg-[url(https://www.bluemoreyachting.com/img/banner-logo.svg)] before:bg-no-repeat before:bg-cover before:opacity-40 before:absolute before:left-1/2 max-lg:before:bottom-0 lg:before:top-[-10%] before:-translate-x-1/2 before:z-10 before:bg-center">
        
        <div className="absolute top-0 left-0 w-full h-[280px] lg:hidden bg-[linear-gradient(to_bottom,#060b25,rgba(6,11,37,0)_75%)] z-10 before:pointer-events-none"></div>
        
        <picture>
          <img src="/bm_img/img/header.webp" alt="Hero Background" className="w-full h-screen md:h-[746px] object-cover max-lg:object-[70%_0] z-0 transition-opacity duration-300 opacity-100" style={{ objectPosition: '50% 50%', backgroundColor: '#f0f0f0' }} />
        </picture>
        
        <div className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: 'none' }}></div>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10 px-5 lg:gap-20">
          
          <div className="w-full flex flex-col items-center lg:mt-auto">
            <h1 className="text-white text-[38px] lg:text-[56px] font-semibold leading-[1.1] mb-4 text-center max-w-[800px] drop-shadow-md">
              {t('hero_title')}
            </h1>
            <p className="text-white/90 text-[18px] lg:text-[24px] font-light max-w-[600px] mb-10 text-center animate-fade-up opacity-0 [animation-fill-mode:forwards] drop-shadow">
              {t('hero_subtitle')}
            </p>

            <svg width="40" height="56" viewBox="0 0 107.815 149.376" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:mb-10 animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:0.2s] text-white">
              <g transform="translate(-839.183 -441.657)">
                <path d="M100.553,125.35c24.668-17.322,42.813-38.826,39.32-65.861-7.017-29.18-28.635-42.8-48.914-53.709-.34-.19-.36.139-.288.226,3.761,4.342,23.7,28.069,26.2,60.011,1.368,17.615-3.22,37.545-17.214,58.509-.6.664-.01,1.646.9.823" transform="translate(768.677 465.37)" fill="currentColor" fillRule="evenodd"/>
                <path d="M135.275,146.357c55.181-69.194-31.788-133.3-48.3-145.39-.36-.262-.448-1.224.556-.9,40.143,15.094,105.865,58.823,107.007,119.22.062.6-.612.412-.715.165-7.655-12-38.805,11.971-57.424,28.038-1.564,1.348-2.32.365-1.121-1.132" transform="translate(752.46 441.657)" fill="currentColor" fillRule="evenodd"/>
              </g>
            </svg>
          </div>

          {/* Bluemoreyachting Style Search Widget */}
          <div className="max-lg:order-[-1] animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:0.3s]">
            
            {/* Mobile Search Button */}
            <div className="w-full lg:hidden flex flex-col items-center gap-3 max-w-[360px] mx-auto max-lg:order-[-1] mb-12">
              <p className="text-sm font-light text-gradient"><b>{language === 'it' ? 'Trova subito' : 'Find now'}</b> {language === 'it' ? 'il tuo Yacht di lusso' : 'your Luxury Yacht'}</p>
              <button 
                type="button" 
                onClick={() => setIsMobileFilterOpen(true)}
                className="w-full flex items-center justify-between gap-2 py-[10px] pl-5 pr-2 rounded-full backdrop-blur-[14px] bg-white/20 border border-white text-[13px] text-white hover:bg-white/30 transition-all overflow-hidden"
              >
                <div className="flex items-center justify-center flex-1 min-w-0 gap-1.5 opacity-90 truncate">
                  <span className="truncate">{language === 'it' ? 'Destinazione' : 'Destination'}</span>
                  <span className="shrink-0 opacity-50">•</span>
                  <span className="shrink-0">{language === 'it' ? 'Budget' : 'Budget'}</span>
                  <span className="shrink-0 opacity-50">•</span>
                  <span className="shrink-0">{language === 'it' ? 'Persone' : 'Guests'}</span>
                </div>
                <div className="size-9 shrink-0 rounded-full flex items-center justify-center bg-white text-[#070c26]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="m20 18.6-2-2c3.1-3.9 2.5-9.6-1.4-12.7C12.7.8 7 1.5 3.9 5.3.8 9.2 1.5 14.9 5.3 18c3.3 2.6 8 2.6 11.3 0l2 2c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4zm-9-.6c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" fill="currentColor"></path>
                  </svg>
                </div>
              </button>
            </div>

            {/* Desktop Search Form */}
            <div className="w-full lg:flex hidden flex-col gap-3 max-lg:order-[-1]">
              <p className="text-sm font-light text-gradient"><b>{language === 'it' ? 'Trova subito' : 'Find now'}</b> {language === 'it' ? 'il tuo Yacht di lusso' : 'your Luxury Yacht'}</p>
              
              <form ref={formRef} onSubmit={handleSearchSubmit} className="w-full max-w-[1000px] mx-auto flex items-center p-2 gap-2 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] relative z-50">
                
                {/* Yacht Type */}
                <div className="flex-1 min-w-0">
                  <div className="relative w-full">
                    <button type="button" onClick={() => handleDropdownClick('type')} className="flex items-center gap-3 bg-[#060b25] rounded-lg px-3 lg:px-4 py-[22px] w-full transition-all duration-200 hover:bg-[#0a1a4a]">
                      <span className="text-white hidden min-[1150px]:block">
                        <Sailboat size={30} strokeWidth={1.5} />
                      </span>
                      <p className="flex flex-col items-start text-[15px] min-w-0 overflow-hidden">
                        <span className="text-xs opacity-80 block text-white">{language === 'it' ? 'Tipo Barca' : 'Yacht type'}</span>
                        <span className="text-white font-medium truncate max-w-full">
                          {boatType === 'all' ? (language==='it'?'Tutte':'All Types') : boatType === 'monoscafo' ? (language==='it'?'Monoscafo':'Sailing Yacht') : boatType === 'catamarano' ? (language==='it'?'Catamarano':'Catamaran') : (language==='it'?'Motore':'Motor Yacht')}
                        </span>
                      </p>
                      <ChevronDown size={16} className={`ml-auto shrink-0 text-white transition-transform duration-200 ${openDropdown === 'type' ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Content */}
                    <div className={`absolute top-full left-0 w-full min-w-[280px] -translate-x-2 transition-all duration-300 ease-out z-20 ${openDropdown === 'type' ? 'opacity-100 translate-y-2 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`} onClick={(e) => e.stopPropagation()}>
                      <div className="p-2 bg-white rounded-xl shadow-lg border border-gray-100">
                        <span className="text-[11px] font-medium py-2 px-2.5 text-[#060b254d] block uppercase">{language === 'it' ? 'TIPO BARCA' : 'YACHT TYPE'}</span>
                        {[
                          { id: 'all', label: language==='it'?'Tutte':'All Yachts' },
                          { id: 'monoscafo', label: language==='it'?'Monoscafo':'Sailing Yacht' },
                          { id: 'catamarano', label: language==='it'?'Catamarano':'Catamaran' },
                          { id: 'motore', label: language==='it'?'Motore':'Motor Yacht' }
                        ].map(opt => (
                          <div key={opt.id} className="w-full flex items-center gap-4 relative py-2 px-2.5 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <input type="radio" id={`type-${opt.id}`} name="boatType" className="size-full opacity-0 cursor-pointer absolute inset-0" checked={boatType === opt.id} onChange={() => { setBoatType(opt.id); setOpenDropdown(null); }} />
                            <label htmlFor={`type-${opt.id}`} className="w-full flex items-center gap-2 cursor-pointer">
                              <p className={`flex text-sm ${boatType === opt.id ? 'text-[#0052b4] font-medium' : 'text-[#060b25]'}`}>{opt.label}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Country / Destination */}
                <div className="flex-1 min-w-0">
                  <div className="relative w-full">
                    <button type="button" onClick={() => handleDropdownClick('country')} className="flex items-center gap-3 rounded-lg px-3 lg:px-4 py-[22px] w-full transition-all duration-200 hover:bg-gray-50">
                      <p className="flex flex-col items-start text-[15px] text-black text-left min-w-0 overflow-hidden">
                        <span className="text-xs block text-gray-500">{language === 'it' ? 'Destinazione' : 'Destination'}</span>
                        <span className="font-medium truncate max-w-full">
                          {country.length > 0 ? country.join(', ') : (language === 'it' ? 'Seleziona' : 'Select')}
                        </span>
                      </p>
                      <ChevronDown size={16} className={`ml-auto shrink-0 text-black transition-transform duration-200 ${openDropdown === 'country' ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute top-full left-0 w-full min-w-[220px] -translate-x-2 transition-all duration-300 ease-out z-20 ${openDropdown === 'country' ? 'opacity-100 translate-y-2 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`} onClick={(e) => e.stopPropagation()}>
                      <div className="p-2 bg-white rounded-xl shadow-lg border border-gray-100">
                        <span className="text-[11px] font-medium py-2 px-2.5 text-[#060b254d] block uppercase">{language === 'it' ? 'DESTINAZIONE' : 'DESTINATION'}</span>
                        {[
                          { id: 'Procida', label: 'Procida' },
                          { id: 'Ischia', label: 'Ischia' },
                          { id: 'Capri', label: 'Capri' },
                          { id: 'Amalfi', label: 'Costiera Amalfitana' }
                        ].map(opt => (
                          <div key={opt.id} className="w-full flex items-center gap-4 relative py-2 px-2.5 hover:bg-[#E1EEFE] rounded-lg transition-colors duration-150">
                            <input type="checkbox" id={`country-${opt.id}`} className="size-full opacity-0 cursor-pointer absolute inset-0" checked={country.includes(opt.id)} onChange={(e) => {
                              if (e.target.checked) setCountry([...country, opt.id]);
                              else setCountry(country.filter(c => c !== opt.id));
                            }} />
                            <label htmlFor={`country-${opt.id}`} className="w-full flex items-center gap-2 cursor-pointer">
                              <p className={`flex text-sm ${country.includes(opt.id) ? 'text-[#0052b4] font-medium' : 'text-[#060b25]'}`}>{opt.label}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skipper */}
                <div className="flex-1 min-w-0">
                  <div className="relative w-full">
                    <button type="button" onClick={() => handleDropdownClick('skipper')} className="w-full flex items-center gap-3 rounded-lg transition-all duration-200 px-3 lg:px-4 py-[22px] bg-[#696d780c] hover:bg-[#696d781a]">
                      <p className="flex flex-col items-start text-[15px] text-black text-left min-w-0 overflow-hidden">
                        <span className="text-xs block text-gray-500">{language === 'it' ? 'Skipper' : 'Skipper'}</span>
                        <span className="font-medium truncate max-w-full">
                          {skipper === 'any' ? (language==='it'?'Indifferente':'Any') : skipper === 'yes' ? (language==='it'?'Sì':'Yes') : 'No'}
                        </span>
                      </p>
                      <ChevronDown size={16} className={`ml-auto shrink-0 text-black transition-transform duration-200 ${openDropdown === 'skipper' ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute top-full left-0 w-full min-w-[200px] -translate-x-2 transition-all duration-300 ease-out z-20 ${openDropdown === 'skipper' ? 'opacity-100 translate-y-2 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`} onClick={(e) => e.stopPropagation()}>
                      <div className="p-2 bg-white rounded-xl shadow-lg border border-gray-100">
                        <span className="text-[11px] font-medium py-2 px-2.5 text-[#060b254d] block uppercase">{language === 'it' ? 'SKIPPER' : 'SKIPPER'}</span>
                        {[
                          { id: 'any', label: language==='it'?'Indifferente':'Any option' },
                          { id: 'yes', label: language==='it'?'Sì, con Skipper':'Yes, with Skipper' },
                          { id: 'no', label: language==='it'?'No, senza Skipper':'No, Bareboat' }
                        ].map(opt => (
                          <div key={opt.id} className="w-full flex items-center gap-4 relative py-2 px-2.5 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <input type="radio" id={`skipper-${opt.id}`} name="skipper" className="size-full cursor-pointer opacity-0 absolute inset-0" checked={skipper === opt.id} onChange={() => { setSkipper(opt.id); setOpenDropdown(null); }} />
                            <label htmlFor={`skipper-${opt.id}`} className="w-full flex items-center gap-2 cursor-pointer">
                              <p className={`flex text-sm ${skipper === opt.id ? 'text-[#0052b4] font-medium' : 'text-[#060b25]'}`}>{opt.label}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Person */}
                <div className="flex-1 min-w-0">
                  <div className="relative w-full">
                    <button type="button" onClick={() => handleDropdownClick('person')} className="w-full flex items-center gap-3 rounded-lg transition-all duration-200 hover:bg-gray-50 px-3 lg:px-4 py-[22px]">
                      <p className="flex flex-col items-start text-[15px] text-black text-left min-w-0 overflow-hidden">
                        <span className="text-xs block text-gray-500">{language === 'it' ? 'Persone' : 'Guests'}</span>
                        <span className="font-medium truncate max-w-full">
                          {guests === 'any' ? (language==='it'?'Seleziona':'Select') : `${guests}+ ${language==='it'?'persone':'people'}`}
                        </span>
                      </p>
                      <ChevronDown size={16} className={`ml-auto shrink-0 text-black transition-transform duration-200 ${openDropdown === 'person' ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute top-full left-0 w-full min-w-[180px] -translate-x-2 transition-all duration-300 ease-out z-20 ${openDropdown === 'person' ? 'opacity-100 translate-y-2 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`} onClick={(e) => e.stopPropagation()}>
                      <div className="p-2 bg-white rounded-xl shadow-lg border border-gray-100">
                        <span className="text-[11px] font-medium py-2 px-2.5 text-[#060b254d] block uppercase">{language === 'it' ? 'PERSONE' : 'GUESTS'}</span>
                        {[
                          { id: 'any', label: language==='it'?'Qualsiasi':'Any' },
                          { id: '2', label: `2+ ${language==='it'?'persone':'people'}` },
                          { id: '4', label: `4+ ${language==='it'?'persone':'people'}` },
                          { id: '6', label: `6+ ${language==='it'?'persone':'people'}` },
                          { id: '8', label: `8+ ${language==='it'?'persone':'people'}` },
                          { id: '10', label: `10+ ${language==='it'?'persone':'people'}` }
                        ].map(opt => (
                          <div key={opt.id} className="w-full flex items-center gap-4 relative py-2 px-2.5 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <input type="radio" id={`guests-${opt.id}`} name="guests" className="size-full cursor-pointer opacity-0 absolute inset-0" checked={guests === opt.id} onChange={() => { setGuests(opt.id); setOpenDropdown(null); }} />
                            <label htmlFor={`guests-${opt.id}`} className="w-full flex items-center gap-2 cursor-pointer">
                              <p className={`flex text-sm ${guests === opt.id ? 'text-[#0052b4] font-medium' : 'text-[#060b25]'}`}>{opt.label}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="bg-[#070c26] shrink-0 text-white hover:bg-[#1b2c5a] h-[80px] rounded-lg px-6 lg:px-8 ml-auto transition-colors duration-300 font-medium whitespace-nowrap">
                  {language === 'it' ? 'Cerca' : 'Search'}
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </section>

      {/* 3. Featured Fleet Section (Yacht for Charter Slider) */}
      <YachtCharterSection />

      {/* Divisions Section */}
      <DivisionsSection />

      {/* Fountaine Pajot Dealer Section */}
      <FountainePajotSection />

      {/* Experiences Section */}
      <ExperiencesSection />

      {/* 2. Brand Highlights / Services Section (Bluemoreyachting Style) */}
      <section className="max-w-[1240px] w-[calc(100%-40px)] mx-auto relative pt-12 lg:pt-16 pb-8 lg:pb-12 lg:border-t border-[#D9D9D9] before:content-[''] before:w-[60px] before:h-[2px] before:bg-[#83776D] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-0 max-lg:before:hidden">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[12px] font-bold text-[#83776D] uppercase tracking-[2.4px] mb-2 block">
            {language === 'it' ? 'Perchè Sceglierci' : 'Why Choose Us'}
          </span>
          <h2 className="text-[#070c26] text-[28px] lg:text-[40px] font-medium leading-[1.2] max-w-[600px]">
            {language === 'it' ? 'L\'Eccellenza del Noleggio a Procida' : 'Excellence in Procida Yacht Charter'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-[20px] shadow-[0_10px_20px_rgba(0,0,0,0.05)] p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
            <div className="bg-[#070c26] w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Map size={30} color="white" />
            </div>
            <h3 className="text-[#070c26] text-xl font-semibold mb-4">
              {language === 'it' ? 'Base Unica a Procida' : 'Single Base in Procida'}
            </h3>
            <p className="text-[#696d78] text-[15px] leading-[1.6]">
              {language === 'it' 
                ? "Imbarco strategico nel Marina di Procida, al centro del Golfo di Napoli. Raggiungi in pochissimi nodi Ischia, Capri e la Costiera."
                : "Strategic boarding in Marina di Procida. Sail just a few miles to reach Ischia, Capri, and the Amalfi Coast."}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[20px] shadow-[0_10px_20px_rgba(0,0,0,0.05)] p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
            <div className="bg-[#070c26] w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Video size={30} color="white" />
            </div>
            <h3 className="text-[#070c26] text-xl font-semibold mb-4">
              {language === 'it' ? 'Primo Check-in Video' : 'First Video Check-in'}
            </h3>
            <p className="text-[#696d78] text-[15px] leading-[1.6]">
              {language === 'it' 
                ? "Ti presentiamo la barca prima di salire a bordo! Un video check-in completo per illustrarti tutti i sistemi e accelerare l'imbarco."
                : "We introduce you to the boat before you step on board! A complete video check-in shows you all systems to speed up boarding."}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[20px] shadow-[0_10px_20px_rgba(0,0,0,0.05)] p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
            <div className="bg-[#070c26] w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Smartphone size={30} color="white" />
            </div>
            <h3 className="text-[#070c26] text-xl font-semibold mb-4">
              {language === 'it' ? 'Preventivi Personalizzati' : 'Personalized Quotes'}
            </h3>
            <p className="text-[#696d78] text-[15px] leading-[1.6]">
              {language === 'it' 
                ? "Configura la tua crociera esattamente come desideri! Inviaci la tua richiesta per ricevere un preventivo dettagliato e su misura per te."
                : "Configure your cruise exactly as you wish! Send us your request to receive a detailed and tailor-made quote."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Panoramic CTA Section (Bluemoreyachting Style CTA) */}
      <section className="w-full relative py-16 lg:py-20 mb-0" style={{ background: '#f8f9fa' }}>
        <div className="max-w-[1240px] w-[calc(100%-40px)] mx-auto bg-[#070c26] rounded-[30px] p-10 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('https://www.bluemoreyachting.com/img/banner-logo.svg')] bg-no-repeat bg-right-top bg-cover pointer-events-none"></div>
          
          <div className="relative z-10 max-w-[600px] text-center lg:text-left">
            <span className="text-[12px] font-bold text-[#83776D] uppercase tracking-[2.4px] mb-4 block">
              {language === 'it' ? 'Inizia l\'avventura' : 'Start your adventure'}
            </span>
            <h2 className="text-white text-[32px] md:text-[48px] font-medium leading-[1.2] mb-6">
              {language === 'it' 
                ? 'Pronto a Configurare la Tua Crociera?' 
                : 'Ready to Customise Your Cruise?'}
            </h2>
            <p className="text-white/80 text-[16px] md:text-[18px] leading-[1.6]">
              {language === 'it'
                ? 'Calcola subito le tariffe stimate, confronta i nostri catamarani e monoscafi e invia la tua richiesta di prenotazione per ricevere un preventivo dettagliato.'
                : 'Calculate estimated prices, compare our catamarans and sailing boats, and send your booking inquiry to receive a detailed offer.'}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link href="/prenota" className="inline-flex items-center justify-center bg-white text-[#070c26] rounded-xl px-8 py-4 text-[16px] font-semibold hover:bg-opacity-90 transition-all duration-300 whitespace-nowrap">
              {language === 'it' ? 'Vai al Booking Online' : 'Go to Booking Portal'}
            </Link>
            <a 
              href="https://wa.me/393286635141"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white/30 text-white rounded-xl px-8 py-4 text-[16px] font-semibold hover:bg-white/10 transition-all duration-300 whitespace-nowrap gap-2"
            >
              <MessageCircle size={20} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Filter Overlay */}
      <div className={`w-screen h-[calc(100dvh-88px)] bg-white fixed bottom-0 z-[9999] flex items-center justify-center transition-all duration-500 left-0 ${isMobileFilterOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="w-full h-full flex flex-col py-8 px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-lg text-[#070c26] font-light"><b className="font-normal">{language === 'it' ? 'Trova subito' : 'Find now'}</b> {language === 'it' ? 'il tuo Yacht di lusso' : 'your Luxury Yacht'}</p>
            <button type="button" className="text-black transition-colors duration-200 p-2" aria-label="Close" onClick={() => setIsMobileFilterOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm0 22.789C6.056 22.789 1.211 17.944 1.211 12S6.056 1.211 12 1.211 22.789 6.056 22.789 12 17.944 22.789 12 22.789z" fill="currentColor"></path>
                <path d="m12.845 11.943 3.521-3.52a.613.613 0 0 0 0-.846.613.613 0 0 0-.845 0l-3.52 3.521-3.522-3.52a.613.613 0 0 0-.845 0 .613.613 0 0 0 0 .844l3.521 3.521-3.521 3.493a.613.613 0 0 0 0 .845c.113.113.282.17.422.17.141 0 .31-.057.423-.17L12 12.761l3.521 3.52c.113.113.282.17.423.17.14 0 .31-.057.422-.17a.613.613 0 0 0 0-.845l-3.52-3.493z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col gap-6 h-[calc(100%-116px)] pb-10 relative overflow-y-auto">
            {/* Type */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm text-black">{language === 'it' ? 'Tipo Barca' : 'Yacht Type'}</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: language === 'it' ? 'Tutte' : 'All Types' },
                  { id: 'monoscafo', label: language === 'it' ? 'Monoscafo' : 'Sailing Yacht' },
                  { id: 'catamarano', label: language === 'it' ? 'Catamarano' : 'Catamaran' },
                  { id: 'motore', label: language === 'it' ? 'Motore' : 'Motor Yacht' }
                ].map(opt => (
                  <div key={opt.id} onClick={() => setBoatType(opt.id)} className={`w-full flex flex-col items-center justify-center gap-1 p-3 rounded-xl border transition-all duration-150 cursor-pointer ${boatType === opt.id ? 'border-[#0052b4] bg-[#E1EEFE]' : 'border-[#d7dbe0] hover:bg-gray-50'}`}>
                    <p className="flex text-[#060b25] text-sm text-center font-medium">{opt.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Country */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm text-black">{language === 'it' ? 'Destinazione' : 'Destination'}</span>
              <div className="grid grid-cols-2 gap-1.5">
                {['Procida', 'Ischia', 'Capri', 'Amalfi'].map(opt => (
                  <div key={opt} onClick={() => {
                    if (country.includes(opt)) setCountry(country.filter(c => c !== opt));
                    else setCountry([...country, opt]);
                  }} className={`flex items-center gap-2.5 px-3 py-3 rounded-lg border transition-all duration-150 cursor-pointer ${country.includes(opt) ? 'border-[#0052b4] bg-[#E1EEFE]' : 'border-[#d7dbe0]'}`}>
                    <label className="w-full flex items-center gap-2 text-[#060b25] text-[13px] font-medium cursor-pointer pointer-events-none">
                      {opt === 'Amalfi' && language === 'it' ? 'Costiera Amalfitana' : opt}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Skipper */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm text-black">Skipper</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'any', label: language === 'it' ? 'Indifferente' : 'Any' },
                  { id: 'yes', label: language === 'it' ? 'Sì' : 'Yes' },
                  { id: 'no', label: 'No' }
                ].map(opt => (
                  <div key={opt.id} onClick={() => setSkipper(opt.id)} className={`flex items-center min-w-10 gap-2.5 px-3 py-3 rounded-lg border transition-all duration-150 cursor-pointer ${skipper === opt.id ? 'border-[#0052b4] bg-[#E1EEFE]' : 'border-[#d7dbe0]'}`}>
                    <label className="w-full flex items-center justify-center gap-2 text-center text-[#060b25] text-[13px] font-medium cursor-pointer pointer-events-none">
                      {opt.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Person */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm text-black">{language === 'it' ? 'Persone' : 'Guests'}</span>
              <div className="flex flex-wrap gap-1.5">
                {['any', '2', '4', '6', '8', '10'].map(opt => (
                  <div key={opt} onClick={() => setGuests(opt)} className={`flex items-center min-w-10 gap-2.5 px-3 py-3 rounded-lg border transition-all duration-150 cursor-pointer ${guests === opt ? 'border-[#0052b4] bg-[#E1EEFE]' : 'border-[#d7dbe0]'}`}>
                    <label className="w-full flex items-center justify-center gap-2 text-center text-[#060b25] text-[13px] font-medium cursor-pointer pointer-events-none">
                      {opt === 'any' ? (language === 'it' ? 'Tutti' : 'All') : `${opt}+`}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Added spacing at bottom to clear the fixed button */}
            <div className="h-[100px]"></div>
          </div>

          <button onClick={handleSearchSubmit} className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-center gap-2.5 bg-[#0052b4] px-4 py-[18px] hover:bg-[#060b25] transition-all duration-300 z-10">
            <span className="text-white text-sm font-medium">{language === 'it' ? 'Cerca Yacht' : 'Search Luxury Yachts'}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m20 18.6-2-2c3.1-3.9 2.5-9.6-1.4-12.7C12.7.8 7 1.5 3.9 5.3.8 9.2 1.5 14.9 5.3 18c3.3 2.6 8 2.6 11.3 0l2 2c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4zm-9-.6c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" fill="#fff"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Tailwind Specific Overrides if needed */}
      <style jsx>{`
        :global(body) {
          background-color: white !important; /* Force global background white to match Bluemore */
        }
      `}</style>


    </div>
  );
}
