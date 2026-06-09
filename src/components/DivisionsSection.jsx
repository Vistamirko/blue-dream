import React, { useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function DivisionsSection() {
  const { t, language } = useLanguage();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const divisions = [
    {
      id: 'charter',
      title: language === 'it' ? 'Vacanze in barca a vela e catamarano' : 'Sailing and Catamaran Holidays',
      button: 'CHARTER',
      image: 'https://www.bluedreamcharter.com/wp-content/uploads/2021/01/IMG_20200416_084747-scaled.jpg',
      url: 'https://www.bluedreamcharter.com/la-flotta-blue-dream-charter/',
      target: '_self'
    },
    {
      id: 'services',
      title: language === 'it' ? 'Servizi e piani di gestione personalizzati' : 'Custom management plans and services',
      button: 'NAUTICAL SERVICES',
      image: 'https://www.bluedreamcharter.com/wp-content/uploads/2019/06/manu-1.jpg',
      url: 'https://www.bluedreamcharter.com/servizi/',
      target: '_self'
    },
    {
      id: 'brokerage',
      title: language === 'it' ? 'Vendita nuovo ed usato' : 'New and used yacht sales',
      button: 'BROKERAGE',
      image: 'https://www.bluedreamcharter.com/wp-content/uploads/2022/02/fe38746a-8fdc-4e89-a30d-5174fcc88c87.jpg',
      url: 'https://www.bluedreambrokerage.com/',
      target: '_blank'
    }
  ];

  return (
    <div className="w-full bg-[#070c26] pt-16 lg:pt-24 pb-4 lg:pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] min-[1280px]:grid-cols-[35%_65%] min-[1440px]:grid-cols-[40%_60%] w-full">
        {/* LEFT SECTION */}
        <section className="w-full h-full relative min-h-[420px] lg:min-h-full">
        <picture>
          <img 
            src="https://cdn.bluemoreyachting.com/media/16080/c/sm/woman-snorkeling-over-coral-reef.webp" 
            alt="Blue Dream World" 
            loading="lazy" 
            className="w-full h-full absolute inset-0 object-cover object-left" 
            style={{ objectPosition: '50% 50%', backgroundColor: '#f0f0f0' }} 
          />
        </picture>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between py-10 px-6 lg:pl-[60px] lg:pr-12 z-10 bg-black/30">
          <div className="flex flex-col gap-4">
            <h2 className="md:text-[35px] text-[28px] font-semibold text-white">Blue Dream</h2>
            <div className="flex items-center gap-2.5">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-7 md:size-9">
                <path d="M3.127 3.872a.526.526 0 0 0 .746 0 .527.527 0 0 0 0-.745L.9.154A.527.527 0 0 0 .155.9l2.972 2.972zm13.406 1.37a.527.527 0 0 0 .527-.527V2.227l1.865 2.7a.582.582 0 0 0 .658.243c.25-.078.412-.312.412-.6l-.04-4.048A.527.527 0 0 0 19.429 0h-.005a.527.527 0 0 0-.522.532l.024 2.54L16.968.235a.527.527 0 0 0-.962.3v4.18c0 .292.236.528.528.528zm4.958-2.315c2.7.622 5.192 1.97 7.206 3.899a15.467 15.467 0 0 1 4.205 7.009.528.528 0 0 0 1.016-.284 16.524 16.524 0 0 0-4.492-7.487A16.503 16.503 0 0 0 21.728 1.9a.527.527 0 1 0-.237 1.028zM.826 20.133a.622.622 0 0 0 .606.488h.005a.622.622 0 0 0 .589-.435l.77-2.489.767 2.49a.623.623 0 0 0 .593.435h.004a.622.622 0 0 0 .603-.49l.819-4.115a.527.527 0 1 0-1.035-.206l-.482 2.423-.765-2.483a.527.527 0 0 0-1.02.044l-.754 2.44-.481-2.431a.527.527 0 1 0-1.035.205l.816 4.124zM32.5 4.027c.135 0 .27-.052.373-.155L35.846.9A.527.527 0 0 0 35.1.154l-2.973 2.973a.527.527 0 0 0 .373.9zm2.973 12.425a.527.527 0 0 0 0-1.054h-1.749a.527.527 0 0 0-.527.527v4.15c0 .291.236.527.527.527h1.749a.527.527 0 1 0 0-1.055h-1.221v-1.02h1.092a.527.527 0 1 0 0-1.054H34.25v-1.02h1.222zM2.449 14.201a.529.529 0 0 0 .65-.367A15.464 15.464 0 0 1 7.34 6.79a15.442 15.442 0 0 1 7.274-3.887.527.527 0 0 0-.23-1.03 16.498 16.498 0 0 0-7.77 4.152 16.52 16.52 0 0 0-4.532 7.526.527.527 0 0 0 .366.65zm31.102 7.598a.527.527 0 0 0-.65.366 15.466 15.466 0 0 1-4.204 7.009 15.448 15.448 0 0 1-7.206 3.9.527.527 0 1 0 .237 1.027 16.503 16.503 0 0 0 7.698-4.165 16.523 16.523 0 0 0 4.491-7.487.527.527 0 0 0-.366-.65zm-.678 10.328a.527.527 0 0 0-.745.746l2.972 2.972a.526.526 0 1 0 .746-.745l-2.973-2.973zm-8.13-6.531a.844.844 0 0 0 .6-.253.84.84 0 0 0 .125-1.046l-2.456-4.038.619-.15a.527.527 0 1 0-.25-1.026l-2.952.72a.849.849 0 0 0-.626.626L18 27.829l-1.802-7.4a.849.849 0 0 0-.627-.627L8.171 18l7.4-1.802a.85.85 0 0 0 .627-.627L18 8.171l1.803 7.4a.85.85 0 0 0 .626.627l7.4 1.802-2.596.632a.527.527 0 0 0 .25 1.025l3.404-.83a.84.84 0 0 0 .65-.827.84.84 0 0 0-.65-.828l-5.875-1.431 2.456-4.038a.84.84 0 0 0-.125-1.046.84.84 0 0 0-1.046-.125l-4.038 2.456-1.43-5.875a.84.84 0 0 0-.829-.65.84.84 0 0 0-.828.65l-1.43 5.875-4.04-2.456a.84.84 0 0 0-1.045.125.84.84 0 0 0-.125 1.046l1.933 3.177a.527.527 0 1 0 .9-.548l-1.5-2.467 3.614 2.198-.277 1.139-8.089 1.97a.84.84 0 0 0-.65.828c0 .4.261.733.65.828l5.876 1.431-2.457 4.038a.84.84 0 0 0 .125 1.046.844.844 0 0 0 1.046.125l4.038-2.456 1.431 5.875a.84.84 0 0 0 .828.65.84.84 0 0 0 .828-.65l1.431-5.875 4.038 2.456c.141.086.295.128.447.128zm-.608-13.731-2.198 3.614-1.139-.277-.277-1.139 3.614-2.198zm-12.27 12.27 2.199-3.614 1.138.277.277 1.138-3.614 2.199zm8.656-2.199.277-1.138 1.139-.277 2.198 3.614-3.614-2.199zm-1.875 10.98c-.514-.189-.992-.395-1.14-.46a.287.287 0 0 1-.1-.268c.01-.074.063-.253.33-.333.588-.177 1.133.253 1.149.266a.527.527 0 0 0 .676-.81c-.04-.033-.983-.811-2.13-.466-.579.175-.989.632-1.07 1.193a1.335 1.335 0 0 0 .596 1.321.533.533 0 0 0 .073.04c.024.01.601.268 1.25.507.184.068.603.258.547.566-.041.233-.325.473-.727.473-.416 0-.815-.167-1.069-.447a.527.527 0 0 0-.782.708c.451.497 1.143.794 1.85.794.885 0 1.628-.565 1.767-1.343.104-.585-.161-1.35-1.22-1.74zm-15.52-.789L.156 35.1a.527.527 0 1 0 .745.745l2.973-2.972a.527.527 0 1 0-.746-.746zm12.11 1.095C9.348 32.161 4.56 27.733 3.039 21.944a.527.527 0 0 0-1.02.268c1.625 6.185 6.74 10.914 13.03 12.048a.527.527 0 0 0 .187-1.038z" fill="#fff"></path>
              </svg>
              <span className="text-white md:text-sm text-xs md:max-w-[230px] max-w-[200px]">
                {language === 'it' ? 'Scopri il mare, vivi l\'emozione, assapora la libertà.' : 'Discover the sea, live the emotion, savor the freedom.'}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="md:text-2xl text-xl text-white">
              <b>{language === 'it' ? 'La tua passione' : 'Your passion'}</b>, {language === 'it' ? 'la nostra missione' : 'our mission'}
            </h3>
            <p className="text-white/80 md:text-[13px] text-xs leading-[1.54] max-w-[365px]">
              {language === 'it' 
                ? 'Dal 1999 trasformiamo il mare nel tuo palcoscenico personale. Che si tratti di noleggio, servizi nautici o acquisto della tua prossima imbarcazione, Blue Dream è il tuo partner di fiducia.' 
                : 'Since 1999, we turn the sea into your personal stage. Whether it\'s charter, nautical services, or buying your next yacht, Blue Dream is your trusted partner.'}
            </p>
            <a className="text-[13px] flex items-center gap-1.5 group text-white mt-4" href="/">
              <span className="underline">{language === 'it' ? 'Scopri di più' : 'See more'}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                <rect x=".5" y=".5" width="23" height="23" rx="1.5" stroke="#fff"></rect>
                <path d="m8 15.153 5.956-5.955h-3.89V8H16v5.933h-1.198v-3.889L8.847 16 8 15.153z" fill="#fff"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* RIGHT SECTION (CAROUSEL) */}
      <section className="pt-10 lg:pt-15 max-lg:pb-10 pl-6 lg:pl-[60px] border-t-2 border-[#111f3a66]">
        <div className="w-full flex items-center justify-between pr-6 lg:pr-[60px] mb-8">
          <h2 className="text-white text-2xl">
            {language === 'it' ? 'Le Nostre Divisioni' : 'Our Divisions'}
          </h2>
          <div className="hidden lg:flex items-center gap-3">
            <button ref={prevRef} type="button" className="size-[50px] bg-white text-[#1A1A1A] hover:bg-[#0052b4] hover:text-white disabled:opacity-30 border border-[#ebebeb] rounded-full flex items-center justify-center transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.1875 8.4375H3.97266L8.26172 4.3418C8.37891 4.23633 8.4375 4.10742 8.4375 3.95508C8.4375 3.80273 8.38477 3.66797 8.2793 3.55078C8.17383 3.43359 8.04492 3.375 7.89258 3.375C7.74023 3.375 7.60547 3.42773 7.48828 3.5332L2.58398 8.20898C2.47852 8.31445 2.39648 8.43457 2.33789 8.56934C2.2793 8.7041 2.25 8.84766 2.25 9C2.25 9.15234 2.2793 9.2959 2.33789 9.43066C2.39648 9.56543 2.47852 9.69141 2.58398 9.80859L7.48828 14.4668C7.54688 14.5254 7.6084 14.5664 7.67285 14.5898C7.7373 14.6133 7.80469 14.625 7.875 14.625C7.94531 14.625 8.01562 14.6104 8.08594 14.5811C8.15625 14.5518 8.2207 14.5078 8.2793 14.4492C8.38477 14.332 8.4375 14.1973 8.4375 14.0449C8.4375 13.8926 8.37891 13.7637 8.26172 13.6582L3.95508 9.5625H15.1875C15.3398 9.5625 15.4717 9.50684 15.583 9.39551C15.6943 9.28418 15.75 9.15234 15.75 9C15.75 8.84766 15.6943 8.71582 15.583 8.60449C15.4717 8.49316 15.3398 8.4375 15.1875 8.4375Z" fill="currentColor"></path></svg>
            </button>
            <button ref={nextRef} type="button" className="size-[50px] bg-white text-[#1A1A1A] hover:bg-[#0052b4] hover:text-white disabled:opacity-30 border border-[#ebebeb] rounded-full flex items-center justify-center transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.8125 8.4375H14.0273L9.73828 4.3418C9.62109 4.23633 9.5625 4.10742 9.5625 3.95508C9.5625 3.80273 9.61523 3.66797 9.7207 3.55078C9.82617 3.43359 9.95508 3.375 10.1074 3.375C10.2598 3.375 10.3945 3.42773 10.5117 3.5332L15.416 8.20898C15.5215 8.31445 15.6035 8.43457 15.6621 8.56934C15.7207 8.7041 15.75 8.84766 15.75 9C15.75 9.15234 15.7207 9.2959 15.6621 9.43066C15.6035 9.56543 15.5215 9.69141 15.416 9.80859L10.5117 14.4668C10.4531 14.5254 10.3916 14.5664 10.3271 14.5898C10.2627 14.6133 10.1953 14.625 10.125 14.625C10.0547 14.625 9.98438 14.6104 9.91406 14.5811C9.84375 14.5518 9.7793 14.5078 9.7207 14.4492C9.61523 14.332 9.5625 14.1973 9.5625 14.0449C9.5625 13.8926 9.62109 13.7637 9.73828 13.6582L14.0449 9.5625H2.8125C2.66016 9.5625 2.52832 9.50684 2.41699 9.39551C2.30566 9.28418 2.25 9.15234 2.25 9C2.25 8.84766 2.30566 8.71582 2.41699 8.60449C2.52832 8.49316 2.66016 8.4375 2.8125 8.4375Z" fill="currentColor"></path></svg>
            </button>
          </div>
        </div>

        <div className="overflow-hidden pb-10">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 2.5 },
            }}
            className="!overflow-visible"
          >
            {divisions.map((item) => (
              <SwiperSlide key={item.id} className="pb-10">
                <a 
                  className="relative block overflow-hidden rounded-xl before:content-[''] before:w-full before:h-full before:absolute before:bg-[linear-gradient(to_bottom,rgba(7,12,38,0)_30%,rgba(7,12,38,0.9))] before:left-0 before:top-0 before:z-[1] group" 
                  href={item.url}
                  target={item.target}
                >
                  <picture>
                    <img 
                      alt={item.title} 
                      loading="lazy" 
                      className="w-full h-[280px] lg:h-[320px] object-cover group-hover:scale-105 transition-transform duration-700" 
                      src={item.image} 
                    />
                  </picture>
                  <div className="absolute left-0 bottom-0 w-full p-6 flex flex-col justify-end z-[2]">
                    <div className="flex flex-col gap-3">
                      <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">{item.button}</span>
                      <h3 className="text-white text-[20px] md:text-[22px] font-medium leading-[1.2]">
                        {item.title}
                      </h3>
                      <div className="inline-flex items-center gap-2 text-white/90 text-sm font-medium mt-1 group-hover:text-white transition-colors">
                        {language === 'it' ? 'Scopri' : 'Explore'} 
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      </div>
    </div>
  );
}
