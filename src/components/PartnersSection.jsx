"use client";

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useLanguage } from '../context/LanguageContext';
import 'swiper/css';
import 'swiper/css/navigation';

export default function PartnersSection() {
  const { language } = useLanguage();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const reviews = [
    {
      id: 1,
      title: language === 'it' ? "Ricordi incredibili in famiglia" : "Incredible family memories",
      rating: language === 'it' ? "5 su 5" : "5 out of 5",
      text: language === 'it' ? "Grazie per la bellissima esperienza e per esserci venuti a prendere a metà viaggio. L'equipaggio ha contribuito a creare il viaggio più bello della mia vita, un ricordo che la mia famiglia custodirà per sempre. Spero di tornare presto." : "Thank you for a beautiful experience and for picking me up halfway through the trip. This crew helped create the best trip of my life and memories my family will treasure. I hope to return soon.",
      author: "Teresa"
    },
    {
      id: 2,
      title: language === 'it' ? "Crociera stupenda, equipaggio fantastico" : "Wonderful Cruise, Kind Crew",
      rating: language === 'it' ? "5 su 5" : "5 out of 5",
      text: language === 'it' ? "Grazie a tutti voi — abbiamo trascorso una crociera meravigliosa. Siete stati professionali, gentili e attenti in tutto. Vi auguriamo tanti altri successi e il meglio. Ci vediamo l'anno prossimo!" : "Thanks to all of you — we had a wonderful cruise. You were professional, kind and attentive in every way. We wish you many more successful cruises and a good life. See you next year!",
      author: "John P."
    },
    {
      id: 3,
      title: language === 'it' ? "È valsa la pena aspettare" : "Worth the wait",
      rating: language === 'it' ? "5 su 5" : "5 out of 5",
      text: language === 'it' ? "Il nostro viaggio era stato rimandato per via del COVID-19 nel 2020, e sono felicissima che abbiamo aspettato. È stato epico sotto ogni aspetto: l'avventura, il clima e soprattutto l'equipaggio. Il capitano conosce i posti migliori e dà ottimi consigli." : "Our trip was rescheduled from COVID-19 2020 — so glad we waited. It was worth the effort and patience for our group of 12. It was epic in every respect — adventure, weather and most importantly the crew. The captain knows the best places and makes great recommendations.",
      author: "Emily C."
    },
    {
      id: 4,
      title: language === 'it' ? "Equipaggio eccezionale e professionale" : "Professional humble crew",
      rating: language === 'it' ? "5 su 5" : "5 out of 5",
      text: language === 'it' ? "Siete un equipaggio fantastico, professionale e umile. Abbiamo adorato il cibo e i vostri consigli. Grazie per averci fatto rilassare e divertire così tanto." : "You are an amazing, professional and humble crew. We loved the food and your recommendations. Thank you for the peace of mind and for giving us such a good time.",
      author: "Thomas, Shay & friends"
    },
    {
      id: 5,
      title: language === 'it' ? "Sinfonia del mare" : "Sea symphony",
      rating: language === 'it' ? "4.5 su 5" : "4.5 out of 5",
      text: language === 'it' ? "Caro equipaggio, la sinfonia del mare e le infinite melodie di sale e spruzzi, l'orchestra della natura! Grazie per aver reso questi giorni una vera sinfonia tra baie stupende e acque cristalline." : "Dear crew, the symphony of the sea and the endless melodies of salt and spray — nature’s orchestra! Thank you for making these days a true symphony with beautiful bays and azure water.",
      author: "Anna P."
    },
    {
      id: 6,
      title: language === 'it' ? "Viaggio indimenticabile" : "Beautiful journey",
      rating: language === 'it' ? "4.5 su 5" : "4.5 out of 5",
      text: language === 'it' ? "Abbiamo fatto un viaggio meraviglioso. Il paesaggio, l'acqua cristallina e le baie erano stupende. L'equipaggio ci ha aiutato in tutto, sempre pronto ad assisterci. Grazie da parte di tutti noi!" : "We had a lovely trip. The scenery, clear water and bays were beautiful. The crew helped with everything and were always willing to assist. Thank you from all of us — it was fantastic.",
      author: "S."
    }
  ];

  const partners = [
    {
      name: 'Blue Dream Brokerage',
      url: 'https://www.bluedreambrokerage.com/',
      img: 'https://www.bluedreamcharter.com/wp-content/uploads/2022/02/bluedreambrokerage.png',
    },
    {
      name: 'Globe Sailor',
      url: 'https://www.globesailor.it/',
      img: 'https://www.bluedreamcharter.com/wp-content/uploads/2022/02/globe-sailor-1.jpg',
    },
    {
      name: 'Booking Manager',
      url: 'https://www.booking-manager.com/',
      img: 'https://www.bluedreamcharter.com/wp-content/uploads/2022/02/mmk-logo-large-new.png',
    },
    {
      name: 'Fondazione Dal Mare',
      url: 'https://www.fondazionedalmare.it/',
      img: 'https://www.bluedreamcharter.com/wp-content/uploads/2022/02/logo-fondazione2.jpg',
    },
    {
      name: "D'Addario Yacht",
      url: 'https://www.daddarioyacht.it/',
      img: 'https://www.bluedreamcharter.com/wp-content/uploads/2022/02/logo-daddario.png',
    },
    {
      name: 'Marina di Procida',
      url: 'https://www.marinadi-procida.com/',
      img: 'https://www.bluedreamcharter.com/wp-content/uploads/2022/02/logo_procida_pantone693c.png',
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] min-[1280px]:grid-cols-[65%_35%] overflow-hidden w-full">
      {/* Left Side: Testimonials */}
      <section className="relative bg-[#0E6FA7] pl-6 lg:pl-[60px] pt-8 pb-12 lg:pt-15 lg:pb-30 pr-4 lg:pr-[50px] before:content-[''] before:w-[140%] before:h-[120%] md:before:w-[65%] md:before:h-[98%] before:bg-[url('/img/comment-before.svg')] before:absolute before:-bottom-20 before:-left-10 before:bg-contain before:bg-no-repeat">
        
        <div className="flex items-center justify-between mb-12 lg:mb-18 relative z-10">
          <div className="flex items-center gap-2.5">
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.657 14.524a.928.928 0 0 0-.928-.928H9.518a.928.928 0 0 0 0 1.856h10.21a.928.928 0 0 0 .928-.928zM9.516 18.283a.928.928 0 0 0 0 1.856h5.413a.928.928 0 0 0 0-1.856H9.516z" fill="#fff"></path>
              <path d="M26.771 14.576a.928.928 0 0 0-.928.928v7.507a2.55 2.55 0 0 1-2.547 2.547h-6.208a.924.924 0 0 0-.558.187l-5.36 4.03a.291.291 0 0 1-.328.026.296.296 0 0 1-.168-.28l.103-3.002a.93.93 0 0 0-.927-.96H5.538a2.55 2.55 0 0 1-2.547-2.547V10.74a2.555 2.555 0 0 1 2.547-2.556h11.436a.928.928 0 0 0 0-1.857H5.538a4.414 4.414 0 0 0-4.404 4.414v12.27a4.41 4.41 0 0 0 4.404 4.405h3.35l-.07 2.044a2.152 2.152 0 0 0 1.168 1.99c.318.166.662.247 1.002.247.457 0 .91-.147 1.295-.435l5.114-3.846h5.898a4.41 4.41 0 0 0 4.403-4.404v-7.507a.927.927 0 0 0-.927-.929z" fill="#fff"></path>
              <path d="M31.789 5.735a1.55 1.55 0 0 0-1.107-1.031l-2.372-.591-1.295-2.073c-.574-.922-2.074-.92-2.647 0l-1.295 2.073-2.372.59c-.525.13-.94.516-1.107 1.032a1.555 1.555 0 0 0 .289 1.487l1.572 1.87-.172 2.439c-.038.54.201 1.053.64 1.371a1.554 1.554 0 0 0 1.502.185l2.267-.916 2.266.916a1.551 1.551 0 0 0 1.502-.184c.438-.318.678-.83.64-1.372l-.17-2.438L31.5 7.22c.348-.415.456-.97.288-1.486zm-3.523 2.451a.927.927 0 0 0-.214.663l.165 2.341-2.176-.88a.923.923 0 0 0-.695 0l-2.175.88.164-2.34a.938.938 0 0 0-.215-.664L21.611 6.39l2.277-.568a.927.927 0 0 0 .562-.409l1.244-1.989 1.244 1.99c.128.203.329.35.562.408l2.277.568-1.511 1.796z" fill="#fff"></path>
            </svg>
            <h2 className="text-sm max-w-[250px] text-white">
              {language === 'it' ? 'Non fidarti solo di noi, scopri cosa dicono i nostri clienti' : 'Don\'t take our word for it, see what our clients say'}
            </h2>
          </div>
          
          <div className="hidden lg:flex items-center gap-3">
            <button ref={prevRef} type="button" className="size-[50px] text-[#1A1A1A] bg-white hover:bg-[#0052b4] hover:text-white disabled:opacity-30 border border-[#ebebeb] rounded-full flex items-center justify-center transition-all duration-300 group" aria-label="Previous slide">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.1875 8.4375H3.97266L8.26172 4.3418C8.37891 4.23633 8.4375 4.10742 8.4375 3.95508C8.4375 3.80273 8.38477 3.66797 8.2793 3.55078C8.17383 3.43359 8.04492 3.375 7.89258 3.375C7.74023 3.375 7.60547 3.42773 7.48828 3.5332L2.58398 8.20898C2.47852 8.31445 2.39648 8.43457 2.33789 8.56934C2.2793 8.7041 2.25 8.84766 2.25 9C2.25 9.15234 2.2793 9.2959 2.33789 9.43066C2.39648 9.56543 2.47852 9.69141 2.58398 9.80859L7.48828 14.4668C7.54688 14.5254 7.6084 14.5664 7.67285 14.5898C7.7373 14.6133 7.80469 14.625 7.875 14.625C7.94531 14.625 8.01562 14.6104 8.08594 14.5811C8.15625 14.5518 8.2207 14.5078 8.2793 14.4492C8.38477 14.332 8.4375 14.1973 8.4375 14.0449C8.4375 13.8926 8.37891 13.7637 8.26172 13.6582L3.95508 9.5625H15.1875C15.3398 9.5625 15.4717 9.50684 15.583 9.39551C15.6943 9.28418 15.75 9.15234 15.75 9C15.75 8.84766 15.6943 8.71582 15.583 8.60449C15.4717 8.49316 15.3398 8.4375 15.1875 8.4375Z" fill="currentColor"></path></svg>
            </button>
            <button ref={nextRef} type="button" className="size-[50px] text-[#1A1A1A] bg-white hover:bg-[#0052b4] hover:text-white disabled:opacity-30 border border-[#ebebeb] rounded-full flex items-center justify-center transition-all duration-300 group" aria-label="Next slide">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.8125 8.4375H14.0273L9.73828 4.3418C9.62109 4.23633 9.5625 4.10742 9.5625 3.95508C9.5625 3.80273 9.61523 3.66797 9.7207 3.55078C9.82617 3.43359 9.95508 3.375 10.1074 3.375C10.2598 3.375 10.3945 3.42773 10.5117 3.5332L15.416 8.20898C15.5215 8.31445 15.6035 8.43457 15.6621 8.56934C15.7207 8.7041 15.75 8.84766 15.75 9C15.75 9.15234 15.7207 9.2959 15.6621 9.43066C15.6035 9.56543 15.5215 9.69141 15.416 9.80859L10.5117 14.4668C10.4531 14.5254 10.3916 14.5664 10.3271 14.5898C10.2627 14.6133 10.1953 14.625 10.125 14.625C10.0547 14.625 9.98438 14.6104 9.91406 14.5811C9.84375 14.5518 9.7793 14.5078 9.7207 14.4492C9.61523 14.332 9.5625 14.1973 9.5625 14.0449C9.5625 13.8926 9.62109 13.7637 9.73828 13.6582L14.0449 9.5625H2.8125C2.66016 9.5625 2.52832 9.50684 2.41699 9.39551C2.30566 9.28418 2.25 9.15234 2.25 9C2.25 8.84766 2.30566 8.71582 2.41699 8.60449C2.52832 8.49316 2.66016 8.4375 2.8125 8.4375Z" fill="currentColor"></path></svg>
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full overflow-hidden">
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
            spaceBetween={50}
            slidesPerView={1}
            className="!overflow-visible w-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="!h-auto flex">
                <div className="relative h-full flex flex-col text-white">
                  <div className="flex items-center justify-between mb-8 lg:mb-12">
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[27px] h-5 lg:w-10 lg:h-[30px]"><path d="M8.25 0c3 0 5.375 1.25 7.125 3.75 1.833 2.417 2.75 5.417 2.75 9 0 5.333-1.583 9.5-4.75 12.5C10.292 28.25 6 29.833.5 30v-5.875C4.167 24.042 6.833 23 8.5 21c1.667-2 2.5-4.292 2.5-6.875 0-.75-.042-1.292-.125-1.625-1 1-2.417 1.5-4.25 1.5-2 0-3.625-.583-4.875-1.75C.583 11.083 0 9.417 0 7.25c0-2.083.708-3.792 2.125-5.125C3.625.708 5.667 0 8.25 0zm21.625 0c3 0 5.375 1.25 7.125 3.75 1.834 2.417 2.75 5.417 2.75 9 0 5.333-1.583 9.5-4.75 12.5-3.083 3-7.375 4.583-12.875 4.75v-5.875c3.667-.083 6.333-1.125 8-3.125 1.667-2 2.5-4.292 2.5-6.875 0-.75-.041-1.292-.125-1.625-1 1-2.417 1.5-4.25 1.5-2 0-3.625-.583-4.875-1.75-1.167-1.167-1.75-2.833-1.75-5 0-2.083.708-3.792 2.125-5.125C25.25.708 27.292 0 29.875 0z" fill="#fff"></path></svg>
                      <h3 className="text-xl lg:text-[26px] font-medium">{review.title}</h3>
                    </div>
                    <div className="hidden lg:flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m20 7.726-7.263-.477L10 .373 7.263 7.249 0 7.727l5.573 4.723-1.829 7.175L10 15.672l6.256 3.953-1.829-7.174L20 7.726zm-10 6.56-4.393 2.776 1.282-5.033-3.927-3.323 5.116-.336L10 3.542l1.922 4.828 5.122.336-3.933 3.323 1.282 5.033L10 14.285z" fill="#fff"></path></svg>
                      <p className="text-sm font-normal"><span className="underline">{language === 'it' ? 'Voto' : 'Rating'}: {review.rating}</span></p>
                    </div>
                  </div>
                  <div className="max-lg:flex max-lg:flex-col text-sm lg:text-lg font-normal mb-20 lg:mb-4">
                    <p className="line-clamp-6 lg:line-clamp-3 mb-2">{review.text}</p>
                    <a className="font-medium underline-offset-[3px] hover:text-[#0052b4] transition-all duration-300" href="/reviews">
                      <span className="underline">{language === 'it' ? 'Leggi di più' : 'Read more'}</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:w-full">
                      <span className="text-sm font-normal">{review.author}</span>
                    </div>
                    <div className="flex lg:hidden items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m20 7.726-7.263-.477L10 .373 7.263 7.249 0 7.727l5.573 4.723-1.829 7.175L10 15.672l6.256 3.953-1.829-7.174L20 7.726zm-10 6.56-4.393 2.776 1.282-5.033-3.927-3.323 5.116-.336L10 3.542l1.922 4.828 5.122.336-3.933 3.323 1.282 5.033L10 14.285z" fill="#fff"></path></svg>
                      <p className="text-sm font-normal"><span className="underline">{language === 'it' ? 'Voto' : 'Rating'}: {review.rating}</span></p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Right Side: Our Partners */}
      <section className="flex flex-col w-full h-full">
        <div className="flex flex-1 flex-col gap-6 justify-between bg-white px-8 py-12 min-[1280px]:px-12">
          <div className="flex flex-col">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2"><path d="M26.233 10.852c-.472-.492-.96-1-1.143-1.446-.17-.409-.18-1.086-.19-1.742-.019-1.22-.039-2.603-1-3.564-.961-.961-2.344-.981-3.564-1-.656-.01-1.333-.02-1.742-.19-.445-.184-.954-.671-1.447-1.143C16.286.94 15.306 0 14 0c-1.305 0-2.284.939-3.148 1.768-.492.47-1 .958-1.446 1.142-.406.17-1.086.18-1.742.19-1.22.019-2.603.039-3.564 1-.961.961-.975 2.344-1 3.564-.01.656-.02 1.334-.19 1.742-.184.445-.671.954-1.143 1.446C.94 11.715 0 12.695 0 14c0 1.305.939 2.284 1.768 3.148.47.492.958 1 1.142 1.446.17.409.18 1.086.19 1.742.019 1.22.039 2.603 1 3.564.961.961 2.344.981 3.564 1 .656.01 1.334.02 1.742.19.445.184.954.671 1.446 1.143C11.715 27.06 12.695 28 14 28c1.305 0 2.284-.939 3.148-1.767.492-.472 1-.96 1.446-1.143.409-.17 1.086-.18 1.742-.19 1.22-.019 2.603-.039 3.564-1 .961-.961.981-2.344 1-3.564.01-.656.02-1.333.19-1.742.184-.445.671-.954 1.143-1.447C27.06 16.286 28 15.306 28 14c0-1.305-.939-2.284-1.767-3.148zm-1.444 4.912c-.599.625-1.219 1.271-1.548 2.065-.315.762-.328 1.633-.341 2.477-.012.875-.026 1.791-.415 2.179-.389.387-1.299.402-2.179.415-.844.013-1.715.026-2.477.341-.794.329-1.44.949-2.065 1.548C15.139 25.387 14.5 26 14 26s-1.144-.615-1.764-1.211c-.62-.597-1.271-1.219-2.065-1.548-.762-.315-1.633-.328-2.477-.341-.875-.012-1.792-.026-2.179-.415-.387-.389-.402-1.299-.415-2.179-.012-.844-.026-1.715-.341-2.477-.329-.794-.949-1.44-1.548-2.065C2.612 15.139 2 14.5 2 14s.615-1.144 1.211-1.764c.597-.62 1.219-1.271 1.548-2.065.315-.762.329-1.633.341-2.477.013-.875.026-1.792.415-2.179.389-.387 1.299-.402 2.179-.415.843-.012 1.715-.026 2.477-.341.794-.329 1.44-.949 2.065-1.548C12.861 2.612 13.5 2 14 2s1.144.615 1.764 1.211c.62.597 1.271 1.219 2.065 1.548.762.315 1.633.329 2.477.341.875.013 1.791.026 2.179.415.387.389.402 1.299.415 2.179.013.843.026 1.715.341 2.477.329.794.949 1.44 1.548 2.065C25.387 12.861 26 13.5 26 14s-.615 1.144-1.211 1.764zm-5.082-5.471a1.001 1.001 0 0 1 0 1.415l-7 7a1.001 1.001 0 0 1-1.415 0l-3-3a1 1 0 1 1 1.415-1.415L12 16.585l6.293-6.293a1.001 1.001 0 0 1 1.415 0z" fill="#0E6FA7"></path></svg>
            <h3 className="mb-1 text-[26px] font-medium tracking-[0.52px] text-[#0b142e] max-w-[350px]">
              {language === 'it' ? 'I Nostri Partner' : 'Our Partners'}
            </h3>
            <p className="text-sm mb-1 text-gray-600">
              {language === 'it' ? 'Collaboriamo con le migliori piattaforme' : 'We collaborate with top platforms'}
            </p>
            <p className="text-sm text-gray-600">
              {language === 'it' ? 'Scopri perché le migliori agenzie ci scelgono.' : 'Discover why the best agencies choose us.'}
            </p>
          </div>
          
          <div className="w-full flex items-center min-w-0 mt-4">
            <div className="w-full flex flex-wrap items-center gap-x-8 gap-y-6 py-4">
              {partners.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" title={p.name} className="flex items-center opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300">
                  <img alt={p.name} loading="lazy" className="h-10 w-auto max-w-[130px] object-contain grayscale hover:grayscale-0 transition-all duration-300" src={p.img} />
                </a>
              ))}
            </div>
          </div>
          
          <a className="flex items-center gap-2 text-[#0E6FA7] text-sm font-bold mt-auto group" aria-label="Scopri la nostra flotta" href="/la-flotta-blue-dream-charter">
            <span className="underline">{language === 'it' ? 'Scopri le nostre imbarcazioni' : 'Discover our yachts'}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              <rect x=".5" y=".5" width="23" height="23" rx="1.5" stroke="#0E6FA7"></rect>
              <path d="m8 15.153 5.956-5.955h-3.89V8H16v5.933h-1.198v-3.889L8.847 16 8 15.153z" fill="#0E6FA7"></path>
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
