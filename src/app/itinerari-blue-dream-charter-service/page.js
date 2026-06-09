"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const durations = [
  {
    id: "1-giorno",
    title: "1 Giorno",
    image: "https://www.bluedreamcharter.com/wp-content/uploads/2018/11/29594971_1978032282524982_4242358028153454980_n2-1.jpg",
    description: "Vivi la magia del Golfo di Napoli per una giornata indimenticabile a bordo dei nostri yacht. Scegli tra queste fantastiche isole.",
    itineraries: [
      {
        title: "Procida",
        image: "https://cdn.bluemoreyachting.com/media/13448/c/sm/hvar.webp",
        tag: "Più Popolare",
        text: `<p><strong>ore 10.00 imbarco a Procida</strong></p>
<p>Sistemazione a bordo con aperitivo di benvenuto.</p>
<p>Partenza in barca per veleggiata intorno all’isola e visita alle cale più suggestive. Avrete, così, l’opportunità di ammirare da mare la bellissima spiaggia del Pozzo Vecchio, scenario del film “Il Postino” con Massimo Troisi.</p>
<p>Circumnavigheremo l’isolotto di Vivara, riserva naturale e sito archeologico in seguito al ritrovamento di resti Micenei e pre-Micenei risalenti al XII sec. A.C. e ci fermeremo per una granita di limone procidano nell’affascinante porticciolo dei pescatori della Corricella.</p>
<p>Dopo aver veleggiato, quando l’appetito si farà sentire, caleremo l’ancora in una baia ridossata per un bagno rinfrescante ed una spaghettata ai pomodorini freschi.</p>`
      },
      {
        title: "Capri",
        image: "https://cdn.bluemoreyachting.com/media/13449/c/sm/korcula.webp",
        tag: "Romantico",
        text: `<p><strong>ore 10.00 imbarco a Procida</strong><br>Sistemazione a bordo con aperitivo di benvenuto.</p>
<p>Partenza in barca per veleggiata verso l’isola di Capri e visita alle cale più suggestive. Ammireremo le impervie rocce dell’isola a picco sulle acque cristalline, il fascino e la maestosità dei Faraglioni e l’atmosfera romantica della grotta più famosa del mondo, la Grotta Azzurra.</p>
<p>Ancoreremo la nostra barca all’ombra dei Faraglioni per una spaghettata ai pomodorini freschi ed un bagno rinfrescante. Sfruttando il fresco maestrale pomeridiano il ritorno a Procida sarà tutto di bolina.</p>`
      },
      {
        title: "Ischia",
        image: "https://cdn.bluemoreyachting.com/media/13462/c/sm/mljet.webp",
        tag: "Terme",
        text: `<p><strong>ore 10.00 imbarco a Procida</strong></p>
<p>Sistemazione a bordo con aperitivo di benvenuto.</p>
<p>Partenza in barca per veleggiata intorno all’isola di Ischia e visita alle cale più suggestive. La maestosità dell’antico Castello di S. Angelo, le bellissime punte di San Pancrazio e di Forio faranno da scenario al nostro navigare. Grazie alle acque termali che caratterizzano l’isola di Ischia, si potrà fare il bagno nella baia di Sorgeto, anche nei mesi meno caldi.</p>
<p>Dopo aver veleggiato, quando l’appetito si farà sentire, caleremo l’ancora in una baia ridossata per un bagno rinfrescante ed una spaghettata ai pomodorini freschi.</p>`
      }
    ]
  },
  {
    id: "2-giorni",
    title: "2 Giorni",
    image: "https://www.bluedreamcharter.com/wp-content/uploads/2020/05/itinerari-1.jpg",
    description: "Scegli il tuo weekend perfetto. Un weekend per staccare la spina e farsi cullare dalle onde verso mete suggestive.",
    itineraries: [
      {
        title: "Procida - Ischia",
        image: "https://cdn.bluemoreyachting.com/media/13469/c/sm/split.webp",
        tag: "Relax",
        text: `<p><strong>Venerdì: ore 17.00 imbarco a Procida</strong><br>
Ore 17.00: imbarco a Procida, sistemazione dei bagagli a bordo. Possibilità di passeggiata per l’isola con minibus nei siti di interesse storico/culturale/paesaggistico. Pernotto a Procida.</p>
<p><strong>Sabato:</strong><br>
Ore 10.00: Partenza in barca per veleggiata intorno all’isola e visita alle cale più suggestive. Durante la veleggiata, caleremo l’ancora in una baia ridossata per un bagno rinfrescante e una spaghettata ai pomodorini freschi.<br>
Ore 16.00: partenza per S.Angelo, Ischia. Cena in rada in baia ridossata con possibilità di sbarco per passeggiata sull’isola.<br>
Sabato sera pernotto ad Ischia.</p>
<p><strong>Domenica:</strong><br>
Ore 10.00: partenza in barca per giro dell’isola di Ischia, sosta per bagno nelle termali acque di Sorgeto, possibilità di visita ai giardini Poseidon.<br>
Pomeriggio rientro a Procida.</p>`
      },
      {
        title: "Procida - Capri",
        image: "https://cdn.bluemoreyachting.com/media/13432/c/sm/dubrovnik.webp",
        tag: "Più Popolare",
        text: `<p><strong>Venerdì: ore 17.00 imbarco a Procida</strong><br>
Sistemazione dei bagagli a bordo. Possibilità di passeggiata per l’isola con minibus nei siti di interesse storico/culturale/paesaggistico.<br>
Pernotto a Procida.</p>
<p><strong>Sabato:</strong><br>
Ore 10.00: Partenza in barca per veleggiata intorno all’isola e visita alle cale più suggestive. Durante la veleggiata, butteremo l’ancora in una baia ridossata per un bagno rinfrescante e una spaghettata ai pomodorini freschi.<br>
Ore 16.00: Lasciamo l’isola di Procida e salpiamo per Capri, dove ci aspetta un’indimenticabile cenetta in rada, in una baia all’ombra dei Faraglioni. Ci sara’ la possibilità di sbarco per una passeggiata sull’isola.<br>
Sabato sera pernotto a Capri.</p>
<p><strong>Domenica:</strong><br>
Ore 10.00: partenza in barca per giro dell’isola di Capri. Sosta per bagno nelle cristalline acque capresi, con possibilità di visitare la Grotta Azzurra. Rientro a Procida tutto di bolina sfruttando il fresco maestrale pomeridiano.</p>`
      },
      {
        title: "Procida - Ischia - Ventotene",
        image: "https://cdn.bluemoreyachting.com/media/13448/c/sm/hvar.webp",
        tag: "Natura",
        text: `<p><strong>Venerdì: ore 17.00 imbarco a Procida</strong><br>
Sistemazione dei bagagli a bordo. La brezza della sera e un indimenticabile tramonto ci accompagneranno durante la veleggiata, con destinazione S.Angelo d’Ischia. Cena in rada con possibilità di sbarco per passeggiata sull’isola.</p>
<p><strong>Sabato:</strong><br>
Ore 10.00: prima colazione a bordo e partenza per Ventotene. Al nostro arrivo ci aspetterà una sosta per un bagno rilassante, seguita da un soft lunch in una baia riparata. Nel pomeriggio possibilità di visitare le Cisterne Romane, il Penitenziario o la Villa Giulia. Serata con cena in ristorante tipico sul porto romano.</p>
<p><strong>Domenica:</strong><br>
Ore 10.00: colazione con le tipiche focacce Ventotenesi, bagno all’ombra dell’isola di S.Stefano e partenza per Ischia. Sosta per bagno nelle termali acque di Sorgeto e soft lunch. Pomeriggio rientro a Procida.</p>`
      },
      {
        title: "Procida - Capri - Positano",
        image: "https://cdn.bluemoreyachting.com/media/13449/c/sm/korcula.webp",
        tag: "Lifestyle",
        text: `<p><strong>Venerdì: ore 17.00 imbarco a Procida</strong><br>
Ore 17.00: imbarco a Procida, sistemazione dei bagagli a bordo.<br>
La brezza della sera e un indimenticabile tramonto ci accompagneranno durante la veleggiata, con destinazione Capri.<br>
Cena in rada con possibilità di sbarco per passeggiata sull’isola.</p>
<p><strong>Sabato:</strong><br>
Ore 10.00: prima colazione a bordo e partenza per Positano. Al nostro arrivo ci aspetterà una sosta per un bagno rilassante, seguita da un soft lunch ormeggiati all’ombra dell’isola dei Galli.<br>
Nel pomeriggio arrivo e approdo nella rada di Positano. Serata con cena in rada e possibilità di passeggiata per le romantiche stradine di Positano.</p>
<p><strong>Domenica:</strong><br>
Ore 10.00: Colazione con la delicata pasticceria di Positano, sosta per bagno e soft lunch nelle limpide acque di Nerano, visita all’incantevole baia di Ieranto. Rientro a Procida tutto di bolina sfruttando il fresco maestrale pomeridiano.</p>`
      }
    ]
  },
  {
    id: "1-settimana",
    title: "1 Settimana",
    image: "https://www.bluedreamcharter.com/wp-content/uploads/2019/06/Blu-Sun-Odyssey-440-e1561562607759.jpg",
    description: "Una settimana alla scoperta delle meraviglie del nostro mare in totale relax e comfort. Scegli la destinazione adatta a te.",
    itineraries: [
      {
        title: "Procida – Ischia – Ventotene – Ponza – Palmarola",
        image: "https://cdn.bluemoreyachting.com/media/13462/c/sm/mljet.webp",
        tag: "Isole Pontine",
        text: `<p><strong>Sabato –</strong> Imbarco a Procida ore 17.00 e sistemazione bagagli a bordo. Possibilità di passeggiata per l’isola con minibus nei siti di interesse storico/culturale. Pernotto a Procida.</p>
<p><strong>Domenica –</strong> Prima colazione a bordo. Partenza in barca per giro dell’isola di Procida e visita alle cale più suggestive. Sosta in baia ridossata per bagno e soft lunch. Pomeriggio partenza per S.Angelo ad Ischia, cena in rada, possibilità di sbarco.</p>
<p><strong>Lunedì –</strong> Prima colazione a bordo e partenza per Ventotene. Al nostro arrivo sosta per bagno, seguita da un soft lunch in una baia riparata. Pomeriggio possibilità di visitare l'isola. Cena in ristorante tipico sul porto romano.</p>
<p><strong>Martedì – </strong>Prima colazione, bagno all’ombra dell’isola di S.Stefano e partenza per Ponza. Cena in rada con possibilità di sbarco.</p>
<p><strong>Mercoledì – </strong>Prima colazione in barca e passeggiata per Ponza con visita al Porto Borbonico. Nel pomeriggio partenza per Palmarola. Rada nella Baia del Francese con cena al ristorante sulla spiaggia.</p>
<p><strong>Giovedì – </strong>Prima colazione in barca e giro di Palmarola con bagno all’ombra dei Faraglioni. Partenza per Ventotene. Cena in rada con possibilità di sbarco.</p>
<p><strong>Venerdì –</strong> Prima colazione e partenza per Ischia. Sosta per soft lunch e bagno nelle acque di Sorgeto. Pomeriggio partenza per Procida. Cena al ristorante “La Conchiglia”.</p>
<p><strong>Sabato –</strong> Prima colazione in barca e rientro.</p>`
      },
      {
        title: "Procida – Ischia – Capri – Positano – Amalfi – Isola dei Galli",
        image: "https://cdn.bluemoreyachting.com/media/13469/c/sm/split.webp",
        tag: "Costiera",
        text: `<p><strong>Sabato –</strong> Imbarco a Procida ore 17.00. Possibilità di passeggiata per l’isola con minibus nei siti di interesse storico. Pernotto a Procida;</p>
<p><strong>Domenica –</strong> Partenza in barca per giro di Procida e visita alle cale più suggestive. Sosta in baia ridossata per bagno e soft lunch. Salpiamo per Capri. Cena in rada all'ombra dei Faraglioni. Pernotto a Capri.</p>
<p><strong>Lunedì – </strong>Bagno nella Baia di Galli. Soft lunch e partenza per Positano. Arrivo e approdo nella rada di Positano. Sera cena in rada e possibilità di passeggiata per Positano.</p>
<p><strong>Martedì –</strong> Colazione, visita di Positano. Soft lunch e navigazione per Amalfi. Cena in rada con possibilità di sbarco.</p>
<p><strong>Mercoledì –</strong> Passeggiata per Amalfi. Soft lunch e partenza per Nerano. Sosta per bagno nelle limpide acque di Nerano e cena in rada.</p>
<p><strong>Giovedì –</strong> Navigazione verso Capri con bagno all’ombra dei Faraglioni. Possibilità di visitare la Grotta Azzurra. Giro dell’isola, cena in rada.</p>
<p><strong>Venerdì –</strong> Visita dell’isola di Capri, Villa Jovis e Villa S. Michele. Soft lunch partenza per Procida ormeggiati davanti al caratteristico porticciolo della Corricella. Cena in ristorante tipico.</p>
<p><strong>Sabato –</strong> Prima colazione in barca e rientro.</p>`
      },
      {
        title: "Procida – Stromboli – Panarea – Vulcano – Lipari – Salina",
        image: "https://cdn.bluemoreyachting.com/media/13432/c/sm/dubrovnik.webp",
        tag: "Isole Eolie",
        text: `<p><strong>Sabato –</strong> Imbarco a Procida ore 17.00 e sistemazione bagagli a bordo. Veleggiata notturna con destinazione Stromboli.</p>
<p><strong>Domenica –</strong> Arrivo a Stromboli verso le 13.00. Pomeriggio giro dell’isola in barca alla scoperta del vulcano, visita a Ginostra. Domenica sera pernotto in rada a Stromboli.</p>
<p><strong>Lunedì –</strong> Partenza per Panarea. Bagno e soft lunch nella baia di Calajunco. Nel pomeriggio possibilità di visitare l’isola. Sera cena a bordo o in ristorante sull’isola.</p>
<p><strong>Martedì –</strong> Bagno all’ombra dell’isolotto di Basiluzzo e partenza per Vulcano. Nel pomeriggio passeggiata sull’isola e visita alla Baia di Levante (sorgenti termali). Cena e pernotto in rada.</p>
<p><strong>Mercoledì –</strong> Partenza per visita alla Grotta del Cavallo. Sosta per bagno e soft lunch. Nel pomeriggio partenza per Lipari. Rada nella Baia del Canneto.</p>
<p><strong>Giovedì –</strong> Passeggiata sull’isola di Lipari con visita al Castello. Bagno e soft lunch all’ombra dei Faraglioni. Pomeriggio partenza per Salina e sosta a Pollara.</p>
<p><strong>Venerdì –</strong> Partenza per giro dell’isola. Sosta per soft lunch a Punta Perciatu. Dopo pranzo partenza per Procida.</p>
<p><strong>Sabato –</strong> Arrivo e sbarco a Procida verso le 09.00.</p>
<p class="mt-4 italic text-[#1585da]">L’imbarco e lo sbarco possono essere effettuati, su richiesta, direttamente su una delle isole Eolie.</p>`
      },
      {
        title: "Tra le isole Flegree e la Costiera Amalfitana",
        image: "https://cdn.bluemoreyachting.com/media/13448/c/sm/hvar.webp",
        tag: "Completo",
        text: `<p><strong>1° giorno –</strong> Arrivo a Procida, cocktail di benvenuto a bordo dell’imbarcazione con il vostro skipper. Serata tra i vicoli procidani.</p>
<p><strong>2° giorno –</strong> Colazione procidana e partenza per Ischia. Per gli amanti del relax giornata alle terme.</p>
<p><strong>3° giorno –</strong> Si salpa per Sorrento con possibilità di visita agli “scavi di Pompei” o escursione al “Vesuvio”. In serata shopping tra le stradine di Sorrento.</p>
<p><strong>4° giorno –</strong> in mattinata partenza per Positano, dove sarà possibile fare un’interessante escursione “Al sentiero degli dei”. Serata di relax nel Colorato Borgo.</p>
<p><strong>5° giorno –</strong> E’ la volta di Amalfi con arrivo in mattinata, passeggiata al centro storico ed un rilassante bagno nella verde acqua.</p>
<p><strong>6° giorno –</strong> Arrivo a Capri, dove sarà possibile fare un meraviglioso giro dell’isola, visitare “La Grotta Azzurra” e ammirare i “Faraglioni”. Non mancherà lo shopping caprese e un giro nella famosa discoteca “Anima e Core”.</p>
<p><strong>7° giorno –</strong> Rientro a Procida con una piacevolissima cena di arrivederci.</p>`
      }
    ]
  },
  {
    id: "2-settimane",
    title: "2 Settimane",
    image: "https://cdn.bluemoreyachting.com/media/13445/c/sm/hirvatistan.webp",
    description: "Per la vacanza di due settimane, l’idea “percorso vacanza” potrà essere sviluppata secondo le esigenze ed i gusti dei partecipanti.",
    itineraries: [
      {
        title: "Idee di Itinerario",
        image: "https://cdn.bluemoreyachting.com/media/13449/c/sm/korcula.webp",
        tag: "Su Misura",
        text: `<ul class="list-disc pl-5 space-y-4">
<li><strong>Procida – Stromboli – Panarea – Salina – Vulcano – Lipari – Alicudi – Filicudi</strong></li>
<li><strong>Isola d’Elba o Argentario</strong></li>
<li><strong>Procida – Ustica – Levanzo – Favignana – Marettimo – Stromboli – Panarea – Salina – Vulcano – Lipari – Alicudi – Filicudi</strong></li>
<li><strong>Corsica o Sardegna</strong></li>
</ul>`
      }
    ]
  }
];

export default function ItinerariPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full h-screen bg-[#070c26]">
      {/* Breadcrumb Absolute overlay */}
      <div className="absolute top-24 lg:top-28 left-0 w-full z-30">
        <div className="container mx-auto px-5">
          <nav className="w-full max-lg:hidden" aria-label="Breadcrumb">
            <ul className="flex items-center max-md:overflow-x-auto scrollbar-hide">
              <li>
                <div className="flex items-center">
                  <Link href="/" className="text-[13px] transition-all duration-300 text-white/50 hover:text-white underline underline-offset-2">Home</Link>
                  <span className="mx-2 text-white/50"> / </span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-[13px] transition-all duration-300 text-white">Itinerari</span>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="absolute flex items-center justify-center w-full top-32 lg:top-40 left-0 z-30">
        <div className="container px-5">
          <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-3 md:gap-6 lg:gap-12 overflow-x-auto scrollbar-hide pb-2 snap-x">
            {durations.map((d, idx) => (
              <button 
                key={d.id}
                type="button" 
                onClick={() => {
                  setActiveIndex(idx);
                  if (swiperRef.current) swiperRef.current.slideTo(idx);
                }}
                className={`flex whitespace-nowrap shrink-0 snap-start text-white text-sm md:text-base font-bold transition-all duration-300 px-4 py-2 rounded-full border border-transparent ${activeIndex === idx ? 'opacity-100 bg-[#1585da] shadow-lg' : 'opacity-70 bg-white/5 hover:bg-white/10 hover:opacity-100 border-white/10'}`}
              >
                {d.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => swiperRef.current = swiper}
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        allowTouchMove={false}
        observer={true}
        observeParents={true}
        className="w-full h-screen"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {durations.map((duration, idx) => (
          <SwiperSlide key={duration.id} className="relative w-full h-screen overflow-y-auto scrollbar-hide">
            {/* Background Image Container */}
            <div className="fixed inset-0 z-0">
              <img 
                src={duration.image} 
                alt={duration.title} 
                className="w-full h-full object-cover transition-transform duration-[10s] ease-linear scale-100 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070c26]/95 via-[#070c26]/80 to-[#070c26]/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#070c26] to-transparent"></div>
            </div>

            {/* Inner Content that can scroll vertically within the slide if needed */}
            <div className="relative z-10 container mx-auto px-5 min-h-screen flex flex-col justify-center pt-48 lg:pt-56 pb-12">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-20 mt-auto">
                
                {/* Left Column: Main Info */}
                <div className="w-full lg:w-4/12 flex flex-col gap-4 shrink-0" data-aos="fade-up">
                  <div className="flex flex-col mb-4">
                    <h3 className="text-4xl lg:text-6xl text-white font-extrabold tracking-tight mb-2 drop-shadow-lg">
                      {duration.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="size-5 lg:size-6 opacity-80">
                        <path d="M12 2L2 22L12 18L22 22L12 2Z" stroke="#1585da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-white text-sm font-medium drop-shadow-md">Include <b className="text-[#1585da]">{duration.itineraries.length} Itinerari</b></p>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-white/90 lg:mb-8 mb-6 leading-relaxed drop-shadow-md">
                    {duration.description}
                  </p>
                </div>

                {/* Right Column: Inner Slider with Full Details */}
                <div className="w-full lg:w-8/12 flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg lg:text-xl font-bold text-white drop-shadow-md">Destinazioni e Dettagli <span className="text-[#1585da]">{duration.title}</span></h4>
                    <div className="flex gap-4">
                      <button className={`prev-btn-${idx} size-10 lg:size-12 bg-white/10 hover:bg-white hover:text-[#070c26] text-white border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-lg`}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="rotate-180">
                          <path d="M2.8125 8.4375H14.0273L9.73828 4.3418C9.62109 4.23633 9.5625 4.10742 9.5625 3.95508C9.5625 3.80273 9.61523 3.66797 9.7207 3.55078C9.82617 3.43359 9.95508 3.375 10.1074 3.375C10.2598 3.375 10.3945 3.42773 10.5117 3.5332L15.416 8.20898C15.5215 8.31445 15.6035 8.43457 15.6621 8.56934C15.7207 8.7041 15.75 8.84766 15.75 9C15.75 9.15234 15.7207 9.2959 15.6621 9.43066C15.6035 9.56543 15.5215 9.69141 15.416 9.80859L10.5117 14.4668C10.4531 14.5254 10.3916 14.5664 10.3271 14.5898C10.2627 14.6133 10.1953 14.625 10.125 14.625C10.0547 14.625 9.98438 14.6104 9.91406 14.5811C9.84375 14.5518 9.7793 14.5078 9.7207 14.4492C9.61523 14.332 9.5625 14.1973 9.5625 14.0449C9.5625 13.8926 9.62109 13.7637 9.73828 13.6582L14.0449 9.5625H2.8125C2.66016 9.5625 2.52832 9.50684 2.41699 9.39551C2.30566 9.28418 2.25 9.15234 2.25 9C2.25 8.84766 2.30566 8.71582 2.41699 8.60449C2.52832 8.49316 2.66016 8.4375 2.8125 8.4375Z" fill="currentColor"></path>
                        </svg>
                      </button>
                      <button className={`next-btn-${idx} size-10 lg:size-12 bg-white/10 hover:bg-white hover:text-[#070c26] text-white border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-lg`}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M2.8125 8.4375H14.0273L9.73828 4.3418C9.62109 4.23633 9.5625 4.10742 9.5625 3.95508C9.5625 3.80273 9.61523 3.66797 9.7207 3.55078C9.82617 3.43359 9.95508 3.375 10.1074 3.375C10.2598 3.375 10.3945 3.42773 10.5117 3.5332L15.416 8.20898C15.5215 8.31445 15.6035 8.43457 15.6621 8.56934C15.7207 8.7041 15.75 8.84766 15.75 9C15.75 9.15234 15.7207 9.2959 15.6621 9.43066C15.6035 9.56543 15.5215 9.69141 15.416 9.80859L10.5117 14.4668C10.4531 14.5254 10.3916 14.5664 10.3271 14.5898C10.2627 14.6133 10.1953 14.625 10.125 14.625C10.0547 14.625 9.98438 14.6104 9.91406 14.5811C9.84375 14.5518 9.7793 14.5078 9.7207 14.4492C9.61523 14.332 9.5625 14.1973 9.5625 14.0449C9.5625 13.8926 9.62109 13.7637 9.73828 13.6582L14.0449 9.5625H2.8125C2.66016 9.5625 2.52832 9.50684 2.41699 9.39551C2.30566 9.28418 2.25 9.15234 2.25 9C2.25 8.84766 2.30566 8.71582 2.41699 8.60449C2.52832 8.49316 2.66016 8.4375 2.8125 8.4375Z" fill="currentColor"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <Swiper
                    modules={[Navigation]}
                    navigation={{
                      nextEl: `.next-btn-${idx}`,
                      prevEl: `.prev-btn-${idx}`,
                    }}
                    slidesPerView={1.1}
                    spaceBetween={16}
                    observer={true}
                    observeParents={true}
                    nested={true}
                    breakpoints={{
                      640: { slidesPerView: 1.5, spaceBetween: 20 },
                      1024: { slidesPerView: 1.8, spaceBetween: 24 },
                    }}
                    className="w-full"
                  >
                    {duration.itineraries.map((itinerary, i) => (
                      <SwiperSlide key={i} className="h-auto pb-8">
                        <div className="flex flex-col h-full bg-[#070c26]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group shadow-2xl">
                          
                          {/* Card Image Header */}
                          <div className="relative h-[220px] shrink-0 overflow-hidden">
                            <img 
                              src={itinerary.image} 
                              alt={itinerary.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070c26] via-[#070c26]/50 to-transparent"></div>
                            
                            {itinerary.tag && (
                              <div className="absolute top-4 right-4">
                                <span className="bg-[#1585da] px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-md">
                                  {itinerary.tag}
                                </span>
                              </div>
                            )}
                            
                            <h4 className="absolute bottom-4 left-6 text-white text-xl lg:text-2xl font-bold group-hover:text-[#1585da] transition-colors">
                              {itinerary.title}
                            </h4>
                          </div>

                          {/* Card Content - Scrollable if long */}
                          <div className="p-6 h-[260px] overflow-y-auto scrollbar-hide text-white/80 prose prose-invert prose-sm md:prose-base max-w-none prose-p:leading-relaxed prose-strong:text-white prose-ul:list-disc prose-ul:pl-5">
                            <div dangerouslySetInnerHTML={{ __html: itinerary.text }} />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
