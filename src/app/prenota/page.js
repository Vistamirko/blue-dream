"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { fleet, SEASONS } from '../../lib/fleetData';
import Link from 'next/link';
import BookingForm from '../../components/BookingForm';

function BookingContent() {
  return <BookingForm />;
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen flex justify-center items-center bg-[#F8F9FA]">
        <div className="size-12 border-4 border-[#009649] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
