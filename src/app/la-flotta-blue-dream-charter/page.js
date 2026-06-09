"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { fleet } from '../../lib/fleetData';

function FleetContent() {
  const { language } = useLanguage();
  
  const [activeType, setActiveType] = useState('All');
  const [activePerson, setActivePerson] = useState('All');
  const [activeSort, setActiveSort] = useState('price_asc');
  
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.filter-dropdown')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (e, dropdown) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const types = [
    { id: 'All', it: 'Tutti i Tipi', en: 'All Types' },
    { id: 'Sailing Yacht', it: 'Monoscafo', en: 'Sailing Yacht' },
    { id: 'Catamaran', it: 'Catamarano', en: 'Catamaran' },
    { id: 'Motor Yacht', it: 'Yacht a Motore', en: 'Motor Yacht' },
  ];

  const persons = [
    { id: 'All', label: language === 'it' ? 'Qualsiasi' : 'Any' },
    { id: '2-4', label: '2-4' },
    { id: '5-8', label: '5-8' },
    { id: '9+', label: '9+' },
  ];

  const sorts = [
    { id: 'price_asc', it: 'Prezzo: Crescente', en: 'Price: Low to High' },
    { id: 'price_desc', it: 'Prezzo: Decrescente', en: 'Price: High to Low' },
  ];

  let filteredFleet = fleet.filter(b => {
    if (activeType !== 'All') {
      const bType = b.type.toLowerCase();
      if (activeType === 'Sailing Yacht' && !bType.includes('sailing')) return false;
      if (activeType === 'Catamaran' && !bType.includes('catamaran')) return false;
      if (activeType === 'Motor Yacht' && !bType.includes('motor') && !bType.includes('luxury')) return false;
    }
    if (activePerson !== 'All') {
      if (activePerson === '2-4' && (b.passengers < 2 || b.passengers > 4)) return false;
      if (activePerson === '5-8' && (b.passengers < 5 || b.passengers > 8)) return false;
      if (activePerson === '9+' && b.passengers < 9) return false;
    }
    return true;
  });

  filteredFleet = filteredFleet.sort((a, b) => {
    if (activeSort === 'price_asc') return a.pricing.A - b.pricing.A;
    if (activeSort === 'price_desc') return b.pricing.A - a.pricing.A;
    return 0;
  });

  const getActiveTypeLabel = () => {
    const t = types.find(x => x.id === activeType);
    return language === 'it' ? t.it : t.en;
  };

  const getActiveSortLabel = () => {
    const s = sorts.find(x => x.id === activeSort);
    return language === 'it' ? s.it : s.en;
  };

  return (
    <section className="bg-white rounded-t-[36px]">
      <div className="pb-20">
        
        {/* Header & Search Area */}
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
                    <span className="max-md:whitespace-nowrap text-[13px] transition-all duration-300 text-[#070c26]">{language === 'it' ? 'La Flotta' : 'Our Fleet'}</span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="md:pt-6 pt-3">
            <h1 className="text-2xl font-bold text-[#070c26] mb-2.5">
              {language === 'it' ? 'La Nostra Flotta' : 'Our Fleet'}
            </h1>
            <p className="text-sm md:text-[15px] text-[#070c26] max-w-[700px] md:mb-8 mb-4">
              {language === 'it' ? 'Scopri tutti gli yacht disponibili per il tuo prossimo charter.' : 'Discover all available yachts for your next charter.'}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="w-full max-lg:order-[-1] relative z-40 mb-4 md:mb-0">
          <div className="w-full max-lg:order-[-1] transition-all duration-500 ease-in-out relative z-40 animate-slide-down">
            <div className="container mx-auto px-5">
              <div className="flex flex-col md:flex-row gap-3 transition-all duration-500 ease-in-out items-start md:items-center">
                <div className="w-full flex flex-col md:flex-row items-center p-2 gap-2 bg-white rounded-xl md:max-w-[550px] border border-[#eceff0] shadow-[0_4px_20px_-4px_rgba(7,12,38,0.05)]">
                  
                  {/* Type Dropdown */}
                  <div className="filter-dropdown flex items-center gap-1 group relative cursor-pointer w-full md:w-[240px]">
                    <button 
                      type="button" 
                      onClick={(e) => toggleDropdown(e, 'type')}
                      className="flex items-center gap-3 bg-[#060b25] text-white rounded-lg px-4 py-[22px] w-full transition-all duration-200 hover:bg-[#0a1a4a]"
                    >
                      <div className="flex flex-col items-start text-[15px] flex-1">
                        <span className="text-xs opacity-80 block">{language === 'it' ? 'Tipo di Barca' : 'Yacht Type'}</span>
                        <span className="font-medium whitespace-nowrap">{getActiveTypeLabel()}</span>
                      </div>
                      <span className={`ml-auto transition-transform ${openDropdown === 'type' ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {openDropdown === 'type' && (
                      <ul className="absolute top-[105%] left-0 w-full bg-white border border-[#eceff0] rounded-lg shadow-xl overflow-hidden z-50">
                        {types.map(t => (
                          <li 
                            key={t.id}
                            onClick={() => { setActiveType(t.id); setOpenDropdown(null); }}
                            className={`px-4 py-3 hover:bg-gray-50 text-sm cursor-pointer ${activeType === t.id ? 'font-bold text-[#0d5fa5]' : 'text-black'}`}
                          >
                            {language === 'it' ? t.it : t.en}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Person Dropdown */}
                  <div className="filter-dropdown relative group cursor-pointer flex-1 w-full">
                    <button 
                      type="button" 
                      onClick={(e) => toggleDropdown(e, 'person')}
                      className="w-full flex items-center gap-3 rounded-lg transition-all duration-200 hover:bg-gray-50 px-4 py-[22px]"
                    >
                      <div className="flex flex-col items-start text-[15px] text-black text-left whitespace-nowrap flex-1">
                        <span className="text-xs block text-gray-500">{language === 'it' ? 'Persone' : 'Passengers'}</span>
                        <span className="font-medium">{persons.find(p => p.id === activePerson)?.label}</span>
                      </div>
                      <span className={`ml-auto text-black transition-transform ${openDropdown === 'person' ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {openDropdown === 'person' && (
                      <ul className="absolute top-[105%] left-0 w-full bg-white border border-[#eceff0] rounded-lg shadow-xl overflow-hidden z-50">
                        {persons.map(p => (
                          <li 
                            key={p.id}
                            onClick={() => { setActivePerson(p.id); setOpenDropdown(null); }}
                            className={`px-4 py-3 hover:bg-gray-50 text-sm cursor-pointer ${activePerson === p.id ? 'font-bold text-[#0d5fa5]' : 'text-black'}`}
                          >
                            {p.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="container mx-auto px-5">
          <div className="flex flex-row items-center justify-between gap-2 mt-8 mb-5">
            <div className="flex flex-col md:flex-row md:items-center md:gap-2">
              <span className="text-sm md:text-[15px] text-[#6f7480]">{language === 'it' ? 'Risultati : ' : 'Result : '}</span>
              <span className="text-sm md:text-[15px] font-medium text-[#070c26]">
                {filteredFleet.length} {language === 'it' ? 'yacht trovati' : 'yacht listing'}{filteredFleet.length !== 1 && language !== 'it' ? 's' : ''}
              </span>
            </div>
            
            <div className="filter-dropdown relative cursor-pointer group">
              <button 
                type="button" 
                onClick={(e) => toggleDropdown(e, 'sort')}
                className="flex items-center gap-3 rounded-lg p-3 md:p-4 min-w-[220px] border border-[#eceff0] transition-all duration-200 hover:bg-gray-50"
              >
                <span className="text-sm text-[#6f7480] leading-none whitespace-nowrap">{language === 'it' ? 'Ordina per' : 'Sort By'} </span>
                <span className="text-sm font-medium leading-none text-[#070c26] whitespace-nowrap">
                  {getActiveSortLabel()}
                </span>
                <span className={`ml-auto text-black transition-transform ${openDropdown === 'sort' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openDropdown === 'sort' && (
                <ul className="absolute top-[105%] right-0 min-w-[220px] bg-white border border-[#eceff0] rounded-lg shadow-xl overflow-hidden z-50">
                  {sorts.map(s => (
                    <li 
                      key={s.id}
                      onClick={() => { setActiveSort(s.id); setOpenDropdown(null); }}
                      className={`px-4 py-3 hover:bg-gray-50 text-sm cursor-pointer ${activeSort === s.id ? 'font-bold text-[#0d5fa5]' : 'text-black'}`}
                    >
                      {language === 'it' ? s.it : s.en}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Grid of Yachts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {filteredFleet.map((boat) => (
              <Link key={boat.id} href={`/la-flotta-blue-dream-charter/${boat.id}`} className="sm relative flex group overflow-hidden w-full h-full rounded-2xl">
                <div className="min-h-[265px] h-full w-full flex relative group-hover:scale-105 transition-all duration-300 before:content-[''] before:w-full before:h-full before:absolute before:left-0 before:top-0 before:bg-[linear-gradient(to_bottom,rgba(7,12,38,0)_50%,rgba(7,12,38,0.8))] z-10">
                  <img 
                    alt={boat.model} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
                    src={boat.images[0]} 
                    style={{ objectPosition: '50% 50%', backgroundColor: '#7a88a0' }} 
                  />
                </div>
                
                <div className="absolute top-0 left-0 w-full h-full p-4 md:p-5 flex flex-col justify-between z-20">
                  <button type="button" className="flex items-center gap-1.5 md:gap-3 opacity-80 hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                      <path d="M19.7118 9.40125C19.5252 9.25059 19.2801 9.19335 19.0465 9.2466L17.2263 9.6514C17.2008 9.65677 17.1748 9.65966 17.1487 9.65966H17.113C16.9293 9.65966 16.7758 9.52069 16.7575 9.3381C16.6264 8.01114 16.1047 6.75325 15.2587 5.72254C15.1429 5.58068 15.153 5.37415 15.2819 5.24454L15.3081 5.21812C15.3269 5.19954 15.3473 5.18303 15.3694 5.16872L16.9414 4.16841C17.3095 3.93478 17.4181 3.44701 17.1844 3.07908C16.9508 2.71115 16.463 2.60245 16.0951 2.83609C15.9973 2.89828 15.9143 2.98111 15.8521 3.07908L14.8518 4.65109C14.8379 4.67324 14.8214 4.69361 14.8028 4.71177L14.7768 4.73819C14.6468 4.86794 14.4398 4.87826 14.2977 4.76185C13.267 3.91648 12.0087 3.39527 10.6821 3.26442C10.4989 3.24598 10.3595 3.09119 10.3606 2.90722V2.87145C10.3606 2.84544 10.3633 2.8193 10.3691 2.79398L10.7735 0.973613C10.8261 0.739978 10.7692 0.494923 10.6189 0.308483C10.3241 -0.0316501 9.80966 -0.0681125 9.4698 0.226201C9.44063 0.251656 9.41312 0.279175 9.38766 0.308483C9.23727 0.494923 9.18044 0.739978 9.233 0.973613L9.63739 2.79577C9.64317 2.82068 9.64593 2.84613 9.64593 2.87145V2.90722C9.64593 3.09077 9.50695 3.24447 9.32437 3.26263C7.99755 3.39376 6.73966 3.91538 5.70881 4.76103C5.56667 4.87743 5.35973 4.86711 5.2297 4.7375L5.2037 4.71108C5.18512 4.69278 5.16861 4.67242 5.15471 4.65027L4.15427 3.07825C3.92063 2.71033 3.433 2.60163 3.06507 2.8354C2.69701 3.06903 2.58845 3.55667 2.82208 3.92459C2.88427 4.02256 2.9671 4.10539 3.06507 4.16759L4.63695 5.16803C4.65924 5.18234 4.6796 5.19872 4.69845 5.21729L4.72459 5.24371C4.85352 5.37332 4.86356 5.57985 4.74771 5.72171C3.90247 6.75284 3.38154 8.01114 3.25082 9.33796C3.23252 9.52055 3.07897 9.65952 2.89528 9.65952H2.85785C2.83171 9.65952 2.80557 9.65677 2.78025 9.6514L0.960019 9.2466C0.534853 9.15221 0.113264 9.42024 0.0188748 9.84568C-0.0753772 10.2713 0.192519 10.6924 0.618097 10.7867C0.730649 10.8117 0.847467 10.8117 0.960019 10.7867L2.78204 10.3823C2.80708 10.3769 2.8324 10.374 2.85772 10.374H2.89349C3.07718 10.374 3.23074 10.513 3.2489 10.6956C3.38071 12.0226 3.90274 13.2809 4.7495 14.3112C4.86522 14.453 4.85517 14.6596 4.72625 14.7893L4.70024 14.8157C4.68125 14.8343 4.66089 14.8507 4.63874 14.865L3.06672 15.8653C2.6988 16.0989 2.5901 16.5867 2.82373 16.9546C3.0575 17.3226 3.54514 17.4312 3.91306 17.1976C4.01103 17.1354 4.09386 17.0526 4.15606 16.9546L5.15636 15.3826C5.1704 15.3605 5.18677 15.3401 5.20535 15.3219L5.23149 15.2955C5.36152 15.1658 5.56832 15.1554 5.71059 15.2718C6.7409 16.1168 7.99824 16.6382 9.32437 16.7693C9.50695 16.7874 9.64593 16.941 9.64593 17.1247V17.1623C9.64593 17.1883 9.64304 17.2144 9.63739 17.2397L9.23287 19.0601C9.18044 19.2937 9.23727 19.5388 9.38766 19.7252C9.68239 20.0654 10.1969 20.1018 10.5366 19.8075C10.5659 19.782 10.5934 19.7545 10.6187 19.7252C10.7692 19.5388 10.8259 19.2937 10.7735 19.0601L10.369 17.2397C10.3633 17.2144 10.3605 17.1883 10.3605 17.1623V17.1265C10.3605 16.9428 10.4994 16.7892 10.682 16.7711C12.009 16.6399 13.2669 16.1183 14.2976 15.2727C14.4398 15.1561 14.6466 15.1666 14.7767 15.2962L14.8028 15.3226C14.8214 15.3409 14.8378 15.3613 14.8518 15.3834L15.8521 16.9553C16.0857 17.3234 16.5734 17.4319 16.9414 17.1983C17.3094 16.9647 17.4181 16.477 17.1843 16.109C17.1222 16.0111 17.0393 15.9283 16.9414 15.8661L15.3694 14.8657C15.3473 14.8514 15.3269 14.835 15.3079 14.8164L15.2819 14.79C15.1529 14.6604 15.1429 14.4538 15.2587 14.312C16.1039 13.2809 16.6248 12.0226 16.7557 10.6957C16.7741 10.5125 16.9289 10.3731 17.1129 10.3742H17.1487C17.1747 10.3742 17.2008 10.3769 17.2261 10.3823L19.0465 10.7868C19.4717 10.8818 19.8932 10.6141 19.9882 10.1887C20.054 9.89508 19.9468 9.58962 19.7118 9.40125ZM10.3606 4.35017C10.3606 4.24767 10.4045 4.15011 10.4813 4.08228C10.5584 4.01513 10.6603 3.98362 10.7621 3.99546C11.8418 4.13085 12.8651 4.55491 13.7239 5.22266C13.88 5.34347 13.9086 5.56774 13.7878 5.72391C13.7786 5.73602 13.7681 5.74785 13.7571 5.75859L11.1783 8.33765C11.1112 8.4048 11.0205 8.44236 10.9254 8.44236C10.8722 8.44209 10.82 8.42984 10.7721 8.40659C10.7157 8.37989 10.6578 8.35595 10.5989 8.33517C10.4559 8.28482 10.3606 8.14942 10.3606 7.99793V4.35017ZM6.28257 5.22266C7.14157 4.55491 8.16472 4.13085 9.24443 3.99546C9.34625 3.98335 9.44806 4.01472 9.52525 4.08228C9.60203 4.15011 9.64593 4.24767 9.64593 4.35017V7.99793C9.64593 8.14942 9.55057 8.28454 9.40761 8.3349C9.34872 8.35554 9.29079 8.37948 9.23438 8.40631C9.1865 8.42956 9.13435 8.44167 9.0811 8.44209C8.98602 8.44209 8.89535 8.40452 8.8282 8.33738L6.24941 5.75817C6.10934 5.6192 6.10865 5.39272 6.24804 5.25307C6.25877 5.24192 6.27046 5.23188 6.28257 5.22266ZM5.21085 6.29658C5.33166 6.14055 5.55594 6.11193 5.71211 6.23232C5.72422 6.24168 5.73605 6.252 5.74678 6.26301L8.32406 8.8418C8.43124 8.94829 8.45986 9.11079 8.39561 9.2477C8.36878 9.30411 8.34483 9.36232 8.32406 9.42134C8.2737 9.5643 8.13872 9.65966 7.98723 9.65966H4.33617C4.13899 9.65966 3.97897 9.49963 3.97897 9.30232C3.97897 9.28774 3.98007 9.27274 3.98186 9.25802C4.11725 8.17846 4.54132 7.15558 5.20934 6.29672H5.21085V6.29658ZM5.49306 13.8754H5.47063C5.3684 13.8689 5.27373 13.819 5.21085 13.7378C4.5427 12.8789 4.11863 11.8561 3.98324 10.7764C3.9582 10.5807 4.09689 10.402 4.29269 10.3769C4.30727 10.3751 4.32158 10.3742 4.33617 10.3742H7.98434C8.13583 10.3742 8.27081 10.4695 8.32117 10.6125C8.34194 10.6714 8.36589 10.7296 8.39272 10.7861C8.45697 10.9229 8.42835 11.0855 8.32117 11.1919L5.74238 13.7707C5.67592 13.8372 5.58552 13.8751 5.49154 13.8754H5.49306ZM9.64606 15.6835C9.64606 15.8808 9.4859 16.0409 9.28873 16.0409C9.27415 16.0409 9.25901 16.0409 9.24443 16.0384C8.16472 15.9029 7.14157 15.4788 6.28271 14.811C6.12654 14.6904 6.09792 14.466 6.21873 14.3098C6.22809 14.2977 6.23841 14.286 6.24941 14.2753L8.8282 11.6961C8.9347 11.5886 9.09761 11.56 9.23438 11.6246C9.29093 11.6515 9.34872 11.6754 9.40775 11.6961C9.55057 11.7464 9.64606 11.8815 9.64606 12.033V15.6835ZM10.0033 10.7314C9.6085 10.7314 9.28873 10.4116 9.28873 10.0169C9.28873 9.62209 9.6085 9.30232 10.0033 9.30232C10.398 9.30232 10.7178 9.62209 10.7178 10.0169C10.7178 10.4116 10.398 10.7314 10.0033 10.7314ZM13.7239 14.811C12.8651 15.4788 11.8418 15.9029 10.7621 16.0384C10.7475 16.0384 10.7324 16.0409 10.7178 16.0409C10.5206 16.0409 10.3606 15.8808 10.3606 15.6835V12.0359C10.3606 11.8844 10.4559 11.7493 10.5989 11.6989C10.6578 11.6782 10.7157 11.6544 10.7721 11.6275C10.9089 11.5629 11.0718 11.5913 11.1783 11.6989L13.7571 14.278C13.8972 14.4171 13.8979 14.6436 13.7586 14.7832C13.7479 14.7944 13.736 14.8043 13.7239 14.8139V14.811ZM14.7957 13.7371C14.7328 13.8183 14.6381 13.8682 14.536 13.8747H14.5135C14.4188 13.8747 14.3277 13.8372 14.2608 13.77L11.6825 11.1919C11.5753 11.0855 11.5467 10.9229 11.611 10.7861C11.6377 10.7296 11.6617 10.6714 11.6825 10.6125C11.7332 10.4684 11.8697 10.3731 12.0222 10.3742H15.6703C15.8675 10.3742 16.0275 10.5342 16.0275 10.7314C16.0275 10.7461 16.0264 10.7611 16.0247 10.7757C15.8893 11.8554 15.4652 12.8783 14.7972 13.7371H14.7957ZM15.9365 9.53885C15.8686 9.61563 15.7715 9.65966 15.6688 9.65966H12.0222C11.8707 9.65966 11.7357 9.56417 11.6853 9.42134C11.6646 9.36232 11.6406 9.30411 11.6138 9.2477C11.5495 9.11079 11.5782 8.94829 11.6853 8.8418L14.2641 6.26301C14.4034 6.12335 14.6296 6.12252 14.7692 6.26191C14.7804 6.27305 14.7903 6.28447 14.8001 6.29658C15.4681 7.15544 15.8921 8.17832 16.0275 9.25802C16.0394 9.36025 16.0069 9.46235 15.938 9.53885H15.9365Z" fill="currentColor" fillOpacity="0.8" />
                    </svg>
                    <span className="text-white text-sm font-medium">{language === 'it' ? 'Preferiti' : 'Add to Favorites'}</span>
                  </button>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-white text-[11px] font-medium">Procida, Italy</span>
                      </div>
                      <p className="text-white text-xl md:text-2xl lg:text-[29px] leading-[1.2]"><b>{boat.model}</b></p>
                      <p className="text-white text-[11px] mt-1 opacity-90">{boat.length}m • {boat.cabins} Cabins • {boat.passengers} Pax</p>
                    </div>
                    
                    <div className="flex items-end gap-4 pt-2">
                      <div className="flex flex-col">
                        <span className="text-white text-[9px] opacity-70">from</span>
                        <p className="flex items-center gap-1">
                          <b className="text-white text-xl md:text-2xl leading-none">
                            {Math.floor(boat.pricing.A / 1000)}
                          </b>
                          <span className="flex flex-col leading-none">
                            <span className="text-white text-[10px] font-bold">
                              {(boat.pricing.A % 1000).toString().padStart(3, '0')} €
                            </span>
                            <small className="text-white text-[9px] opacity-70">/week</small>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default function FleetPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex justify-center items-center">Loading...</div>}>
      <FleetContent />
    </Suspense>
  );
}
