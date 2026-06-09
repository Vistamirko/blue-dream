"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { fleet } from '../lib/fleetData';
import { useLanguage } from '../context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function YachtCharterSection() {
  const { language } = useLanguage();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const charterBoats = fleet.map(boat => ({
    id: boat.id,
    nameBold: boat.manufacturer,
    nameNormal: `${boat.model} "${boat.name}"`, // Include the boat name to distinguish duplicates
    location: "Procida, Campania",
    specs: `${boat.length} m • ${boat.cabins} ${language === 'it' ? 'Cabine' : 'Cabins'} • ${boat.passengers} ${language === 'it' ? 'Ospiti' : 'Guests'}`,
    price: boat.pricing?.A?.toLocaleString('it-IT') || "0",
    priceUnit: "€",
    img: boat.images && boat.images.length > 0 ? boat.images[0] : "",
  }));

  return (
    <section className="w-full flex flex-col pt-8 gap-8 md:gap-20 justify-center items-center relative overflow-hidden z-10 bg-[#060b25]">
      <div className="container max-w-[1240px] w-[calc(100%-40px)] mx-auto relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl md:text-4xl font-light text-white">
                {language === 'it' ? <>Yacht a <b className="font-bold">Noleggio</b></> : <>Yacht for <b className="font-bold">Charter</b></>}
              </h3>
              <Link href="/la-flotta-blue-dream-charter" className="text-sm md:text-lg flex md:hidden items-center gap-1.5 group">
                <span className="underline text-white underline-offset-[4px] whitespace-nowrap">{language === 'it' ? 'Tutti gli Yacht' : 'All Yachts'}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  <rect x=".5" y=".5" width="23" height="23" rx="1.5" stroke="#fff"></rect>
                  <g clipPath="url(#dqqix9tzda)">
                    <path d="m8 15.153 5.956-5.955h-3.89V8H16v5.933h-1.198v-3.889L8.847 16 8 15.153z" fill="#fff"></path>
                  </g>
                  <defs>
                    <clipPath id="dqqix9tzda">
                      <path fill="#fff" transform="translate(8 8)" d="M0 0h8v8H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
            <p className="text-[13px] md:text-[15px] text-white/70 md:max-w-[400px]">
              {language === 'it' 
                ? 'Non elenchiamo tutti gli yacht; solo i migliori. Esplora la nostra flotta selezionata nel Golfo di Napoli, scelta per il suo comfort superiore.' 
                : 'We do not list every yacht; only the finest. Explore our hand-picked fleet in the Gulf of Naples, chosen for their superior comfort.'}
            </p>
          </div>
          <Link href="/la-flotta-blue-dream-charter" className="text-sm md:text-lg hidden md:flex items-center gap-1.5 group">
            <span className="underline text-white underline-offset-[4px] whitespace-nowrap">{language === 'it' ? 'Tutti gli Yacht' : 'All Yachts'}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              <rect x=".5" y=".5" width="23" height="23" rx="1.5" stroke="#fff"></rect>
              <g clipPath="url(#dqqix9tzda)">
                <path d="m8 15.153 5.956-5.955h-3.89V8H16v5.933h-1.198v-3.889L8.847 16 8 15.153z" fill="#fff"></path>
              </g>
              <defs>
                <clipPath id="dqqix9tzda">
                  <path fill="#fff" transform="translate(8 8)" d="M0 0h8v8H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
      </div>

      <div className="relative w-full before:hidden lg:before:block lg:before:content-[''] lg:before:w-[300px] lg:before:h-[300px] lg:before:blur-[364px] lg:before:bg-[rgba(0,77,178,0.4)] lg:before:absolute lg:before:bottom-[-100px] lg:before:left-1/3 lg:before:pointer-events-none pb-12 overflow-hidden">
        
        {/* Swiper Container */}
        <div className="px-5 md:px-[calc((100vw-1240px)/2+20px)] relative z-10 w-full overflow-visible">
          {isReady && (
            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              spaceBetween={30}
              centeredSlides={true}
              loop={true}
              grabCursor={true}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              className="charter-slider !overflow-visible"
            >
              {charterBoats.map((boat) => (
                <SwiperSlide key={boat.id} className="!w-auto min-w-[85vw] md:min-w-[50vw] lg:min-w-[600px] xl:min-w-[748px]">
                  <div className="charter-swiper-card rounded-2xl overflow-hidden shadow-xl w-full h-full relative">
                    <Link href={`/la-flotta-blue-dream-charter?id=${boat.id}`} className="yatch-card group block overflow-hidden sm max-h-[clamp(380px,23vw,420px)] relative before:content-[''] before:w-full before:h-full before:absolute before:bg-gradient-to-t before:from-black/80 before:to-transparent before:transition-colors before:duration-500 hover:before:from-black hover:before:to-black/40 before:z-[1] before:left-0 before:top-0">
                      <div className="w-full h-full transition-all duration-300 overflow-hidden relative pb-[55%]">
                        <picture>
                          <img 
                            sizes="(max-width: 768px) 35vw, 50vw" 
                            width="776" height="414" 
                            alt={boat.nameBold + ' ' + boat.nameNormal} 
                            loading="lazy" decoding="async" 
                            className="w-full h-full absolute top-0 left-0 object-cover transition-all duration-700 group-hover:scale-105" 
                            src={boat.img} 
                            style={{ objectPosition: '50% 50%', backgroundColor: 'rgb(240, 240, 240)' }} 
                          />
                        </picture>
                      </div>
                      
                      <div className="absolute top-0 left-0 w-full h-full py-5 lg:py-[38px] px-5 md:px-8 flex flex-col justify-between z-[2] pointer-events-none">
                        <button type="button" className="flex items-center gap-2 md:gap-3 self-start pointer-events-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                            <path d="M19.7118 9.40125C19.5252 9.25059 19.2801 9.19335 19.0465 9.2466L17.2263 9.6514C17.2008 9.65677 17.1748 9.65966 17.1487 9.65966H17.113C16.9293 9.65966 16.7758 9.52069 16.7575 9.3381C16.6264 8.01114 16.1047 6.75325 15.2587 5.72254C15.1429 5.58068 15.153 5.37415 15.2819 5.24454L15.3081 5.21812C15.3269 5.19954 15.3473 5.18303 15.3694 5.16872L16.9414 4.16841C17.3095 3.93478 17.4181 3.44701 17.1844 3.07908C16.9508 2.71115 16.463 2.60245 16.0951 2.83609C15.9973 2.89828 15.9143 2.98111 15.8521 3.07908L14.8518 4.65109C14.8379 4.67324 14.8214 4.69361 14.8028 4.71177L14.7768 4.73819C14.6468 4.86794 14.4398 4.87826 14.2977 4.76185C13.267 3.91648 12.0087 3.39527 10.6821 3.26442C10.4989 3.24598 10.3595 3.09119 10.3606 2.90722V2.87145C10.3606 2.84544 10.3633 2.8193 10.3691 2.79398L10.7735 0.973613C10.8261 0.739978 10.7692 0.494923 10.6189 0.308483C10.3241 -0.0316501 9.80966 -0.0681125 9.4698 0.226201C9.44063 0.251656 9.41312 0.279175 9.38766 0.308483C9.23727 0.494923 9.18044 0.739978 9.233 0.973613L9.63739 2.79577C9.64317 2.82068 9.64593 2.84613 9.64593 2.87145V2.90722C9.64593 3.09077 9.50695 3.24447 9.32437 3.26263C7.99755 3.39376 6.73966 3.91538 5.70881 4.76103C5.56667 4.87743 5.35973 4.86711 5.2297 4.7375L5.2037 4.71108C5.18512 4.69278 5.16861 4.67242 5.15471 4.65027L4.15427 3.07825C3.92063 2.71033 3.433 2.60163 3.06507 2.8354C2.69701 3.06903 2.58845 3.55667 2.82208 3.92459C2.88427 4.02256 2.9671 4.10539 3.06507 4.16759L4.63695 5.16803C4.65924 5.18234 4.6796 5.19872 4.69845 5.21729L4.72459 5.24371C4.85352 5.37332 4.86356 5.57985 4.74771 5.72171C3.90247 6.75284 3.38154 8.01114 3.25082 9.33796C3.23252 9.52055 3.07897 9.65952 2.89528 9.65952H2.85785C2.83171 9.65952 2.80557 9.65677 2.78025 9.6514L0.960019 9.2466C0.534853 9.15221 0.113264 9.42024 0.0188748 9.84568C-0.0753772 10.2713 0.192519 10.6924 0.618097 10.7867C0.730649 10.8117 0.847467 10.8117 0.960019 10.7867L2.78204 10.3823C2.80708 10.3769 2.8324 10.374 2.85772 10.374H2.89349C3.07718 10.374 3.23074 10.513 3.2489 10.6956C3.38071 12.0226 3.90274 13.2809 4.7495 14.3112C4.86522 14.453 4.85517 14.6596 4.72625 14.7893L4.70024 14.8157C4.68125 14.8343 4.66089 14.8507 4.63874 14.865L3.06672 15.8653C2.6988 16.0989 2.5901 16.5867 2.82373 16.9546C3.0575 17.3226 3.54514 17.4312 3.91306 17.1976C4.01103 17.1354 4.09386 17.0526 4.15606 16.9546L5.15636 15.3826C5.1704 15.3605 5.18677 15.3401 5.20535 15.3219L5.23149 15.2955C5.36152 15.1658 5.56832 15.1554 5.71059 15.2718C6.7409 16.1168 7.99824 16.6382 9.32437 16.7693C9.50695 16.7874 9.64593 16.941 9.64593 17.1247V17.1623C9.64593 17.1883 9.64304 17.2144 9.63739 17.2397L9.23287 19.0601C9.18044 19.2937 9.23727 19.5388 9.38766 19.7252C9.68239 20.0654 10.1969 20.1018 10.5366 19.8075C10.5659 19.782 10.5934 19.7545 10.6187 19.7252C10.7692 19.5388 10.8259 19.2937 10.7735 19.0601L10.369 17.2397C10.3633 17.2144 10.3605 17.1883 10.3605 17.1623V17.1265C10.3605 16.9428 10.4994 16.7892 10.682 16.7711C12.009 16.6399 13.2669 16.1183 14.2976 15.2727C14.4398 15.1561 14.6466 15.1666 14.7767 15.2962L14.8028 15.3226C14.8214 15.3409 14.8378 15.3613 14.8518 15.3834L15.8521 16.9553C16.0857 17.3234 16.5734 17.4319 16.9414 17.1983C17.3094 16.9647 17.4181 16.477 17.1843 16.109C17.1222 16.0111 17.0393 15.9283 16.9414 15.8661L15.3694 14.8657C15.3473 14.8514 15.3269 14.835 15.3079 14.8164L15.2819 14.79C15.1529 14.6604 15.1429 14.4538 15.2587 14.312C16.1039 13.2809 16.6248 12.0226 16.7557 10.6957C16.7741 10.5125 16.9289 10.3731 17.1129 10.3742H17.1487C17.1747 10.3742 17.2008 10.3769 17.2261 10.3823L19.0465 10.7868C19.4717 10.8818 19.8932 10.6141 19.9882 10.1887C20.054 9.89508 19.9468 9.58962 19.7118 9.40125ZM10.3606 4.35017C10.3606 4.24767 10.4045 4.15011 10.4813 4.08228C10.5584 4.01513 10.6603 3.98362 10.7621 3.99546C11.8418 4.13085 12.8651 4.55491 13.7239 5.22266C13.88 5.34347 13.9086 5.56774 13.7878 5.72391C13.7786 5.73602 13.7681 5.74785 13.7571 5.75859L11.1783 8.33765C11.1112 8.4048 11.0205 8.44236 10.9254 8.44236C10.8722 8.44209 10.82 8.42984 10.7721 8.40659C10.7157 8.37989 10.6578 8.35595 10.5989 8.33517C10.4559 8.28482 10.3606 8.14942 10.3606 7.99793V4.35017ZM6.28257 5.22266C7.14157 4.55491 8.16472 4.13085 9.24443 3.99546C9.34625 3.98335 9.44806 4.01472 9.52525 4.08228C9.60203 4.15011 9.64593 4.24767 9.64593 4.35017V7.99793C9.64593 8.14942 9.55057 8.28454 9.40761 8.3349C9.34872 8.35554 9.29079 8.37948 9.23438 8.40631C9.1865 8.42956 9.13435 8.44167 9.0811 8.44209C8.98602 8.44209 8.89535 8.40452 8.8282 8.33738L6.24941 5.75817C6.10934 5.6192 6.10865 5.39272 6.24804 5.25307C6.25877 5.24192 6.27046 5.23188 6.28257 5.22266ZM5.21085 6.29658C5.33166 6.14055 5.55594 6.11193 5.71211 6.23232C5.72422 6.24168 5.73605 6.252 5.74678 6.26301L8.32406 8.8418C8.43124 8.94829 8.45986 9.11079 8.39561 9.2477C8.36878 9.30411 8.34483 9.36232 8.32406 9.42134C8.2737 9.5643 8.13872 9.65966 7.98723 9.65966H4.33617C4.13899 9.65966 3.97897 9.49963 3.97897 9.30232C3.97897 9.28774 3.98007 9.27274 3.98186 9.25802C4.11725 8.17846 4.54132 7.15558 5.20934 6.29672H5.21085V6.29658ZM5.49306 13.8754H5.47063C5.3684 13.8689 5.27373 13.819 5.21085 13.7378C4.5427 12.8789 4.11863 11.8561 3.98324 10.7764C3.9582 10.5807 4.09689 10.402 4.29269 10.3769C4.30727 10.3751 4.32158 10.3742 4.33617 10.3742H7.98434C8.13583 10.3742 8.27081 10.4695 8.32117 10.6125C8.34194 10.6714 8.36589 10.7296 8.39272 10.7861C8.45697 10.9229 8.42835 11.0855 8.32117 11.1919L5.74238 13.7707C5.67592 13.8372 5.58552 13.8751 5.49154 13.8754H5.49306ZM9.64606 15.6835C9.64606 15.8808 9.4859 16.0409 9.28873 16.0409C9.27415 16.0409 9.25901 16.0409 9.24443 16.0384C8.16472 15.9029 7.14157 15.4788 6.28271 14.811C6.12654 14.6904 6.09792 14.466 6.21873 14.3098C6.22809 14.2977 6.23841 14.286 6.24941 14.2753L8.8282 11.6961C8.9347 11.5886 9.09761 11.56 9.23438 11.6246C9.29093 11.6515 9.34872 11.6754 9.40775 11.6961C9.55057 11.7464 9.64606 11.8815 9.64606 12.033V15.6835ZM10.0033 10.7314C9.6085 10.7314 9.28873 10.4116 9.28873 10.0169C9.28873 9.62209 9.6085 9.30232 10.0033 9.30232C10.398 9.30232 10.7178 9.62209 10.7178 10.0169C10.7178 10.4116 10.398 10.7314 10.0033 10.7314ZM13.7239 14.811C12.8651 15.4788 11.8418 15.9029 10.7621 16.0384C10.7475 16.0384 10.7324 16.0409 10.7178 16.0409C10.5206 16.0409 10.3606 15.8808 10.3606 15.6835V12.0359C10.3606 11.8844 10.4559 11.7493 10.5989 11.6989C10.6578 11.6782 10.7157 11.6544 10.7721 11.6275C10.9089 11.5629 11.0718 11.5913 11.1783 11.6989L13.7571 14.278C13.8972 14.4171 13.8979 14.6436 13.7586 14.7832C13.7479 14.7944 13.736 14.8043 13.7239 14.8139V14.811ZM14.7957 13.7371C14.7328 13.8183 14.6381 13.8682 14.536 13.8747H14.5135C14.4188 13.8747 14.3277 13.8372 14.2608 13.77L11.6825 11.1919C11.5753 11.0855 11.5467 10.9229 11.611 10.7861C11.6377 10.7296 11.6617 10.6714 11.6825 10.6125C11.7332 10.4684 11.8697 10.3731 12.0222 10.3742H15.6703C15.8675 10.3742 16.0275 10.5342 16.0275 10.7314C16.0275 10.7461 16.0264 10.7611 16.0247 10.7757C15.8893 11.8554 15.4652 12.8783 14.7972 13.7371H14.7957ZM15.9365 9.53885C15.8686 9.61563 15.7715 9.65966 15.6688 9.65966H12.0222C11.8707 9.65966 11.7357 9.56417 11.6853 9.42134C11.6646 9.36232 11.6406 9.30411 11.6138 9.2477C11.5495 9.11079 11.5782 8.94829 11.6853 8.8418L14.2641 6.26301C14.4034 6.12335 14.6296 6.12252 14.7692 6.26191C14.7804 6.27305 14.7903 6.28447 14.8001 6.29658C15.4681 7.15544 15.8921 8.17832 16.0275 9.25802C16.0394 9.36025 16.0069 9.46235 15.938 9.53885H15.9365Z" fill="currentColor" fillOpacity="0.8" />
                          </svg>
                          <span className="text-white text-sm">{language === 'it' ? 'Aggiungi ai Preferiti' : 'Add to Favorites'}</span>
                        </button>
                        
                        <div className="flex items-end justify-between pointer-events-auto w-full">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-white text-sm">{boat.location}</span>
                            </div>
                            <p className="text-white text-2xl md:text-[44px] leading-[1.2]"><b>{boat.nameBold}</b> {boat.nameNormal}</p>
                            <p className="text-white text-sm">{boat.specs}</p>
                          </div>
                          
                          <div className="flex items-end gap-4 mb-3">
                            <div className="flex flex-col">
                              <span className="text-white text-[9px] opacity-50">{language === 'it' ? 'da' : 'from'}</span>
                              <p className="flex items-center gap-1">
                                <b className="text-white text-3xl md:text-4xl leading-none">{boat.price}</b>
                                <span className="flex flex-col leading-none">
                                  <span className="text-white text-[15px] font-bold">{boat.priceUnit}</span>
                                  <small className="text-white text-[11px] opacity-50">{language === 'it' ? '/sett' : '/week'}</small>
                                </span>
                              </p>
                            </div>
                            
                            <div className="md:flex hidden relative group/tooltip">
                              <div className="size-[34px] flex items-center justify-center rounded-full border-[0.8px] border-white/80 cursor-pointer hover:bg-white hover:text-[#070c26] transition-colors duration-200">
                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="17.0018" cy="16.9998" r="10.8182" fill="currentColor"></circle>
                                  <path d="M18.1805 20.3815L18.1485 14.6052L15.1678 14.6246L15.1737 15.8885L15.9831 15.884L16.0069 20.3942L15.1484 20.3972L15.1551 21.6045L18.8962 21.5844L18.8887 20.3779L18.1805 20.3815ZM17.0446 13.7527C17.7736 13.7497 18.2133 13.2617 18.2095 12.6622C18.1902 12.0477 17.7617 11.5791 17.0602 11.582C16.361 11.5865 15.905 12.0611 15.9079 12.6756C15.9117 13.2744 16.3565 13.7579 17.0446 13.7527Z" fill="currentColor" style={{fill: "inherit", mixBlendMode: "difference"}}></path>
                                  <circle opacity="0.4" cx="17" cy="17" r="16.6136" stroke="currentColor" strokeWidth="0.772727"></circle>
                                </svg>
                              </div>
                              <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-white text-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap text-xs">
                                {language === 'it' ? 'Le tariffe escludono spese aggiuntive.' : 'Rates exclude additional expenses.'}
                                <div className="absolute top-full right-3 border-4 border-transparent border-t-white"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Navigation Arrows */}
        <div className="w-full hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <button ref={prevRef} type="button" className="swiper-button-prev-custom absolute top-1/2 left-[11%] min-[991px]:left-1/6 min-[1280px]:left-1/4 -translate-y-20 -translate-x-6 size-[50px] text-[#1A1A1A] bg-white hover:bg-[#0052b4] hover:text-white border border-[#ebebeb] rounded-full flex items-center justify-center transition-all duration-300 group pointer-events-auto shadow-lg cursor-pointer" aria-label="Previous slide">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300">
              <path d="M11.25 13.5L6.75 9l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <button ref={nextRef} type="button" className="swiper-button-next-custom absolute top-1/2 right-[11%] min-[991px]:right-1/6 min-[1280px]:right-1/4 -translate-y-20 translate-x-6 size-[50px] text-[#1A1A1A] bg-white hover:bg-[#0052b4] hover:text-white border border-[#ebebeb] rounded-full flex items-center justify-center transition-all duration-300 group pointer-events-auto shadow-lg cursor-pointer" aria-label="Next slide">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300">
              <path d="M6.75 13.5L11.25 9l-4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-button-disabled {
          opacity: 0.5;
          pointer-events: none;
        }
        .charter-slider .swiper-slide {
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease;
          opacity: 0.3;
          transform: scale(0.85);
        }
        .charter-slider .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
          z-index: 10;
        }
        .charter-slider .swiper-slide-active .yatch-card::before {
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
        }
      `}} />
    </section>
  );
}
