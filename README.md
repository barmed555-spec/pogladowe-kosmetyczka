# Studio Aurora — strona poglądowa (demo)

Strona **poglądowa** (demo) dla branży beauty — studio kosmetyczne / kosmetologia / paznokcie / medycyna estetyczna. Materiał sprzedażowy WM Web Solutions. **Dane, nazwy i opinie są fikcyjne / przykładowe.**

## Stack
Statyczny HTML / CSS / vanilla JS → Cloudflare Workers (free).

## Podgląd lokalny
`start-preview.cmd` lub `node server.js` → http://localhost:8095

## Deploy
`npm install && npm run deploy`

## Elementy premium / konwersyjne
- Luksusowy design (Marcellus + Nunito Sans), paleta szampan + śliwka + nude
- Hero z organiczną formą i chipami zaufania, sekcja o studio
- **Rozwijana lista zabiegów (accordion)** z opisami i cenami
- Cennik w 3 kolumnach, galeria efektów z hoverem, opinie (demo)
- Formularz rezerwacji (zabieg, termin) — Web3Forms + fallback
- Sticky FAB (WhatsApp + tel), smart „Zadzwoń", reveal, `<noscript>` fallback
- SEO: schema.org BeautySalon, OG, sitemap/robots, dostępność, `prefers-reduced-motion`

## Przed publikacją
- [ ] Prawdziwe dane, NIP, adres, godziny
- [ ] Zdjęcia studia i efektów (za zgodą klientek)
- [ ] Klucz Web3Forms na skrzynkę klienta
- [ ] Prawdziwe opinie (Google/Booksy), mapa, polityka prywatności, `robots` → index
- [ ] Rozważyć integrację z Booksy
