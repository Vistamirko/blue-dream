import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import Navigation from "../components/Navigation";
import PartnersSection from "../components/PartnersSection";
import Footer from "../components/Footer";
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: "Vacanze in barca a vela e Catamarani | Blue Dream Charter & Service Procida",
  description: "Noleggio barche a vela e catamarani a Procida nel cuore del Golfo di Napoli. Monoscafi e catamarani adatti ad ogni vostra esigenza di vacanza o crociera.",
  keywords: "vacanze in barca a vela, noleggio catamarano napoli, noleggio barche procida, charter vela mediterraneo, blue dream charter, vacanze vela procida",
  robots: "index, follow",
  openGraph: {
    title: "Vacanze in barca a vela e Catamarani | Blue Dream Charter & Service",
    description: "Noleggio barche a vela e catamarani a Procida nel cuore del Golfo di Napoli. Scegli tra monoscafi e catamarani moderni per le tue vacanze.",
    url: "https://www.bluedreamcharter.com",
    siteName: "Blue Dream Charter",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vacanze in barca a vela e Catamarani | Blue Dream Charter",
    description: "Noleggio barche a vela e catamarani a Procida nel cuore del Golfo di Napoli.",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <LanguageProvider>
          <Navigation />
          <main style={{ flex: 1, minHeight: "60vh" }}>
            {children}
          </main>
          <PartnersSection />
          <Footer />

        </LanguageProvider>
      </body>
    </html>
  );
}
