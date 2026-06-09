"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, Phone, MapPin, Ship, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function ContactsPage() {
  const { language } = useLanguage();
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate contact submission
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
  };

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
                      {language === 'it' ? 'Contattaci' : 'Contact Us'}
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="md:pt-6 pt-3">
            <h1 className="text-2xl font-bold text-[#070c26] mb-2.5">
              {language === 'it' ? 'Contatti & Coordinate Base' : 'Contact Us & Base Coordinates'}
            </h1>
            <p className="text-sm md:text-[15px] text-[#070c26] max-w-[700px] md:mb-8 mb-4">
              {language === 'it'
                ? 'Siamo a tua disposizione per personalizzare la tua crociera o darti informazioni di viaggio.'
                : 'We are at your disposal to customize your cruise itinerary or provide travel information.'}
            </p>
          </div>
        </div>

        {/* Main Grid: Form & Info */}
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_3fr] gap-8">
            
            {/* Inquiry Form Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#eceff0] shadow-[0_4px_20px_-4px_rgba(7,12,38,0.05)] relative overflow-hidden group hover:shadow-[0_8px_30px_-4px_rgba(7,12,38,0.08)] transition-all duration-300">
              {/* Decorative blob */}
              <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:bg-blue-100 transition-all duration-500"></div>

              {submitted ? (
                <div className="text-center py-12 flex flex-col items-center gap-5 animate-fade-in relative z-10">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#070c26]">
                    {language === 'it' ? 'Messaggio Inviato!' : 'Message Sent!'}
                  </h3>
                  <p className="text-[#6f7480] leading-relaxed max-w-md mx-auto">
                    {language === 'it'
                      ? `Grazie ${name}, abbiamo ricevuto il tuo messaggio. Ti ricontatteremo all'indirizzo ${email} il prima possibile.`
                      : `Thank you ${name}, we have received your message. We will get back to you at ${email} as soon as possible.`}
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }} 
                    className="mt-6 px-6 py-3 bg-[#060b25] text-white rounded-xl hover:bg-[#0a1a4a] transition-colors font-medium flex items-center gap-2"
                  >
                    <Mail size={18} />
                    {language === 'it' ? 'Invia un altro messaggio' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="border-b border-[#eceff0] pb-4">
                    <h2 className="text-xl font-bold text-[#070c26] flex items-center gap-2">
                      <Send size={20} className="text-[#0d5fa5]" />
                      {language === 'it' ? 'Invia un Messaggio Diretto' : 'Send a Direct Message'}
                    </h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-[#070c26] ml-1">{language === 'it' ? 'Nome e Cognome' : 'Full Name'}</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Mario Rossi"
                        className="w-full bg-gray-50 border border-gray-200 text-[#070c26] text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-all outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-[#070c26] ml-1">Email</label>
                        <input 
                          type="email" 
                          required
                          placeholder="mario.rossi@email.com"
                          className="w-full bg-gray-50 border border-gray-200 text-[#070c26] text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-all outline-none"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-[#070c26] ml-1">{language === 'it' ? 'Telefono' : 'Phone'}</label>
                        <input 
                          type="tel" 
                          placeholder="+39 333 123 4567"
                          className="w-full bg-gray-50 border border-gray-200 text-[#070c26] text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-all outline-none"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-[#070c26] ml-1">{language === 'it' ? 'Messaggio' : 'Message'}</label>
                      <textarea 
                        required
                        rows="5" 
                        placeholder={language === 'it' ? 'Scrivi qui la tua richiesta...' : 'Write your request here...'}
                        className="w-full bg-gray-50 border border-gray-200 text-[#070c26] text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-all outline-none resize-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-[#060b25] text-white hover:bg-[#0a1a4a] font-medium rounded-xl text-sm px-5 py-4 text-center mt-2 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : <Send size={18} />}
                      {loading ? (language === 'it' ? 'Invio...' : 'Sending...') : (language === 'it' ? 'Invia Messaggio' : 'Send Message')}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Contact Details & Base Info */}
            <div className="flex flex-col gap-6">
              {/* Direct Contacts card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#eceff0] shadow-[0_4px_20px_-4px_rgba(7,12,38,0.05)] flex flex-col gap-6 hover:shadow-[0_8px_30px_-4px_rgba(7,12,38,0.08)] transition-all duration-300">
                <div className="border-b border-[#eceff0] pb-4">
                  <h3 className="text-xl font-bold text-[#070c26] flex items-center gap-2">
                    {language === 'it' ? 'Ufficio & Staff' : 'Office & Staff'}
                  </h3>
                </div>
                
                <ul className="flex flex-col gap-6">
                  <li className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0d5fa5] flex items-center justify-center shrink-0 group-hover:bg-[#0d5fa5] group-hover:text-white transition-colors">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-[#070c26] text-[15px]">{language === 'it' ? 'Telefono Ufficio' : 'Office Telephone'}</div>
                      <a href="tel:+390818960579" className="text-[#6f7480] text-[14px] mt-1 hover:text-[#0d5fa5] transition-colors block">+39 081 896 0579</a>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-[#070c26] text-[15px]">WhatsApp / Base Manager</div>
                      <a href="https://wa.me/393286635141" target="_blank" rel="noopener noreferrer" className="text-[#6f7480] text-[14px] mt-1 hover:text-green-600 transition-colors block">+39 328 663 5141</a>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-[#070c26] text-[15px]">Email</div>
                      <a href="mailto:info@bluedreamcharter.com" className="text-[#6f7480] text-[14px] mt-1 hover:text-orange-500 transition-colors block">info@bluedreamcharter.com</a>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-[#070c26] text-[15px]">{language === 'it' ? 'Indirizzo Base' : 'Base Address'}</div>
                      <div className="text-[#6f7480] text-[14px] mt-1 leading-relaxed">
                        Via Roma, 2 (Marina Grande),<br />
                        80079 Isola di Procida (NA), Italy
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Travel Guide Promo Box */}
              <div className="bg-[#f8fcfd] rounded-2xl p-6 md:p-8 border border-[#e1f3f8] flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e1f3f8] rounded-bl-[100px] opacity-50"></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-[#0d5fa5] flex items-center gap-2 mb-3">
                    <Ship size={20} className="text-[#0d5fa5]" />
                    {language === 'it' ? 'Come Raggiungerci' : 'How to Reach Us'}
                  </h3>
                  <p className="text-[14px] text-[#4b5563] leading-relaxed mb-4">
                    {language === 'it' ? (
                      `La nostra base nautica si trova a Marina Grande di Procida. L'isola è collegata quotidianamente con traghetti e aliscafi in partenza da:`
                    ) : (
                      `Our charter base is located in Marina Grande of Procida. The island is connected daily by ferries and hydrofoils from:`
                    )}
                  </p>
                  <ul className="text-[14px] text-[#4b5563] flex flex-col gap-2.5">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0d5fa5] mt-1.5 shrink-0"></div>
                      <div><strong className="text-[#070c26]">Pozzuoli:</strong> {language === 'it' ? 'Traghetti (Medmar, Caremar) — circa 30-40 min.' : 'Ferries (Medmar, Caremar) — approx. 30-40 mins.'}</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0d5fa5] mt-1.5 shrink-0"></div>
                      <div><strong className="text-[#070c26]">Napoli Beverello:</strong> {language === 'it' ? 'Aliscafi (SNAV, Caremar) — circa 35-45 min.' : 'Hydrofoils (SNAV, Caremar) — approx. 35-45 mins.'}</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0d5fa5] mt-1.5 shrink-0"></div>
                      <div><strong className="text-[#070c26]">Napoli Porta di Massa:</strong> {language === 'it' ? 'Traghetti (Caremar) — circa 1 ora.' : 'Ferries (Caremar) — approx. 1 hour.'}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
