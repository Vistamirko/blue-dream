import Link from 'next/link';

export default function ReviewsPage() {
  return (
    <div className="container mx-auto px-6 py-32 text-center">
      <h1 className="text-4xl font-bold text-[#070c26] mb-8">Dicono di noi</h1>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Questa sezione è in fase di aggiornamento. Presto potrai leggere le recensioni e le esperienze dei nostri clienti!
      </p>
      <Link href="/" className="inline-flex items-center justify-center bg-[#070c26] text-white rounded-xl px-8 py-4 text-[16px] font-semibold hover:bg-[#0052b4] transition-all duration-300">
        Torna alla Home
      </Link>
    </div>
  );
}
