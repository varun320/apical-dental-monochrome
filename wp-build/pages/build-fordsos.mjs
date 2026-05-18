// For-DSOs page (id=22) — B2B sales sheet.
// 4-pillar icon grid + rollout timeline + terms detail rows.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sectionsDir = resolve(here, '..', 'sections');
const nav = JSON.parse(readFileSync(resolve(sectionsDir, '00-navbar.json'), 'utf-8'));

const P = 'pfordsos_';
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
  cube:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3z"/><path d="m3 7.5 9 4.5 9-4.5M12 12v9"/></svg>',
  percent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 18 12-12"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>',
  route:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h7a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8h7"/></svg>',
  signet:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>'
};

const CSS = `
.ap-dso *{box-sizing:border-box}
.ap-dso a{color:inherit}
.ap-eyebrow{font-family:Inter;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${INK};margin:0}
.ap-eyebrow .elementor-heading-title{font:inherit;color:inherit;letter-spacing:inherit;margin:0}
.ap-h1 .elementor-heading-title{font-family:Fraunces;font-size:clamp(2.1rem,1rem + 4.6vw,4.75rem);font-weight:300;line-height:1.04;letter-spacing:-2px;color:${INK};margin:0}
.ap-h2 .elementor-heading-title{font-family:Fraunces;font-size:clamp(1.85rem,1rem + 2.5vw,2.6rem);font-weight:300;line-height:1.12;letter-spacing:-1px;color:${INK};margin:0}
.ap-h2-italic .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(1.95rem,1rem + 2.5vw,2.8rem);font-weight:300;line-height:1.08;letter-spacing:-1.2px;color:${INK};margin:0}
.ap-body{font-family:Inter;font-size:1.0625rem;line-height:1.65;color:rgba(26,26,28,0.78);max-width:62ch}
.ap-body p{margin:0}
.ap-body-dark{font-family:Inter;font-size:1.0625rem;line-height:1.65;color:rgba(243,238,229,0.78);max-width:62ch}
.ap-body-dark p{margin:0}
.ap-anchor-nav{font-family:Inter;font-size:13px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;margin:28px 0 0}
.ap-anchor-nav p{display:flex;gap:32px;flex-wrap:wrap;margin:0}
.ap-anchor-nav a{color:${INK};border-bottom:1px solid rgba(26,26,28,0.3);padding-bottom:4px;text-decoration:none;transition:border-color .2s}
.ap-anchor-nav a:hover{border-bottom-color:${INK}}

/* pillar cards */
.ap-pillar{padding:40px 36px;background:#FAF6EE;border:1px solid rgba(26,26,28,0.1);height:100%;display:flex;flex-direction:column;gap:18px;font-family:Inter;position:relative}
.ap-pillar p{margin:0}
.ap-pillar .icon{width:46px;height:46px;color:${ACC};display:flex;align-items:center;justify-content:center;background:${BONE};border:1px solid rgba(184,92,60,0.25);border-radius:50%}
.ap-pillar .icon svg{width:24px;height:24px}
.ap-pillar .kicker{font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55)}
.ap-pillar h4{font-family:Fraunces;font-size:1.55rem;font-weight:300;line-height:1.15;letter-spacing:-.5px;color:${INK};margin:0}
.ap-pillar .body{font-size:.96rem;line-height:1.6;color:rgba(26,26,28,0.72);margin-top:auto}
.ap-pillar .nm{position:absolute;top:24px;right:32px;font-family:Fraunces;font-style:italic;font-size:14px;color:${ACC};letter-spacing:.4px}

/* timeline */
.ap-tl{font-family:Inter;color:${BONE}}
.ap-tl p{margin:0;display:grid;grid-template-columns:repeat(3,1fr);gap:48px;position:relative}
.ap-tl p::before{content:'';position:absolute;left:24px;right:24px;top:6px;height:1px;background:rgba(243,238,229,0.18)}
.ap-tl .phase{position:relative;padding-top:42px;display:block}
.ap-tl .phase::before{content:'';position:absolute;top:0;left:0;width:13px;height:13px;border-radius:50%;background:${ACC};box-shadow:0 0 0 4px ${INK}}
.ap-tl .ph{font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(243,238,229,0.55);display:block;margin:0 0 14px}
.ap-tl .ti{font-family:Fraunces;font-size:1.65rem;font-weight:300;letter-spacing:-.5px;color:${BONE};display:block;margin:0 0 12px;line-height:1.15}
.ap-tl .td{font-size:.95rem;line-height:1.6;color:rgba(243,238,229,0.72);display:block;margin:0}
.ap-tl .when{font-family:Fraunces;font-style:italic;font-size:13px;color:${ACC};display:block;margin:14px 0 0;letter-spacing:.3px}

/* terms rows */
.ap-term{font-family:Inter;padding:26px 0;border-bottom:1px solid rgba(26,26,28,0.14)}
.ap-term:first-of-type{border-top:1px solid rgba(26,26,28,0.14)}
.ap-term p{margin:0;display:grid;grid-template-columns:200px 1fr;gap:32px;align-items:start}
.ap-term strong{font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55);padding-top:6px}
.ap-term span{font-family:Fraunces;font-size:1.2rem;font-weight:300;line-height:1.4;color:${INK};letter-spacing:-.3px}
.ap-term em{font-style:italic;color:rgba(26,26,28,0.55);font-size:.85em;letter-spacing:0;margin-left:8px;font-family:Inter;font-weight:400}

.ap-cta-h .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(2.15rem,1rem + 5vw,4.75rem);font-weight:300;line-height:1.02;letter-spacing:-2px;color:${BONE};margin:0}
.ap-cta-eye .elementor-heading-title{font-family:Inter;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${BONE};margin:0}
.ap-foot{font-family:Inter;font-size:12px;color:rgba(243,238,229,.5);letter-spacing:.3px}
.ap-foot p{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;margin:0}
.ap-foot a{color:rgba(243,238,229,.7);text-decoration:none}
.ap-foot a.brand{font-family:Fraunces;font-size:18px;font-weight:500;letter-spacing:2px;color:${BONE};text-decoration:none}

@media(max-width:900px){.ap-tl p{grid-template-columns:1fr;gap:32px}.ap-tl p::before{display:none}.ap-tl .phase{padding-top:0;padding-left:32px}.ap-tl .phase::before{top:6px;left:0}}
@media(max-width:768px){.ap-term p{grid-template-columns:1fr;gap:8px}.ap-term strong{padding-top:0}}
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
    background_background:'classic', background_color: BONE, css_classes:'ap-dso'
  },
  elements: [{
    id: P+'hcol', elType:'column',
    settings: { _column_size:100, space_between_widgets:{unit:'px',size:24} },
    elements: [
      styles,
      heading('heyebrow', 'FOR DSOS · OPERATOR ECONOMICS', 'ap-eyebrow', { h:'h6' }),
      heading('hh1', 'The economics work at ten locations and at a thousand.', 'ap-h1', { h:'h1', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('hsub', '<p>Per-case pricing. Zero capex. Specialist time bundled. Chairs become specialty chairs overnight — and the unit economics scale linearly.</p>', 'ap-body', { set:{ _animation:'fadeInUp', _animation_delay:240, _element_custom_width:{unit:'%',size:62} } }),
      text('hnav', '<p><a href="#pillars">The four pillars</a><a href="#rollout">Rollout</a><a href="#terms">Terms</a></p>', 'ap-anchor-nav', { set:{ _animation:'fadeInUp', _animation_delay:360 } })
    ]
  }]
};

// ── PILLAR GRID ─────────────────────────────────────────────────────
const pillar = (i, icon, kicker, h, body) => ({
  id: P+'pcol'+i, elType:'column',
  settings:{ _column_size:25, _inline_size_tablet:50, _inline_size_mobile:100 },
  elements:[
    text('pillar'+i, `<p><span class="icon">${ICONS[icon]}</span></p><p class="kicker">${kicker}</p><h4>${h}</h4><p class="body">${body}</p><span class="nm">0${i}</span>`, 'ap-pillar', { set:{ _animation:'fadeInUp', _animation_delay: 100 + 100*i } })
  ]
});

const pillarsSec = {
  id: P+'pillars', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320}, gap:'no',
    padding:        {unit:'px',top:'40',right:'40',bottom:'140',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'32',right:'32',bottom:'100',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'24',right:'22',bottom:'76', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    structure:'44', _element_id:'pillars', css_classes:'ap-dso'
  },
  elements:[
    pillar(1,'cube',   'THE MODEL',    'Per-case pricing,<br/>bundled.',          'Single per-case fee bundles arm lease, remote specialist time, planning AI, consumables, and malpractice umbrella. No capex. No specialist hires. No separate licensing.'),
    pillar(2,'percent','THE MATH',     'Break-even at<br/>one case / wk / chair.', 'Typical DSO reimbursement and our per-case price hit break-even at one Apical case per week per chair. Pilot chairs reach three per week within 60 days. Full unit economics under NDA.'),
    pillar(3,'route',  'THE ROLLOUT',  'Flagship → cluster<br/>→ network.',       'One flagship chair per region installed in week one. Clinicians shadow-supervise four weeks. Cluster (5–10 chairs) begins month two. Full network rollout targets month nine.'),
    pillar(4,'signet', 'THE CONTRACT', 'Cancellable annually,<br/>no buyback.',    'No multi-year lock-in. Cancel at each annual renewal with 90 days notice. We take the hardware back — you owe nothing. We stay honest; you stay flexible.')
  ]
};

// ── ROLLOUT TIMELINE (dark) ─────────────────────────────────────────
const tlPhase = (ph, ti, td, when) =>
  `<span class="phase"><span class="ph">${ph}</span><span class="ti">${ti}</span><span class="td">${td}</span><span class="when">${when}</span></span>`;

const timelineSec = {
  id: P+'rollout', elType:'section', isInner:false,
  settings:{
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'130',right:'40',bottom:'140',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'90', right:'32',bottom:'100',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'64', right:'22',bottom:'72', left:'22',isLinked:false},
    background_background:'classic', background_color: INK,
    _element_id:'rollout', css_classes:'ap-dso'
  },
  elements:[{
    id: P+'tlcol', elType:'column',
    settings:{ _column_size:100, space_between_widgets:{unit:'px',size:40} },
    elements:[
      heading('tlk', '02 — THE ROLLOUT', 'ap-cta-eye', { h:'h6', set:{ _animation:'fadeInUp' } }),
      heading('tlh', 'Three phases. Nine months.', 'ap-cta-h',  { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('tlb', '<p>Apical embeds a deployment lead on-site for the full rollout. You see numbers per phase before authorising the next one.</p>', 'ap-body-dark', { set:{ _animation:'fadeInUp', _animation_delay:200 } }),
      text('tl', '<p>'
        + tlPhase('PHASE 01', 'Flagship', 'One flagship chair per region. Clinicians shadow-supervise. Apical engineer on-site daily.', 'Week 1 → Week 4')
        + tlPhase('PHASE 02', 'Cluster',  '5–10 chairs per region. First in-region cases run independently. Weekly metrics review.',     'Month 2 → Month 6')
        + tlPhase('PHASE 03', 'Network',  'Full network throughput. Apical lead transitions to monthly cadence. Quarterly business review.', 'Month 7 → Month 9')
      + '</p>', 'ap-tl', { set:{ _animation:'fadeInUp', _animation_delay:280 } })
    ]
  }]
};

// ── TERMS DETAIL ROWS ───────────────────────────────────────────────
const termRow = (i, k, v) => text('t'+i, `<p><strong>${k}</strong><span>${v}</span></p>`, 'ap-term', { set:{ _animation:'fadeInUp', _animation_delay: 60*i } });

const termsSec = {
  id: P+'terms', elType:'section', isInner:false,
  settings:{
    layout:'boxed', content_width:{unit:'px',size:1080},
    padding:        {unit:'px',top:'130',right:'40',bottom:'140',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'90', right:'32',bottom:'100',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'64', right:'22',bottom:'72', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    _element_id:'terms', css_classes:'ap-dso'
  },
  elements:[{
    id: P+'tcol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:0} },
    elements:[
      heading('tk', '03 — TERMS', 'ap-eyebrow', { h:'h6', set:{ _animation:'fadeInUp', _margin:{unit:'px',top:'0',right:'0',bottom:'22',left:'0',isLinked:false} } }),
      heading('th', 'The fine print, up front.', 'ap-h2-italic', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120, _margin:{unit:'px',top:'0',right:'0',bottom:'56',left:'0',isLinked:false} } }),
      termRow(1, 'Pricing model',          'Per-case fee<em>* tiered by network volume</em>'),
      termRow(2, 'Up-front capital',       '$0<em>* hardware is leased, not sold</em>'),
      termRow(3, 'Minimum commitment',     '12 months<em>* 90-day cancel at renewal</em>'),
      termRow(4, 'Specialist coverage',    '24 / 7 panel<em>* board-cert periodontist / OS</em>'),
      termRow(5, 'Malpractice umbrella',   'Included<em>* primary, not excess</em>'),
      termRow(6, 'Service SLA',            '99.4 % uptime<em>* observed across pilot fleet</em>'),
      termRow(7, 'Geographic coverage',    'US · CA · EU<em>* additional jurisdictions on request</em>')
    ]
  }]
};

// ── CTA ──────────────────────────────────────────────────────────────
const ctaSec = {
  id: P+'cta', elType:'section', isInner:false,
  settings:{
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'180',right:'40',bottom:'180',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'130',right:'32',bottom:'130',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'96', right:'22',bottom:'96', left:'22',isLinked:false},
    background_background:'classic', background_color: INK, css_classes:'ap-dso'
  },
  elements:[{
    id: P+'ctacol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:32} },
    elements:[
      heading('ctak', '04 — NEXT', 'ap-cta-eye', { h:'h6', set:{ _animation:'fadeInUp' } }),
      heading('ctah', 'Model your network.', 'ap-cta-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('ctab', '<p>Send us your chair count, geography, and current implant referral economics. We come back with a per-location revenue model and a phased rollout plan in five business days.</p>', 'ap-body-dark', { set:{ _animation:'fadeInUp', _animation_delay:240 } }),
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

const footer = {
  id: P+'foot', elType:'section', isInner:false,
  settings:{
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'56',right:'40',bottom:'40',left:'40',isLinked:false},
    padding_mobile: {unit:'px',top:'40',right:'22',bottom:'28',left:'22',isLinked:false},
    background_background:'classic', background_color:'#111113', css_classes:'ap-dso'
  },
  elements:[{
    id: P+'fcol', elType:'column', settings:{ _column_size:100 },
    elements:[
      text('fbot', '<p><a class="brand" href="/apicaldental/">APICAL</a><span>© 2026 Apical Dental · <a href="mailto:info@calldental.ai">info@calldental.ai</a></span></p>', 'ap-foot')
    ]
  }]
};

const data = [nav, hero, pillarsSec, timelineSec, termsSec, ctaSec, footer];
writeFileSync(resolve(here, 'for-dsos.json'), JSON.stringify(data));
console.log('for-dsos →', JSON.stringify(data).length, 'bytes');
