(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const money = n => new Intl.NumberFormat('cs-CZ', {maximumFractionDigits: 0}).format(n) + ' Kč';
  const prices = {
    6: { basic: 18000, top: 25500, extra: 37550 },
    15: { basic: 23900, top: 33990, extra: 46040 },
    25: { basic: 39900, top: 49900, extra: 61950 }
  };
  const sizeInfo = {
    6: { label: 'Pro 6 slepic', dimensions: '130 × 100 × 100 cm', image: 'https://kurnik-profi.cz/_content/KurnikProfi.UI.Shared/img/kurniky/realizace/kurnik-pro-6-slepic-exterier-5-480.webp' },
    15: { label: 'Pro 15 slepic', dimensions: '170 × 100 × 160 cm', image: 'https://kurnik-profi.cz/_content/KurnikProfi.UI.Shared/img/kurniky/realizace/kurnik-pro-15-slepic-vybeh-13-480.webp' },
    25: { label: 'Pro 25 slepic', dimensions: '170 × 140 × 200 cm', image: 'https://kurnik-profi.cz/_content/KurnikProfi.UI.Shared/img/site/tri-kurniky-4x3-640.webp' }
  };
  const tiers = { basic: 'Basic Profi', top: 'Top Profi', extra: 'Extra Profi' };
  const addonPrices = { stain:1800, gutter:1700, solar:1500, dust:3200, tube:2900, feeder:3900, fan:1900, light:1900, heater:2900, led:2900, camera:1800, timer:500, cabinet:1000, sockets:800 };
  const addonNames = { stain:'Lazura / nátěr', gutter:'Okapový systém', solar:'Solární ventilátor', dust:'Kryté popeliště', tube:'Tubus', feeder:'Automatické dosypávání krmiva', fan:'Ventilátor 230 V', light:'Osvětlení 230 V', heater:'Topení 230 V', led:'LED pásek pod střechu', camera:'Kamera', timer:'Wi-Fi spínací hodiny', cabinet:'Dřevěná skříňka', sockets:'Zásuvky a kabeláž' };
  const extraIncluded = new Set(['stain','gutter','solar','dust','tube']);
  const electrical = new Set(['tube','feeder','fan','light','heater','led','camera','timer','cabinet','sockets']);
  let size = 15, tier = 'top', extraWindows = 0, activeWall = 'Přední', toastTimer;
  const selectedAddons = new Set();
  const toast = $('#toast');
  function notify(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3000); }
  function selectedElectrical() { return [...selectedAddons].some(k => electrical.has(k)); }
  function calculate() {
    let total = prices[size][tier];
    for (const key of selectedAddons) if (!(tier === 'extra' && extraIncluded.has(key))) total += addonPrices[key];
    total += extraWindows * 1000;
    if (tier !== 'extra' && selectedElectrical()) total += 1950;
    return total;
  }
  function summary() {
    const addons = [...selectedAddons].map(k => `${addonNames[k]}${tier === 'extra' && extraIncluded.has(k) ? ' (v ceně Extra Profi)' : ` (+${money(addonPrices[k])})`}`);
    if (tier !== 'extra' && selectedElectrical()) addons.push(`Elektroinstalace (+${money(1950)})`);
    if (extraWindows) addons.push(`Další světlíky / ventilace: ${extraWindows} ks (+${money(extraWindows * 1000)})`);
    return `KURNÍK-PROFI — SOUHRN PŘEDBĚŽNÉ KONFIGURACE\nVelikost: ${sizeInfo[size].label}\nRozměry: ${sizeInfo[size].dimensions}\nVýbava: ${tiers[tier]}\nDoplňky: ${addons.length ? addons.join('; ') : 'Bez doplňků'}\nRozmístění: čistící dvířka ${$('#cleanDoor').value.toLowerCase()}, dvířka pro slepice ${$('#henDoor').value.toLowerCase()}, snáškový box ${$('#nestBox').value.toLowerCase()}, spád střechy ${$('#roofFall').value.toLowerCase()}\nAktivně nastavovaná stěna: ${activeWall}\nOrientační cena: ${money(calculate())}\nDoprava a montáž: nacenění podle lokality\n\nPoptávka je nezávazná. Konečnou konfiguraci, cenu a termín potvrzuje výrobce.`;
  }
  function render() {
    $$('.size-option').forEach(el => { const checked = $('input',el).value === String(size); el.classList.toggle('selected', checked); $('input',el).checked = checked; });
    $$('.tier-option').forEach(el => { const checked = $('input',el).value === tier; el.classList.toggle('selected', checked); $('input',el).checked = checked; });
    $('#price-basic').textContent = money(prices[size].basic); $('#price-top').textContent = money(prices[size].top); $('#price-extra').textContent = money(prices[size].extra);
    $$('.addon').forEach(row => { const input = $('input',row); row.classList.toggle('checked', selectedAddons.has(input.value)); row.classList.toggle('is-included', tier === 'extra' && extraIncluded.has(input.value)); });
    $('#totalPrice').textContent = money(calculate());
    $('#windowCount').textContent = String(extraWindows);
    $('#electricalNote').textContent = tier === 'extra' ? 'U úrovně Extra Profi je elektroinstalace zahrnuta v ceně, pokud je potřeba pro vybrané elektrické doplňky.' : selectedElectrical() ? 'Je vybrán elektrický doplněk: v ceně je započítána elektroinstalace 1 950 Kč (jednorázově).' : 'Při výběru elektrického doplňku se přičte elektroinstalace 1 950 Kč. U Extra Profi je již zahrnuta.';
    $('#configImage').src = sizeInfo[size].image; $('#configImage').alt = `Skutečná realizace Kurník-Profi — ${sizeInfo[size].label.toLowerCase()}`; $('#configImageLabel').textContent = `REALIZACE · ${sizeInfo[size].label.toUpperCase()}`;
  }
  $$('input[name="size"]').forEach(input => input.addEventListener('change', () => { size = Number(input.value); render(); }));
  $$('input[name="tier"]').forEach(input => input.addEventListener('change', () => { tier = input.value; render(); }));
  $$('.addon input').forEach(input => input.addEventListener('change', () => { input.checked ? selectedAddons.add(input.value) : selectedAddons.delete(input.value); render(); }));
  $$('.choose-size').forEach(btn => btn.addEventListener('click', () => { size = Number(btn.dataset.size); render(); $('#konfigurator').scrollIntoView({behavior:'smooth'}); notify(`Vybrána velikost pro ${size} slepic.`); }));
  $('#windowMinus').addEventListener('click', () => { extraWindows = Math.max(0, extraWindows - 1); render(); });
  $('#windowPlus').addEventListener('click', () => { extraWindows = Math.min(10, extraWindows + 1); render(); });
  $$('.wall-tabs button').forEach(btn => btn.addEventListener('click', () => { activeWall = btn.dataset.wall; $$('.wall-tabs button').forEach(b => b.classList.toggle('active', b === btn)); $('#wallLabel').textContent = `${activeWall} stěna · rozmístění bude potvrzeno při návrhu`; $('.wall-house').dataset.wall = activeWall; }));
  $('#sendQuote').addEventListener('click', () => { const subject = encodeURIComponent(`Nezávazná poptávka — ${sizeInfo[size].label} / ${tiers[tier]}`); const body = encodeURIComponent(`${summary()}\n\nJméno a příjmení:\nTelefon:\nObec / PSČ:\n\nDoplňte prosím kontaktní údaje před odesláním.`); window.location.href = `mailto:info@kurnik-profi.cz?subject=${subject}&body=${body}`; notify('Otevírám e-mail s připravenou konfigurací.'); });
  $('#copyConfig').addEventListener('click', async () => { try { await navigator.clipboard.writeText(summary()); notify('Souhrn konfigurace zkopírován.'); } catch { const area = document.createElement('textarea'); area.value = summary(); area.style.position='fixed'; area.style.opacity='0'; document.body.appendChild(area); area.select(); const ok = document.execCommand('copy'); area.remove(); notify(ok ? 'Souhrn konfigurace zkopírován.' : 'Kopírování se nepodařilo — zkuste poptávku e-mailem.'); } });
  const toggle = $('#menuToggle'), nav = $('#mainNav'); toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
  $$('nav a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }));
  $('#year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target);} }), {threshold:.1}); $$('.benefit-grid article,.model-card,.gallery-card,.process-grid article').forEach(el => {el.classList.add('reveal');observer.observe(el);}); }
  render();
})();
