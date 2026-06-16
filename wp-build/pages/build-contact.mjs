// Contact page (id=23) — partner with us / segmented intake.
// Hero + 3 segmented path cards (DSO / Individual practitioner / Robotics company)
// then asymmetric concierge (email + meta) as the "or just email us" fallback.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sectionsDir = resolve(here, '..', 'sections');
const nav    = JSON.parse(readFileSync(resolve(sectionsDir, '00-navbar.json'), 'utf-8'));
const footer = JSON.parse(readFileSync(resolve(sectionsDir, '08-footer.json'), 'utf-8'));

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
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  net:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  tooth:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-2.6 0-4.2 1.4-5.1 2.9-1 1.6-1.4 3.4-1.4 5 0 1.4.4 2.7.8 4 .4 1.4.7 2.8.9 4.2.2 1.5.6 2.9 1.6 2.9 1.1 0 1.4-1.6 1.7-3.2.2-1.1.4-2.2.5-2.5.1-.3.5-.3.6 0 .1.3.3 1.4.5 2.5.3 1.6.6 3.2 1.7 3.2 1 0 1.4-1.4 1.6-2.9.2-1.4.5-2.8.9-4.2.4-1.3.8-2.6.8-4 0-1.6-.4-3.4-1.4-5C16.2 4.4 14.6 3 12 3z"/></svg>',
  bot:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M12 2v5"/><circle cx="12" cy="2.2" r="0.6" fill="currentColor"/><circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none"/><path d="M9 16.5h6"/></svg>'
};

const CSS = `
.ap-contact *{box-sizing:border-box}
.ap-contact a{color:inherit}
.ap-eyebrow{font-family:Inter;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${INK};margin:0}
.ap-eyebrow .elementor-heading-title{font:inherit;color:inherit;letter-spacing:inherit;margin:0}
.ap-h1-italic .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(2.3rem,1rem + 5.4vw,5.4rem);font-weight:300;line-height:1.0;letter-spacing:-2.4px;color:${INK};margin:0}
.ap-body{font-family:Inter;font-size:1.1875rem;line-height:1.7;color:rgba(26,26,28,0.88);max-width:62ch}
.ap-body p{margin:0}
.ap-body-dark{font-family:Inter;font-size:1.1875rem;line-height:1.7;color:rgba(243,238,229,0.88);max-width:62ch}
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
.ap-prim .copy{font-size:1.08rem;line-height:1.7;color:rgba(243,238,229,0.82);max-width:48ch;margin-top:auto}
.ap-prim .nm{position:absolute;top:32px;right:48px;font-family:Fraunces;font-style:italic;font-size:14px;color:${ACC};letter-spacing:.4px}

/* secondary stacked meta cards */
.ap-meta{font-family:Inter;background:${BONE};border:1px solid rgba(26,26,28,0.1);padding:36px 32px;display:flex;flex-direction:column;gap:14px}
.ap-meta p{margin:0}
.ap-meta .row{display:flex;align-items:center;gap:14px;font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55)}
.ap-meta svg{width:20px;height:20px;color:${ACC};flex-shrink:0}
.ap-meta h4{font-family:Fraunces;font-size:1.55rem;font-weight:300;line-height:1.18;letter-spacing:-.4px;color:${INK};margin:0}
.ap-meta .ml{font-size:1.05rem;line-height:1.6;color:rgba(26,26,28,0.82)}

/* segmented path cards */
.ap-paths-eye{font-family:Inter;font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55);margin:0 0 18px}
.ap-paths-eye p{margin:0}
.ap-paths-h .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(1.95rem,1rem + 2.5vw,2.8rem);font-weight:300;line-height:1.08;letter-spacing:-1.2px;color:${INK};margin:0}
.ap-path{font-family:Inter;background:#FAF6EE;border:1px solid rgba(26,26,28,0.1);padding:40px 36px;display:flex;flex-direction:column;gap:18px;height:100%;position:relative;transition:border-color .25s,transform .25s}
.ap-path:hover{border-color:${ACC};transform:translateY(-2px)}
.ap-path p{margin:0}
.ap-path .icon{width:46px;height:46px;color:${ACC};display:flex;align-items:center;justify-content:center;background:${BONE};border:1px solid rgba(184,92,60,0.25);border-radius:50%}
.ap-path .icon svg{width:24px;height:24px}
.ap-path .kicker{font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55)}
.ap-path h4{font-family:Fraunces;font-size:1.55rem;font-weight:300;line-height:1.18;letter-spacing:-.4px;color:${INK};margin:0}
.ap-path .body{font-size:1.0625rem;line-height:1.65;color:rgba(26,26,28,0.82);margin-top:0}
.ap-path ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}
.ap-path ul li{position:relative;padding-left:18px;font-size:14px;line-height:1.5;color:rgba(26,26,28,0.78)}
.ap-path ul li::before{content:'';position:absolute;left:0;top:9px;width:5px;height:5px;border-radius:50%;background:${ACC}}
.ap-path .cta{margin-top:auto;padding-top:6px}
.ap-path .cta a{display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:${INK};border-bottom:1px solid ${INK};padding:0 0 4px;text-decoration:none;transition:color .2s,border-color .2s}
.ap-path .cta a:hover{color:${ACC};border-bottom-color:${ACC}}
.ap-path .nm{position:absolute;top:24px;right:32px;font-family:Fraunces;font-style:italic;font-size:14px;color:${ACC};letter-spacing:.4px}

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
      heading('heyebrow', 'PARTNER WITH US · ONE BUSINESS DAY', 'ap-eyebrow', { h:'h6' }),
      heading('hh1', 'Three ways to start working with Apical.', 'ap-h1-italic', { h:'h1', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('hsub', '<p>Pick the path that matches you below. Each one routes to a dedicated intake so the first reply is from the right person on the team. Or skip the cards and email us directly &mdash; we reply within one business day, most of the time within the hour.</p>', 'ap-body', { set:{ _animation:'fadeInUp', _animation_delay:240, _element_custom_width:{unit:'%',size:62} } })
    ]
  }]
};

// ── THREE PATHS · segmented intake (DSO / practitioner / robotics) ──
const pathCol = (i, icon, kicker, h, body, bullets, ctaLabel, mailSubject) => ({
  id: P+'pathcol'+i, elType:'column',
  settings:{ _column_size: 33, _inline_size_tablet: 100, _inline_size_mobile: 100 },
  elements:[
    text('path'+i,
      `<p><span class="icon">${ICONS[icon]}</span></p>`
      + `<p class="kicker">${kicker}</p>`
      + `<h4>${h}</h4>`
      + `<p class="body">${body}</p>`
      + `<ul>${bullets.map(b => `<li>${b}</li>`).join('')}</ul>`
      + `<p class="cta"><a href="mailto:info@apicaldental.ai?subject=${encodeURIComponent(mailSubject)}">${ctaLabel} &rarr;</a></p>`
      ,
      'ap-path', { set:{ _animation:'fadeInUp', _animation_delay: 120 + 100*i } })
  ]
});

const pathsIntroSec = {
  id: P+'pathsintro', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'40', right:'40',bottom:'24',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'32', right:'32',bottom:'20',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'24', right:'22',bottom:'16',left:'22',isLinked:false},
    background_background:'classic', background_color: BONE, css_classes:'ap-contact'
  },
  elements:[{
    id: P+'pathintrocol', elType:'column',
    settings:{ _column_size:100, space_between_widgets:{unit:'px',size:18} },
    elements:[
      text('pathseye', '<p>SEGMENTED INTAKE</p>', 'ap-paths-eye', { set:{ _animation:'fadeInUp' } }),
      heading('pathsh', 'Pick the path that matches you.', 'ap-paths-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:80 } })
    ]
  }]
};

const pathsSec = {
  id: P+'paths', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320}, gap:'extended', structure:'33',
    padding:        {unit:'px',top:'8',  right:'40',bottom:'120',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'8',  right:'32',bottom:'90', left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'8',  right:'22',bottom:'64', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE, css_classes:'ap-contact'
  },
  elements:[ pathCol(1, 'net',   'FOR DSO NETWORKS',
              'DSO networks &amp; group practices',
              'You run multiple chairs across multiple locations. You&rsquo;re looking for the on-site lab that flagships in one chair, proves the math, then rolls across the network.',
              [
                'Flagship → cluster → network rollout',
                '$3,667 / chair / month lease, consumables separate',
                'Custom revenue model in five business days'
              ],
              'Start DSO conversation',
              'Apical Dental — DSO partnership intake'),
              pathCol(2, 'tooth', 'FOR INDIVIDUAL PRACTITIONERS',
              'Independent &amp; specialty practices',
              'You&rsquo;re the practising dentist deciding for your own practice. You want the on-site lab inside your operatory, prescribed to your case mix, with the supervisor panel matched to your chair&rsquo;s case windows.',
              [
                'Single-chair deployment with on-site Apical support',
                'Lease structure, no hardware capex on the practice',
                'Annual renewal · walk away if it doesn&rsquo;t fit'
              ],
              'Start practice conversation',
              'Apical Dental — independent practice intake'),
              pathCol(3, 'bot',   'FOR ROBOTICS COMPANIES',
              'Robotic manufacturers &amp; platforms',
              'You build the hardware. We prescribe and supervise platforms inside dental practices &mdash; independent of any single manufacturer. Reach out about clinical validation, supervised deployments, or co-development.',
              [
                'Manufacturer-agnostic prescriber',
                'Clinical validation &amp; supervised deployment',
                'Co-development conversations on a case-by-case basis'
              ],
              'Start robotics conversation',
              'Apical Dental — robotics manufacturer intake')
  ]
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
      + `<p class="addr"><a href="mailto:info@apicaldental.ai">info@apicaldental.ai</a></p>`
      + `<p class="copy">For partnership inquiries, clinical questions, press, or anything else. Include your DSO name, location count, and how soon you want a flagship chair on site. A real human replies — most of the time within the hour.</p>`
      , 'ap-prim', { set:{ _animation:'fadeInUp', _animation_delay:120 } })
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
    metaCard(1, 'cal',  'Book a demo', '30 minutes with your clinical director & CFO.',
             '<a href="mailto:info@apicaldental.ai?subject=Apical%20Dental%20demo">info@apicaldental.ai — Subject: demo</a> · We bring the simulator, the case-by-case economics for your network size, and a provisional deployment plan.'),
    metaCard(2, 'pin',  'Location',     'Indiana, United States.',
             'Apical Dental is based in Indiana, alongside Dr. Lewis’s practice. On-site visits arranged by appointment after an initial consult. Mailing address shared on request.'),
    metaCard(3, 'clock','Response time','One business day, usually faster.',
             'Inbox monitored 09:00 – 19:00 ET, Mon – Fri. Off-hours queries handled by an on-call partner. Partnership documents are drafted on the practice’s timeline, not a marketing one.')
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
      heading('ctak', 'STILL DECIDING?', 'ap-cta-eye', { h:'h6', set:{ _animation:'fadeInUp' } }),
      heading('ctah', 'See it run on your scan first.', 'ap-cta-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('ctab', '<p>Send an anonymised CBCT/STL pair before the call. We plan a case on the live platform and walk through trajectory, clearance, and surgical sequence — so the demo answers your specific clinical question.</p>', 'ap-body-dark', { set:{ _animation:'fadeInUp', _animation_delay:240 } }),
      { id: P+'ctabtn', elType:'widget', widgetType:'button',
        settings:{ text:'Send a scan', link:{url:'mailto:info@apicaldental.ai?subject=Apical%20Dental%20scan%20review'},
                   background_color:ACC, button_text_color:BONE, hover_background_color:BONE, hover_color:INK,
                   border_radius:{unit:'px',top:'0',right:'0',bottom:'0',left:'0',isLinked:true},
                   text_padding:{unit:'px',top:'20',right:'32',bottom:'20',left:'32',isLinked:false},
                   selected_icon:{value:'fas fa-arrow-right',library:'fa-solid'}, icon_align:'right',
                   _animation:'fadeInUp', _animation_delay:360 } }
    ]
  }]
};

// footer imported from sections/08-footer.json (shared cross-page primitive)

const data = [nav, hero, pathsIntroSec, pathsSec, cardsSec, ctaSec, footer];
writeFileSync(resolve(here, 'contact.json'), JSON.stringify(data));
console.log('contact →', JSON.stringify(data).length, 'bytes');
