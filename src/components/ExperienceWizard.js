"use client";

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Telescope, Users, Clock, Moon, CalendarDays, Sailboat, Ship, Navigation } from 'lucide-react';
import { fleet } from '../lib/fleetData';
import CustomDatePicker from './CustomDatePicker';

export default function ExperienceWizard({ experience, onClose }) {
  const { language, t } = useLanguage();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    style: '',
    duration: '',
    startDate: '',
    guests: '4',
    yachtId: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const totalSteps = 4;
  const progressPercentage = (step / totalSteps) * 100;

  const handleSelection = (field, value, autoAdvance = true) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (autoAdvance) {
      setTimeout(() => {
        setStep(prev => (prev < totalSteps ? prev + 1 : prev));
      }, 400); // slight delay for visual feedback
    }
  };

  const getSeasonFromDate = (dateStr) => {
    if (!dateStr) return 'A';
    const date = new Date(dateStr);
    const month = date.getMonth(); 
    const day = date.getDate();

    if (month === 7 && day >= 2 && day <= 22) return 'D';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 1)) return 'C';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 5)) return 'C';
    if ((month === 4 && day >= 10) || (month === 5 && day <= 20)) return 'B';
    if ((month === 8 && day >= 6 && day <= 26)) return 'B';
    return 'A';
  };

  const calculatePrice = (boat) => {
    if (!boat) return 0;
    const season = getSeasonFromDate(formData.startDate);
    const weeklyRate = boat.pricing[season] || boat.pricing.A;
    
    if (formData.duration === '1_day') return Math.round(weeklyRate / 7);
    if (formData.duration === '2_days') return Math.round((weeklyRate / 7) * 2);
    return weeklyRate; // 1_week
  };

  const checkAvailability = (boatId) => {
    if (!formData.startDate) return true;
    const date = new Date(formData.startDate);
    return (boatId.length + date.getDate()) % 3 !== 0;
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Booking submitted:", formData);
    // Real implementation would send data to backend here
    alert(language === 'it' ? 'Richiesta inviata con successo!' : 'Request sent successfully!');
    onClose();
  };

  const isNextDisabled = () => {
    if (step === 1 && !formData.style) return true;
    if (step === 2 && (!formData.duration || !formData.startDate)) return true;
    if (step === 3 && !formData.yachtId) return true;
    if (step === 4 && (!formData.name || !formData.email)) return true;
    return false;
  };

  const styles = [
    { id: 'relax', icon: <Sun size={36} strokeWidth={1.5} className="text-[#003b81]" />, it: 'Relax & Scoperta', en: 'Relax & Discovery', descIt: 'Goditi il sole, tuffati nelle baie più belle e ascolta il mare senza stress.', descEn: 'Enjoy the sun, dive into beautiful bays and listen to the sea without stress.' },
    { id: 'active', icon: <Telescope size={36} strokeWidth={1.5} className="text-[#003b81]" />, it: 'Avventura & Scienza', en: 'Adventure & Science', descIt: 'Partecipa attivamente al monitoraggio, usa i droni sottomarini e impara dagli esperti.', descEn: 'Actively participate in monitoring, use underwater drones and learn from experts.' },
    { id: 'family', icon: <Users size={36} strokeWidth={1.5} className="text-[#003b81]" />, it: 'Divertimento in Famiglia', en: 'Family Fun', descIt: 'Ritmi lenti, giochi in acqua e scoperte adatte anche ai più piccoli esploratori.', descEn: 'Slow rhythms, water games and discoveries suitable even for the youngest explorers.' }
  ];

  const durations = [
    { id: '1_day', icon: <Clock size={36} strokeWidth={1.5} className="text-[#003b81]" />, it: '1 Giorno', en: '1 Day', descIt: 'Una fuga rapida dalla quotidianità per assaporare la vera essenza del mare.', descEn: 'A quick escape from everyday life to savor the true essence of the sea.' },
    { id: '2_days', icon: <Moon size={36} strokeWidth={1.5} className="text-[#003b81]" />, it: '2 Giorni', en: '2 Days', descIt: 'Vivi l\'emozione di una notte in rada sotto le stelle e due giorni pieni di sole.', descEn: 'Experience the thrill of a night at anchor under the stars and two days of sun.' },
    { id: '1_week', icon: <CalendarDays size={36} strokeWidth={1.5} className="text-[#003b81]" />, it: '1 Settimana', en: '1 Week', descIt: 'La vacanza completa, esplorando l\'intero arcipelago con calma e dedizione.', descEn: 'The complete holiday, exploring the entire archipelago with calm and dedication.' }
  ];


  return (
    <div className="w-full h-full bg-white relative flex flex-col overflow-hidden">
      
      {/* Close Button */}
      <button 
        type="button" 
        onClick={onClose}
        className="absolute lg:top-8 top-6 right-6 lg:right-8 z-50 p-2 bg-white/20 hover:bg-white/50 rounded-full transition-colors backdrop-blur-sm" 
        aria-label="Close trip planner"
      >
        <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white lg:text-[#070C26] size-5 md:size-[26px]">
          <path d="M13.595 12.997 25.877.715a.42.42 0 0 0-.593-.592L13.003 12.404.72.123a.42.42 0 0 0-.593.592L12.41 12.997.128 25.28a.42.42 0 0 0 .583.603l.01-.01L13.003 13.59l12.281 12.282a.42.42 0 0 0 .593-.593L13.596 12.997z" fill="currentColor"></path>
        </svg>
      </button>

      <div className="w-full h-full flex flex-col lg:grid grid-cols-[clamp(280px,26vw,488px)_1fr] xl:grid-cols-[clamp(380px,26vw,488px)_1fr] overflow-hidden">
        
        {/* LEFT COLUMN - Branding */}
        <div 
          className="w-full h-48 lg:h-full relative flex flex-col bg-cover bg-center lg:py-12 py-6 px-6 xl:px-[clamp(24px,3.125vw,60px)]"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(7,12,38,0.2), rgba(7,12,38,0.7)), url('${experience?.images?.[0] || '/uploads/2022/03/fiore-di-mare.jpg'}')` }}
        >
          <img alt="Blue Dream Charter Logo" src="/logo-bluedrem-charter.svg" className="w-[180px] mb-auto hidden lg:block opacity-90" />
          
          <div className="flex flex-col gap-4 mt-auto lg:mt-0 lg:mb-12">
            <h3 className="lg:text-[32px] text-2xl text-white font-light leading-tight drop-shadow-md">
              {language === 'it' ? 'Configura la tua' : 'Configure Your'} <br/><b className="font-bold text-accent-gold">{language === 'it' ? 'Vacanza Ideale' : 'Dream Holiday'}</b>
            </h3>
            <p className="text-white/90 text-sm md:text-base leading-[1.64] max-w-[320px]">
              {language === 'it' 
                ? `Personalizza la tua vacanza${experience?.title ? ` includendo l'esclusivo programma ${experience.title[language] || experience.title.en}` : ''}. Vivi il mare in modo unico.`
                : `Customize your holiday${experience?.title ? ` including the exclusive ${experience.title[language] || experience.title.en} program` : ''}. Experience the sea in a unique way.`}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 mt-auto hidden lg:flex">
            <img src="/logo-bluedrem-charter.svg" alt="Blue Dream Logo" className="w-[120px] lg:mb-6 opacity-80" />
            <b className="lg:text-[22px] text-xl text-white font-medium max-w-[240px] leading-tight">
              {language === 'it' ? "L'arte del " : 'The art of Luxury '}
              <span className="font-light italic text-accent-gold">
                {language === 'it' ? 'Noleggio Yacht di Lusso' : 'Yacht Charter'}
              </span>
            </b>
            <p className="lg:text-sm text-xs text-white/70 max-w-[240px]">
              {language === 'it' 
                ? 'Visione globale, competenza locale. Creiamo ricordi indimenticabili in mare.'
                : 'Global vision, local insight. We craft unforgettable memories at sea.'}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN - Form */}
        <div className="h-[calc(100%-192px)] lg:h-full flex flex-col flex-1 relative overflow-hidden bg-[#fafbfe]">
          
          <div className="flex-1 flex flex-col gap-6 lg:justify-start lg:px-16 px-5 lg:pt-[60px] pt-8 overflow-y-auto scrollbar-hide">
            
            {/* Progress Bar */}
            <div className="w-full mb-2 shrink-0">
              <div className="bg-[#e2e8f0] rounded-[40px] h-2 w-full relative">
                <div 
                  className="bg-[#003b81] h-full rounded-[40px] transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
                <span 
                  className="text-[10px] text-white leading-none font-bold absolute top-4 -translate-x-1/2 bg-[#003b81] px-2 py-1.5 rounded transition-all duration-500 ease-out before:content-[''] before:absolute before:top-[-8px] before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-2.5 before:h-2.5 before:bg-[#003b81] before:rounded-full" 
                  style={{ left: `${progressPercentage}%` }}
                >
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>

            {/* Dynamic Step Content */}
            <div className="flex flex-col flex-1 pb-10">
              
              {step === 1 && (
                <div className="flex flex-col animate-fade-in my-auto">
                  <div className="flex flex-col gap-2 items-center text-center mb-8">
                    <h3 className="text-3xl lg:text-[34px] text-[#070C26] font-light">
                      {language === 'it' ? <><b className="font-bold">Stile</b> Vacanza</> : <><b className="font-bold">Holiday</b> Style</>}
                    </h3>
                    <p className="text-sm md:text-base text-slate-500 max-w-[400px]">
                      {language === 'it' ? 'Che tipo di esperienza sogni di vivere a bordo?' : 'What kind of experience do you dream of living on board?'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {styles.map(s => (
                      <button 
                        key={s.id}
                        type="button" 
                        onClick={() => handleSelection('style', s.id)}
                        className={`w-full h-full flex flex-col text-left gap-4 p-5 lg:p-6 lg:rounded-[24px] rounded-xl border-2 transition-all duration-300 ${formData.style === s.id ? 'border-[#003b81] bg-blue-50/30 shadow-md transform -translate-y-1' : 'border-slate-200 hover:border-blue-300 hover:shadow-sm bg-white'}`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div>{s.icon}</div>
                          <div className={`size-5 relative rounded-full border-2 transition-all duration-300 flex items-center justify-center ${formData.style === s.id ? 'border-[#003b81] bg-[#003b81]' : 'border-slate-300'}`}>
                            {formData.style === s.id && <div className="size-2 bg-white rounded-full"></div>}
                          </div>
                        </div>
                        <div>
                          <span className="text-lg text-[#070C26] font-bold block mb-1">{language === 'it' ? s.it : s.en}</span>
                          <p className="text-sm text-slate-500 leading-snug">{language === 'it' ? s.descIt : s.descEn}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col animate-fade-in my-auto max-h-full w-full">
                  <div className="flex flex-col gap-2 items-center text-center mb-6 shrink-0">
                    <h3 className="text-3xl lg:text-[34px] text-[#070C26] font-light">
                      <b className="font-bold">{language === 'it' ? 'Dettagli' : 'Details'}</b>
                    </h3>
                    <p className="text-sm md:text-base text-slate-500 max-w-[400px]">
                      {language === 'it' ? 'Scegli la durata, la data di partenza e gli ospiti.' : 'Choose duration, departure date and guests.'}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-6 px-1 pb-[150px] md:pb-[200px]">
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-bold text-[#070C26] uppercase tracking-wider">{language === 'it' ? 'Durata' : 'Duration'}</label>
                      <div className="grid grid-cols-3 gap-3">
                        {durations.map(d => (
                          <button 
                            key={d.id}
                            type="button" 
                            onClick={() => handleSelection('duration', d.id, false)}
                            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${formData.duration === d.id ? 'border-[#003b81] bg-blue-50/30 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-300'}`}
                          >
                            <div className="scale-75 text-[#003b81]">{d.icon}</div>
                            <span className="text-xs font-bold text-center leading-tight text-[#070C26]">{language === 'it' ? d.it : d.en}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-[200px] md:pb-6">
                      <div className="flex flex-col gap-3 relative z-50">
                        <label className="text-sm font-bold text-[#070C26] uppercase tracking-wider">{language === 'it' ? 'Data di Imbarco' : 'Boarding Date'}</label>
                        <CustomDatePicker 
                          selectedDate={formData.startDate}
                          onDateSelect={(date) => handleSelection('startDate', date, false)}
                          placeholder={language === 'it' ? 'Seleziona data' : 'Select date'}
                          durationDays={formData.duration === '1_week' ? 7 : formData.duration === '2_days' ? 2 : 1}
                        />
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-[#070C26] uppercase tracking-wider">{language === 'it' ? 'Ospiti' : 'Guests'}</label>
                        <select
                          value={formData.guests}
                          onChange={(e) => handleSelection('guests', e.target.value, false)}
                          className="w-full h-[52px] bg-white border-2 border-slate-200 text-[#070c26] text-sm rounded-xl px-4 focus:outline-none focus:border-[#003b81] transition-colors font-medium appearance-none"
                        >
                          {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                            <option key={n} value={n}>{n} {language === 'it' ? (n===1 ? 'Ospite' : 'Ospiti') : (n===1 ? 'Guest' : 'Guests')}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col animate-fade-in my-auto max-h-full">
                  <div className="flex flex-col gap-2 items-center text-center mb-6 shrink-0">
                    <h3 className="text-3xl lg:text-[34px] text-[#070C26] font-light">
                      {language === 'it' ? <><b className="font-bold">Seleziona</b> la Barca</> : <><b className="font-bold">Select</b> your Yacht</>}
                    </h3>
                    <p className="text-sm md:text-base text-slate-500 max-w-[400px]">
                      {language === 'it' ? 'Scegli l\'imbarcazione perfetta per la tua vacanza.' : 'Choose the perfect yacht for your holiday.'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1 pb-[100px]">
                    {fleet.map(boat => {
                      const isAvailable = checkAvailability(boat.id);
                      return (
                      <button 
                        key={boat.id}
                        type="button" 
                        disabled={!isAvailable}
                        onClick={() => handleSelection('yachtId', boat.id)}
                        className={`w-full flex flex-col text-left gap-3 p-4 lg:rounded-[24px] rounded-xl border-2 transition-all duration-300 ${!isAvailable ? 'border-slate-200 bg-slate-50 opacity-60 grayscale' : formData.yachtId === boat.id ? 'border-[#003b81] bg-blue-50/30 shadow-md transform -translate-y-1' : 'border-slate-200 hover:border-blue-300 hover:shadow-sm bg-white'}`}
                      >
                        <div 
                          className="w-full h-[140px] rounded-xl bg-cover bg-center relative overflow-hidden"
                          style={{ backgroundImage: `url(${boat.images[0]})` }} 
                        >
                          {!isAvailable && (
                            <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                              <span className="bg-white/90 text-slate-800 text-xs font-bold px-3 py-1 rounded-full">{language === 'it' ? 'Non Disponibile' : 'Unavailable'}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-start justify-between w-full mt-1">
                          <div className="flex flex-col gap-1">
                            <span className="text-lg text-[#070C26] font-bold block leading-tight">{boat.model}</span>
                            <p className="text-sm text-slate-500 leading-snug">{boat.name} • {boat.length}m • {boat.cabins} Cab</p>
                          </div>
                          {isAvailable && (
                            <div className={`size-5 relative rounded-full border-2 transition-all duration-300 flex items-center justify-center shrink-0 mt-1 ${formData.yachtId === boat.id ? 'border-[#003b81] bg-[#003b81]' : 'border-slate-300'}`}>
                              {formData.yachtId === boat.id && <div className="size-2 bg-white rounded-full"></div>}
                            </div>
                          )}
                        </div>
                        <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between w-full">
                          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">{formData.duration === '1_day' ? (language === 'it' ? 'Al Giorno' : 'Per Day') : formData.duration === '2_days' ? (language === 'it' ? 'Per 2 Giorni' : 'For 2 Days') : (language === 'it' ? 'A Settimana' : 'Per Week')}</span>
                          <span className="text-base font-black text-[#009649]">€{calculatePrice(boat).toLocaleString('it-IT')}</span>
                        </div>
                      </button>
                    )})}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col animate-fade-in my-auto max-w-[600px] w-full mx-auto">
                  <div className="flex flex-col gap-2 items-center text-center mb-6">
                    <h3 className="text-3xl lg:text-[34px] text-[#070C26] font-light">
                      {language === 'it' ? <><b className="font-bold">Dettagli</b> Finali</> : <><b className="font-bold">Final</b> Details</>}
                    </h3>
                    <p className="text-sm md:text-base text-slate-500">
                      {language === 'it' ? 'Inserisci i tuoi dati, ti ricontatteremo con un preventivo personalizzato.' : 'Enter your details, we will contact you with a customized quote.'}
                    </p>
                  </div>

                  {formData.yachtId && formData.startDate && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 flex flex-col gap-2 w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#070C26]">{fleet.find(b => b.id === formData.yachtId)?.model}</span>
                        <span className="text-sm font-black text-[#009649]">€{calculatePrice(fleet.find(b => b.id === formData.yachtId)).toLocaleString('it-IT')}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium flex-wrap">
                        <span>{new Date(formData.startDate).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}</span>
                        <span>•</span>
                        <span>{formData.duration === '1_day' ? (language === 'it' ? '1 Giorno' : '1 Day') : formData.duration === '2_days' ? (language === 'it' ? '2 Giorni' : '2 Days') : (language === 'it' ? '1 Settimana' : '1 Week')}</span>
                        <span>•</span>
                        <span>{formData.guests} {language === 'it' ? 'Ospiti' : 'Guests'}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-[#070c26]">{language === 'it' ? 'Nome Completo*' : 'Full Name*'}</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:border-[#003b81] focus:ring-1 focus:ring-[#003b81] transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-[#070c26]">Email*</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:border-[#003b81] focus:ring-1 focus:ring-[#003b81] transition-all outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 mb-5">
                    <label className="text-sm font-bold text-[#070c26]">{language === 'it' ? 'Telefono' : 'Phone'}</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:border-[#003b81] focus:ring-1 focus:ring-[#003b81] transition-all outline-none"
                      placeholder="+39 333 000 0000"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-[#070c26]">{language === 'it' ? 'Note / Richieste Particolari' : 'Notes / Special Requests'}</label>
                    <textarea 
                      rows="3"
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:border-[#003b81] focus:ring-1 focus:ring-[#003b81] transition-all outline-none resize-none"
                      placeholder={language === 'it' ? "Scrivi qui eventuali domande..." : "Write any questions here..."}
                    ></textarea>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Footer Actions */}
          <div className="w-full flex items-center justify-between gap-4 lg:px-[40px] lg:py-[20px] px-6 py-4 bg-white/80 backdrop-blur border-t border-slate-200 mt-auto shrink-0 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
            
            {step > 1 ? (
              <button 
                type="button" 
                onClick={handleBack}
                className="px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                {language === 'it' ? 'Indietro' : 'Back'}
              </button>
            ) : <div></div>}

            <button 
              type="button" 
              onClick={handleNext}
              disabled={isNextDisabled()}
              className={`px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${isNextDisabled() ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-[#003b81] text-white hover:bg-[#002a5c] shadow-lg shadow-[#003b81]/30 hover:shadow-[#003b81]/40 transform hover:-translate-y-0.5'}`}
            >
              {step === totalSteps 
                ? (language === 'it' ? 'Invia Richiesta' : 'Send Request') 
                : (language === 'it' ? 'Continua' : 'Next')
              }
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
