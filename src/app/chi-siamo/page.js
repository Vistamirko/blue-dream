"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div style={{ paddingBottom: '100px' }}>
      
      {/* Header */}
      <section style={{
        paddingTop: '60px',
        paddingBottom: '40px',
        background: 'linear-gradient(180deg, rgba(6, 11, 37, 0.2) 0%, var(--primary-dark) 100%)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            {language === 'it' ? 'La Nostra Storia' : 'Our Story'}
          </span>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-light-primary)', fontFamily: 'var(--font-heading)' }}>
            {language === 'it' ? 'Chi Siamo — Blue Dream Charter' : 'About Us — Blue Dream Charter'}
          </h1>
          <p style={{ color: 'var(--text-light-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
            {language === 'it'
              ? 'Nautica, ospitalità e passione nel cuore del Golfo di Napoli dal 2004.'
              : 'Yachting, hospitality and passion in the heart of the Gulf of Naples since 2004.'}
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="container" style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '64px' }}>
        
        {/* Row 1: Company Introduction */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center'
        }} className="grid-mobile-single">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-light-primary)', fontFamily: 'var(--font-heading)' }}>
              {language === 'it' ? 'Oltre Vent\'anni di Passione per il Mare' : 'Over Twenty Years of Passion for the Sea'}
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {language === 'it' ? (
                `La Blue Dream Charter & Service è una società di noleggio nautico nata nel 2004 che fonde la tradizionale attività di charter a vela con una ricca offerta di servizi esclusivi. A disposizione dei nostri ospiti c'è una flotta di imbarcazioni di recentissima costruzione dei primari cantieri navali del mondo (Beneteau, Fountaine Pajot, Jeanneau, Bavaria).`
              ) : (
                `Blue Dream Charter & Service is a yacht charter company founded in 2004, combining traditional sailing rental with a rich selection of exclusive nautical services. At our guests' disposal is a fleet of recently built vessels from the world's leading shipyards (Beneteau, Fountaine Pajot, Jeanneau, Bavaria).`
              )}
            </p>
            <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {language === 'it' ? (
                `La nostra forza risiede nella cura maniacale dei dettagli, nell'efficienza dell'assistenza tecnica e nella selezione di skipper professionisti esperti, che vi guideranno alla scoperta dei segreti più nascosti delle nostre coste in totale sicurezza.`
              ) : (
                `Our strength lies in our meticulous attention to detail, efficient technical support, and the selection of expert professional crew who will guide you to discover the hidden secrets of our coastlines in complete safety.`
              )}
            </p>
          </div>

          <div className="glass-card" style={{
            height: '350px',
            backgroundImage: 'url("/uploads/2022/02/logo-fondazione2.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px'
          }} />
        </div>

        {/* Row 2: Check-in Video System & Base */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center'
        }} className="grid-mobile-single reversing-row">
          
          <div className="glass-card" style={{
            height: '350px',
            backgroundImage: 'url("/uploads/2022/02/DSC_5454-1320x879.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-light-primary)', fontFamily: 'var(--font-heading)' }}>
              {language === 'it' ? 'Il Primo Check-In Video in Italia' : 'The First Video Check-In Service in Italy'}
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {language === 'it' ? (
                `Blue Dream Charter & Service presenta un'innovazione assoluta nel mondo del charter: il primo video check-in completo di ciascuna barca della flotta. Un video dettagliato illustra in anticipo tutti i sistemi e le manovre di bordo, così da permettervi di studiare la barca da casa e sveltire al massimo la procedura di check-in fisico al porto d'imbarco.`
              ) : (
                `Blue Dream Charter & Service presents an absolute innovation in the charter industry: the first complete video check-in for each yacht in the fleet. A detailed video tour illustrates all onboard systems and maneuvers in advance, allowing you to study the boat from home and complete physical check-in in porto instantly.`
              )}
            </p>
            <div style={{
              padding: '16px',
              backgroundColor: 'rgba(131, 119, 109, 0.05)',
              borderLeft: '4px solid var(--accent-gold)',
              borderRadius: '0 12px 12px 0',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              color: 'var(--text-light-primary)'
            }}>
              {language === 'it' 
                ? "“Meno tempo speso in banchina a compilare fogli, più tempo per navigare tra le onde del Golfo”"
                : "“Less time spent on the docks filling out papers, more time sailing the waves of the Gulf”"}
            </div>
          </div>
        </div>

        {/* Row 3: Sede Marina di Procida */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center'
        }} className="grid-mobile-single">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-light-primary)', fontFamily: 'var(--font-heading)' }}>
              {language === 'it' ? 'Unica Base: Marina Grande, Procida' : 'Exclusive Base: Marina Grande, Procida'}
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {language === 'it' ? (
                `La nostra unica base operativa si trova a Procida, nominata Capitale Italiana della Cultura nel 2022. L'isola mantiene un fascino autentico, fatto di case colorate, borghi storici come la Corricella e ritmi rilassati. Il nostro pontile a Marina Grande offre un'accoglienza calorosa ed è il perfetto trampolino di lancio per crociere dirette ad Ischia, Capri e l'arcipelago Ponziano.`
              ) : (
                `Our exclusive charter base is located in Procida, named Italian Capital of Culture in 2022. The island maintains an authentic charm, made of colorful houses, historical villages like Corricella and relaxed rhythms. Our pontoon in Marina Grande offers a warm welcome and is the perfect stepping stone for cruises heading to Ischia, Capri, and the Pontine archipelago.`
              )}
            </p>
            <div style={{ marginTop: '10px' }}>
              <Link href="/contatti" className="btn btn-gold">
                {language === 'it' ? 'Scopri Come Raggiungerci' : 'Get Directions to Base'} →
              </Link>
            </div>
          </div>

          <div className="glass-card" style={{
            height: '350px',
            backgroundImage: 'url("/uploads/2022/02/logo_procida_pantone693c-300x102.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '24px'
          }} />
        </div>

      </section>

      {/* Styled JSX for Responsive Grid Elements */}
      <style jsx>{`
        @media (max-width: 900px) {
          .grid-mobile-single {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .reversing-row {
            display: flex !important;
            flex-direction: column-reverse !important;
          }
        }
      `}</style>

    </div>
  );
}
