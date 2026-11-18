/* Page logic: language switching, and turning scroll position into "how far along the street".
   window.WALK is the one thing shared with scene.js:
     f      fractional stop index (0 = front door … n-1 = home again), driven by scroll
     xs     street position of each stop, hours — time of day at each stop, ids — the stops' element ids */
(function () {
    'use strict';
    const $ = (s, p) => (p || document).querySelector(s);
    const $$ = (s, p) => [...(p || document).querySelectorAll(s)];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    const stops = $$('.stop');
    const WALK = window.WALK = {
        f: 0, n: stops.length,
        ids: stops.map(s => s.id),
        xs: stops.map(s => +s.dataset.x),
        hours: stops.map(s => +s.dataset.h)
    };
    const at = (arr, f) => { const i = Math.min(Math.floor(f), arr.length - 2), k = f - i; return arr[i] + (arr[i + 1] - arr[i]) * k; };
    WALK.at = at;

    /* ---------- language ---------- */
    const LANGS = ['en', 'zh', 'ja'];
    const expand = s => s.replace(/\[\[(\w+)\|([^\]]+)\]\]/g, (_, k, label) =>
        `<a class="ext" href="${LINKS[k]}" target="_blank" rel="noopener">${label}</a>`);
    let lang = 'en';
    function setLang(l, save) {
        lang = l;
        root.lang = l;
        const t = translations[l];
        $$('[data-i18n]').forEach(el => { const v = t[el.dataset.i18n]; if (v != null) el.innerHTML = expand(v); });
        $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l ? 'true' : 'false'));
        document.title = `${t.name} — ${t.title}`;
        if (save) { try { localStorage.setItem('lang', l); } catch (e) { /* private mode */ } }
        measure(); onScroll();
    }
    $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang, true)));

    /* ---------- scroll → walk ----------
       While a card sits on the reading line the walker waits at its stop; between two cards he walks. */
    let zones = [], anchor = .5;
    function measure() {
        const vh = innerHeight, phone = innerWidth < 760;
        anchor = phone ? .7 : .5;
        zones = stops.map(s => {
            const r = $('.card', s).getBoundingClientRect(), top = r.top + scrollY, bot = r.bottom + scrollY;
            const m = Math.min((bot - top) / 2, vh * .2);
            return [top + m, bot - m];
        });
        zones[0][1] = Math.max(zones[0][1], vh * anchor + 1);     // unscrolled always means standing on the doorstep
    }
    function progress() {
        const y = scrollY + innerHeight * anchor, n = zones.length;
        for (let i = 0; i < n; i++) {
            if (y <= zones[i][1]) return i;
            if (i < n - 1 && y < zones[i + 1][0]) return i + (y - zones[i][1]) / (zones[i + 1][0] - zones[i][1]);
        }
        return n - 1;
    }

    const navLinks = $$('#navlist a'), navStops = navLinks.map(a => +a.dataset.stop);
    const route = $('.route'), clock = $('#clock'), hint = $('#hint');
    const pad = n => String(n).padStart(2, '0');
    function onScroll() {
        if (!zones.length) return;
        const f = WALK.f = progress();
        // the route bar spaces its labels evenly, though the sections hold very different numbers of stops
        let seg = 0; while (seg < navStops.length - 2 && f >= navStops[seg + 1]) seg++;
        const p = (seg + (f - navStops[seg]) / (navStops[seg + 1] - navStops[seg])) / (navStops.length - 1);
        route.style.setProperty('--p', Math.min(Math.max(p, 0), 1).toFixed(4));
        let cur = 0; navStops.forEach((s, i) => { if (f >= s - .5) cur = i; });
        navLinks.forEach((a, i) => a.setAttribute('aria-current', i === cur ? 'location' : 'false'));
        const h = at(WALK.hours, f), mins = Math.round(h * 60 / 5) * 5;
        clock.textContent = pad(Math.floor(mins / 60)) + ':' + pad(mins % 60);
        hint.style.opacity = Math.min(Math.max(1 - f * 4, 0), 1);
        hint.style.visibility = f > .25 ? 'hidden' : '';
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', () => { measure(); onScroll(); });
    addEventListener('load', () => { measure(); onScroll(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); onScroll(); });

    // route labels walk to their stop, landing with the card on the reading line
    navLinks.forEach((a, i) => a.addEventListener('click', e => {
        e.preventDefault();
        const s = navStops[i];
        const top = s === 0 ? 0 : Math.max(0, zones[s][0] - innerHeight * anchor + 16);
        scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
        history.replaceState(null, '', a.getAttribute('href'));
    }));

    /* ---------- copy email ---------- */
    const copyBtn = $('#copy'), email = $('#email').textContent.trim();
    copyBtn.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(email); }
        catch (e) {
            const ta = document.createElement('textarea'); ta.value = email; ta.style.cssText = 'position:fixed;opacity:0';
            document.body.append(ta); ta.select(); try { document.execCommand('copy'); } catch (_) { /* leave it */ } ta.remove();
        }
        copyBtn.textContent = translations[lang]['contact.copied'];
        setTimeout(() => { copyBtn.textContent = translations[lang]['contact.copy']; }, 2000);
    });

    /* ---------- go ---------- */
    let saved = null; try { saved = localStorage.getItem('lang'); } catch (e) { /* private mode */ }
    const browser = (navigator.language || 'en').split('-')[0];
    setLang(LANGS.includes(saved) ? saved : LANGS.includes(browser) ? browser : 'en', false);
})();
