"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '../../../context/LanguageContext';
import { fleet, getTranslation } from '../../../lib/fleetData';
import CustomDatePicker from '../../../components/CustomDatePicker';

export default function YachtDetailPage({ params }) {
  const resolvedParams = use(params);
  const { language } = useLanguage();
  const [yacht, setYacht] = useState(null);
  const [isMobileBookingOpen, setIsMobileBookingOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const id = resolvedParams?.id;
    if (id) {
      const foundYacht = fleet.find(b => b.id === id);
      if (!foundYacht) {
        notFound();
      } else {
        setYacht(foundYacht);
      }
    }
  }, [resolvedParams?.id]);

  if (!yacht) return null;

  // Translation helpers
  const t = (en, it) => language === 'it' ? it : en;

  const lowSeasonPrice = yacht.pricing.A || 0;
  const highSeasonPrice = yacht.pricing.E || yacht.pricing.D || yacht.pricing.C || lowSeasonPrice;

  return (
    <div className="bg-white">
      {/* Immersive Hero Banner */}
      <section className="flex flex-col items-center bg-white">
        
        {/* Mobile Banner (Visible only on screens < lg) */}
        <section className="lg:hidden w-full relative overflow-hidden">
          <div className="w-full h-[88px] bg-[#070c26]"></div>
          <div className="relative h-[330px]">
            <img 
              alt={yacht.model} 
              className="w-full h-full object-cover" 
              src={yacht.images[1] || yacht.images[0]} 
            />
          </div>
          <div className="flex items-center justify-between bg-[#070c26] p-5">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[13px] text-white">Napoli, Italy</span>
              </div>
              <div className="w-full flex flex-col">
                <h1 className="text-[22px] font-bold text-white">{yacht.model}</h1>
              </div>
              <p className="text-white/80 text-[11px] mb-6">
                {yacht.length}m • {yacht.cabins} {t('Cabins', 'Cabine')} • 2 {t('crew', 'equipaggio')}
              </p>
              <button type="button" className="flex items-center gap-1.5 md:gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                  <path d="M19.7118 9.40125C19.5252 9.25059 19.2801 9.19335 19.0465 9.2466L17.2263 9.6514C17.2008 9.65677 17.1748 9.65966 17.1487 9.65966H17.113C16.9293 9.65966 16.7758 9.52069 16.7575 9.3381C16.6264 8.01114 16.1047 6.75325 15.2587 5.72254C15.1429 5.58068 15.153 5.37415 15.2819 5.24454L15.3081 5.21812C15.3269 5.19954 15.3473 5.18303 15.3694 5.16872L16.9414 4.16841C17.3095 3.93478 17.4181 3.44701 17.1844 3.07908C16.9508 2.71115 16.463 2.60245 16.0951 2.83609C15.9973 2.89828 15.9143 2.98111 15.8521 3.07908L14.8518 4.65109C14.8379 4.67324 14.8214 4.69361 14.8028 4.71177L14.7768 4.73819C14.6468 4.86794 14.4398 4.87826 14.2977 4.76185C13.267 3.91648 12.0087 3.39527 10.6821 3.26442C10.4989 3.24598 10.3595 3.09119 10.3606 2.90722V2.87145C10.3606 2.84544 10.3633 2.8193 10.3691 2.79398L10.7735 0.973613C10.8261 0.739978 10.7692 0.494923 10.6189 0.308483C10.3241 -0.0316501 9.80966 -0.0681125 9.4698 0.226201C9.44063 0.251656 9.41312 0.279175 9.38766 0.308483C9.23727 0.494923 9.18044 0.739978 9.233 0.973613L9.63739 2.79577C9.64317 2.82068 9.64593 2.84613 9.64593 2.87145V2.90722C9.64593 3.09077 9.50695 3.24447 9.32437 3.26263C7.99755 3.39376 6.73966 3.91538 5.70881 4.76103C5.56667 4.87743 5.35973 4.86711 5.2297 4.7375L5.2037 4.71108C5.18512 4.69278 5.16861 4.67242 5.15471 4.65027L4.15427 3.07825C3.92063 2.71033 3.433 2.60163 3.06507 2.8354C2.69701 3.06903 2.58845 3.55667 2.82208 3.92459C2.88427 4.02256 2.9671 4.10539 3.06507 4.16759L4.63695 5.16803C4.65924 5.18234 4.6796 5.19872 4.69845 5.21729L4.72459 5.24371C4.85352 5.37332 4.86356 5.57985 4.74771 5.72171C3.90247 6.75284 3.38154 8.01114 3.25082 9.33796C3.23252 9.52055 3.07897 9.65952 2.89528 9.65952H2.85785C2.83171 9.65952 2.80557 9.65677 2.78025 9.6514L0.960019 9.2466C0.534853 9.15221 0.113264 9.42024 0.0188748 9.84568C-0.0753772 10.2713 0.192519 10.6924 0.618097 10.7867C0.730649 10.8117 0.847467 10.8117 0.960019 10.7867L2.78204 10.3823C2.80708 10.3769 2.8324 10.374 2.85772 10.374H2.89349C3.07718 10.374 3.23074 10.513 3.2489 10.6956C3.38071 12.0226 3.90274 13.2809 4.7495 14.3112C4.86522 14.453 4.85517 14.6596 4.72625 14.7893L4.70024 14.8157C4.68125 14.8343 4.66089 14.8507 4.63874 14.865L3.06672 15.8653C2.6988 16.0989 2.5901 16.5867 2.82373 16.9546C3.0575 17.3226 3.54514 17.4312 3.91306 17.1976C4.01103 17.1354 4.09386 17.0526 4.15606 16.9546L5.15636 15.3826C5.1704 15.3605 5.18677 15.3401 5.20535 15.3219L5.23149 15.2955C5.36152 15.1658 5.56832 15.1554 5.71059 15.2718C6.7409 16.1168 7.99824 16.6382 9.32437 16.7693C9.50695 16.7874 9.64593 16.941 9.64593 17.1247V17.1623C9.64593 17.1883 9.64304 17.2144 9.63739 17.2397L9.23287 19.0601C9.18044 19.2937 9.23727 19.5388 9.38766 19.7252C9.68239 20.0654 10.1969 20.1018 10.5366 19.8075C10.5659 19.782 10.5934 19.7545 10.6187 19.7252C10.7692 19.5388 10.8259 19.2937 10.7735 19.0601L10.369 17.2397C10.3633 17.2144 10.3605 17.1883 10.3605 17.1623V17.1265C10.3605 16.9428 10.4994 16.7892 10.682 16.7711C12.009 16.6399 13.2669 16.1183 14.2976 15.2727C14.4398 15.1561 14.6466 15.1666 14.7767 15.2962L14.8028 15.3226C14.8214 15.3409 14.8378 15.3613 14.8518 15.3834L15.8521 16.9553C16.0857 17.3234 16.5734 17.4319 16.9414 17.1983C17.3094 16.9647 17.4181 16.477 17.1843 16.109C17.1222 16.0111 17.0393 15.9283 16.9414 15.8661L15.3694 14.8657C15.3473 14.8514 15.3269 14.835 15.3079 14.8164L15.2819 14.79C15.1529 14.6604 15.1429 14.4538 15.2587 14.312C16.1039 13.2809 16.6248 12.0226 16.7557 10.6957C16.7741 10.5125 16.9289 10.3731 17.1129 10.3742H17.1487C17.1747 10.3742 17.2008 10.3769 17.2261 10.3823L19.0465 10.7868C19.4717 10.8818 19.8932 10.6141 19.9882 10.1887C20.054 9.89508 19.9468 9.58962 19.7118 9.40125ZM10.3606 4.35017C10.3606 4.24767 10.4045 4.15011 10.4813 4.08228C10.5584 4.01513 10.6603 3.98362 10.7621 3.99546C11.8418 4.13085 12.8651 4.55491 13.7239 5.22266C13.88 5.34347 13.9086 5.56774 13.7878 5.72391C13.7786 5.73602 13.7681 5.74785 13.7571 5.75859L11.1783 8.33765C11.1112 8.4048 11.0205 8.44236 10.9254 8.44236C10.8722 8.44209 10.82 8.42984 10.7721 8.40659C10.7157 8.37989 10.6578 8.35595 10.5989 8.33517C10.4559 8.28482 10.3606 8.14942 10.3606 7.99793V4.35017ZM6.28257 5.22266C7.14157 4.55491 8.16472 4.13085 9.24443 3.99546C9.34625 3.98335 9.44806 4.01472 9.52525 4.08228C9.60203 4.15011 9.64593 4.24767 9.64593 4.35017V7.99793C9.64593 8.14942 9.55057 8.28454 9.40761 8.3349C9.34872 8.35554 9.29079 8.37948 9.23438 8.40631C9.1865 8.42956 9.13435 8.44167 9.0811 8.44209C8.98602 8.44209 8.89535 8.40452 8.8282 8.33738L6.24941 5.75817C6.10934 5.6192 6.10865 5.39272 6.24804 5.25307C6.25877 5.24192 6.27046 5.23188 6.28257 5.22266ZM5.21085 6.29658C5.33166 6.14055 5.55594 6.11193 5.71211 6.23232C5.72422 6.24168 5.73605 6.252 5.74678 6.26301L8.32406 8.8418C8.43124 8.94829 8.45986 9.11079 8.39561 9.2477C8.36878 9.30411 8.34483 9.36232 8.32406 9.42134C8.2737 9.5643 8.13872 9.65966 7.98723 9.65966H4.33617C4.13899 9.65966 3.97897 9.49963 3.97897 9.30232C3.97897 9.28774 3.98007 9.27274 3.98186 9.25802C4.11725 8.17846 4.54132 7.15558 5.20934 6.29672H5.21085V6.29658ZM5.49306 13.8754H5.47063C5.3684 13.8689 5.27373 13.819 5.21085 13.7378C4.5427 12.8789 4.11863 11.8561 3.98324 10.7764C3.9582 10.5807 4.09689 10.402 4.29269 10.3769C4.30727 10.3751 4.32158 10.3742 4.33617 10.3742H7.98434C8.13583 10.3742 8.27081 10.4695 8.32117 10.6125C8.34194 10.6714 8.36589 10.7296 8.39272 10.7861C8.45697 10.9229 8.42835 11.0855 8.32117 11.1919L5.74238 13.7707C5.67592 13.8372 5.58552 13.8751 5.49154 13.8754H5.49306ZM9.64606 15.6835C9.64606 15.8808 9.4859 16.0409 9.28873 16.0409C9.27415 16.0409 9.25901 16.0409 9.24443 16.0384C8.16472 15.9029 7.14157 15.4788 6.28271 14.811C6.12654 14.6904 6.09792 14.466 6.21873 14.3098C6.22809 14.2977 6.23841 14.286 6.24941 14.2753L8.8282 11.6961C8.9347 11.5886 9.09761 11.56 9.23438 11.6246C9.29093 11.6515 9.34872 11.6754 9.40775 11.6961C9.55057 11.7464 9.64606 11.8815 9.64606 12.033V15.6835ZM10.0033 10.7314C9.6085 10.7314 9.28873 10.4116 9.28873 10.0169C9.28873 9.62209 9.6085 9.30232 10.0033 9.30232C10.398 9.30232 10.7178 9.62209 10.7178 10.0169C10.7178 10.4116 10.398 10.7314 10.0033 10.7314ZM13.7239 14.811C12.8651 15.4788 11.8418 15.9029 10.7621 16.0384C10.7475 16.0384 10.7324 16.0409 10.7178 16.0409C10.5206 16.0409 10.3606 15.8808 10.3606 15.6835V12.0359C10.3606 11.8844 10.4559 11.7493 10.5989 11.6989C10.6578 11.6782 10.7157 11.6544 10.7721 11.6275C10.9089 11.5629 11.0718 11.5913 11.1783 11.6989L13.7571 14.278C13.8972 14.4171 13.8979 14.6436 13.7586 14.7832C13.7479 14.7944 13.736 14.8043 13.7239 14.8139V14.811ZM14.7957 13.7371C14.7328 13.8183 14.6381 13.8682 14.536 13.8747H14.5135C14.4188 13.8747 14.3277 13.8372 14.2608 13.77L11.6825 11.1919C11.5753 11.0855 11.5467 10.9229 11.611 10.7861C11.6377 10.7296 11.6617 10.6714 11.6825 10.6125C11.7332 10.4684 11.8697 10.3731 12.0222 10.3742H15.6703C15.8675 10.3742 16.0275 10.5342 16.0275 10.7314C16.0275 10.7461 16.0264 10.7611 16.0247 10.7757C15.8893 11.8554 15.4652 12.8783 14.7972 13.7371H14.7957ZM15.9365 9.53885C15.8686 9.61563 15.7715 9.65966 15.6688 9.65966H12.0222C11.8707 9.65966 11.7357 9.56417 11.6853 9.42134C11.6646 9.36232 11.6406 9.30411 11.6138 9.2477C11.5495 9.11079 11.5782 8.94829 11.6853 8.8418L14.2641 6.26301C14.4034 6.12335 14.6296 6.12252 14.7692 6.26191C14.7804 6.27305 14.7903 6.28447 14.8001 6.29658C15.4681 7.15544 15.8921 8.17832 16.0275 9.25802C16.0394 9.36025 16.0069 9.46235 15.938 9.53885H15.9365Z" fill="currentColor" fillOpacity="0.8" />
                </svg>
                <span className="text-white text-xs">{t('Add to Favorites', 'Preferiti')}</span>
              </button>
            </div>
            <div className="flex flex-col gap-3.5">
              <button type="button" className="flex flex-col w-[130px] gap-5 p-3 rounded-lg backdrop-blur-[9px] bg-[rgba(7,12,38,0.05)] border border-[rgba(255,255,255,0.3)]">
                <div className="flex items-start justify-between gap-2">
                  <p className="flex flex-col">
                    <span className="text-[20px] font-light text-white leading-none">+{yacht.images.length}</span>
                    <small className="text-[11px] font-light text-white">{t('Photos', 'Foto')}</small>
                  </p>
                  <svg width="20" height="20" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.382 7.323a2.704 2.704 0 0 0-2.705-2.704H7.323A2.704 2.704 0 0 0 4.62 7.323v22.354a2.704 2.704 0 0 0 2.704 2.705h22.354a2.704 2.704 0 0 0 2.705-2.705V7.323zm1.529 22.354a4.233 4.233 0 0 1-4.234 4.233H7.323a4.233 4.233 0 0 1-4.233-4.233V7.323A4.233 4.233 0 0 1 7.323 3.09h22.354a4.233 4.233 0 0 1 4.233 4.233v22.354z" fill="#fff"></path>
                    <path d="M27.526 14.56a2.499 2.499 0 0 1 3.534 0l2.435 2.435a.765.765 0 0 1-1.081 1.081l-2.435-2.435a.97.97 0 0 0-1.372 0l-8.146 8.146a2.499 2.499 0 0 1-3.534 0l-2.172-2.172a.97.97 0 0 0-1.372 0l-8.602 8.602a.765.765 0 0 1-1.08-1.081l8.601-8.602a2.499 2.499 0 0 1 3.534 0l2.172 2.172a.97.97 0 0 0-1.372 0l8.146-8.146zM15.04 11.948a1.548 1.548 0 1 0-3.097 0 1.548 1.548 0 0 0 3.096 0zm1.528 0a3.077 3.077 0 1 1-6.154 0 3.077 3.077 0 0 1 6.154 0z" fill="#fff"></path>
                  </svg>
                </div>
              </button>
              <div className="flex items-start gap-4">
                <div className="flex flex-col">
                  <span className="text-white text-sm opacity-50">{t('from', 'da')}</span>
                  <p className="flex items-center gap-1">
                    <b className="text-white text-[34px] leading-none">{Math.floor(lowSeasonPrice / 1000)}</b>
                    <span className="flex flex-col leading-none">
                      <span className="text-white text-xs font-bold">{(lowSeasonPrice % 1000).toString().padStart(3, '0')}€</span>
                      <small className="text-white text-[9px] opacity-50">{t('/week', '/settimana')}</small>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 py-3 bg-white mb-2">
            <nav className="w-full" aria-label="Breadcrumb">
              <ul className="flex items-center max-md:overflow-x-auto scrollbar-hide">
                <li>
                  <div className="flex items-center">
                    <Link href="/" className="max-md:whitespace-nowrap text-[13px] transition-all duration-300 text-[rgba(7,12,38,0.5)] underline underline-offset-2">
                      {t('Home', 'Home')}
                    </Link>
                    <span className="mx-2 text-[rgba(7,12,38,0.5)]"> / </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <Link href="/la-flotta-blue-dream-charter" className="max-md:whitespace-nowrap text-[13px] transition-all duration-300 text-[rgba(7,12,38,0.5)] underline underline-offset-2">
                      {t('Yacht Charter', 'Noleggio Barche')}
                    </Link>
                    <span className="mx-2 text-[rgba(7,12,38,0.5)]"> / </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="max-md:whitespace-nowrap text-[13px] text-[#070c26]">{yacht.model}</span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </section>

        {/* Desktop Banner (Visible only on screens >= lg) */}
        <section className="max-lg:hidden w-full relative overflow-hidden min-h-[500px] md:min-h-[760px] h-dvh">
          <div className="absolute top-0 left-0 w-full h-full z-10 bg-black/40"></div>
          
          <img 
            alt={yacht.model} 
            loading="eager" 
            className="w-full h-full object-cover z-0 absolute top-0 left-0" 
            src={yacht.images[1] || yacht.images[0]} 
            style={{ objectPosition: '50% 50%' }} 
          />
          
          <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center z-20">
            <div className="container w-full h-full relative flex flex-col">
              
              <div className="pt-25 w-full z-[101]">
                <nav className="w-full max-lg:hidden" aria-label="Breadcrumb">
                  <ul className="flex items-center max-md:overflow-x-auto scrollbar-hide">
                    <li>
                      <div className="flex items-center">
                        <Link href="/" className="max-md:whitespace-nowrap text-[13px] transition-all duration-300 text-[rgba(255,255,255,0.7)] hover:text-white underline underline-offset-2">
                          {t('Home', 'Home')}
                        </Link>
                        <span className="mx-2 text-[rgba(255,255,255,0.7)]"> / </span>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <Link href="/la-flotta-blue-dream-charter" className="max-md:whitespace-nowrap text-[13px] transition-all duration-300 text-[rgba(255,255,255,0.7)] hover:text-white underline underline-offset-2">
                          {t('Yacht Charter', 'Noleggio Barche')}
                        </Link>
                        <span className="mx-2 text-[rgba(255,255,255,0.7)]"> / </span>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <span className="max-md:whitespace-nowrap text-[13px] text-white font-medium">{yacht.model}</span>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="pb-25 md:pb-[clamp(40px,6.25vw,120px)] mt-auto w-full flex items-end justify-between relative">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-white text-sm">Procida, Italy</span>
                  </div>
                  <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between">
                    <h1 className="lg:text-[64px] md:text-[40px] text-[30px] font-bold text-white leading-tight">
                      {yacht.model}
                    </h1>
                  </div>
                  <p className="text-white/80 text-base mb-8">
                    {yacht.length}m • {yacht.cabins} {t('Cabins', 'Cabine')} • {yacht.passengers} {t('Guests', 'Ospiti')}
                  </p>
                  
                  <button type="button" className="hidden md:flex items-center gap-1.5 md:gap-3 opacity-80 hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none" className="text-white">
                      <path d="M19.7118 9.40125C19.5252 9.25059 19.2801 9.19335 19.0465 9.2466L17.2263 9.6514C17.2008 9.65677 17.1748 9.65966 17.1487 9.65966H17.113C16.9293 9.65966 16.7758 9.52069 16.7575 9.3381C16.6264 8.01114 16.1047 6.75325 15.2587 5.72254C15.1429 5.58068 15.153 5.37415 15.2819 5.24454L15.3081 5.21812C15.3269 5.19954 15.3473 5.18303 15.3694 5.16872L16.9414 4.16841C17.3095 3.93478 17.4181 3.44701 17.1844 3.07908C16.9508 2.71115 16.463 2.60245 16.0951 2.83609C15.9973 2.89828 15.9143 2.98111 15.8521 3.07908L14.8518 4.65109C14.8379 4.67324 14.8214 4.69361 14.8028 4.71177L14.7768 4.73819C14.6468 4.86794 14.4398 4.87826 14.2977 4.76185C13.267 3.91648 12.0087 3.39527 10.6821 3.26442C10.4989 3.24598 10.3595 3.09119 10.3606 2.90722V2.87145C10.3606 2.84544 10.3633 2.8193 10.3691 2.79398L10.7735 0.973613C10.8261 0.739978 10.7692 0.494923 10.6189 0.308483C10.3241 -0.0316501 9.80966 -0.0681125 9.4698 0.226201C9.44063 0.251656 9.41312 0.279175 9.38766 0.308483C9.23727 0.494923 9.18044 0.739978 9.233 0.973613L9.63739 2.79577C9.64317 2.82068 9.64593 2.84613 9.64593 2.87145V2.90722C9.64593 3.09077 9.50695 3.24447 9.32437 3.26263C7.99755 3.39376 6.73966 3.91538 5.70881 4.76103C5.56667 4.87743 5.35973 4.86711 5.2297 4.7375L5.2037 4.71108C5.18512 4.69278 5.16861 4.67242 5.15471 4.65027L4.15427 3.07825C3.92063 2.71033 3.433 2.60163 3.06507 2.8354C2.69701 3.06903 2.58845 3.55667 2.82208 3.92459C2.88427 4.02256 2.9671 4.10539 3.06507 4.16759L4.63695 5.16803C4.65924 5.18234 4.6796 5.19872 4.69845 5.21729L4.72459 5.24371C4.85352 5.37332 4.86356 5.57985 4.74771 5.72171C3.90247 6.75284 3.38154 8.01114 3.25082 9.33796C3.23252 9.52055 3.07897 9.65952 2.89528 9.65952H2.85785C2.83171 9.65952 2.80557 9.65677 2.78025 9.6514L0.960019 9.2466C0.534853 9.15221 0.113264 9.42024 0.0188748 9.84568C-0.0753772 10.2713 0.192519 10.6924 0.618097 10.7867C0.730649 10.8117 0.847467 10.8117 0.960019 10.7867L2.78204 10.3823C2.80708 10.3769 2.8324 10.374 2.85772 10.374H2.89349C3.07718 10.374 3.23074 10.513 3.2489 10.6956C3.38071 12.0226 3.90274 13.2809 4.7495 14.3112C4.86522 14.453 4.85517 14.6596 4.72625 14.7893L4.70024 14.8157C4.68125 14.8343 4.66089 14.8507 4.63874 14.865L3.06672 15.8653C2.6988 16.0989 2.5901 16.5867 2.82373 16.9546C3.0575 17.3226 3.54514 17.4312 3.91306 17.1976C4.01103 17.1354 4.09386 17.0526 4.15606 16.9546L5.15636 15.3826C5.1704 15.3605 5.18677 15.3401 5.20535 15.3219L5.23149 15.2955C5.36152 15.1658 5.56832 15.1554 5.71059 15.2718C6.7409 16.1168 7.99824 16.6382 9.32437 16.7693C9.50695 16.7874 9.64593 16.941 9.64593 17.1247V17.1623C9.64593 17.1883 9.64304 17.2144 9.63739 17.2397L9.23287 19.0601C9.18044 19.2937 9.23727 19.5388 9.38766 19.7252C9.68239 20.0654 10.1969 20.1018 10.5366 19.8075C10.5659 19.782 10.5934 19.7545 10.6187 19.7252C10.7692 19.5388 10.8259 19.2937 10.7735 19.0601L10.369 17.2397C10.3633 17.2144 10.3605 17.1883 10.3605 17.1623V17.1265C10.3605 16.9428 10.4994 16.7892 10.682 16.7711C12.009 16.6399 13.2669 16.1183 14.2976 15.2727C14.4398 15.1561 14.6466 15.1666 14.7767 15.2962L14.8028 15.3226C14.8214 15.3409 14.8378 15.3613 14.8518 15.3834L15.8521 16.9553C16.0857 17.3234 16.5734 17.4319 16.9414 17.1983C17.3094 16.9647 17.4181 16.477 17.1843 16.109C17.1222 16.0111 17.0393 15.9283 16.9414 15.8661L15.3694 14.8657C15.3473 14.8514 15.3269 14.835 15.3079 14.8164L15.2819 14.79C15.1529 14.6604 15.1429 14.4538 15.2587 14.312C16.1039 13.2809 16.6248 12.0226 16.7557 10.6957C16.7741 10.5125 16.9289 10.3731 17.1129 10.3742H17.1487C17.1747 10.3742 17.2008 10.3769 17.2261 10.3823L19.0465 10.7868C19.4717 10.8818 19.8932 10.6141 19.9882 10.1887C20.054 9.89508 19.9468 9.58962 19.7118 9.40125ZM10.3606 4.35017C10.3606 4.24767 10.4045 4.15011 10.4813 4.08228C10.5584 4.01513 10.6603 3.98362 10.7621 3.99546C11.8418 4.13085 12.8651 4.55491 13.7239 5.22266C13.88 5.34347 13.9086 5.56774 13.7878 5.72391C13.7786 5.73602 13.7681 5.74785 13.7571 5.75859L11.1783 8.33765C11.1112 8.4048 11.0205 8.44236 10.9254 8.44236C10.8722 8.44209 10.82 8.42984 10.7721 8.40659C10.7157 8.37989 10.6578 8.35595 10.5989 8.33517C10.4559 8.28482 10.3606 8.14942 10.3606 7.99793V4.35017ZM6.28257 5.22266C7.14157 4.55491 8.16472 4.13085 9.24443 3.99546C9.34625 3.98335 9.44806 4.01472 9.52525 4.08228C9.60203 4.15011 9.64593 4.24767 9.64593 4.35017V7.99793C9.64593 8.14942 9.55057 8.28454 9.40761 8.3349C9.34872 8.35554 9.29079 8.37948 9.23438 8.40631C9.1865 8.42956 9.13435 8.44167 9.0811 8.44209C8.98602 8.44209 8.89535 8.40452 8.8282 8.33738L6.24941 5.75817C6.10934 5.6192 6.10865 5.39272 6.24804 5.25307C6.25877 5.24192 6.27046 5.23188 6.28257 5.22266ZM5.21085 6.29658C5.33166 6.14055 5.55594 6.11193 5.71211 6.23232C5.72422 6.24168 5.73605 6.252 5.74678 6.26301L8.32406 8.8418C8.43124 8.94829 8.45986 9.11079 8.39561 9.2477C8.36878 9.30411 8.34483 9.36232 8.32406 9.42134C8.2737 9.5643 8.13872 9.65966 7.98723 9.65966H4.33617C4.13899 9.65966 3.97897 9.49963 3.97897 9.30232C3.97897 9.28774 3.98007 9.27274 3.98186 9.25802C4.11725 8.17846 4.54132 7.15558 5.20934 6.29672H5.21085V6.29658ZM5.49306 13.8754H5.47063C5.3684 13.8689 5.27373 13.819 5.21085 13.7378C4.5427 12.8789 4.11863 11.8561 3.98324 10.7764C3.9582 10.5807 4.09689 10.402 4.29269 10.3769C4.30727 10.3751 4.32158 10.3742 4.33617 10.3742H7.98434C8.13583 10.3742 8.27081 10.4695 8.32117 10.6125C8.34194 10.6714 8.36589 10.7296 8.39272 10.7861C8.45697 10.9229 8.42835 11.0855 8.32117 11.1919L5.74238 13.7707C5.67592 13.8372 5.58552 13.8751 5.49154 13.8754H5.49306ZM9.64606 15.6835C9.64606 15.8808 9.4859 16.0409 9.28873 16.0409C9.27415 16.0409 9.25901 16.0409 9.24443 16.0384C8.16472 15.9029 7.14157 15.4788 6.28271 14.811C6.12654 14.6904 6.09792 14.466 6.21873 14.3098C6.22809 14.2977 6.23841 14.286 6.24941 14.2753L8.8282 11.6961C8.9347 11.5886 9.09761 11.56 9.23438 11.6246C9.29093 11.6515 9.34872 11.6754 9.40775 11.6961C9.55057 11.7464 9.64606 11.8815 9.64606 12.033V15.6835ZM10.0033 10.7314C9.6085 10.7314 9.28873 10.4116 9.28873 10.0169C9.28873 9.62209 9.6085 9.30232 10.0033 9.30232C10.398 9.30232 10.7178 9.62209 10.7178 10.0169C10.7178 10.4116 10.398 10.7314 10.0033 10.7314ZM13.7239 14.811C12.8651 15.4788 11.8418 15.9029 10.7621 16.0384C10.7475 16.0384 10.7324 16.0409 10.7178 16.0409C10.5206 16.0409 10.3606 15.8808 10.3606 15.6835V12.0359C10.3606 11.8844 10.4559 11.7493 10.5989 11.6989C10.6578 11.6782 10.7157 11.6544 10.7721 11.6275C10.9089 11.5629 11.0718 11.5913 11.1783 11.6989L13.7571 14.278C13.8972 14.4171 13.8979 14.6436 13.7586 14.7832C13.7479 14.7944 13.736 14.8043 13.7239 14.8139V14.811ZM14.7957 13.7371C14.7328 13.8183 14.6381 13.8682 14.536 13.8747H14.5135C14.4188 13.8747 14.3277 13.8372 14.2608 13.77L11.6825 11.1919C11.5753 11.0855 11.5467 10.9229 11.611 10.7861C11.6377 10.7296 11.6617 10.6714 11.6825 10.6125C11.7332 10.4684 11.8697 10.3731 12.0222 10.3742H15.6703C15.8675 10.3742 16.0275 10.5342 16.0275 10.7314C16.0275 10.7461 16.0264 10.7611 16.0247 10.7757C15.8893 11.8554 15.4652 12.8783 14.7972 13.7371H14.7957ZM15.9365 9.53885C15.8686 9.61563 15.7715 9.65966 15.6688 9.65966H12.0222C11.8707 9.65966 11.7357 9.56417 11.6853 9.42134C11.6646 9.36232 11.6406 9.30411 11.6138 9.2477C11.5495 9.11079 11.5782 8.94829 11.6853 8.8418L14.2641 6.26301C14.4034 6.12335 14.6296 6.12252 14.7692 6.26191C14.7804 6.27305 14.7903 6.28447 14.8001 6.29658C15.4681 7.15544 15.8921 8.17832 16.0275 9.25802C16.0394 9.36025 16.0069 9.46235 15.938 9.53885H15.9365Z" fill="currentColor" fillOpacity="0.8" />
                    </svg>
                    <span className="text-white text-sm">{t('Add to Favorites', 'Aggiungi ai Preferiti')}</span>
                  </button>
                </div>
                
                <div className="flex flex-col gap-6">
                  <button type="button" className="flex flex-col gap-5 backdrop-blur-[9px] bg-[rgba(7,12,38,0.05)] px-5 py-4 rounded-[19px] border border-[rgba(255,255,255,0.3)] cursor-pointer hover:bg-[rgba(7,12,38,0.1)] transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.382 7.323a2.704 2.704 0 0 0-2.705-2.704H7.323A2.704 2.704 0 0 0 4.62 7.323v22.354a2.704 2.704 0 0 0 2.704 2.705h22.354a2.704 2.704 0 0 0 2.705-2.705V7.323zm1.529 22.354a4.233 4.233 0 0 1-4.234 4.233H7.323a4.233 4.233 0 0 1-4.233-4.233V7.323A4.233 4.233 0 0 1 7.323 3.09h22.354a4.233 4.233 0 0 1 4.233 4.233v22.354z" fill="#fff"></path>
                        <path d="M27.526 14.56a2.499 2.499 0 0 1 3.534 0l2.435 2.435a.765.765 0 0 1-1.081 1.081l-2.435-2.435a.97.97 0 0 0-1.372 0l-8.146 8.146a2.499 2.499 0 0 1-3.534 0l-2.172-2.172a.97.97 0 0 0-1.372 0l-8.602 8.602a.765.765 0 0 1-1.08-1.081l8.601-8.602a2.499 2.499 0 0 1 3.534 0l2.172 2.172a.97.97 0 0 0 1.372 0l8.146-8.146zM15.04 11.948a1.548 1.548 0 1 0-3.097 0 1.548 1.548 0 0 0 3.096 0zm1.528 0a3.077 3.077 0 1 1-6.154 0 3.077 3.077 0 0 1 6.154 0z" fill="#fff"></path>
                      </svg>
                      <span className="text-[11px] font-light text-white">{t('Yacht Gallery', 'Galleria')}</span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <p className="flex flex-col">
                        <span className="text-[32px] font-light text-white leading-none">+{yacht.images.length}</span>
                        <small className="text-base font-light text-white">{t('Photos', 'Foto')}</small>
                      </p>
                    </div>
                  </button>
                  
                  <div className="hidden md:flex items-start gap-4">
                    <div className="flex flex-col text-right">
                      <span className="text-white text-sm opacity-50">{t('from', 'da')}</span>
                      <p className="flex items-center gap-1">
                        <b className="text-white text-[34px] lg:text-[46px] leading-none">
                          {Math.floor(lowSeasonPrice / 1000)}
                        </b>
                        <span className="flex flex-col leading-none text-left">
                          <span className="text-white text-xs md:text-[17px] font-bold">
                            {(lowSeasonPrice % 1000).toString().padStart(3, '0')}€
                          </span>
                          <small className="text-white text-[9px] md:text-xs opacity-50">{t('/week', '/settimana')}</small>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-[clamp(40px,5vw,96px)] left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
              <div className="w-[19px] h-[28px] border-[1.5px] border-white rounded-lg flex justify-center pt-1">
                <span className="w-0.5 h-1.5 bg-white rounded block animate-bounce"></span>
              </div>
              <b className="text-sm text-white font-bold">{t('DISCOVER YACHT', 'SCOPRI LO YACHT')}</b>
            </div>
          </div>
        </section>
      </section>

      {/* Main Content Area */}
      <div className="w-full bg-white pb-24 lg:pb-0">
        <section>
          <div className="container mx-auto px-5">
            <div className="grid min-[1150px]:grid-cols-[1fr_380px] lg:grid-cols-[1fr_320px] md:gap-9 gap-4 md:py-15 py-10 relative">
              
              <div className="flex flex-col md:gap-9 gap-6">
                
                {/* Overview */}
                <div className="grid min-[1150px]:grid-cols-[200px_1fr] md:grid-cols-[140px_1fr] md:gap-9 gap-2.5">
                  <span className="min-[1150px]:text-2xl text-xl font-medium text-black">{t('Overview', 'Panoramica')}</span>
                  <div className="flex flex-col gap-2.5 md:gap-8 pb-10 border-b border-[#dfe1e8] md:pt-1.5">
                    <h2 className="md:text-[19px] text-sm font-medium text-[#070c26]">{yacht.name}</h2>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-5 text-sm leading-[1.64] text-[rgba(7,12,38,0.8)]">
                        {getTranslation(language, yacht, 'description')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="grid min-[1150px]:grid-cols-[200px_1fr] md:grid-cols-[140px_1fr] md:gap-9 gap-3">
                  <h3 className="min-[1150px]:text-2xl text-xl font-medium text-black">{t('Specifications', 'Specifiche')}</h3>
                  <div className="flex flex-col pb-10 border-b border-[#dfe1e8]">
                    
                    <div className="grid grid-cols-3 md:hidden items-center mb-6 border-b border-[#dfe1e8] pb-6">
                      <div className="flex flex-col gap-1 pr-[10px] border-r border-[#dfe1e8]">
                        <span className="text-[10px] font-light tracking-[2px] text-gray-500">{t('Guests', 'Ospiti')}</span>
                        <span className="text-sm font-medium">{yacht.passengers} {t('Max', 'Max')}</span>
                      </div>
                      <div className="flex flex-col gap-1 px-[10px] border-r border-[#dfe1e8]">
                        <span className="text-[10px] font-light tracking-[2px] text-gray-500">{t('Cabins', 'Cabine')}</span>
                        <span className="text-sm font-medium">{yacht.cabins}</span>
                      </div>
                      <div className="flex flex-col gap-1 pl-[10px]">
                        <span className="text-[10px] font-light tracking-[2px] text-gray-500">{t('Length', 'Lunghezza')}</span>
                        <span className="text-sm font-medium">{yacht.length}m</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { label: t('Cabins for guests', 'Cabine ospiti'), val: yacht.cabins },
                        { label: t('Crew', 'Equipaggio'), val: '2' },
                        { label: t('Guests', 'Ospiti'), val: yacht.passengers },
                        { label: t('Beam', 'Larghezza'), val: `${yacht.width} m` },
                        { label: t('Build', 'Anno'), val: yacht.year },
                        { label: t('Draft', 'Pescaggio'), val: `${yacht.draft} m` }
                      ].map((spec, i) => (
                        <div key={i} className="w-[calc(50%-5px)] xl:w-[calc(33.333%-10px)] flex flex-col gap-1.5 bg-[#f3f5f5] px-4 rounded-lg py-5">
                          <span className="text-sm text-[#070c26] opacity-70 font-medium leading-none">{spec.label}</span>
                          <span className="text-base text-[#070c26] font-medium leading-none">{spec.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Water Sports */}
                <div className="grid min-[1150px]:grid-cols-[200px_1fr] md:grid-cols-[140px_1fr] md:gap-9 gap-3">
                  <h3 className="min-[1150px]:text-2xl text-xl font-medium text-black">{t('Water Sports', 'Sport Acquatici')}</h3>
                  <div className="flex flex-col gap-3 pb-10 border-b border-[#dfe1e8]">
                    <div className="flex items-center flex-wrap gap-y-6 gap-x-[clamp(20px,2.6vw,50px)]">
                      <div className="flex items-center gap-3 relative">
                        <span className="text-sm text-[#070c26] font-medium opacity-60">Paddleboard</span>
                      </div>
                      <div className="flex items-center gap-3 relative">
                        <span className="text-sm text-[#070c26] font-medium opacity-60">Snorkeling Gear</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cabin Details */}
                <section className="grid min-[1150px]:grid-cols-[200px_1fr] md:grid-cols-[140px_1fr] md:gap-9 gap-6 border-b border-[#dfe1e8] pb-10">
                  <div className="flex items-center justify-between gap-2.5">
                    <h3 className="min-[1150px]:text-2xl text-xl font-medium text-black">{t('Cabin Details', 'Dettagli Cabine')}</h3>
                  </div>
                  <div className="flex flex-col lg:rounded-[10px] lg:border lg:border-[#dfe1e8] lg:p-7">
                    <div className="flex items-center gap-10 lg:gap-14 md:pb-8 md:border-b border-[#dfe1e8]">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-[#070c26] font-medium">{t('Cabins', 'Cabine')}</span>
                        <span className="text-[25px] text-[#070c26]">{yacht.cabins}x</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-[#070c26] font-medium">{t('Guests', 'Ospiti')} <small className="text-xs text-[#828797]">(Max)</small></span>
                        <span className="text-[25px] text-[#070c26]">{yacht.passengers}x</span>
                      </div>
                    </div>
                    <div className="flex flex-col xl:flex-row xl:items-center gap-3 xl:gap-10 pt-5">
                      <span className="text-base text-[#070c26] font-medium">{t('Cabins:', 'Cabine:')}</span>
                      <div className="flex items-center flex-wrap gap-3">
                        <span className="text-[13px] xl:text-base text-[#9b9daa] leading-none p-3 rounded-lg border border-[rgba(155,157,170,0.3)]">Double cabin</span>
                        <span className="text-[13px] xl:text-base text-[#9b9daa] leading-none p-3 rounded-lg border border-[rgba(155,157,170,0.3)]">Double cabin</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Amenities */}
                <section className="grid min-[1150px]:grid-cols-[200px_1fr] md:grid-cols-[140px_1fr] md:gap-9 gap-8 border-b border-[#dfe1e8] pb-10">
                  <h3 className="min-[1150px]:text-2xl text-xl font-medium text-black">{t('Amenities', 'Servizi')}</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="w-[calc(50%-10px)] xl:w-[calc(33.333%-10px)] flex items-center gap-2">
                      <span className="md:text-base text-sm text-[#070c26]">Air Conditioning</span>
                    </div>
                    <div className="w-[calc(50%-10px)] xl:w-[calc(33.333%-10px)] flex items-center gap-2">
                      <span className="md:text-base text-sm text-[#070c26]">WiFi</span>
                    </div>
                    <div className="w-[calc(50%-10px)] xl:w-[calc(33.333%-10px)] flex items-center gap-2">
                      <span className="md:text-base text-sm text-[#070c26]">Safety Equipment</span>
                    </div>
                  </div>
                </section>

                {/* Download Assets */}
                <section className="grid min-[1150px]:grid-cols-[200px_1fr] md:grid-cols-[140px_1fr] md:gap-9 gap-3">
                  <h3 className="min-[1150px]:text-2xl text-xl font-medium text-black">{t('Download Assets', 'Scarica Documenti')}</h3>
                  <div className="flex flex-col">
                    <a className="flex items-start gap-3 bg-white p-5 rounded-lg border border-[#dfe8eb] hover:bg-[#070c26] group transition-colors duration-300" href="#">
                      <div className="flex flex-col gap-1">
                        <span className="text-base font-bold text-[#070c26] group-hover:text-white transition-colors">{t('Yacht Overview (PDF)', 'Panoramica (PDF)')}</span>
                        <span className="text-[11px] text-[rgba(7,12,38,0.8)] group-hover:text-white/80 transition-colors">{t('Download the brochure containing this yacht\'s details.', 'Scarica la brochure con i dettagli dello yacht.')}</span>
                      </div>
                    </a>
                  </div>
                </section>

              </div>
              
              {/* Right Sidebar Booking Form */}
              <div className="hidden lg:block relative">
                 <section className="flex flex-col sticky top-24 h-max">
                   
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex flex-col">
                        <h3 className="text-[28px] text-[#070c26] font-bold">{yacht.model}</h3>
                        <p className="flex items-center gap-1.5 text-sm text-[#6da544] font-medium">
                          <span className="size-1 bg-[#6da544] rounded-full"></span>
                          {t('Available For Charter', 'Disponibile per Noleggio')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center mb-6">
                      <div className="flex items-center gap-2 pr-[14px] border-r border-[#dfe1e8]">
                        <div className="flex flex-col gap-1 w-20">
                          <span className="text-[11px] font-light tracking-[2px] text-gray-500 uppercase">{t('Guests', 'Ospiti')}</span>
                          <span className="text-base font-medium text-[#070c26] leading-none">{yacht.passengers} {t('Max', 'Max')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-[14px] border-r border-[#dfe1e8]">
                        <div className="flex flex-col gap-1 w-20">
                          <span className="text-[11px] font-light tracking-[2px] text-gray-500 uppercase">{t('Crew', 'Equipaggio')}</span>
                          <span className="text-base font-medium text-[#070c26] leading-none">2 {t('Max', 'Max')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-[14px]">
                        <div className="flex flex-col gap-1 w-20">
                          <span className="text-[11px] font-light tracking-[2px] text-gray-500 uppercase">{t('Length', 'Lunghezza')}</span>
                          <span className="text-base font-medium text-[#070c26] leading-none">{yacht.length}m</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Widget */}
                    <div className="flex flex-col rounded-[10px] bg-[#edf3f4] mb-6">
                      <div className="flex flex-col px-6 py-5 rounded-t-[10px] border-b border-[#dfe8e9]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-8">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-medium tracking-[0.7px] text-[#828797] uppercase">{t('Low Season', 'Bassa Stagione')}</span>
                              <p className="flex items-center gap-1">
                                <b className="text-[#070c26] text-[24px] leading-none">{Math.floor(lowSeasonPrice / 1000)}</b>
                                <span className="flex flex-col justify-between">
                                  <span className="text-[#070c26] text-[12px] font-bold">.{(lowSeasonPrice % 1000).toString().padStart(3, '0')} <span className="font-normal">€</span></span>
                                  <small className="text-[#070c26] text-[8px] opacity-50">{t('/week', '/settimana')}</small>
                                </span>
                              </p>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-medium tracking-[0.7px] text-[#828797] uppercase">{t('High Season', 'Alta Stagione')}</span>
                              <p className="flex items-center gap-1">
                                <b className="text-[#070c26] text-[24px] leading-none">{Math.floor(highSeasonPrice / 1000)}</b>
                                <span className="flex flex-col justify-between">
                                  <span className="text-[#070c26] text-[12px] font-bold">.{(highSeasonPrice % 1000).toString().padStart(3, '0')} <span className="font-normal">€</span></span>
                                  <small className="text-[#070c26] text-[8px] opacity-50">{t('/week', '/settimana')}</small>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-[rgba(7,12,38,0.8)] mt-3 leading-[1.73]">
                          {t('Prices do not include: VAT* (if applicable), fuel, moorings, food and drinks.', 'I prezzi non includono: IVA (se applicabile), carburante, ormeggi, cambusa.')}
                        </p>
                      </div>

                      <div className="flex flex-col px-6 py-4">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-[rgba(6,11,37,0.7)]">{t('Select Date', 'Seleziona Data')}</span>
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                              <div className="w-full sm:w-1/2">
                                <CustomDatePicker selectedDate={startDate} onDateSelect={setStartDate} language={language} />
                              </div>
                              <div className="w-full sm:w-1/2">
                                <CustomDatePicker selectedDate={endDate} onDateSelect={setEndDate} language={language} />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-[rgba(6,11,37,0.7)]">{t('Number of guests', 'Numero di ospiti')}</span>
                            <select className="w-full bg-white p-3 rounded-lg border border-gray-200 text-sm text-gray-500 cursor-pointer hover:border-gray-300 outline-none">
                              {[...Array(yacht.passengers)].map((_, i) => (
                                <option key={i+1} value={i+1}>{i+1} {t('Guests', 'Ospiti')}</option>
                              ))}
                            </select>
                          </div>
                          <Link href={`/prenota?id=${yacht.id}`} className="w-full flex items-center justify-center text-sm font-bold text-white bg-[#009649] px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[#007a3a]">
                            {t('Get an Offer', 'Richiedi un Preventivo')}
                          </Link>
                          <p className="text-[11px] leading-[1.73] text-center text-[rgba(7,12,38,0.5)]">
                            {t("You won't be Charged", "Nessun addebito")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Support Widget */}
                    <div className="w-full flex flex-col bg-[#83776d] p-5 rounded-[10px]">
                      <p className="font-medium leading-none mb-3 pb-3 border-b border-[rgba(255,255,255,0.1)] text-[13px] text-[rgba(255,255,255,0.8)]">
                        {t('Would you like to receive a quote for this yacht?', 'Vuoi ricevere un preventivo per questo yacht?')}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-sm">Blue Dream Charter Support</span>
                          <span className="text-white/70 text-xs">+39 081 896 0524</span>
                        </div>
                      </div>
                    </div>

                 </section>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* Mobile Floating Action Bar */}
      <section className="lg:hidden h-[82px] z-[90] fixed bottom-0 left-0 right-0 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between bg-white p-4 h-full transition-all duration-300">
          <div className="flex flex-col">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-[#070c26]">{t('Low Season', 'Bassa Stagione')}</span>
                <span className="text-sm font-medium text-[#070c26]">€{(lowSeasonPrice).toLocaleString('it-IT')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-[#070c26]">{t('High Season', 'Alta Stagione')}</span>
                <span className="text-sm font-medium text-[#070c26]">€{(highSeasonPrice).toLocaleString('it-IT')}</span>
              </div>
            </div>
            <p className="flex items-center gap-1.5 text-[10px] text-[#6da544] font-medium mt-1">
              <span className="size-1 bg-[#6da544] rounded-full"></span>{t('Available For Charter', 'Disponibile')}
            </p>
          </div>
          <button 
            type="button" 
            onClick={() => setIsMobileBookingOpen(true)}
            className="w-max h-[46px] flex items-center justify-center text-sm font-bold text-white bg-[#009649] px-6 rounded-[10px]"
          >
            {t('Get an Offer', 'Preventivo')}
          </button>
        </div>
      </section>

      {/* Mobile Booking Modal (Based on User's HTML) */}
      <section className={`fixed inset-0 z-[99999] flex items-center justify-center transition-all duration-500 ${isMobileBookingOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0" onClick={() => setIsMobileBookingOpen(false)}></div>
        <div className={`w-screen h-dvh flex items-end md:items-center justify-center md:p-5 bg-[linear-gradient(to_bottom,rgba(6,11,37,0.5),#060b25_125%)] transform transition-transform duration-500 ${isMobileBookingOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="w-full max-w-[1440px] h-full max-h-[calc(100%-64px)] lg:max-h-[calc(100%-80px)] lg:max-h-[784px] bg-white rounded-t-[20px] py-8 px-4 max-md:overflow-y-auto relative flex flex-col items-center">
            <button 
              type="button" 
              className="absolute lg:top-8 top-6 right-6 lg:right-8 z-10"
              onClick={() => setIsMobileBookingOpen(false)}
            >
              <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 lg:text-[#070C26] size-5 md:size-[26px]">
                <path d="M13.595 12.997 25.877.715a.42.42 0 0 0-.593-.592L13.003 12.404.72.123a.42.42 0 0 0-.593.592L12.41 12.997.128 25.28a.42.42 0 0 0 .583.603l.01-.01L13.003 13.59l12.281 12.282a.42.42 0 0 0 .593-.593L13.596 12.997z" fill="currentColor"></path>
              </svg>
            </button>
            
            <div className="w-full flex flex-col max-w-[500px] mx-auto pt-2">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col">
                    <h3 className="text-2xl text-[#070c26]"><b className="font-bold">{yacht.model}</b></h3>
                    <p className="flex items-center gap-1.5 text-sm text-[#6da544] font-medium">
                      <span className="size-1 bg-[#6da544] rounded-full"></span>
                      {t('Available For Charter', 'Disponibile per Noleggio')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 pb-8 mb-4 border-b border-[#dfe1e8]">
                  <div className="flex flex-col gap-1 pr-[14px] border-r border-[rgba(7,12,38,0.08)]">
                    <span className="text-[9px] tracking-[4px] text-[rgba(7,12,38,0.6)] uppercase">{t('Guests', 'Ospiti')}</span>
                    <span className="text-sm text-[#070c26] font-medium">{yacht.passengers} {t('Max', 'Max')}</span>
                  </div>
                  <div className="flex flex-col gap-1 px-[14px] border-r border-[rgba(7,12,38,0.08)]">
                    <span className="text-[9px] tracking-[4px] text-[rgba(7,12,38,0.6)] uppercase">{t('Crew', 'Equipaggio')}</span>
                    <span className="text-sm text-[#070c26] font-medium">2 {t('Max', 'Max')}</span>
                  </div>
                  <div className="flex flex-col gap-1 pl-[14px]">
                    <span className="text-[9px] tracking-[4px] text-[rgba(7,12,38,0.6)] uppercase">{t('Length', 'Lunghezza')}</span>
                    <span className="text-sm text-[#070c26] font-medium">{yacht.length}m</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-10">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-[#070c26] uppercase">{t('Low Season', 'Bassa Stagione')}</span>
                      <span className="text-[19px] font-medium text-[#070c26]">€{(lowSeasonPrice).toLocaleString('it-IT')}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-[#070c26] uppercase">{t('High Season', 'Alta Stagione')}</span>
                      <span className="text-[19px] font-medium text-[#070c26]">€{(highSeasonPrice).toLocaleString('it-IT')}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-[11px] text-[#070c26] leading-[1.73] mb-6">
                  {t('Prices do not include: VAT* (if applicable), fuel, moorings, food and drinks.', 'I prezzi non includono: IVA (se applicabile), carburante, ormeggi, cambusa.')}
                </p>

                <div className="flex flex-col gap-4 p-5 rounded-[10px] border border-[#dfe1e8] mb-6">
                  <h5 className="text-base md:text-lg font-bold text-[#070c26]">{t('Get an Offer', 'Richiedi un Preventivo')}</h5>
                  
                  <div className="w-full flex flex-col gap-[14px]">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-[rgba(6,11,37,0.7)]">{t('Select Date', 'Seleziona Data')}</span>
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <div className="w-full sm:w-1/2">
                          <CustomDatePicker selectedDate={startDate} onDateSelect={setStartDate} language={language} />
                        </div>
                        <div className="w-full sm:w-1/2">
                          <CustomDatePicker selectedDate={endDate} onDateSelect={setEndDate} language={language} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-[rgba(6,11,37,0.7)]">{t('Number of guests', 'Numero di ospiti')}</span>
                      <div className="relative">
                        <select className="w-full bg-white p-4 rounded-2xl border border-[rgba(7,12,38,0.3)] text-[13px] font-medium text-[#070c26] cursor-pointer hover:bg-gray-50 outline-none appearance-none">
                           {[...Array(yacht.passengers)].map((_, i) => (
                             <option key={i+1} value={i+1}>{i+1} {t('Guests', 'Ospiti')}</option>
                           ))}
                        </select>
                        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="fill-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                      </div>
                    </div>

                    <Link href={`/prenota?id=${yacht.id}`} className="w-full flex items-center justify-center text-sm md:text-base font-bold text-white bg-[#009649] px-4 py-2.5 md:py-4 rounded-[17px] transition-all duration-300 hover:bg-[#007a3a]">
                      {t('Get an Offer', 'Richiedi Preventivo')}
                    </Link>
                    <p className="text-[11px] leading-[1.73] text-center text-[rgba(7,12,38,0.5)]">
                      {t("You won’t be Charged", "Nessun addebito")}
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
