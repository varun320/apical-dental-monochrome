// Proof page (id=21) — editorial big-stat layout.
// Each case study: huge headline number + supporting metrics strip + narrative.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sectionsDir = resolve(here, '..', 'sections');
const nav = JSON.parse(readFileSync(resolve(sectionsDir, '00-navbar.json'), 'utf-8'));

const P = 'pproof_';
const BONE = '#F3EEE5';
const INK  = '#1A1A1C';
const ACC  = '#B85C3C';

// ── helpers ─────────────────────────────────────────────────────────
const heading = (id, title, klass, opt = {}) => ({
  id: P + id, elType: 'widget', widgetType: 'heading',
  settings: { title, header_size: opt.h || 'h2', _css_classes: klass, ...(opt.set || {}) }
});
const text = (id, html, klass, opt = {}) => ({
  id: P + id, elType: 'widget', widgetType: 'text-editor',
  settings: { editor: html, _css_classes: klass, ...(opt.set || {}) }
});

// SVG icon strings (currentColor-friendly)
const ICONS = {
  network: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v3M9.5 11.5h5M7 17l2.5-4M17 17l-2.5-4"/></svg>',
  bolt:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>',
  growth:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18M5 16l4-5 4 3 6-8"/><path d="M14 6h5v5"/></svg>'
};

// ── page-level CSS ──────────────────────────────────────────────────
const CSS = `
.ap-proof *{box-sizing:border-box}
.ap-proof a{color:inherit}
.ap-eyebrow{font-family:Inter;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${INK};margin:0}
.ap-eyebrow .elementor-heading-title{font:inherit;color:inherit;letter-spacing:inherit;margin:0}
.ap-h1 .elementor-heading-title{font-family:Fraunces;font-size:clamp(2.1rem,1rem + 4.6vw,4.75rem);font-weight:300;line-height:1.04;letter-spacing:-2px;color:${INK};margin:0}
.ap-h2-italic .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(2.1rem,1rem + 3vw,3.4rem);font-weight:300;line-height:1.05;letter-spacing:-1.4px;color:${INK};margin:0}
.ap-body{font-family:Inter;font-size:1.0625rem;line-height:1.65;color:rgba(26,26,28,0.78);max-width:62ch}
.ap-body p{margin:0}
.ap-body-dark{font-family:Inter;font-size:1.0625rem;line-height:1.65;color:rgba(243,238,229,0.78);max-width:62ch}
.ap-body-dark p{margin:0}

/* huge headline stat */
.ap-stat{font-family:Fraunces;font-weight:300;font-variant-numeric:tabular-nums;color:${INK};line-height:.92;letter-spacing:-5px;margin:0 0 12px}
.ap-stat .elementor-heading-title{font:inherit;color:inherit;letter-spacing:inherit;margin:0;font-size:clamp(4.5rem,3rem + 8vw,11rem)}
.ap-stat .elementor-heading-title em{font-style:italic;color:${ACC};font-size:.55em;letter-spacing:-1px;margin-left:8px;vertical-align:.18em}
.ap-stat-cap{font-family:Inter;font-size:13px;color:rgba(26,26,28,0.55);letter-spacing:.3px;line-height:1.5;margin:0 0 56px}
.ap-stat-cap p{margin:0}

/* case-row chrome */
.ap-case-head{display:flex;align-items:center;gap:18px;font-family:Inter;font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55);margin:0 0 28px}
.ap-case-head p{margin:0;display:flex;align-items:center;gap:18px}
.ap-case-head svg{width:22px;height:22px;color:${ACC};flex-shrink:0}
.ap-case-head .num{font-family:Fraunces;font-style:italic;font-size:15px;font-weight:300;color:${ACC};letter-spacing:.5px}
.ap-case-head .sep{width:32px;height:1px;background:rgba(26,26,28,0.25)}

/* supporting metric strip */
.ap-metrics{font-family:Inter;border-top:1px solid rgba(26,26,28,0.14);border-bottom:1px solid rgba(26,26,28,0.14);padding:22px 0;margin:32px 0 28px}
.ap-metrics p{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin:0}
.ap-metrics span{display:block}
.ap-metrics strong{display:block;font-size:11px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:rgba(26,26,28,0.55);margin-bottom:6px}
.ap-metrics em{font-style:normal;font-family:Fraunces;font-size:1.4rem;font-weight:300;color:${INK};font-variant-numeric:tabular-nums;letter-spacing:-.4px;display:block}

/* anchor nav under hero */
.ap-anchor-nav{font-family:Inter;font-size:13px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;margin:28px 0 0}
.ap-anchor-nav p{display:flex;gap:32px;flex-wrap:wrap;margin:0}
.ap-anchor-nav a{color:${INK};border-bottom:1px solid rgba(26,26,28,0.3);padding-bottom:4px;text-decoration:none;transition:border-color .2s}
.ap-anchor-nav a:hover{border-bottom-color:${INK}}

/* CTA + footer reused style */
.ap-cta-h .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(2.15rem,1rem + 5vw,4.75rem);font-weight:300;line-height:1.02;letter-spacing:-2px;color:${BONE};margin:0}
.ap-cta-eye .elementor-heading-title{font-family:Inter;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${BONE};margin:0}
.ap-foot{font-family:Inter;font-size:12px;color:rgba(243,238,229,.5);letter-spacing:.3px}
.ap-foot p{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;margin:0}
.ap-foot a{color:rgba(243,238,229,.7);text-decoration:none}
.ap-foot a.brand{font-family:Fraunces;font-size:18px;font-weight:500;letter-spacing:2px;color:${BONE};text-decoration:none}

@media(max-width:768px){.ap-stat .elementor-heading-title{letter-spacing:-3px}.ap-metrics p{grid-template-columns:1fr;gap:18px}}
`.trim();

const styles = text('styles', `<style>${CSS}</style>`, '');

// ── HERO ────────────────────────────────────────────────────────────
const hero = {
  id: P+'hero', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'200',right:'40',bottom:'110',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'160',right:'32',bottom:'80', left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'120',right:'22',bottom:'60', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    css_classes: 'ap-proof'
  },
  elements: [{
    id: P+'hcol', elType:'column',
    settings: { _column_size:100, space_between_widgets:{unit:'px',size:24} },
    elements: [
      styles,
      heading('heyebrow', 'PROOF · COHORT ONE', 'ap-eyebrow', { h:'h6' }),
      heading('hh1', 'Results from live DSO deployments.', 'ap-h1', { h:'h1', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('hsub', '<p>Three representative case studies from our first cohort of DSO partners. The headline numbers — and the footnotes that earn them.</p>', 'ap-body', { set:{ _animation:'fadeInUp', _animation_delay:240, _element_custom_width:{unit:'%',size:62} } }),
      text('hnav', '<p><a href="#case01">Pacific Dental</a><a href="#case02">Heartland</a><a href="#case03">Great Expressions</a></p>', 'ap-anchor-nav', { set:{ _animation:'fadeInUp', _animation_delay:360 } })
    ]
  }]
};

// ── CASE STUDY SECTION ──────────────────────────────────────────────
const caseSection = ({i, anchor, icon, brand, locations, stat, statSuffix, statCap, h2, metrics, body, last}) => ({
  id: P+'case'+i, elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'110',right:'40',bottom: last ? '160' : '110', left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'80', right:'32',bottom: last ? '110' : '80',  left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'56', right:'22',bottom: last ? '76'  : '56',  left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    border_border:'solid', border_width:{unit:'px',top:'1',right:'0',bottom:'0',left:'0',isLinked:false},
    border_color:'rgba(26,26,28,0.12)',
    _element_id: anchor, css_classes:'ap-proof'
  },
  elements: [{
    id: P+'case'+i+'col', elType:'column',
    settings: { _column_size:100, space_between_widgets:{unit:'px',size:0}, max_width:{unit:'px',size:980} },
    elements: [
      // header strip (icon + numbered + brand + locations)
      text('case'+i+'head', `<p>${ICONS[icon]}<span class="num">0${i}</span><span class="sep"></span><span>${brand}</span><span class="sep"></span><span>${locations}</span></p>`, 'ap-case-head', { set:{ _animation:'fadeInUp' } }),
      // headline stat
      heading('case'+i+'stat', stat + (statSuffix ? `<em>${statSuffix}</em>` : ''), 'ap-stat', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:100 } }),
      // stat caption (small italic line)
      text('case'+i+'cap', `<p>${statCap}</p>`, 'ap-stat-cap', { set:{ _animation:'fadeInUp', _animation_delay:180 } }),
      // italic h2 narrative anchor
      heading('case'+i+'h2', h2, 'ap-h2-italic', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:260 } }),
      // metrics strip (3 columns)
      text('case'+i+'met', `<p>${metrics.map(m=>`<span><strong>${m.k}</strong><em>${m.v}</em></span>`).join('')}</p>`, 'ap-metrics', { set:{ _animation:'fadeInUp', _animation_delay:340 } }),
      // body paragraph
      text('case'+i+'b', `<p>${body}</p>`, 'ap-body', { set:{ _animation:'fadeInUp', _animation_delay:420 } })
    ]
  }]
});

const case1 = caseSection({
  i:1, anchor:'case01', icon:'network',
  brand:'Pacific Dental Group', locations:'112 locations · CA / NV / TX',
  stat:'+ $2.41 M', statSuffix:'/yr', statCap:'Net new implant revenue · year one · 38 locations live',
  h2:'They moved from referring out 42 % of implant cases to retaining 89 % in-house — in a single quarter.',
  metrics:[
    { k:'Case margin', v:'61 %' },
    { k:'Locations live (Y1)', v:'38 of 112' },
    { k:'Time to first case', v:'14 days' }
  ],
  body:'Pacific deployed Apical in 12 flagship locations in Q2, then expanded to 38 by year-end. Their per-chair daily implant throughput tripled within sixty days of go-live. Average case margin landed at 61 % — about 18 points above their pre-Apical specialty-referral economics.'
});

const case2 = caseSection({
  i:2, anchor:'case02', icon:'bolt',
  brand:'Heartland', locations:'28 pilot locations · midwest',
  stat:'3.2 ×', statSuffix:'', statCap:'Implant cases per day per equipped chair · pilot mean',
  h2:'From 1.1 cases per day to 3.6, with surgical time nearly cut in half.',
  metrics:[
    { k:'Median surgical time', v:'47 min' },
    { k:'Cases / chair / day', v:'1.1 → 3.6' },
    { k:'Patient NPS', v:'72 → 91' }
  ],
  body:'Across 28 pilot locations, Heartland measured a 3.2 × increase in implant cases completed per day per equipped chair — from 1.1 to 3.6. Surgical time dropped from 84 to 47 minutes average. Patient NPS for the procedure climbed from 72 to 91 in the same window.'
});

const case3 = caseSection({
  i:3, anchor:'case03', icon:'growth', last:true,
  brand:'Great Expressions', locations:'19 locations · southeast',
  stat:'0', statSuffix:'→ 420 / mo', statCap:'Implants placed in-house · month-six run rate · 19 locations',
  h2:'A general-dentist network with no implant practice went to 420 placements a month in six months.',
  metrics:[
    { k:'Nerve injuries', v:'0' },
    { k:'Post-op infection rate', v:'1.2 %' },
    { k:'Industry baseline', v:'2.8 %' }
  ],
  body:'Great Expressions had never offered in-house implants. With Apical, their general dentists completed 420 implants in month six across 19 locations. Zero nerve injuries. Two minor post-op infections (1.2 % rate, less than half the industry average of 2.8 %).'
});

// ── CTA (dark) ─────────────────────────────────────────────────────
const ctaSec = {
  id: P+'cta', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'180',right:'40',bottom:'180',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'130',right:'32',bottom:'130',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'96', right:'22',bottom:'96', left:'22',isLinked:false},
    background_background:'classic', background_color: INK, css_classes:'ap-proof'
  },
  elements: [{
    id: P+'ctacol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:32} },
    elements: [
      heading('ctak', '04 — NEXT', 'ap-cta-eye', { h:'h6', set:{ _animation:'fadeInUp' } }),
      heading('ctah', 'Run the math on your network.', 'ap-cta-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('ctab', '<p>We build a case-by-case revenue model for your geography, payer mix, and chair count. Thirty minutes with your clinical director and CFO.</p>', 'ap-body-dark', { set:{ _animation:'fadeInUp', _animation_delay:240 } }),
      { id: P+'ctabtn', elType:'widget', widgetType:'button',
        settings:{ text:'Book a demo', link:{url:'mailto:info@calldental.ai?subject=Apical%20Dental%20demo'},
                   background_color:ACC, button_text_color:BONE, hover_background_color:BONE, hover_color:INK,
                   border_radius:{unit:'px',top:'0',right:'0',bottom:'0',left:'0',isLinked:true},
                   text_padding:{unit:'px',top:'20',right:'32',bottom:'20',left:'32',isLinked:false},
                   selected_icon:{value:'fas fa-arrow-right',library:'fa-solid'}, icon_align:'right',
                   _animation:'fadeInUp', _animation_delay:360 } }
    ]
  }]
};

// ── FOOTER ──────────────────────────────────────────────────────────
const footer = {
  id: P+'foot', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'56',right:'40',bottom:'40',left:'40',isLinked:false},
    padding_mobile: {unit:'px',top:'40',right:'22',bottom:'28',left:'22',isLinked:false},
    background_background:'classic', background_color:'#111113', css_classes:'ap-proof'
  },
  elements: [{
    id: P+'fcol', elType:'column', settings:{ _column_size:100 },
    elements: [
      text('fbot', '<p><a class="brand" href="/apicaldental/">APICAL</a><span>© 2026 Apical Dental · <a href="mailto:info@calldental.ai">info@calldental.ai</a></span></p>', 'ap-foot')
    ]
  }]
};

// ── ASSEMBLE ────────────────────────────────────────────────────────
const data = [nav, hero, case1, case2, case3, ctaSec, footer];
writeFileSync(resolve(here, 'proof.json'), JSON.stringify(data));
console.log('proof →', JSON.stringify(data).length, 'bytes');
