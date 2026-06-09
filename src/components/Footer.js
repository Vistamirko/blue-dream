"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { Sailboat, Facebook, Instagram, Youtube, Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100 relative overflow-hidden mt-auto">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Section: Logo & Tagline */}
        <div className="flex flex-col items-center text-center mb-16">
          <Link href="/" className="inline-block mb-8 transition-transform hover:scale-105 duration-500">
            <img src="/logo-bluedrem-charter-blue.svg" alt="Blue Dream Charter" className="h-16 md:h-20 w-auto" />
          </Link>
          <p className="max-w-2xl text-[#070c26] text-lg md:text-xl font-light leading-relaxed">
            {t('footer_tagline')}
          </p>
        </div>

        {/* Horizontal Navigation (Replacing vertical menus) */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16">
          {[
            { href: '/', label: t('nav_home') || 'Home' },
            { href: '/la-flotta-blue-dream-charter', label: t('nav_fleet') || 'Flotta' },
            { href: '/prenota', label: t('nav_booking') || 'Booking' },
            { href: '/prezzi', label: t('nav_prices') || 'Prezzi' },
            { href: '/chi-siamo', label: t('nav_about') || 'Chi Siamo' },
            { href: '/contatti', label: t('nav_contacts') || 'Contatti' },
          ].map((link, i) => (
            <Link 
              key={i} 
              href={link.href} 
              className="text-gray-500 hover:text-[#0052b4] text-[0.8rem] md:text-sm uppercase tracking-[0.15em] transition-colors font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 py-12 border-t border-b border-gray-100 mb-12">
          <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#f4f7fb] flex items-center justify-center mb-5 group-hover:bg-[#0052b4] transition-colors duration-300">
              <Phone className="text-[#0052b4] group-hover:text-white transition-colors duration-300 stroke-[1.5]" size={24} />
            </div>
            <span className="text-[0.7rem] uppercase tracking-widest text-gray-400 mb-2 font-bold">Ufficio</span>
            <span className="text-[#070c26] font-medium">+39 081 896 0579</span>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#f4f7fb] flex items-center justify-center mb-5 group-hover:bg-[#0052b4] transition-colors duration-300">
              <MessageCircle className="text-[#0052b4] group-hover:text-white transition-colors duration-300 stroke-[1.5]" size={24} />
            </div>
            <span className="text-[0.7rem] uppercase tracking-widest text-gray-400 mb-2 font-bold">WhatsApp</span>
            <span className="text-[#070c26] font-medium">+39 328 663 5141</span>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#f4f7fb] flex items-center justify-center mb-5 group-hover:bg-[#0052b4] transition-colors duration-300">
              <Mail className="text-[#0052b4] group-hover:text-white transition-colors duration-300 stroke-[1.5]" size={24} />
            </div>
            <span className="text-[0.7rem] uppercase tracking-widest text-gray-400 mb-2 font-bold">Email</span>
            <span className="text-[#070c26] font-medium">info@bluedreamcharter.com</span>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#f4f7fb] flex items-center justify-center mb-5 group-hover:bg-[#0052b4] transition-colors duration-300">
              <MapPin className="text-[#0052b4] group-hover:text-white transition-colors duration-300 stroke-[1.5]" size={24} />
            </div>
            <span className="text-[0.7rem] uppercase tracking-widest text-gray-400 mb-2 font-bold">Location</span>
            <span className="text-[#070c26] font-medium text-[0.95rem]">Via Roma, 2 (Marina Grande)<br/>80079 Isola di Procida (NA)</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Socials */}
          <div className="flex gap-4">
            <a href="https://www.facebook.com/bluedreamcharter/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0052b4] transition-colors">
              <Facebook size={22} className="stroke-[1.5]" />
            </a>
            <a href="https://www.instagram.com/bluedreamcharter/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0052b4] transition-colors">
              <Instagram size={22} className="stroke-[1.5]" />
            </a>
            <a href="https://www.youtube.com/channel/UCRtA0N77aEksYq4A_h1aKrg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0052b4] transition-colors">
              <Youtube size={22} className="stroke-[1.5]" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[0.85rem] text-gray-400 font-light text-center">
            {t('footer_legal')}
          </div>

          {/* Legal Links */}
          <div className="flex gap-8 text-[0.85rem] text-gray-400 font-light">
            <Link href="/privacy" className="hover:text-[#0052b4] transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-[#0052b4] transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
