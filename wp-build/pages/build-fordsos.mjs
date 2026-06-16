// For-DSOs page (id=22) — B2B sales sheet.
// 4-pillar icon grid + rollout timeline + terms detail rows.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sectionsDir = resolve(here, '..', 'sections');
const nav    = JSON.parse(readFileSync(resolve(sectionsDir, '00-navbar.json'), 'utf-8'));
const footer = JSON.parse(readFileSync(resolve(sectionsDir, '08-footer.json'), 'utf-8'));

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
.ap-body{font-family:Inter;font-size:1.1875rem;line-height:1.7;color:rgba(26,26,28,0.88);max-width:62ch}
.ap-body p{margin:0}
.ap-body-dark{font-family:Inter;font-size:1.1875rem;line-height:1.7;color:rgba(243,238,229,0.88);max-width:62ch}
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
.ap-pillar .body{font-size:1.05rem;line-height:1.65;color:rgba(26,26,28,0.82);margin-top:auto}
.ap-pillar .nm{position:absolute;top:24px;right:32px;font-family:Fraunces;font-style:italic;font-size:14px;color:${ACC};letter-spacing:.4px}

/* timeline */
.ap-tl{font-family:Inter;color:${BONE}}
.ap-tl p{margin:0;display:grid;grid-template-columns:repeat(3,1fr);gap:48px;position:relative}
.ap-tl p::before{content:'';position:absolute;left:24px;right:24px;top:6px;height:1px;background:rgba(243,238,229,0.18)}
.ap-tl .phase{position:relative;padding-top:42px;display:block}
.ap-tl .phase::before{content:'';position:absolute;top:0;left:0;width:13px;height:13px;border-radius:50%;background:${ACC};box-shadow:0 0 0 4px ${INK}}
.ap-tl .ph{font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(243,238,229,0.55);display:block;margin:0 0 14px}
.ap-tl .ti{font-family:Fraunces;font-size:1.65rem;font-weight:300;letter-spacing:-.5px;color:${BONE};display:block;margin:0 0 12px;line-height:1.15}
.ap-tl .td{font-size:1.05rem;line-height:1.65;color:rgba(243,238,229,0.82);display:block;margin:0}
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

/* fit qualification grid · two-column for/not-for */
.ap-fit-eye{font-family:Inter;font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55);margin:0 0 18px}
.ap-fit-eye p{margin:0}
.ap-fit-h .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(1.95rem,1rem + 2.5vw,2.8rem);font-weight:300;line-height:1.08;letter-spacing:-1.2px;color:${INK};margin:0}
.ap-fit{font-family:Inter;display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1px solid rgba(26,26,28,0.18)}
.ap-fit p{margin:0}
.ap-fit .col{padding:36px 40px 36px 0;border-bottom:1px solid rgba(26,26,28,0.14)}
.ap-fit .col:nth-child(even){padding-left:40px;border-left:1px solid rgba(26,26,28,0.14)}
.ap-fit .head{display:flex;align-items:baseline;gap:14px;margin:0 0 22px}
.ap-fit .head .mk{font-family:Fraunces;font-style:italic;font-size:18px;color:${ACC};letter-spacing:.3px}
.ap-fit .head .lbl{font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55)}
.ap-fit ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:18px}
.ap-fit li{position:relative;padding-left:22px;font-family:Fraunces;font-size:1.15rem;font-weight:300;line-height:1.4;letter-spacing:-.25px;color:${INK}}
.ap-fit li::before{content:'';position:absolute;left:0;top:11px;width:6px;height:6px;border-radius:50%;background:${ACC}}
.ap-fit li em{font-style:italic;color:rgba(26,26,28,0.55);font-size:.8em;letter-spacing:.2px;font-family:Inter;font-weight:400;display:block;margin-top:6px;line-height:1.5}

/* what-happens-next · numbered process steps */
.ap-pn-eye{font-family:Inter;font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55);margin:0 0 18px}
.ap-pn-eye p{margin:0}
.ap-pn-h .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(1.95rem,1rem + 2.5vw,2.8rem);font-weight:300;line-height:1.08;letter-spacing:-1.2px;color:${INK};margin:0}
.ap-pn{font-family:Inter;border-top:1px solid rgba(26,26,28,0.18)}
.ap-pn .row{display:grid;grid-template-columns:1fr 200px;gap:48px;padding:34px 0;border-bottom:1px solid rgba(26,26,28,0.14);align-items:start}
.ap-pn .row p{margin:0}
.ap-pn .num{font-family:Fraunces;font-style:italic;font-size:2.1rem;font-weight:300;line-height:1;color:${ACC};letter-spacing:-.5px}
.ap-pn .mid h5{font-family:Fraunces;font-size:1.55rem;font-weight:300;line-height:1.18;letter-spacing:-.4px;color:${INK};margin:0 0 8px}
.ap-pn .mid .body{font-size:1.05rem;line-height:1.65;color:rgba(26,26,28,0.82);margin:0}
.ap-pn .when{font-family:Inter;font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55);padding-top:10px}
.ap-pn .when em{font-style:normal;display:block;font-family:Fraunces;font-style:italic;font-size:14px;color:${ACC};text-transform:none;letter-spacing:.3px;margin-top:6px;font-weight:300}

/* FAQ — same accordion treatment as proof page */
.ap-faq{font-family:Inter;border-top:1px solid rgba(26,26,28,0.14)}
.ap-faq details{border-bottom:1px solid rgba(26,26,28,0.14);padding:0}
.ap-faq summary{list-style:none;cursor:pointer;padding:28px 56px 28px 0;font-family:Fraunces;font-size:clamp(1.2rem,1rem + .55vw,1.5rem);font-weight:300;line-height:1.32;letter-spacing:-.3px;color:${INK};position:relative;transition:color .2s}
.ap-faq summary::-webkit-details-marker{display:none}
.ap-faq summary::after{content:'+';position:absolute;right:6px;top:50%;transform:translateY(-50%);font-family:Inter;font-size:24px;font-weight:300;color:${ACC};transition:transform .25s}
.ap-faq details[open] summary{color:${ACC}}
.ap-faq details[open] summary::after{content:'–'}
.ap-faq .ans{padding:0 0 32px;font-size:1.0625rem;line-height:1.7;color:rgba(26,26,28,0.82);max-width:62ch}
.ap-faq .ans p{margin:0 0 14px}
.ap-faq .ans p:last-child{margin:0}
.ap-faq .ans em{font-family:Fraunces;font-style:italic;color:${ACC};font-size:.92em;letter-spacing:.2px}

@media(max-width:900px){.ap-tl p{grid-template-columns:1fr;gap:32px}.ap-tl p::before{display:none}.ap-tl .phase{padding-top:0;padding-left:32px}.ap-tl .phase::before{top:6px;left:0}}
@media(max-width:768px){.ap-term p{grid-template-columns:1fr;gap:8px}.ap-term strong{padding-top:0}.ap-fit{grid-template-columns:1fr}.ap-fit .col{padding:32px 0!important;border-left:none!important}.ap-pn .row{grid-template-columns:1fr;gap:14px}.ap-pn .when{padding-top:0}}
`.trim();

const styles = text('stylesV2', `<style>${CSS}</style>`, '');

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
      heading('heyebrow', 'FOR DSOS · PARTNERSHIP FRAMEWORK', 'ap-eyebrow', { h:'h6' }),
      heading('hh1', 'Sized to your network, not built around ours.', 'ap-h1', { h:'h1', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('hsub', '<p>The four pillars of an Apical partnership, the rollout phases we run from, and the framework we use when we sit down to write the terms. Specifics are scoped to your chair count, geography, and payer mix during the first consult.</p>', 'ap-body', { set:{ _animation:'fadeInUp', _animation_delay:240, _element_custom_width:{unit:'%',size:62} } }),
      text('hnav', '<p><a href="#pillars">Pillars</a><a href="#rollout">Rollout</a><a href="#terms">Terms</a><a href="#fit">Fit</a><a href="#process">Next steps</a><a href="#faq">FAQ</a></p>', 'ap-anchor-nav', { set:{ _animation:'fadeInUp', _animation_delay:360 } })
    ]
  }]
};

// ── PILLAR GRID ─────────────────────────────────────────────────────
const pillar = (i, icon, kicker, h, body) => ({
  id: P+'pcol'+i, elType:'column',
  settings:{ _column_size:25, _inline_size_tablet:50, _inline_size_mobile:100 },
  elements:[
    text('pillar'+i, `<p><span class="icon">${ICONS[icon]}</span></p><p class="kicker">${kicker}</p><h4>${h}</h4><p class="body">${body}</p>`, 'ap-pillar', { set:{ _animation:'fadeInUp', _animation_delay: 100 + 100*i } })
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
    pillar(1,'cube',   'THE MODEL',     'Per-case alignment<br/>over capex.',       'Apical avoids putting hardware capex on the practice. The default structure is a per-case fee or a lease that scales with how often the platform is actually used. The specific number is set during the consult, against your case mix.'),
    pillar(2,'percent','THE OVERSIGHT', 'A licensed clinician<br/>on every loop.',  'Every chair has a supervising specialist on the case. Panel composition, coverage hours, and escalation paths are scoped to your case windows and documented in the partnership doc — not promised generically on a landing page.'),
    pillar(3,'route',  'THE ROLLOUT',   'Flagship → cluster<br/>→ network.',        'Start in one or two flagship chairs with full Apical support on-site. Expand to a regional cluster once the flagship metrics hold. Move to network-wide rollout when the math and the workflow are both steady. Pace is yours, not ours.'),
    pillar(4,'signet', 'THE EXIT',      'Annual renewal,<br/>no multi-year lock-in.','The partnership is structured so you can step out at the next annual renewal if it is not working. Hardware comes back to us. We stay honest; you stay flexible. Specific notice periods and end-of-term conditions are written into the contract, not the brochure.')
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
      heading('tlk', 'THE ROLLOUT', 'ap-cta-eye', { h:'h6', set:{ _animation:'fadeInUp' } }),
      heading('tlh', 'Three phases. Paced to your practice.', 'ap-cta-h',  { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('tlb', '<p>Apical embeds a deployment lead with the practice for the full rollout. You see metrics per phase before authorising the next one — and you can hold at any phase as long as you need to.</p>', 'ap-body-dark', { set:{ _animation:'fadeInUp', _animation_delay:200 } }),
      text('tl', '<p>'
        + tlPhase('Begin', 'Flagship', 'One chair, with the supervising specialist on every case. Apical on-site with the practice until your own clinicians are cleared by the supervisor.', 'Until the flagship is steady')
        + tlPhase('Scale', 'Cluster',  'Expand to a regional cluster once the flagship metrics hold. Weekly metrics review. Apical reduces on-site frequency as cases run independently.',  'When the data says so')
        + tlPhase('Steady', 'Network',  'Full network throughput. Apical transitions to a monthly cadence. Quarterly business review on case mix and economics.',                          'On your network’s schedule')
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
      heading('tk', 'FRAMEWORK', 'ap-eyebrow', { h:'h6', set:{ _animation:'fadeInUp', _margin:{unit:'px',top:'0',right:'0',bottom:'22',left:'0',isLinked:false} } }),
      heading('th', 'The questions we answer before we sign anything.', 'ap-h2-italic', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120, _margin:{unit:'px',top:'0',right:'0',bottom:'56',left:'0',isLinked:false} } }),
      termRow(1, 'Pricing structure',      '$3,667 / month lease per chair, plus consumables<em>* consumables billed separately through the approved supply system</em>'),
      termRow(2, 'Capital exposure',       'No hardware capex on the practice<em>* lease model is the default · no balance-sheet exposure</em>'),
      termRow(3, 'Commitment length',      'Annual renewal cycle<em>* exit terms agreed in writing up front</em>'),
      termRow(4, 'Specialist coverage',    'Board-certified periodontist or oral surgeon panel<em>* coverage hours scoped to your case windows</em>'),
      termRow(5, 'Liability framework',    'Final responsibility for the appliance rests with the treating dentist, not Apical<em>* HIPAA-compliant production · sterilization-cleared appliance in the doctor&rsquo;s hand</em>'),
      termRow(6, 'Service commitment',     'Maintenance and support SLA scoped per deployment<em>* defined during contract review</em>'),
      termRow(7, 'Geographic coverage',    'Currently planning US-market deployments<em>* additional jurisdictions on partnership basis</em>')
    ]
  }]
};

// ── FIT QUALIFICATION · who this is for, who it isn't ───────────────
const fitSec = {
  id: P+'fit', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'130',right:'40',bottom:'140',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'90', right:'32',bottom:'100',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'64', right:'22',bottom:'72', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    border_border:'solid', border_width:{unit:'px',top:'1',right:'0',bottom:'0',left:'0',isLinked:false},
    border_color:'rgba(26,26,28,0.12)',
    _element_id:'fit', css_classes:'ap-dso'
  },
  elements:[{
    id: P+'fitcol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:0} },
    elements:[
      text('fitk', '<p>QUALIFICATION</p>', 'ap-fit-eye', { set:{ _animation:'fadeInUp' } }),
      heading('fith', 'A partnership only works when the math, the model, and the timeline already point the same way.', 'ap-fit-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120, _margin:{unit:'px',top:'0',right:'0',bottom:'48',left:'0',isLinked:false} } }),
      {
        id: P+'fitwrap', elType:'widget', widgetType:'text-editor',
        settings: { _css_classes:'ap-fit', _animation:'fadeInUp', _animation_delay:220, editor: '<div class="col"><p class="head"><span class="mk">→</span><span class="lbl">A FIT IF</span></p><ul><li>You operate a multi-office network with at least one specialty referral pattern leaking out of network<em>typical floor: 6+ locations or a clear surgical referral channel</em></li><li>You can name the specialist coverage gap you\'d close first<em>perio, oral surgery, complex restorative — pick one</em></li><li>You want the first chair flagshipped before the network sees a single demo<em>quiet rollout, internal data first, marketing later</em></li><li>Your CFO is willing to model per-case economics, not capex<em>we don\'t sell you the hardware</em></li></ul></div><div class="col"><p class="head"><span class="mk">×</span><span class="lbl">NOT A FIT IF</span></p><ul><li>You\'re shopping for an autonomous robot to staff a chair<em>not the product · never will be</em></li><li>You need a vendor pitch in a quarter and a board photo<em>flagship cycles run on clinical pace, not press timelines</em></li><li>Your insurance and licensure footprint is outside the US<em>we\'re scoped to US deployments first</em></li><li>You\'d rather buy the hardware and run it yourself<em>we don\'t sell platforms · we prescribe and supervise them</em></li></ul></div>' }
      }
    ]
  }]
};

// ── PROCESS · what happens after first contact ──────────────────────
const pnRow = (i, n, h, body, when, whenEm) => text('pn'+i,
  `<div class="row"><p class="num">${n}</p><div class="mid"><h5>${h}</h5><p class="body">${body}</p></div><p class="when">${when}<em>${whenEm}</em></p></div>`,
  '', { set:{ _animation:'fadeInUp', _animation_delay: 60*i } });

const processSec = {
  id: P+'process', elType:'section', isInner:false,
  settings:{
    layout:'boxed', content_width:{unit:'px',size:1200},
    padding:        {unit:'px',top:'130',right:'40',bottom:'140',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'90', right:'32',bottom:'100',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'64', right:'22',bottom:'72', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    border_border:'solid', border_width:{unit:'px',top:'1',right:'0',bottom:'0',left:'0',isLinked:false},
    border_color:'rgba(26,26,28,0.12)',
    _element_id:'process', css_classes:'ap-dso'
  },
  elements:[{
    id: P+'pncol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:0} },
    elements:[
      text('pnk', '<p>NEXT STEPS</p>', 'ap-pn-eye', { set:{ _animation:'fadeInUp' } }),
      heading('pnh', 'The path from first email to first chair.', 'ap-pn-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120, _margin:{unit:'px',top:'0',right:'0',bottom:'48',left:'0',isLinked:false} } }),
      {
        id: P+'pnwrap', elType:'widget', widgetType:'text-editor',
        settings: { _css_classes:'ap-pn', _animation:'fadeInUp', _animation_delay:220, editor: [
          `<div class="row"><div class="mid"><h5>Intro call · 30 minutes</h5><p class="body">Clinical director and CFO on the line. We confirm chair count, geography, payer mix, and which specialty channel is leaking. We do not pitch the platform yet — we listen for whether the partnership shape we offer can even match what you need.</p></div><p class="when">WHEN<em>Within 5 business days</em></p></div>`,
          `<div class="row"><div class="mid"><h5>Custom revenue model · written</h5><p class="body">Apical returns a per-location revenue model built against your case mix and payer reality, with the phased rollout plan attached. You see the math before any contract language is exchanged. If the math doesn't clear, we say so and end here — no follow-up sequence.</p></div><p class="when">WHEN<em>5 business days after intro</em></p></div>`,
          `<div class="row"><div class="mid"><h5>Clinical-lab walkthrough</h5><p class="body">Your clinical lead spends a half-day in Dr. Lewis's lab. The bench platforms run live. You meet the supervising specialist panel candidates for your case windows. Apical never asks for a signature on this trip — the visit is for diligence, not closing.</p></div><p class="when">WHEN<em>2–3 weeks after model</em></p></div>`,
          `<div class="row"><div class="mid"><h5>Partnership doc · drafted to your terms</h5><p class="body">We write the partnership contract against the seven questions on the framework above. Your counsel marks it up. The exit terms, liability split, and SLA are settled before we discuss start dates. Annual renewal is the default — no multi-year lock-in.</p></div><p class="when">WHEN<em>Counsel pace</em></p></div>`,
          `<div class="row"><div class="mid"><h5>Flagship chair · live</h5><p class="body">Apical embeds on-site with the supervising specialist. One chair. Full Apical coverage until the practice clinicians are cleared at the supervisor's pace. Weekly metrics review with you and your CFO. The Cluster stage only opens when the flagship data clears.</p></div><p class="when">WHEN<em>Targeted within 90 days of signing</em></p></div>`
        ].join('') }
      }
    ]
  }]
};

// ── FAQ · the questions DSO operators ask before signing ────────────
const faqSec = {
  id: P+'faq', elType:'section', isInner:false,
  settings:{
    layout:'boxed', content_width:{unit:'px',size:1080},
    padding:        {unit:'px',top:'130',right:'40',bottom:'140',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'90', right:'32',bottom:'100',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'64', right:'22',bottom:'72', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    border_border:'solid', border_width:{unit:'px',top:'1',right:'0',bottom:'0',left:'0',isLinked:false},
    border_color:'rgba(26,26,28,0.12)',
    _element_id:'faq', css_classes:'ap-dso'
  },
  elements:[{
    id: P+'faqcol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:0} },
    elements:[
      text('faqk', '<p>WHAT WE GET ASKED</p>', 'ap-pn-eye', { set:{ _animation:'fadeInUp' } }),
      heading('faqh', 'The five hardest questions DSO operators ask us — and the answers we give before we sign.', 'ap-pn-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120, _margin:{unit:'px',top:'0',right:'0',bottom:'48',left:'0',isLinked:false} } }),
      {
        id: P+'faqwrap', elType:'widget', widgetType:'text-editor',
        settings: { _css_classes:'ap-faq', editor: [
          `<details open><summary>How does this avoid becoming another vendor that wastes our clinicians' time?</summary><div class="ans"><p>Two ways. <em>One:</em> the intro call is 30 minutes with your clinical director and CFO — not a six-week discovery dance. If the partnership shape doesn't match what you need, we end the conversation on that call. <em>Two:</em> Apical is on-site for the full flagship rollout. We absorb the clinician hours required to get the first chair clean; you don't subsidise the integration.</p></div></details>`,
          `<details><summary>What does this actually cost us per location, and where is the capex?</summary><div class="ans"><p>The lease is <em>$3,667 per chair per month</em>, plus consumables billed separately through the approved supply system. There is no hardware capex on the practice — the chair runs on a lease, not a purchase. Consumables price varies by case mix and is scoped during the consult; the lease number is fixed and the same for every partner.</p></div></details>`,
          `<details><summary>How does this interact with our existing referral network and specialist relationships?</summary><div class="ans"><p>Apical is built to keep cases in-network that were leaking to outside specialists. Your existing referral relationships stay intact for everything outside the deployed channel. We don't compete with your trusted specialists — we equip the chairs that have been bleeding cases to them.</p></div></details>`,
          `<details><summary>What's the exit story if this doesn't work after the flagship?</summary><div class="ans"><p>The contract is annual. If the flagship metrics don't clear, you don't authorise the Cluster stage. At renewal you walk. Hardware comes back to us at our cost. The supervisor panel relationships stay with you if you want to keep working with them independently. No clawbacks, no transition fees, no integration penalty.</p></div></details>`,
          `<details><summary>How are you different from the autonomous-robot startups raising rounds right now?</summary><div class="ans"><p>We're not selling you autonomy. We're selling supervised throughput with a licensed clinician on every loop, prescribed by a dentist who's been on the chair since 1981. The autonomous-robot pitch makes a better fundraising deck. The supervised-chair pitch makes a better dental practice.</p></div></details>`
        ].join('') }
      }
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
      heading('ctak', 'BOOK', 'ap-cta-eye', { h:'h6', set:{ _animation:'fadeInUp' } }),
      heading('ctah', 'Model your network.', 'ap-cta-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('ctab', '<p>Send us your chair count, geography, and current implant referral economics. We come back with a per-location revenue model and a phased rollout plan in five business days.</p><p style="margin-top:18px;font-size:14px;color:rgba(243,238,229,0.65);letter-spacing:0.3px"><strong style="color:#F3EEE5;font-weight:600">Lease &mdash; $3,667 / chair / month.</strong> Consumables billed separately through the approved supply system. No manufacturer kickbacks.</p>', 'ap-body-dark', { set:{ _animation:'fadeInUp', _animation_delay:240 } }),
      { id: P+'ctabtn', elType:'widget', widgetType:'button',
        settings:{ text:'Book a demo', link:{url:'mailto:info@apicaldental.ai?subject=Apical%20Dental%20demo'},
                   background_color:ACC, button_text_color:BONE, hover_background_color:BONE, hover_color:INK,
                   border_radius:{unit:'px',top:'0',right:'0',bottom:'0',left:'0',isLinked:true},
                   text_padding:{unit:'px',top:'20',right:'32',bottom:'20',left:'32',isLinked:false},
                   selected_icon:{value:'fas fa-arrow-right',library:'fa-solid'}, icon_align:'right',
                   _animation:'fadeInUp', _animation_delay:360 } }
    ]
  }]
};

// footer imported from sections/08-footer.json (shared cross-page primitive)

const data = [nav, hero, pillarsSec, timelineSec, termsSec, fitSec, processSec, faqSec, ctaSec, footer];
writeFileSync(resolve(here, 'for-dsos.json'), JSON.stringify(data));
console.log('for-dsos →', JSON.stringify(data).length, 'bytes');
