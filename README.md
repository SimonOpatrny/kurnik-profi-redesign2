# Kurník-Profi — redesign koncept (HTML / CSS / JavaScript)

Samostatný front-endový koncept redesignu pro prezentaci klientovi. Nepřepisuje ani nenahrazuje původní web.

## Spuštění

Otevřete `index.html` v moderním prohlížeči. Není potřeba build ani framework.

## Co je hotové

- Nový responzivní design s přírodní barevností, výraznější typografií a jemnými animacemi.
- Skutečné fotografie realizací načítané z veřejných obrazových cest webu Kurník-Profi; odkazy vedou do původní galerie.
- Modely pro 6, 15 a 25 slepic se zveřejněnými rozměry a cenami.
- Kalkulace podle zveřejněného ceníku pro úrovně Basic Profi, Top Profi a Extra Profi.
- Výběr doplňků, automatické započtení jednorázové elektroinstalace a respektování doplňků zahrnutých v Extra Profi.
- Nastavení základního rozmístění prvků, výběr stěny a počtu dalších světlíků / ventilací.
- Předběžný souhrn konfigurace, kopírování do schránky a připravení nezávazné poptávky přes e-mail.
- Samostatná sekce o současných funkcích aplikace a členství; grafický panel je výslovně označen jako koncept, nikoli screenshot reálné aplikace.
- Mobilní navigace, stavy výběru, přístupnější ovládací prvky a podpora `prefers-reduced-motion`.

## Důležité limity prototypu

- Toto není nasazení do produkce ani napojení na interní konfigurátor, aplikaci nebo databázi výrobce.
- Formulář připravuje e-mail přes `mailto:`; nic se neposílá na server a nejsou ukládány osobní údaje.
- Cena dopravy a montáže se nepočítá, protože závisí na lokalitě a přístupu na pozemek.
- Umístění prvků ve vizualizaci stěny je orientační UI ukázka, ne technický výkres. Finální rozvržení musí potvrdit výrobce.
- Ceník byl sestaven podle veřejné stránky výrobce v říjnu 2026. Před zveřejněním je vhodné potvrdit aktuálnost cen a textů s panem Kolaříkem.
- Fotografie jsou načítány z původního webu; pokud se jejich cesty změní nebo hotlinkování nebude vhodné, je nutné získat souhlas a dodat lokální kopie.
- Odkaz na ochranu osobních údajů ve footeru je potřeba ověřit proti aktuální adrese stránky výrobce před zveřejněním.

## Hlavní soubory

- `index.html` — obsah a struktura
- `styles.css` — design a responzivní layout
- `script.js` — kalkulátor a interakce
