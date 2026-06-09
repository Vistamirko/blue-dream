"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { fleet, SEASONS } from '../lib/fleetData';
import { experiencesData } from '../lib/experiencesData';
import CustomDatePicker from './CustomDatePicker';

export default function BookingForm({ initialExperience = 'none', hideBreadcrumb = false, compact = false }) {
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();

  // Search parameters states
  const [selectedYachtId, setSelectedYachtId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [durationWeeks, setDurationWeeks] = useState(1);
  const [guestsCount, setGuestsCount] = useState(4);
  const [skipperRequired, setSkipperRequired] = useState('no');
  const [selectedExperience, setSelectedExperience] = useState(initialExperience);
  
  // Form submission states
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Read URL query params on load
  useEffect(() => {
    const yachtId = searchParams.get('id');
    const type = searchParams.get('type');
    const skipper = searchParams.get('skipper');
    const guests = searchParams.get('guests');

    if (yachtId) setSelectedYachtId(yachtId);
    if (skipper && skipper !== 'any') setSkipperRequired(skipper);
    if (guests) setGuestsCount(parseInt(guests) || 4);
    
    // Auto-select date for convenience (next Saturday)
    const nextSat = getNextSaturday();
    setStartDate(nextSat);
  }, [searchParams]);

  // Helper to get next Saturday date string (YYYY-MM-DD)
  const getNextSaturday = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = (6 - day + 7) % 7 || 7; // days until next Saturday
    const nextSat = new Date(d.getTime() + diff * 24 * 60 * 60 * 1000);
    return nextSat.toISOString().split('T')[0];
  };

  // Determine season based on date
  const getSeasonFromDate = (dateStr) => {
    if (!dateStr) return 'A';
    const date = new Date(dateStr);
    const month = date.getMonth(); // 0-indexed: 0 = Jan, 4 = May, 5 = June, 6 = July, 7 = Aug, 8 = Sept
    const day = date.getDate();

    // D Season: Peak (02 Aug - 22 Aug) -> Month 7, day 2 to 22
    if (month === 7 && day >= 2 && day <= 22) return 'D';
    
    // C Season: (21 Giu - 01 Ago / 23 Ago - 05 Set)
    if ((month === 5 && day >= 21) || (month === 6 && day <= 1)) return 'C';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 5)) return 'C';

    // B Season: (10 Mag - 20 Giu / 06 Set - 26 Set)
    if ((month === 4 && day >= 10) || (month === 5 && day <= 20)) return 'B';
    if ((month === 8 && day >= 6 && day <= 26)) return 'B';

    // A Season: Rest of the year
    return 'A';
  };

  // Calculate pricing based on yacht & date selection
  const calculatePrice = (yacht) => {
    if (!yacht) return 0;
    const season = getSeasonFromDate(startDate);
    const weeklyRate = yacht.pricing[season] || yacht.pricing.A;
    
    let total = weeklyRate * durationWeeks;
    if (skipperRequired === 'yes' || yacht.skipperRequired) {
      total += 150 * 7 * durationWeeks; // Skipper standard cost (e.g. €150/day)
    }
    return total;
  };

  const selectedYacht = fleet.find(b => b.id === selectedYachtId);
  const totalPrice = calculatePrice(selectedYacht);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedYachtId) {
      alert(language === 'it' ? 'Seleziona prima una barca!' : 'Please select a yacht first!');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API reservation request posting
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section className={`bg-white ${hideBreadcrumb ? '' : 'rounded-t-[36px]'}`}>
      <div className="pb-20">
        
        {/* Header Area */}
        {!hideBreadcrumb && (
          <div className="container mx-auto px-5 max-lg:mb-4">
            <div className="pt-6">
              <nav className="w-full max-lg:hidden" aria-label="Breadcrumb">
                <ul className="flex items-center max-md:overflow-x-auto scrollbar-hide">
                  <li>
                    <div className="flex items-center">
                      <a href="/" className="max-md:whitespace-nowrap text-[13px] transition-all duration-300 text-[rgba(7,12,38,0.5)] underline underline-offset-2">Home</a>
                      <span className="mx-2 text-[rgba(7,12,38,0.5)]"> / </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="max-md:whitespace-nowrap text-[13px] transition-all duration-300 text-[#070c26]">{language === 'it' ? 'Prenotazione' : 'Booking'}</span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            
            <div className="md:pt-6 pt-3">
              <h1 className="text-2xl font-bold text-[#070c26] mb-2.5">
                {language === 'it' ? 'Configura la Tua Vacanza' : 'Configure Your Holiday'}
              </h1>
              <p className="text-sm md:text-[15px] text-[#070c26] max-w-[700px] md:mb-8 mb-4">
                {language === 'it' 
                  ? 'Pianifica date, equipaggio e richiedi un preventivo. Riceverai un calcolo in tempo reale.'
                  : 'Plan dates, crew and optional extra services. Get instant pricing calculated in real-time.'}
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-5">
        {isSubmitted ? (
          /* Success Screen */
          <div className="max-w-[700px] mx-auto bg-white rounded-[24px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center flex flex-col items-center gap-6 animate-fade-in border border-[#dfe1e8]">
            <div className="size-20 rounded-full bg-[#e6f4ed] flex items-center justify-center mb-2">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#009649" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#070c26]">
              {language === 'it' ? 'Richiesta Ricevuta!' : 'Request Received!'}
            </h2>
            <p className="text-[#070c26] opacity-70 text-lg leading-relaxed">
              {language === 'it' 
                ? `Grazie ${clientName}. Abbiamo registrato la tua richiesta per la barca "${selectedYacht?.model}" con partenza il ${startDate}. Il nostro staff ti invierà il preventivo ufficiale via email nelle prossime ore.`
                : `Thank you ${clientName}. We have registered your booking request for the yacht "${selectedYacht?.model}" starting on ${startDate}. Our staff will send the official pricing and details via email shortly.`}
            </p>
            
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setClientName('');
                setClientEmail('');
                setClientPhone('');
                setClientMessage('');
                setSelectedExperience(initialExperience);
              }} 
              className="mt-6 w-max h-[52px] flex items-center justify-center text-base font-bold text-white bg-[#009649] px-8 rounded-[12px] hover:bg-[#007a3a] transition-colors"
            >
              {language === 'it' ? 'Crea Nuova Richiesta' : 'Create New Inquiry'}
            </button>
          </div>
        ) : (
          /* Interactive Form Layout */
          <div className={compact ? "flex flex-col gap-8" : "grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 xl:gap-12 items-start"}>
            
            {/* Form Steps (Left Column) */}
            <div className="flex flex-col gap-8">
              
              {/* Step 1: Configuration */}
              <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#dfe1e8]">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#dfe1e8]">
                  <span className="size-10 rounded-full bg-[#e6f4ed] text-[#009649] flex items-center justify-center font-bold text-lg">1</span>
                  <h3 className="text-2xl font-bold text-[#070c26]">
                    {language === 'it' ? 'Configura le Date' : 'Configure Dates'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#070c26]">{language === 'it' ? 'Data d\'Imbarco (Sabato)' : 'Boarding Date (Saturday)'}</label>
                    <CustomDatePicker 
                      selectedDate={startDate}
                      onDateSelect={setStartDate}
                      language={language}
                    />
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label className="text-sm font-semibold text-[#070c26]">{t('search_duration', 'Durata')}</label>
                    <select 
                      className="w-full bg-[#f8f9fa] border border-[#dfe1e8] rounded-xl px-4 py-3.5 text-[#070c26] focus:outline-none focus:border-[#009649] transition-colors cursor-pointer appearance-none"
                      value={durationWeeks}
                      onChange={(e) => setDurationWeeks(parseInt(e.target.value))}
                    >
                      <option value="1">1 {language === 'it' ? 'Settimana' : 'Week'}</option>
                      <option value="2">2 {language === 'it' ? 'Settimane' : 'Weeks'}</option>
                      <option value="3">3 {language === 'it' ? 'Settimane' : 'Weeks'}</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label className="text-sm font-semibold text-[#070c26]">{t('search_guests', 'Ospiti')}</label>
                    <select 
                      className="w-full bg-[#f8f9fa] border border-[#dfe1e8] rounded-xl px-4 py-3.5 text-[#070c26] focus:outline-none focus:border-[#009649] transition-colors cursor-pointer appearance-none"
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                    >
                      {[2,4,6,8,10,12].map(num => (
                        <option key={num} value={num}>{num} {language === 'it' ? 'Ospiti' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label className="text-sm font-semibold text-[#070c26]">{language === 'it' ? 'Servizio Skipper' : 'Crew Option'}</label>
                    <select 
                      className="w-full bg-[#f8f9fa] border border-[#dfe1e8] rounded-xl px-4 py-3.5 text-[#070c26] focus:outline-none focus:border-[#009649] transition-colors cursor-pointer appearance-none"
                      value={skipperRequired}
                      onChange={(e) => setSkipperRequired(e.target.value)}
                    >
                      <option value="no">{language === 'it' ? 'Senza Skipper (Bareboat)' : 'Bareboat (No Skipper)'}</option>
                      <option value="yes">{language === 'it' ? 'Con Skipper Professionista' : 'With Professional Skipper'}</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 relative md:col-span-2">
                    <label className="text-sm font-semibold text-[#070c26]">{language === 'it' ? 'Esperienze Aggiuntive' : 'Extra Experiences'}</label>
                    <select 
                      className="w-full bg-[#f8f9fa] border border-[#dfe1e8] rounded-xl px-4 py-3.5 text-[#070c26] focus:outline-none focus:border-[#009649] transition-colors cursor-pointer appearance-none"
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                    >
                      <option value="none">{language === 'it' ? 'Nessuna Esperienza' : 'No Experience'}</option>
                      <option value="marine-biology">{language === 'it' ? 'Alla Scoperta della Biologia Marina' : 'Discovering Marine Biology'}</option>
                      <option value="bio-archaeology">{language === 'it' ? 'Vacanza Bio-Archeologica' : 'Bio-Archaeological Holiday'}</option>
                    </select>

                    {selectedExperience !== 'none' && (
                      (() => {
                        const exp = experiencesData.find(e => e.id === selectedExperience);
                        if (!exp) return null;
                        return (
                          <div className="mt-4 p-4 border border-slate-200 rounded-xl flex flex-col sm:flex-row gap-4 items-center bg-slate-50 animate-fade-in w-full">
                            <img 
                              src={exp.images[0]} 
                              alt={exp.title[language] || exp.title.en} 
                              className="w-full sm:w-28 h-20 object-cover rounded-lg shrink-0 shadow-sm" 
                            />
                            <div className="flex flex-col flex-1 w-full text-left">
                              <h4 className="font-bold text-[#070c26] text-sm md:text-base leading-tight mb-1">{exp.title[language] || exp.title.en}</h4>
                              <p className="text-xs text-slate-500 mb-2.5 line-clamp-2">{exp.subtitle[language] || exp.subtitle.en}</p>
                              <a 
                                href={`/esperienze/${exp.slug}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-bold text-[#003b81] hover:text-[#002a5c] hover:underline flex items-center gap-1 transition-colors w-max"
                              >
                                {language === 'it' ? '+ Maggiori informazioni' : '+ More details'}
                              </a>
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: Boat Selection */}
              <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#dfe1e8]">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#dfe1e8]">
                  <span className="size-10 rounded-full bg-[#e6f4ed] text-[#009649] flex items-center justify-center font-bold text-lg">2</span>
                  <h3 className="text-2xl font-bold text-[#070c26]">
                    {language === 'it' ? 'Seleziona Barca' : 'Select Yacht'}
                  </h3>
                </div>
                
                <div className="flex flex-col gap-4">
                  {fleet.map((boat) => {
                    const price = calculatePrice(boat);
                    const isSelected = selectedYachtId === boat.id;
                    const season = getSeasonFromDate(startDate);
                    
                    return (
                      <div 
                        key={boat.id}
                        onClick={() => setSelectedYachtId(boat.id)}
                        className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isSelected ? 'border-[#009649] bg-[#e6f4ed]' : 'border-[#dfe1e8] bg-white hover:border-gray-300 hover:shadow-sm'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-[100px] h-[70px] rounded-xl bg-cover bg-center shrink-0"
                            style={{ backgroundImage: `url(${boat.images[0]})` }} 
                          />
                          <div className="flex flex-col gap-1">
                            <span className="text-lg font-bold text-[#070c26]">
                              {boat.model} <span className="font-normal opacity-60">({boat.name})</span>
                            </span>
                            <span className="text-xs text-[#070c26] opacity-70 flex items-center gap-1.5 flex-wrap">
                              <span className="bg-gray-100 px-2 py-0.5 rounded-md">{boat.length}m</span>
                              <span className="bg-gray-100 px-2 py-0.5 rounded-md">{boat.cabins} Cab</span>
                              <span className="bg-gray-100 px-2 py-0.5 rounded-md">{boat.year}</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:items-end text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-0 border-[#dfe1e8]">
                          <span className="text-[11px] text-[#070c26] opacity-60 font-medium uppercase tracking-wider">
                            {language === 'it' ? `Stagione ${season}` : `Season ${season}`}
                          </span>
                          <span className={`text-xl font-bold ${isSelected ? 'text-[#009649]' : 'text-[#070c26]'}`}>
                            €{price.toLocaleString('it-IT')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Contacts */}
              <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#dfe1e8]">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#dfe1e8]">
                  <span className="size-10 rounded-full bg-[#e6f4ed] text-[#009649] flex items-center justify-center font-bold text-lg">3</span>
                  <h3 className="text-2xl font-bold text-[#070c26]">
                    {language === 'it' ? 'Inserisci i tuoi Dati' : 'Contact Details'}
                  </h3>
                </div>
                
                <form id="booking-form" onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#070c26]">{language === 'it' ? 'Nome e Cognome' : 'Full Name'}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Mario Rossi"
                      className="w-full bg-[#f8f9fa] border border-[#dfe1e8] rounded-xl px-4 py-3.5 text-[#070c26] focus:outline-none focus:border-[#009649] transition-colors"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#070c26]">Email</label>
                      <input 
                        type="email" 
                        required
                        placeholder="mario.rossi@email.com"
                        className="w-full bg-[#f8f9fa] border border-[#dfe1e8] rounded-xl px-4 py-3.5 text-[#070c26] focus:outline-none focus:border-[#009649] transition-colors"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#070c26]">{language === 'it' ? 'Telefono / WhatsApp' : 'Phone / WhatsApp'}</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+39 333 123 4567"
                        className="w-full bg-[#f8f9fa] border border-[#dfe1e8] rounded-xl px-4 py-3.5 text-[#070c26] focus:outline-none focus:border-[#009649] transition-colors"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#070c26]">{language === 'it' ? 'Richieste Speciali' : 'Special Requests'}</label>
                    <textarea 
                      rows="4" 
                      placeholder={language === 'it' ? 'Preferenze itinerario, orari particolari d\'imbarco, ecc...' : 'Itinerary preferences, boarding hours, etc...'}
                      className="w-full bg-[#f8f9fa] border border-[#dfe1e8] rounded-xl px-4 py-3.5 text-[#070c26] focus:outline-none focus:border-[#009649] transition-colors resize-none"
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
                    />
                  </div>

                  <div className="lg:hidden mt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-[56px] flex items-center justify-center text-lg font-bold text-white bg-[#009649] rounded-xl hover:bg-[#007a3a] transition-all duration-300 disabled:opacity-70"
                    >
                      {isSubmitting ? (language === 'it' ? 'Invio in corso...' : 'Sending...') : (language === 'it' ? 'Invia Richiesta' : 'Submit Inquiry')}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar Summary (Right Column) */}
            <div className="sticky top-[100px]">
              <div className="bg-[#070c26] rounded-[24px] p-6 shadow-xl flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">
                  {language === 'it' ? 'Riepilogo Richiesta' : 'Inquiry Summary'}
                </h3>
                
                {selectedYacht ? (
                  <div className="flex flex-col gap-6 relative z-10">
                    {/* Yacht Info */}
                    <div className="flex flex-col gap-3">
                      <div 
                        className="w-full h-[160px] rounded-2xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${selectedYacht.images[0]})` }} 
                      />
                      <div className="flex flex-col mt-2">
                        <span className="text-[22px] font-bold text-white leading-tight">
                          {selectedYacht.model}
                        </span>
                        <span className="text-white/60 text-sm mt-1 flex items-center gap-1.5">
                          {selectedYacht.name} • {language === 'it' ? 'Base: Procida' : 'Base: Procida'}
                        </span>
                      </div>
                    </div>

                    {/* Specifications Summary */}
                    <div className="grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-xl border border-white/10 text-white/80 text-sm">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">{language === 'it' ? 'Ospiti' : 'Guests'}</span>
                        <span className="font-semibold text-white">{guestsCount} Pax</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Skipper</span>
                        <span className="font-semibold text-white">{(skipperRequired === 'yes' || selectedYacht.skipperRequired) ? (language === 'it' ? 'Sì' : 'Yes') : (language === 'it' ? 'No' : 'No')}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">{language === 'it' ? 'Imbarco' : 'Start'}</span>
                        <span className="font-semibold text-white">{startDate || '---'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">{language === 'it' ? 'Durata' : 'Duration'}</span>
                        <span className="font-semibold text-white">{durationWeeks} {durationWeeks > 1 ? (language === 'it' ? 'sett' : 'wks') : (language === 'it' ? 'sett' : 'wk')}</span>
                      </div>
                      {selectedExperience !== 'none' && (
                        <div className="flex flex-col col-span-2 mt-1 pt-3 border-t border-white/10">
                          <span className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">{language === 'it' ? 'Esperienza Inclusa' : 'Included Experience'}</span>
                          <span className="font-semibold text-[#009649]">
                            {selectedExperience === 'marine-biology' ? (language === 'it' ? 'Alla Scoperta della Biologia Marina' : 'Discovering Marine Biology') : 
                             selectedExperience === 'bio-archaeology' ? (language === 'it' ? 'Vacanza Bio-Archeologica' : 'Bio-Archaeological Holiday') : ''}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                      <div className="flex justify-between items-center text-sm text-white/80">
                        <span>{language === 'it' ? 'Noleggio Barca:' : 'Yacht Charter:'}</span>
                        <span>€{(selectedYacht.pricing[getSeasonFromDate(startDate)] * durationWeeks).toLocaleString('it-IT')}</span>
                      </div>
                      
                      {(skipperRequired === 'yes' || selectedYacht.skipperRequired) && (
                        <div className="flex justify-between items-center text-sm text-white/80">
                          <span>Skipper (€150/g):</span>
                          <span>€{(150 * 7 * durationWeeks).toLocaleString('it-IT')}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-2 pt-4 border-t border-white/10">
                        <span className="text-lg font-medium text-white">{language === 'it' ? 'Totale Stimato' : 'Estimated Total'}:</span>
                        <span className="text-2xl font-bold text-[#009649]">€{totalPrice.toLocaleString('it-IT')}</span>
                      </div>
                    </div>

                    {/* Submit Button (Desktop) */}
                    <div className="hidden lg:block mt-4">
                      <button 
                        type="submit" 
                        form="booking-form"
                        disabled={isSubmitting}
                        className="w-full h-[56px] flex items-center justify-center text-lg font-bold text-[#070c26] bg-white rounded-xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                      >
                        {isSubmitting ? (language === 'it' ? 'Invio in corso...' : 'Sending...') : (language === 'it' ? 'Invia Richiesta' : 'Submit Inquiry')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center flex flex-col items-center gap-4 text-white/50">
                    <span className="text-sm px-4">
                      {language === 'it' ? 'Seleziona una barca a sinistra per calcolare il preventivo in tempo reale.' : 'Select a yacht on the left to calculate pricing estimation.'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
