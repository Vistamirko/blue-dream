export const experiencesData = [
  {
    id: 'marine-biology',
    slug: 'marine-biology',
    title: {
      it: 'Vacanza in Barca: Alla Scoperta della Biologia Marina',
      en: 'Sailing Holiday: Discovering Marine Biology'
    },
    subtitle: {
      it: 'Una vacanza esclusiva tra relax, bagni nel blu e la meraviglia della natura',
      en: 'An exclusive holiday combining relaxation, dives into the blue and the wonder of nature'
    },
    description: {
      it: 'Sali a bordo per una vacanza indimenticabile. Un\'esperienza che unisce il comfort e il relax della navigazione a vela con l\'emozione di scoprire i segreti del mare in modo leggero e divertente. Potrai tuffarti nelle acque più cristalline, ascoltare il "respiro" dei delfini con l\'idrofono e farti guidare alla scoperta dei fondali in totale spensieratezza.',
      en: 'Come aboard for an unforgettable holiday. An experience that combines the comfort and relaxation of sailing with the thrill of discovering the secrets of the sea in a light and fun way. You can dive into the most crystal-clear waters, listen to the "breath" of dolphins with the hydrophone and be guided to discover the seabed in total carefree bliss.'
    },
    images: [
      '/images/campus-biologia-marina.jpg',
      'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1682687982501-1e5898cb8f18?q=80&w=2070&auto=format&fit=crop'
    ],
    details: {
      boarding: { it: 'Marina di Procida', en: 'Marina di Procida' },
      level: { it: 'Per Tutti', en: 'For Everyone' },
      duration: { it: 'Variabile', en: 'Variable' },
      price: { it: '€ 2.100 / sett', en: '€ 2,100 / wk' }
    },
    itineraries: {
      '1_day': [
        {
          day: '1',
          title: { it: 'Tuffi e Scoperta nel Golfo', en: 'Dives and Discovery in the Gulf' },
          description: {
            it: 'Uscita giornaliera all\'insegna del relax. Getteremo l\'ancora nelle baie più belle, faremo snorkeling esplorativo tra i pesci colorati e ascolteremo il mare con l\'idrofono gustandoci un aperitivo al tramonto.',
            en: 'Daily trip dedicated to relaxation. We will drop anchor in the most beautiful bays, go on exploratory snorkeling among colorful fish, and listen to the sea with the hydrophone while enjoying an aperitif at sunset.'
          }
        }
      ],
      '2_days': [
        {
          day: '1',
          title: { it: 'Veleggiata verso Ventotene e Relax', en: 'Sailing to Ventotene and Relaxation' },
          description: {
            it: 'Mollati gli ormeggi da Procida, navigheremo a vela prendendo il sole in coperta. Arrivati a Ventotene, tuffo rinfrescante, esplorazione della baia e magica cena in barca sotto le stelle.',
            en: 'Leaving Procida behind, we will sail while sunbathing on deck. Arriving in Ventotene, a refreshing dive, exploration of the bay, and a magical dinner on the boat under the stars.'
          }
        },
        {
          day: '2',
          title: { it: 'Snorkeling e Rientro Dolce', en: 'Snorkeling and Gentle Return' },
          description: {
            it: 'Risveglio cullati dalle onde. Esploreremo i fondali con il drone subacqueo per pura curiosità e divertimento. Pomeriggio di bagni e veleggiata tranquilla verso casa.',
            en: 'Waking up lulled by the waves. We will explore the seabed with the underwater drone for pure curiosity and fun. Afternoon of swimming and peaceful sailing back home.'
          }
        }
      ],
      '1_week': [
        {
          day: '1-2',
          title: { it: 'Partenza per le Isole Pontine', en: 'Departure for the Pontine Islands' },
          description: {
            it: 'Inizia la vacanza! Navigazione morbida verso Ventotene, avvistando magari qualche delfino. Le prime giornate sono perfette per prendere confidenza col mare e godersi tramonti spettacolari.',
            en: 'The holiday begins! Smooth sailing towards Ventotene, perhaps spotting a few dolphins. The first few days are perfect for getting familiar with the sea and enjoying spectacular sunsets.'
          }
        },
        {
          day: '3-4',
          title: { it: 'Ponza: Baie Cristalline', en: 'Ponza: Crystal Clear Bays' },
          description: {
            it: 'Ci spostiamo a Ponza. Intere giornate dedicate al sole, ai bagni nelle cale più nascoste e allo snorkeling leggero per ammirare la vita marina in un mare da cartolina.',
            en: 'We move to Ponza. Entire days dedicated to the sun, swimming in the most hidden coves, and light snorkeling to admire the marine life in a postcard-perfect sea.'
          }
        },
        {
          day: '5-6',
          title: { it: 'L\'Incanto di Palmarola', en: 'The Enchantment of Palmarola' },
          description: {
            it: 'Raggiungiamo la selvaggia Palmarola. Notti in rada in totale pace, colazioni in pozzetto e passeggiate marine per osservare i pesci prima di un bell\'aperitivo.',
            en: 'We reach the wild Palmarola. Nights at anchor in total peace, breakfasts in the cockpit, and marine walks to observe the fish before a nice aperitif.'
          }
        },
        {
          day: '7',
          title: { it: 'Rientro tra i Ricordi', en: 'Return among Memories' },
          description: {
            it: 'Ultimi tuffi mattutini e veleggiata di rientro a Procida. Rilassati sul ponte, porteremo a casa il ricordo di una settimana perfetta tra mare e natura.',
            en: 'Last morning dives and sailing back to Procida. Relaxed on the deck, we will take home the memory of a perfect week between sea and nature.'
          }
        }
      ]
    },
    inclusions: [
      { it: 'Sistemazione in cabina doppia per il massimo comfort', en: 'Accommodation in a double cabin for maximum comfort' },
      { it: 'Guida esperta a bordo per farti scoprire i segreti del mare in leggerezza', en: 'Expert guide on board to let you discover the secrets of the sea lightly' },
      { it: 'Utilizzo del tender fuoribordo per scendere a terra', en: 'Use of the outboard tender to go ashore' },
      { it: 'Attrezzatura divertente (idrofono per ascoltare il mare, drone sottomarino)', en: 'Fun equipment (hydrophone to listen to the sea, underwater drone)' }
    ]
  },
  {
    id: 'bio-archaeology',
    slug: 'bio-archaeology',
    title: {
      it: 'Vacanza Bio-Archeologica',
      en: 'Bio-Archaeological Holiday'
    },
    subtitle: {
      it: 'Alla Scoperta di Relitti Fantastici con il ROV',
      en: 'Discovering Fantastic Shipwrecks with the ROV'
    },
    description: {
      it: 'Concediti una vacanza unica. Navigheremo tra baie esclusive e calette segrete, unendo il piacere del sole e del mare all\'emozione di fare snorkeling sopra antiche rovine sommerse e mosaici romani. Un viaggio indimenticabile dove il relax incontra la bellezza sbalorditiva della storia.',
      en: 'Treat yourself to a unique holiday. We will sail among exclusive bays and secret coves, combining the pleasure of the sun and the sea with the thrill of snorkeling over ancient submerged ruins and Roman mosaics. An unforgettable journey where relaxation meets the stunning beauty of history.'
    },
    images: [
      '/images/relitto-santa-lucia.webp',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop'
    ],
    details: {
      boarding: { it: 'Marina di Procida', en: 'Marina di Procida' },
      level: { it: 'Per Tutti', en: 'For Everyone' },
      duration: { it: 'Variabile', en: 'Variable' },
      price: { it: '€ 2.100 / sett', en: '€ 2,100 / wk' }
    },
    itineraries: {
      '1_day': [
        {
          day: '1',
          title: { it: 'Magia Sommersa a Baia', en: 'Submerged Magic in Baia' },
          description: {
            it: 'Una giornata di mare puro. Nuoteremo sopra l\'antica città di Baia, godendoci il sole in coperta e ammirando i mosaici che spuntano dal fondo marino.',
            en: 'A day of pure sea. We will swim over the ancient city of Baia, enjoying the sun on deck and admiring the mosaics that emerge from the seabed.'
          }
        }
      ],
      '2_days': [
        {
          day: '1',
          title: { it: 'Sole, Mare e Storia', en: 'Sun, Sea and History' },
          description: {
            it: 'Prima giornata all\'insegna dei bagni e dell\'osservazione affascinante delle statue sommerse. Serata in una baia tranquilla con cena a bordo e chiacchiere sotto le stelle.',
            en: 'First day dedicated to swimming and the fascinating observation of submerged statues. Evening in a quiet bay with dinner on board and chatting under the stars.'
          }
        },
        {
          day: '2',
          title: { it: 'Esplorazione Costiera', en: 'Coastal Exploration' },
          description: {
            it: 'Ci sposteremo lungo la costa per scoprire angoli nascosti. Snorkeling rilassato, tanto sole e rientro dolce nel pomeriggio, ricaricati dall\'energia del mare.',
            en: 'We will move along the coast to discover hidden corners. Relaxed snorkeling, lots of sun, and a gentle return in the afternoon, recharged by the energy of the sea.'
          }
        }
      ],
      '1_week': [
        {
          day: '1-3',
          title: { it: 'Il Parco di Baia e Relax', en: 'The Park of Baia and Relaxation' },
          description: {
            it: 'Primi giorni lenti: esploriamo il parco sommerso di Baia facendo snorkeling tranquillo, ci godiamo il ponte della barca per prendere il sole e iniziamo a staccare la spina.',
            en: 'First slow days: we explore the submerged park of Baia with peaceful snorkeling, enjoy the boat deck to sunbathe, and start to unwind.'
          }
        },
        {
          day: '4-6',
          title: { it: 'Ischia e il Relitto a Ventotene', en: 'Ischia and the Shipwreck in Ventotene' },
          description: {
            it: 'Veleggiata tra Ischia e Ventotene. Scopriremo baie esclusive e vivremo l\'emozione di esplorare in snorkeling il celebre relitto del piroscafo Santa Lucia, affondato nelle acque cristalline di Ventotene.',
            en: 'Sailing between Ischia and Ventotene. We will discover exclusive bays and experience the thrill of snorkeling over the famous Santa Lucia steamer shipwreck, sunk in the crystal-clear waters of Ventotene.'
          }
        },
        {
          day: '7',
          title: { it: 'Ultimi Bagni e Rientro', en: 'Last Swims and Return' },
          description: {
            it: 'Ultima mattina per i bagni di sole e un ultimo tuffo nel blu profondo, prima di veleggiare placidamente verso il porto di sbarco con ricordi meravigliosi.',
            en: 'Last morning for sunbathing and a final dive into the deep blue, before sailing peacefully towards the disembarkation port with wonderful memories.'
          }
        }
      ]
    },
    inclusions: [
      { it: 'Comoda sistemazione in cabina doppia', en: 'Comfortable accommodation in a double cabin' },
      { it: 'Esperto a bordo per svelarti le curiosità dei fondali', en: 'Expert on board to reveal the curiosities of the seabed' },
      { it: 'Equipaggiamento da snorkeling per divertirsi in acqua', en: 'Snorkeling equipment for fun in the water' }
    ]
  }
];
