export const SEASONS = {
  A: { label: "A", range: "01 Gen - 09 Mag / 27 Set - 31 Dic" },
  B: { label: "B", range: "10 Mag - 20 Giu / 06 Set - 26 Set" },
  C: { label: "C", range: "21 Giu - 01 Ago / 23 Ago - 05 Set" },
  D: { label: "D", range: "02 Ago - 22 Ago" }
};

export const fleet = [
  {
    id: "oceanis-46-fiore-di-mare",
    name: "Fior di Mare",
    model: "Oceanis 46",
    manufacturer: "Beneteau",
    type: "monoscafo",
    year: 2020,
    length: 14.60,
    width: 4.50,
    cabins: 4,
    passengers: 10, // 8+2
    heads: 4,
    skipperRequired: false,
    images: [
      "/uploads/2022/03/fiore-di-mare.jpg",
      "/uploads/2022/03/fiore-di-mare-2.jpg"
    ],
    pricing: {
      A: 3740,
      B: 4290,
      C: 4950,
      D: 6200
    },
    description: {
      it: "L'Oceanis 46 è il connubio perfetto tra comfort di lusso, spazio ed eccellenti prestazioni a vela. Con i suoi 4 bagni e 4 cabine doppie, offre a famiglie ed equipaggi numerosi un'esperienza di charter indimenticabile e in totale privacy.",
      en: "The Oceanis 46 is the perfect combination of luxury comfort, space and excellent sailing performance. With its 4 heads and 4 double cabins, it offers families and large crews an unforgettable charter experience in total privacy."
    },
    features: ["Elica di prua", "Randa avvolgibile", "Autopilota", "GPS Plotter esterno", "Bimini", "Sprayhood"]
  },
  {
    id: "oceanis-45-aleph",
    name: "Aleph",
    model: "Oceanis 45",
    manufacturer: "Beneteau",
    type: "monoscafo",
    year: 2015,
    length: 14.00,
    width: 4.50,
    cabins: 4,
    passengers: 10, // 8+2
    heads: 2,
    skipperRequired: false,
    images: [
      "/uploads/2022/03/aleph-1.jpg"
    ],
    pricing: {
      A: 3200,
      B: 3700,
      C: 4400,
      D: 5650
    },
    description: {
      it: "Aleph è un eccezionale Oceanis 45 dal carattere marino pronunciato. Ideale per chi cerca spazi generosi nel quadrato e nel pozzetto uniti ad una carena veloce ed estremamente sicura in tutte le andature.",
      en: "Aleph is an exceptional Oceanis 45 with a pronounced marine character. Ideal for those looking for generous space in the salon and cockpit, combined with a fast and extremely safe hull in all conditions."
    },
    features: ["Randa steccata", "Lazy Bag", "Autopilota", "GPS Plotter in pozzetto", "Bimini", "Elica di prua"]
  },
  {
    id: "oceanis-38-lina",
    name: "Lina",
    model: "Oceanis 38.1",
    manufacturer: "Beneteau",
    type: "monoscafo",
    year: 2022,
    length: 12.00,
    width: 3.99,
    cabins: 3,
    passengers: 8, // 6+2
    heads: 2,
    skipperRequired: false,
    images: [
      "/uploads/2022/03/folie-1.jpg"
    ],
    pricing: {
      A: 2300,
      B: 3200,
      C: 3700,
      D: 4400
    },
    description: {
      it: "Lina rappresenta l'evoluzione del noleggio a vela a misura d'uomo. Un modello recente (2022) che fa del volume e della facilità di manovra (grazie alla doppia pala del timone) i suoi punti di forza assoluti.",
      en: "Lina represents the evolution of human-sized sailing charter. A recent model (2022) that makes volume and ease of maneuvering (thanks to the twin rudders) its absolute strengths."
    },
    features: ["Randa avvolgibile", "Autopilota", "Piattaforma bagno abbattibile", "GPS Plotter", "Bimini"]
  },
  {
    id: "oceanis-38-folie",
    name: "Folie",
    model: "Oceanis 38.1",
    manufacturer: "Beneteau",
    type: "monoscafo",
    year: 2016,
    length: 12.00,
    width: 3.99,
    cabins: 3,
    passengers: 8, // 6+2
    heads: 2,
    skipperRequired: false,
    images: [
      "/uploads/2022/03/folie-2.jpg",
      "/uploads/2022/03/folie-3.jpg"
    ],
    pricing: {
      A: 2200,
      B: 2640,
      C: 3190,
      D: 4000
    },
    description: {
      it: "Folie è una splendida imbarcazione da crociera che unisce eleganza, agilità e abitabilità. Dotata di 3 cabine comode, rappresenta la scelta ottimale per piccole famiglie o piccoli gruppi di amici per esplorare il Golfo di Napoli.",
      en: "Folie is a splendid cruising yacht combining elegance, agility and space. Equipped with 3 comfortable cabins, it represents the optimal choice for small families or small groups of friends to explore the Gulf of Naples."
    },
    features: ["Lazy Bag", "Randa steccata", "Autopilota", "Bimini", "Doccia esterna cald/fredda"]
  },
  {
    id: "lucia-40-margarita",
    name: "Margarita",
    model: "Lucia 40",
    manufacturer: "Fountaine Pajot",
    type: "catamarano",
    year: 2019,
    length: 11.73,
    width: 6.63,
    cabins: 4,
    passengers: 10, // 8+2
    heads: 4,
    skipperRequired: false,
    images: [
      "/uploads/2022/03/margarita-3.jpg",
      "/uploads/2022/03/margarita-8.jpg"
    ],
    pricing: {
      A: 4500,
      B: 6300,
      C: 7000,
      D: 9100
    },
    description: {
      it: "Il catamarano Lucia 40 'Margarita' offre stabilità impeccabile, spazi aperti inondati di luce e il comfort di 4 cabine doppie indipendenti con 4 bagni privati. Perfetto per navigare in totale relax, sicurezza ed estremo spazio.",
      en: "The Lucia 40 catamaran 'Margarita' offers impeccable stability, light-filled open spaces and the comfort of 4 independent double cabins with 4 private heads. Perfect for sailing in total relaxation, safety and extreme space."
    },
    features: ["Dissalatore", "Pannelli Solari", "Inverter", "GPS Plotter esterno", "Gommone con motore fuoribordo", "Frigorifero in pozzetto"]
  },
  {
    id: "isla-40-martinic",
    name: "Martinic",
    model: "Isla 40",
    manufacturer: "Fountaine Pajot",
    type: "catamarano",
    year: 2025,
    length: 11.73,
    width: 6.63,
    cabins: 4,
    passengers: 10, // 8+2
    heads: 4,
    skipperRequired: false,
    images: [
      "/uploads/2022/03/margarita-3.jpg" // Utilizziamo Margarita come riferimento
    ],
    pricing: {
      A: 4700,
      B: 6600,
      C: 7400,
      D: 9400
    },
    description: {
      it: "In arrivo per la stagione 2025, il nuovissimo Isla 40 'Martinic' è il modello di punta del cantiere francese. Layout moderno, finiture raffinate e un salone aperto sul pozzetto che ridefinisce gli standard di vita a bordo.",
      en: "Coming for the 2025 season, the brand new Isla 40 'Martinic' is the flagship model from the French shipyard. Modern layout, refined finishes and an open salon connected to the cockpit redefining liveability standard onboard."
    },
    features: ["Generatore", "Dissalatore", "Aria Condizionata", "Inverter", "Pannelli Solari", "Fuoribordo maggiorato"]
  },
  {
    id: "elba-45-habipti-ii",
    name: "Habipti II",
    model: "Elba 45",
    manufacturer: "Fountaine Pajot",
    type: "catamarano",
    year: 2024,
    length: 13.47,
    width: 7.55,
    cabins: 5, // 4+1
    passengers: 11, // 8+2+1
    heads: 5, // 4+1
    skipperRequired: true,
    images: [
      "/uploads/2022/03/elba-45.jpg",
      "/uploads/2022/03/peter-pan.jpg"
    ],
    pricing: {
      A: 7000,
      B: 9000,
      C: 10200,
      D: 13000
    },
    description: {
      it: "L'Elba 45 'Habipti II' rappresenta la massima espressione del lusso in catamarano. Una barca spettacolare dotata di spazi incredibili e una lounge sul flybridge. Noleggiabile esclusivamente con skipper professionista a bordo.",
      en: "The Elba 45 'Habipti II' represents the ultimate expression of luxury catamaran charter. A spectacular boat featuring incredible spaces and a flybridge lounge. Exclusively available with professional skipper onboard."
    },
    features: ["Skipper obbligatorio", "Generatore", "Aria Condizionata", "Dissalatore 12V/220V", "Flybridge Lounge", "Macchina del caffè", "Frigo e Freezer giganti"]
  },
  {
    id: "trawler-47-alexia",
    name: "Alexia",
    model: "Trawler Swift 47",
    manufacturer: "Fountaine Pajot",
    type: "yacht",
    year: 2021,
    length: 13.43,
    width: 4.45,
    cabins: 3,
    passengers: 8, // 6+2
    heads: 2,
    skipperRequired: true,
    images: [
      "/uploads/2022/03/alexia-1.jpg"
    ],
    pricing: {
      A: 9000,
      B: 11000,
      C: 12300,
      D: 14000
    },
    description: {
      it: "Alexia è un superbo motor yacht Trawler 47. Progettato per crociere confortevoli a lungo raggio, offre un immenso flybridge, una piattaforma bagno idraulica e consumi straordinariamente ottimizzati. Skipper obbligatorio.",
      en: "Alexia is a superb motor yacht Trawler 47. Designed for long-range comfortable cruising, it offers an immense flybridge, a hydraulic swimming platform and highly optimized fuel consumption. Skipper mandatory."
    },
    features: ["Skipper obbligatorio", "Plancia bagno idraulica", "Elica di prua e poppa", "Generatore super silenziato", "Aria Condizionata", "Flybridge completo"]
  },
  {
    id: "ketch-65-miaplacidus",
    name: "Miaplacidus",
    model: "Ketch 65",
    manufacturer: "Custom",
    type: "luxury",
    year: 2023, // refit 2023
    length: 20.40,
    width: 5.30,
    cabins: 4, // 3+1
    passengers: 8,
    heads: 4, // 3+1
    skipperRequired: true,
    images: [
      "/uploads/2022/03/Guapa.jpg"
    ],
    pricing: {
      A: 8500,
      B: 9990,
      C: 12000,
      D: 13490
    },
    description: {
      it: "Miaplacidus è un ketch oceanico di oltre 20 metri, completamente ristrutturato nel 2023 per crociere esclusive e charter di lusso. La stabilità, lo stile classico e i comfort moderni la rendono un'autentica nave da sogno.",
      en: "Miaplacidus is an oceanic ketch of over 20 meters, fully refitted in 2023 for exclusive cruises and luxury charters. Stability, classical style and modern comforts make it an authentic dream ship."
    },
    features: ["Skipper obbligatorio", "Aria Condizionata in ogni cabina", "Generatore", "Dissalatore 180 l/h", "Pannelli Solari", "Attrezzatura per pesca e sub"]
  }
];

export const getTranslation = (lang, item, field) => {
  if (item[field] && typeof item[field] === 'object') {
    return item[field][lang] || item[field]['it'] || '';
  }
  return item[field] || '';
};
