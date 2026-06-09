import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  if (!basicAuth) {
    return new NextResponse('Autenticazione richiesta', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Area Riservata Blue Dream"',
      },
    });
  }

  // Estrai le credenziali decodificando la stringa in base64
  const authValue = basicAuth.split(' ')[1];
  const [user, pwd] = atob(authValue).split(':');

  // Puoi cambiare queste credenziali o impostarle su Vercel come variabili d'ambiente
  const validUser = process.env.BASIC_AUTH_USER || 'bluedream';
  const validPass = process.env.BASIC_AUTH_PASSWORD || 'preview';

  if (user === validUser && pwd === validPass) {
    return NextResponse.next();
  }

  return new NextResponse('Credenziali non valide', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Area Riservata Blue Dream"',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Applica il middleware a tutte le pagine, escludendo:
     * - api (API routes)
     * - _next/static (file statici)
     * - _next/image (ottimizzazione immagini)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
