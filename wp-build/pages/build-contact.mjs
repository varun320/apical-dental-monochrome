// Contact page (id=23) — asymmetric concierge.
// Hero italic headline + dominant email card + small meta cards (address, response).
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sectionsDir = resolve(here, '..', 'sections');
const nav = JSON.parse(readFileSync(resolve(sectionsDir, '00-navbar.json'), 'utf-8'));

const P = 'pcontact_';
const BONE = '#F3EEE5';
const INK  = '#1A1A1C';
const ACC  = '#B85C3C';

const heading = (id, title, klass, opt = {}) => ({
  id: P + id, elType: 'widget', widgetType: 'heading',
  settings: { title, header_size: opt.h || 'h2', _css_classes: klass, ...(opt.set || {}) }
});
const text = (id, html, klass, opt = {}) => ({
  id: P + id, elType: 'widget', widgetType: 'text-editor',
  settings: { editor: html, _css_classes: klass, ...(opt.set || {}) }
});

const ICONS = {
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></svg>',
  cal:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>',
  pin:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
};

const CSS = `
.ap-contact *{box-sizing:border-box}
.ap-contact a{color:inherit}
.ap-eyebrow{font-family:Inter;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${INK};margin:0}
.ap-eyebrow .elementor-heading-title{font:inherit;color:inherit;letter-spacing:inherit;margin:0}
.ap-h1-italic .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(2.3rem,1rem + 5.4vw,5.4rem);font-weight:300;line-height:1.0;letter-spacing:-2.4px;color:${INK};margin:0}
.ap-body{font-family:Inter;font-size:1.0625rem;line-height:1.65;color:rgba(26,26,28,0.78);max-width:62ch}
.ap-body p{margin:0}
.ap-body-dark{font-family:Inter;font-size:1.0625rem;line-height:1.65;color:rgba(243,238,229,0.78);max-width:62ch}
.ap-body-dark p{margin:0}

/* dominant email card */
.ap-prim{font-family:Inter;background:${INK};color:${BONE};padding:56px 56px 52px;display:flex;flex-direction:column;gap:28px;height:100%;position:relative;overflow:hidden}
.ap-prim p{margin:0}
.ap-prim .icon{width:48px;height:48px;color:${ACC};display:flex;align-items:center;justify-content:center;border:1px solid rgba(184,92,60,0.4);border-radius:50%}
.ap-prim .icon svg{width:24px;height:24px}
.ap-prim .kicker{font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(243,238,229,0.55)}
.ap-prim .addr{font-family:Fraunces;font-style:italic;font-size:clamp(2rem,1rem + 3.4vw,3.4rem);font-weight:300;line-height:1.05;letter-spacing:-1.4px;color:${BONE};word-break:break-word}
.ap-prim .addr a{color:inherit;border-bottom:1px solid rgba(243,238,229,0.35);padding-bottom:6px;text-decoration:none;transition:border-color .2s}
.ap-prim .addr a:hover{border-bottom-color:${ACC}}
.ap-prim .copy{font-size:1rem;line-height:1.65;color:rgba(243,238,229,0.72);max-width:48ch;margin-top:auto}
.ap-prim .nm{position:absolute;top:32px;right:48px;font-family:Fraunces;font-style:italic;font-size:14px;color:${ACC};letter-spacing:.4px}

/* secondary stacked meta cards */
.ap-meta{font-family:Inter;background:${BONE};border:1px solid rgba(26,26,28,0.1);padding:36px 32px;display:flex;flex-direction:column;gap:14px}
.ap-meta p{margin:0}
.ap-meta .row{display:flex;align-items:center;gap:14px;font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55)}
.ap-meta svg{width:20px;height:20px;color:${ACC};flex-shrink:0}
.ap-meta h4{font-family:Fraunces;font-size:1.55rem;font-weight:300;line-height:1.18;letter-spacing:-.4px;color:${INK};margin:0}
.ap-meta .ml{font-size:.95rem;line-height:1.55;color:rgba(26,26,28,0.7)}

.ap-cta-h .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(2.15rem,1rem + 5vw,4.75rem);font-weight:300;line-height:1.02;letter-spacing:-2px;color:${BONE};margin:0}
.ap-cta-eye .elementor-heading-title{font-family:Inter;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${BONE};margin:0}
.ap-foot{font-family:Inter;font-size:12px;color:rgba(243,238,229,.5);letter-spacing:.3px}
.ap-foot p{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;margin:0}
.ap-foot a{color:rgba(243,238,229,.7);text-decoration:none}
.ap-foot a.brand{font-family:Fraunces;font-size:18px;font-weight:500;letter-spacing:2px;color:${BONE};text-decoration:none}

@media(max-width:900px){.ap-prim{padding:40px 32px}.ap-prim .nm{top:24px;right:24px}}
`.trim();

const styles = text('styles', `<style>${CSS}</style>`, '');

// ── HERO ────────────────────────────────────────────────────────────
const hero = {
  id: P+'hero', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'200',right:'40',bottom:'80', left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'160',right:'32',bottom:'60', left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'120',right:'22',bottom:'48', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE, css_classes:'ap-contact'
  },
  elements: [{
    id: P+'hcol', elType:'column',
    settings: { _column_size:100, space_between_widgets:{unit:'px',size:24} },
    elements: [
      styles,
      heading('heyebrow', 'CONTACT · ONE BUSINESS DAY', 'ap-eyebrow', { h:'h6' }),
      heading('hh1', 'Let’s put a robot in your chair.', 'ap-h1-italic', { h:'h1', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('hsub', '<p>Email is fastest. Include your DSO name, number of locations, and how quickly you want to move. We reply within one business day — most of the time within the hour.</p>', 'ap-body', { set:{ _animation:'fadeInUp', _animation_delay:240, _element_custom_width:{unit:'%',size:62} } })
    ]
  }]
};

// ── ASYMMETRIC CARDS GRID ───────────────────────────────────────────
const primCard = {
  id: P+'primcol', elType:'column',
  settings:{ _column_size:60, _inline_size_tablet:100,
             padding:{unit:'px',top:'0',right:'12',bottom:'0',left:'0',isLinked:false},
             padding_tablet:{unit:'px',top:'0',right:'0',bottom:'0',left:'0',isLinked:true} },
  elements:[
    text('prim', `<p><span class="icon">${ICONS.mail}</span></p>`
      + `<p class="kicker">Email — the fastest path</p>`
      + `<p class="addr"><a href="mailto:info@calldental.ai">info@calldental.ai</a></p>`
      + `<p class="copy">For partnership inquiries, clinical questions, press, or anything else. Include your DSO name, location count, and how soon you want a flagship chair on site. A real human replies — most of the time within the hour.</p>`
      + `<span class="nm">01</span>`, 'ap-prim', { set:{ _animation:'fadeInUp', _animation_delay:120 } })
  ]
};

const metaCard = (i, icon, kicker, h, ml) =>
  text('meta'+i,
    `<p class="row">${ICONS[icon]}<span>${kicker}</span></p>`
    + `<h4>${h}</h4>`
    + `<p class="ml">${ml}</p>`,
    'ap-meta', { set:{ _animation:'fadeInUp', _animation_delay: 200 + 80*i } });

const metaCol = {
  id: P+'metacol', elType:'column',
  settings:{ _column_size:40, _inline_size_tablet:100, space_between_widgets:{unit:'px',size:18},
             padding:{unit:'px',top:'0',right:'0',bottom:'0',left:'12',isLinked:false},
             padding_tablet:{unit:'px',top:'24',right:'0',bottom:'0',left:'0',isLinked:false} },
  elements:[
    metaCard(1, 'cal',  '02 — Book a demo', '30 minutes with your clinical director & CFO.',
             '<a href="mailto:info@calldental.ai?subject=Apical%20Dental%20demo">info@calldental.ai — Subject: demo</a> · We bring the simulator, the case-by-case economics for your network size, and a provisional deployment plan.'),
    metaCard(2, 'pin',  '03 — Address',     'Palo Alto, California.',
             'Apical Dental, Inc. · 2010 El Camino Real · Palo Alto, CA 94306 · United States. Visitors by appointment.'),
    metaCard(3, 'clock','04 — Response time','One business day, usually faster.',
             'Inbox monitored 09:00 – 19:00 PT, Mon – Fri. Off-hours queries handled by an on-call partner. Pilot agreements drafted within five business days.')
  ]
};

const cardsSec = {
  id: P+'cards', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320}, gap:'no',
    padding:        {unit:'px',top:'40',right:'40',bottom:'160',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'32',right:'32',bottom:'110',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'24',right:'22',bottom:'80', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    structure:'64', css_classes:'ap-contact'
  },
  elements:[ primCard, metaCol ]
};

// ── CTA ─────────────────────────────────────────────────────────────
const ctaSec = {
  id: P+'cta', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'180',right:'40',bottom:'180',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'130',right:'32',bottom:'130',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'96', right:'22',bottom:'96', left:'22',isLinked:false},
    background_background:'classic', background_color: INK, css_classes:'ap-contact'
  },
  elements:[{
    id: P+'ctacol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:32} },
    elements:[
      heading('ctak', '05 — STILL DECIDING?', 'ap-cta-eye', { h:'h6', set:{ _animation:'fadeInUp' } }),
      heading('ctah', 'See it run on your scan first.', 'ap-cta-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('ctab', '<p>Send an anonymised CBCT/STL pair before the call. We plan a case on the live platform and walk through trajectory, clearance, and surgical sequence — so the demo answers your specific clinical question.</p>', 'ap-body-dark', { set:{ _animation:'fadeInUp', _animation_delay:240 } }),
      { id: P+'ctabtn', elType:'widget', widgetType:'button',
        settings:{ text:'Send a scan', link:{url:'mailto:info@calldental.ai?subject=Apical%20Dental%20scan%20review'},
                   background_color:ACC, button_text_color:BONE, hover_background_color:BONE, hover_color:INK,
                   border_radius:{unit:'px',top:'0',right:'0',bottom:'0',left:'0',isLinked:true},
                   text_padding:{unit:'px',top:'20',right:'32',bottom:'20',left:'32',isLinked:false},
                   selected_icon:{value:'fas fa-arrow-right',library:'fa-solid'}, icon_align:'right',
                   _animation:'fadeInUp', _animation_delay:360 } }
    ]
  }]
};

const footer = {
  id: P+'foot', elType:'section', isInner:false,
  settings:{
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'56',right:'40',bottom:'40',left:'40',isLinked:false},
    padding_mobile: {unit:'px',top:'40',right:'22',bottom:'28',left:'22',isLinked:false},
    background_background:'classic', background_color:'#111113', css_classes:'ap-contact'
  },
  elements:[{
    id: P+'fcol', elType:'column', settings:{ _column_size:100 },
    elements:[
      text('fbot', '<p><a class="brand" href="/apicaldental/">APICAL</a><span>© 2026 Apical Dental · <a href="mailto:info@calldental.ai">info@calldental.ai</a></span></p>', 'ap-foot')
    ]
  }]
};

const data = [nav, hero, cardsSec, ctaSec, footer];
writeFileSync(resolve(here, 'contact.json'), JSON.stringify(data));
console.log('contact →', JSON.stringify(data).length, 'bytes');
