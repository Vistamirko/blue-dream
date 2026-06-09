import Link from 'next/link';

export default function PrezziPage() {
  return (
    <div className="container mx-auto px-6 py-32 text-center">
      <h1 className="text-4xl font-bold text-[#070c26] mb-8">Listino Prezzi</h1>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Consulta i nostri listini aggiornati per la stagione. Puoi scaricare il listino in formato PDF.
      </p>
      <a href="/downloads/listino-blue-dream-2026.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-[#070c26] text-white rounded-xl px-8 py-4 text-[16px] font-semibold hover:bg-[#0052b4] transition-all duration-300">
        Scarica il Listino PDF
      </a>
      <div className="mt-8">
        <Link href="/la-flotta-blue-dream-charter" className="text-[#0E6FA7] hover:underline font-medium">
          Torna alla flotta
        </Link>
      </div>
    </div>
  );
}
