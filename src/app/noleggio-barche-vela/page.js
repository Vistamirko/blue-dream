"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { BedDouble, Bath, Users, Anchor, ShieldCheck, Waves, LifeBuoy, User, Fuel, Sparkles, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { fleet, SEASONS } from '../../lib/fleetData';

function PricesContent() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredFleet = activeFilter === 'all' 
    ? fleet 
    : fleet.filter(b => b.type === activeFilter);

  const filters = [
    { id: 'all', name: language === 'it' ? 'Tutta la Flotta' : 'All Fleet' },
    { id: 'monoscafo', name: language === 'it' ? 'Monoscafi' : 'Sailing Yachts' },
    { id: 'catamarano', name: language === 'it' ? 'Catamarani' : 'Catamarans' },
    { id: 'yacht', name: language === 'it' ? 'Motor Yacht / Luxury' : 'Motor Yachts / Luxury' }
  ];

  return (
    <section className="bg-white rounded-t-[36px]">
      <div className="pb-20">
        
        {/* Header Area */}
        <div className="container mx-auto px-5 max-lg:mb-4">
          <div className="pt-6">
            <nav className="w-full max-lg:hidden" aria-label="Breadcrumb">
              <ul className="flex items-center max-md:overflow-x-auto scrollbar-hide">
                <li>
                  <div className="flex items-center">
                    <Link href="/" className="max-md:whitespace-nowrap text-[13px] transition-all duration-300 text-[rgba(7,12,38,0.5)] underline underline-offset-2">Home</Link>
                    <span className="mx-2 text-[rgba(7,12,38,0.5)]"> / </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="max-md:whitespace-nowrap text-[13px] transition-all duration-300 text-[#070c26]">
                      {language === 'it' ? 'Noleggio Barche a Vela' : 'Yacht Charter'}
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="md:pt-6 pt-3">
            <span className="text-[#0d5fa5] font-extrabold uppercase tracking-[0.15em] text-sm md:text-base">
              Blue Dream Price List 2026
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-[#070c26] mt-2 mb-4">
              {language === 'it' ? 'Listino Noleggi Settimanali' : 'Weekly Rental Rates'}
            </h1>
            <p className="text-sm md:text-[15px] text-[#6f7480] max-w-[700px] md:mb-8 mb-4">
              {language === 'it' 
                ? 'Confronta i prezzi e le stagionalità della nostra flotta. Tariffe chiare e trasparenti.'
                : 'Compare pricing and seasonal ranges for our fleet. Clear and transparent rates.'}
            </p>
          </div>
        </div>

        {/* Seasonal calendar blocks */}
        <div className="container mx-auto px-5 mt-10">
          <h2 className="text-[#070c26] font-bold text-2xl mb-6 text-center">
            {language === 'it' ? 'Calendario delle Stagionalità' : 'Seasonal Calendars'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.entries(SEASONS).map(([key, season]) => (
              <div key={key} className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 border border-[#f2f5f8] shadow-[0_4px_20px_-4px_rgba(7,12,38,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(7,12,38,0.1)] transition-shadow duration-300">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xl text-white ${key === 'D' ? 'bg-[#c6a265]' : 'bg-[#0d5fa5]'}`}>
                  {key}
                </span>
                <h3 className="text-lg font-bold text-[#070c26]">
                  {language === 'it' ? `Stagione ${key}` : `Season ${key}`}
                </h3>
                <p className="text-sm text-[#6f7480] text-center leading-relaxed">
                  {season.range}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Pricing Table */}
        <div className="container mx-auto px-5 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            {/* Table Filters */}
            <div className="flex gap-2 flex-wrap">
              {filters.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 border ${
                    activeFilter === f.id 
                      ? 'bg-[#0d5fa5] text-white border-[#0d5fa5]' 
                      : 'bg-white text-[#6f7480] border-[#eceff0] hover:border-[#0d5fa5] hover:text-[#0d5fa5]'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>

            <a 
              href="/downloads/listino-blue-dream-2026.pdf" 
              target="_blank" 
              className="inline-flex items-center gap-2 bg-[#060b25] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0a1a4a] transition-colors duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="currentColor"/>
              </svg>
              {language === 'it' ? 'Scarica Listino PDF' : 'Download PDF Price List'}
            </a>
          </div>

          {/* Pricing Grid */}
          <div className="bg-white rounded-2xl border border-[#f2f5f8] shadow-[0_4px_20px_-4px_rgba(7,12,38,0.05)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#eceff0]">
                    <th className="py-4 px-6 font-semibold text-[#070c26] text-sm">{language === 'it' ? 'Modello Barca' : 'Yacht Model'}</th>
                    <th className="py-4 px-6 font-semibold text-[#070c26] text-sm">{language === 'it' ? 'Cabine/Bagni' : 'Cabins/Heads'}</th>
                    <th className="py-4 px-6 font-semibold text-[#070c26] text-sm">Pax</th>
                    <th className="py-4 px-6 font-semibold text-[#070c26] text-sm">{language === 'it' ? 'Stagione A' : 'Season A'}</th>
                    <th className="py-4 px-6 font-semibold text-[#070c26] text-sm">{language === 'it' ? 'Stagione B' : 'Season B'}</th>
                    <th className="py-4 px-6 font-semibold text-[#070c26] text-sm">{language === 'it' ? 'Stagione C' : 'Season C'}</th>
                    <th className="py-4 px-6 font-semibold text-[#070c26] text-sm">{language === 'it' ? 'Stagione D (Peak)' : 'Season D (Peak)'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eceff0]">
                  {filteredFleet.map((boat) => (
                    <tr key={boat.id} className="hover:bg-[#f8fafc] transition-colors duration-150">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#070c26]">{boat.model}</div>
                        <div className="text-sm text-[#6f7480] mt-0.5">
                          {boat.name} ({boat.year}) {boat.skipperRequired ? <span className="text-[#0d5fa5]">• {language === 'it' ? 'Solo con Skipper' : 'Skipper only'}</span> : ''}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#6f7480] text-sm">
                        <div className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> {boat.cabins} / <Bath className="w-4 h-4" /> {boat.heads}</div>
                      </td>
                      <td className="py-4 px-6 text-[#6f7480] text-sm">
                        <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {boat.passengers}</div>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#070c26]">€{boat.pricing.A}</td>
                      <td className="py-4 px-6 font-bold text-[#070c26]">€{boat.pricing.B}</td>
                      <td className="py-4 px-6 font-bold text-[#070c26]">€{boat.pricing.C}</td>
                      <td className="py-4 px-6 font-bold text-[#c6a265]">€{boat.pricing.D}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Included/Excluded Terms */}
        <div className="container mx-auto px-5 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-[#f2f5f8] shadow-[0_4px_20px_-4px_rgba(7,12,38,0.05)]">
              <h3 className="text-[#0d5fa5] font-bold text-xl mb-4 pb-4 border-b border-[#eceff0] flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.659 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z" fill="currentColor"/>
                </svg>
                {language === 'it' ? 'Cosa è Incluso nelle Tariffe' : 'What is Included'}
              </h3>
              <ul className="flex flex-col gap-3 text-sm md:text-[15px] text-[#6f7480] leading-relaxed">
                <li className="flex items-start gap-2"><Anchor className="w-5 h-5 text-[#0d5fa5] shrink-0" /> <span>{language === 'it' ? 'Noleggio dell\'imbarcazione e attrezzatura di bordo' : 'Yacht rental and standard safety/onboard gear'}</span></li>
                <li className="flex items-start gap-2"><ShieldCheck className="w-5 h-5 text-[#0d5fa5] shrink-0" /> <span>{language === 'it' ? 'Assicurazione Kasko e R.C. barca' : 'Kasko hull insurance and liability coverage'}</span></li>
                <li className="flex items-start gap-2"><Waves className="w-5 h-5 text-[#0d5fa5] shrink-0" /> <span>{language === 'it' ? 'Posto barca gratuito nel porto d\'imbarco (Marina Grande, Procida) per la prima e l\'ultima notte' : 'Free berth in port of embarkation (Procida) for first & last night'}</span></li>
                <li className="flex items-start gap-2"><LifeBuoy className="w-5 h-5 text-[#0d5fa5] shrink-0" /> <span>{language === 'it' ? 'Tender con scalmi e remi' : 'Tender dinghy with oars'}</span></li>
                <li className="flex items-start gap-2"><BedDouble className="w-5 h-5 text-[#0d5fa5] shrink-0" /> <span>{language === 'it' ? 'Dotazioni cucina complete di gas' : 'Fully equipped kitchen and cooking gas'}</span></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#f2f5f8] shadow-[0_4px_20px_-4px_rgba(7,12,38,0.05)]">
              <h3 className="text-[#ef4444] font-bold text-xl mb-4 pb-4 border-b border-[#eceff0] flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 10.586L9.172 7.757L7.757 9.172L10.586 12L7.757 14.828L9.172 16.243L12 13.414L14.828 16.243L16.243 14.828L13.414 12L16.243 9.172L14.828 7.757L12 10.586Z" fill="currentColor"/>
                </svg>
                {language === 'it' ? 'Cosa è Escluso' : 'What is Excluded'}
              </h3>
              <ul className="flex flex-col gap-3 text-sm md:text-[15px] text-[#6f7480] leading-relaxed">
                <li className="flex items-start gap-2"><User className="w-5 h-5 text-[#ef4444] shrink-0" /> <span>{language === 'it' ? 'Servizio Skipper (€150/giorno + vitto, se richiesto o necessario)' : 'Skipper service (€150/day + food, if requested/mandatory)'}</span></li>
                <li className="flex items-start gap-2"><Fuel className="w-5 h-5 text-[#ef4444] shrink-0" /> <span>{language === 'it' ? 'Carburante consumato (la barca viene consegnata col pieno e va riconsegnata col pieno)' : 'Fuel consumption (delivered full, returned full)'}</span></li>
                <li className="flex items-start gap-2"><Sparkles className="w-5 h-5 text-[#ef4444] shrink-0" /> <span>{language === 'it' ? 'Pulizia finale obbligatoria (€120-€200 a seconda del modello)' : 'Mandatory final cleaning (€120-€200 depending on yacht size)'}</span></li>
                <li className="flex items-start gap-2"><Home className="w-5 h-5 text-[#ef4444] shrink-0" /> <span>{language === 'it' ? 'Cambusa, lenzuola e asciugamani' : 'Provisioning, linen and towels'}</span></li>
                <li className="flex items-start gap-2"><Anchor className="w-5 h-5 text-[#ef4444] shrink-0" /> <span>{language === 'it' ? 'Ormeggi in altri porti o parchi marini' : 'Mooring fees in other ports/marinas'}</span></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default function PricesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex justify-center items-center">Loading...</div>}>
      <PricesContent />
    </Suspense>
  );
}
